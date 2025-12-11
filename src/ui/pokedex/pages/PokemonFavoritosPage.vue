<template>
  <section class="flex mt-8 justify-center w-full">
    <div v-if="pokemonsFavoritos.length === 0" class="flex flex-col items-center justify-center w-full min-h-screen">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        alt="No Pokémon Favoritos"
        class="w-40 h-40 mb-4 animate-bounce"
      />
      <p class="text-xl text-white font-semibold mb-6">¡Ups! No tienes Pokémon favoritos seleccionados.</p>

      <button
        @click="goBack"
        class="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-6 py-2 rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition duration-300"
      >
        Regresar
      </button>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 p-10 w-full"
    >
      <div v-for="pokemon in pokemonsFavoritos" :key="pokemon.id" class="flex justify-center">
        <PokemonCard :pokemon="pokemon" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import PokemonCard from '../components/PokemonCard.vue';
import { usePokemonSelectedTeam } from '../composables/usePokemonSelected';
import { useRouter } from 'vue-router';

const { pokemonsFavoritos } = usePokemonSelectedTeam();
const router = useRouter();

const goBack = () => {
  router.back(); 
};
</script>
