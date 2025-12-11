<template>
    <div class="text-white rounded-xl shadow-lg p-4 w-64 flex flex-col items-center space-y-3 border border-white/10 transition-all"
        :class="bgColor">
        <img :src="pokemon.image" alt="Pokémon" class="w-24 h-24 object-contain" />
        <h3 class="text-xl font-bold">{{ pokemon.name }}</h3>


        <div class="w-full">
            <p class="text-sm mb-1">HP: {{ pokemon.hpLeft }}</p>
            <div class="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-300" :style="{
                    width: pokemon.hpLeft + '%',
                    backgroundColor: hpColor
                }"></div>
            </div>
        </div>


        <p class="text-sm text-gray-300">Estado: {{ pokemon.status }}</p>


        <div class="text-sm text-gray-400 text-center">
            <p class="font-semibold">Movimientos usados:</p>
            <p>{{ pokemon.movesUsed.join(', ') }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TeamsPokemon } from '../../../domain/interface/ui/Gpt.interface';

const props = defineProps<{
    pokemon: TeamsPokemon
}>();

const hpColor = computed(() => {
    if (props.pokemon.hpLeft === 0) return '#dc2626';
    if (props.pokemon.hpLeft < 40) return '#facc15';
    return '#22c55e';
});


const bgColor = computed(() => {
    return props.pokemon.hpLeft === 0 ? 'bg-red-800/40' : 'bg-green-800/40';
});
</script>

<style scoped></style>