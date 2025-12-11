<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-200 p-4">
    <div
      :class="`${getTypeClass(pokemonSelect?.types[0] ?? 'normal')} bg-opacity-70 rounded-3xl w-200 shadow-lg overflow-hidden`">
      <div class="p-6 text-center text-white relative">
        <h2 class="text-3xl font-bold capitalize">{{ pokemonSelect?.name }}</h2>
        <span class="text-sm">#{{ pokemonSelect?.id ?? '001' }}</span>
        <img :src="pokemonSelect?.imgUrl" :alt="pokemonSelect?.name" class="w-50 h-50 mx-auto" />
      </div>
      <div class="bg-white p-4 rounded-t-3xl">
        <div class="flex justify-center space-x-2">
          <span v-for="type in pokemonSelect?.types" :key="type"
            :class="`${getTypeClass(type)} border-2 border-current text-black px-3 py-1 rounded-full text-sm font-semibold`">
            {{ type }}
          </span>
        </div>
        

        <!-- Habilidades -->
        <div class="mt-4">
          <h3 class="text-gray-700 font-semibold mb-1">Abilities</h3>
          <div class="flex flex-wrap justify-center space-x-2">
            <span v-for="(ability, index) in pokemonSelect?.abilities" :key="ability"
              :class="`px-3 py-1 rounded-full text-sm font-semibold ${index % 2 === 0 ? 'bg-purple-200 text-purple-800' : 'bg-blue-200 text-blue-800'}`">
              {{ ability }}
            </span>
          </div>
        </div>

        <!-- Estadísticas -->
        <div class="mt-4">
          <h3 class="text-gray-700 font-semibold mb-2">Base Stats</h3>
          <div v-for="(stat, index) in pokemonSelect?.stats" :key="stat.name_stat" class="mb-2">
            <div class="text-gray-600 text-sm font-semibold flex justify-between mx-10">
              <span class="capitalize">{{ stat.name_stat }}</span>
              <span>{{ stat.base_stat }}</span>
            </div>

            <div class="relative h-4 rounded-full overflow-hidden bg-gray-300 mt-2 mx-10">
              <div class="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-1000 ease-in-out"
                :class="getGradient(index)"
                :style="{ width: Math.min((Number(stat.base_stat) / 255) * 100, 100) + '%' }"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { usePokemonAxios } from '../composables/usePokemonAxios';
import { computed, onMounted } from 'vue';
import { getGradient, getTypeClass } from '../../../utilities/utilities';

const router = useRoute();
const { loadPokemonById, pokemonSelect } = usePokemonAxios(0,20);
const pokemonId = computed(() => router.params.id);

onMounted(() => {
  if (pokemonId.value) {
    loadPokemonById(Number(pokemonId.value));
  }
});


</script>
<style scoped></style>