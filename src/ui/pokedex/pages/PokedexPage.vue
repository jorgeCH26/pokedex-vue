<template>
    <div class="m-12">
        <loadingComponent :is-lodoading="loading" />
        <p
            class="text-white text-2xl font-bold bg-black px-6 py-3 rounded-lg border-4 border-red-500 shadow-lg text-center">
            Del Pokémon <span class="text-yellow-300">No.{{ firstPokemon?.id }}</span> al Pokémon <span
                class="text-yellow-300">No.{{ lastPokemon?.id }}</span>
        </p>
        <div class="flex items-center justify-center mt-4">
            <div class="flex items-center">
                <p class="text-center text-white text-2xl mt-2 mr-4">
                    Favoritos: {{ pokemonsFavoritos.length }}
                </p>

                <button @click="goToFavoritos"
                    class="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg px-4 py-2 shadow-md hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-700 transition duration-300">
                    <div class="bg-white p-1 rounded-full">
                        <img :src="pikachu" alt="Pikachu GIF" class="w-9 h-9" />
                    </div>
                    <span class="ml-2 font-bold">Ver Favoritos</span>
                </button>
            </div>
        </div>

        <div class="flex flex-col items-center justify-center">
            <img :src="logo" alt="" srcset="">
            <div class="grid grid-cols-2 gap-4 mb-5">
                <button
                    class="btn bg-red-700 text-red-50 px-6 py-2 rounded-lg shadow-md disabled:opacity-50 flex items-center gap-2"
                    @click="previousPage" :disabled="offsetValue === 0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Anterior
                </button>

                <button
                    class="btn bg-yellow-500 text-yellow-50 px-6 py-2 rounded-lg shadow-md disabled:opacity-50 flex items-center gap-2"
                    @click="nextPage" :disabled="Number(offsetValue) + 10 >= 200">
                    Siguiente
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>


        <section class="flex">
            <!-- Lista de Pokemones (izquierda) -->
            <div :class="{
                'w-full': pokemonSelectedStore.length === 0 && pokemonSelectRival.length === 0,
                'w-3/4': pokemonSelectedStore.length > 0 || pokemonSelectRival.length > 0
            }">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-10" :class="{
                    'lg:grid-cols-4': pokemonSelectedStore.length === 0 && pokemonSelectRival.length === 0,
                    'lg:grid-cols-3': pokemonSelectedStore.length > 0 || pokemonSelectRival.length > 0
                }">
                    <div v-for="pokemon in pokemons" :key="pokemon.id" class="flex justify-center">
                        <PokemonCard :pokemon="pokemon" />
                    </div>
                </div>
            </div>

            <div  v-if="pokemonSelectedStore.length > 0 || pokemonSelectRival.length > 0"
                class="w-1/4 flex flex-col items-center">
            
                <div v-if="pokemonSelectedStore.length > 0" class="w-full p-5 mb-0 rounded-lg shadow-md">
                    <h2 class="text-xl font-bold mb-2 text-yellow-300 text-center">Team Pokémon</h2>
                    <CarrucelPokemonCardComponent :pokemon="pokemonSelectedStore" type="team"/>
                    <div class="flex justify-center mt-2">
                        <button @click="goToPokemonTeam"
                            class="flex items-center bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-gradient-to-r hover:from-pink-500 hover:via-yellow-300 hover:to-indigo-600 transition duration-300">
                            <img :src="btn2" alt="Pokémon GIF" class="w-7 h-6 mr-2" />
                             Mi equipo
                        </button>
                    </div>
                </div>

                <div v-if="pokemonSelectRival.length > 0" class="w-full p-5 rounded-lg shadow-md">
                    <h2 class="text-xl font-bold mb-2 text-red-400 text-center">Equipo Rival</h2>
                    <CarrucelPokemonCardComponent :pokemon="pokemonSelectRival" type="rival"/>
                    <div class="flex justify-center mt-2">
                        <button @click="goToPokemonTeamRival"
                            class="flex items-center bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-gradient-to-r hover:from-pink-500 hover:via-yellow-300 hover:to-indigo-600 transition duration-300">
                            <img :src="bnt1" alt="Pokémon GIF" class="w-7 h-6 mr-2" />
                            Equipo rival
                        </button>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script lang="ts" setup>

import { computed, onMounted, ref } from 'vue';
import PokemonCard from '../components/PokemonCard.vue';
import { usePokemonAxios } from '../composables/usePokemonAxios';
import loadingComponent from '../../../shared/components/loadingComponent.vue';

import logo from "../../../assets/pokemon_gif.gif"
import pikachu from "../../../assets/pikachu.gif"
import bnt1 from "../../../assets/btn1.gif"
import btn2 from "../../../assets/btn2.gif"
import { usePokemonSelectedTeam } from '../composables/usePokemonSelected';
import { useRouter } from 'vue-router';
import CarrucelPokemonCardComponent from '../components/CarrucelPokemonCardComponent.vue';

const offet = ref(0)

const router = useRouter();

const { loadPokemons, pokemons, isLoading, nextPage, offsetValue, previousPage, firstPokemon, lastPokemon } = usePokemonAxios(offet.value, 20);

const { pokemonsFavoritos, pokemonSelectedStore, pokemonSelectRival } = usePokemonSelectedTeam();

onMounted(() => {
    loadPokemons()
})

const goToPokemonTeam = () => {
    router.push({ name: "pokemon-team" });
};

const goToPokemonTeamRival = () => {
    router.push({ name: "pokemon-rival" });
};

const goToFavoritos = () => {
    router.push({ name: "pokemon-favoritos" });
};



const loading = computed(() => !!isLoading.value);

</script>

<style lang="scss" scoped></style>