<template>
    <div class="carousel w-full">
        <div v-for="(pokemon, index) in props.pokemon" :key="pokemon.id" :id="'slide' + (index + 1)"
            class="carousel-item relative w-full">
            <div :class="`${getTypeClass(pokemon?.types[0] ?? 'normal')} bg-opacity-70 rounded-3xl w-100 shadow-lg overflow-hidden relative`"
                class="h-70">
                <button @click="removeItem(props.type,pokemon)"
                    class="absolute top-2 right-3 text-white bg-red-500 hover:bg-red-700 rounded-full p-1">
                    ✕
                </button>

                <img :src="pokemon.imgUrl" :alt="pokemon.name" class="w-full h-40 object-contain mt-2" />
                <h2 class="text-3xl font-bold capitalize text-center">{{ pokemon?.name }}</h2>
                <p class="text-sm text-center">#{{ pokemon?.id ?? '001' }}</p>
                <div class="flex justify-center space-x-2">
                    <span v-for="type in pokemon?.types" :key="type"
                        :class="`${getTypeClass(type)} border-2 border-current text-black px-3 py-1 rounded-full text-sm font-semibold`">
                        {{ type }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import type { Pokemon } from '../../../domain/interface/ui/Pokemon.interface';
import { getTypeClass } from '../../../utilities/utilities';
import { usePokemonSelectedTeam } from '../composables/usePokemonSelected';

const props = defineProps<{ pokemon: Pokemon[] , type: string}>();



const { removeStorePokemon , removeRivalPokemon} = usePokemonSelectedTeam();

const removeItem = (type: string, pokemon: Pokemon) => {

    if(type === 'rival'){
        removeRivalPokemon(pokemon)
    }else{
        removeStorePokemon(pokemon)
    }

} 

</script>