<template>
    <div class="px-4 md:px-10 py-6">
      <div
        class="w-full md:w-105 mx-auto"
        :class="`${getTypeClass(props.pokemon?.types[0] ?? 'normal')} bg-opacity-70 rounded-3xl shadow-lg overflow-hidden`">
        <div class="p-6 text-center text-white relative">
          <h2 class="text-3xl font-bold capitalize">{{ pokemon?.name }}</h2>
          <span class="text-sm">#{{ pokemon?.id ?? '001' }}</span>
          <img :src="pokemon?.imgUrl" :alt="pokemon?.name" class="w-40 h-40 mx-auto" />
        </div>
  
        <div class="bg-white p-4 rounded-t-3xl">
          <!-- Tipos -->
          <div class="flex justify-center flex-wrap gap-2">
            <span v-for="type in pokemon?.types" :key="type"
              :class="`${getTypeClass(type)} border-2 border-current text-black px-3 py-1 rounded-full text-sm font-semibold`">
              {{ type }}
            </span>
          </div>
  
          <!-- Botón solo en móviles -->
          <div class="mt-4 block md:hidden text-center">
            <button @click="showDetails = !showDetails"
              class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {{ showDetails ? 'Ocultar detalles' : 'Ver detalles' }}
            </button>
          </div>
  
          <!-- Detalles responsivos -->
          <div class="mt-4" v-show="showDetails || isDesktop">
            <div>
              <h3 class="text-gray-700 font-semibold mb-1">Abilities</h3>
              <div class="flex flex-wrap justify-center gap-2">
                <span v-for="(ability, index) in pokemon?.abilities" :key="ability"
                  :class="`px-3 py-1 rounded-full text-sm font-semibold ${index % 2 === 0 ? 'bg-purple-200 text-purple-800' : 'bg-blue-200 text-blue-800'}`">
                  {{ ability }}
                </span>
              </div>
            </div>
  
            <div class="mt-4">
              <h3 class="text-gray-700 font-semibold mb-2">Base Stats</h3>
              <div v-for="(stat, index) in pokemon?.stats" :key="stat.name_stat" class="mb-2">
                <div class="text-gray-600 text-sm font-semibold flex justify-between mx-4">
                  <span class="capitalize">{{ stat.name_stat }}</span>
                  <span>{{ stat.base_stat }}</span>
                </div>
                <div class="relative h-4 rounded-full overflow-hidden bg-gray-300 mt-1 mx-4">
                  <div class="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-1000 ease-in-out"
                    :class="getGradient(index)"
                    :style="{ width: Math.min((Number(stat.base_stat) / 255) * 100, 100) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import type { Pokemon } from '../../../domain/interface/ui/Pokemon.interface';
  import { getGradient, getTypeClass } from '../../../utilities/utilities';
  
  const props = defineProps<{ pokemon: Pokemon }>();
  
  const showDetails = ref(false);
  const isDesktop = ref(window.innerWidth >= 768);
  
  const updateSize = () => {
    isDesktop.value = window.innerWidth >= 768;
    if (isDesktop.value) {
      showDetails.value = true;
    }
  };
  
  onMounted(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateSize);
  });
  </script>
  