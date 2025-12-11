<template>
    <div class="bg-gray-900 min-h-screen text-white p-6 flex flex-col justify-between">
      <div v-if="!battleStarted" class="flex flex-col items-center gap-6">
        
        <!-- Tu equipo arriba -->
        <div>
          <h2 class="text-center text-xl font-bold text-blue-400 mb-4">🛡️ Tu Equipo</h2>
          <div class="flex flex-wrap justify-center gap-4">
            <CardDuelosDetail v-for="pokemon in pokemonSelectedStore" :key="pokemon.id" :pokemon="pokemon" />
          </div>
        </div>
  
        <!-- Equipo rival abajo -->
        <div>
          <h2 class="text-center text-xl font-bold text-red-400 mb-4">⚔️ Equipo Rival</h2>
          <div class="flex flex-wrap justify-center gap-4">
            <CardDuelosDetail v-for="pokemon in pokemonSelectRival" :key="pokemon.id" :pokemon="pokemon" />
          </div>
        </div>
  
        <!-- Botón al fondo -->
        <button
          @click="startBattle"
          class="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full shadow-lg text-xl flex items-center gap-3 transition-transform transform hover:scale-105"
        >
          <img :src="icon" alt="Guantes de batalla" class="w-8 h-8 object-contain" />
          ¡Iniciar Batalla!
        </button>
      </div>
  
      <div v-else>
        <!-- Encabezado batalla -->
        <div class="text-center mb-6">
          <h1 class="text-3xl font-bold mb-2">Batalla Pokémon</h1>
          <p class="text-gray-400">Duración de la batalla: {{ battleDuration }} segundos</p>
        </div>
  
        <!-- Cargando -->
        <div v-if="isLoading" class="flex justify-center items-center h-64">
          <LoadingDulosComponent :is-lodoading="isLoading" />
        </div>
  
        <!-- Narración -->
        <div v-else class="bg-black bg-opacity-50 p-4 rounded-md mb-6">
          <p v-for="(line, index) in visibleNarration" :key="index" class="text-lg leading-relaxed">
            {{ line }}
          </p>
          <p v-if="typingLine" class="text-lg leading-relaxed">{{ typingLine }}</p>
        </div>
  
        <!-- Resultado -->
        <div v-if="showResults && winner" class="text-center mt-8 text-2xl font-bold text-green-400">
          <h2>¡El ganador es: {{ winner }}!</h2>
        </div>
  
        <!-- Equipos post batalla -->
        <div class="flex flex-col gap-8 mt-4" v-if="showResults">
          <div>
            <h2 class="text-center text-xl font-bold text-blue-400 mb-4">🛡️ Tu Equipo</h2>
            <div class="flex flex-wrap justify-center gap-4">
              <CardPokemonDuelos
                v-for="(poke, index) in team1_data"
                :key="'myTeam-' + index"
                :pokemon="poke"
                class="m-2"
              />
            </div>
          </div>
  
          <div>
            <h2 class="text-center text-xl font-bold text-red-400 mb-4">⚔️ Equipo Rival</h2>
            <div class="flex flex-wrap justify-center gap-4">
              <CardPokemonDuelos
                v-for="(poke, index) in team2_data"
                :key="'rivalTeam-' + index"
                :pokemon="poke"
                class="m-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  

<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { usePokemonSelectedTeam } from '../composables/usePokemonSelected';
import LoadingDulosComponent from '../../../shared/components/loadingDulosComponent.vue';
import icon from "../../../assets/box.png"
import { useGptAxios } from '../composables/useDuelos';
import CardPokemonDuelos from '../components/CardPokemonDuelos.vue';
import CardDuelosDetail from '../components/CardDuelosDetail.vue';

const { pokemonSelectedStore, pokemonSelectRival } = usePokemonSelectedTeam();
const myTeamData = JSON.parse(JSON.stringify(toRaw(pokemonSelectedStore.value)));
const rivalTeamData = JSON.parse(JSON.stringify(toRaw(pokemonSelectRival.value)));

const {
    simulateDuelo,
    team1_data,
    team2_data,
    isLoading,
    battleDuration,
    battleNarration,
    winner
} = useGptAxios(myTeamData, rivalTeamData);

const battleStarted = ref(false);
const showResults = ref(false);
const visibleNarration = ref<string[]>([]);
const typingLine = ref<string>('');

const typeLineByLine = async (lines: string[]) => {
    for (let i = 0; i < lines.length; i++) {
        typingLine.value = '';
        const line = lines[i];
        for (let j = 0; j < line.length; j++) {
            typingLine.value += line[j];
            await new Promise((resolve) => setTimeout(resolve, 30));
        }
        visibleNarration.value.push(typingLine.value);
        typingLine.value = '';
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    showResults.value = true;
};

const startBattle = async () => {
    battleStarted.value = true;
    await simulateDuelo();
    await typeLineByLine(battleNarration.value);
};
</script>