<template>
    <div class="transition-transform transform hover:scale-110 hover:shadow-2xl cursor-pointer"
        @mouseover="isHovered = true" @mouseleave="isHovered = false" @click="goToPokemon(pokemon.id)">
        <div class="relative flex flex-col items-center bg-gray-50 text-white shadow-lg rounded-2xl p-6 w-64">
            <!-- Imagen del Pokémon -->
            <div class="absolute -top-14">
                <img :src="currentImg" alt="Pokemon" class="w-25 h-25" />
            </div>

            <!-- Botón de favorito -->
            <div class="absolute top-2 left-2">
                <button @click.stop="toggleFavorite(pokemon)" class="text-red-500">
                    <span v-if="isPokemonFavorite">❤️</span>
                    <span v-else>🤍</span>
                </button>
            </div>

            <!-- Botón de selección (equipo/rival) -->
            <div class="absolute top-2 right-2">
                <button @click.stop="toggleTeam(pokemon)" :disabled="isButtonDisabled"
                    class="border rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                    :class="{ 'opacity-50 cursor-not-allowed': isButtonDisabled }">
                    <!-- Seleccionado como parte del equipo -->
                    <img v-if="isSelectedPokemon" :src="check" alt="Check" class="w-6 h-6" />

                    <!-- Seleccionado como rival -->
                    <span v-else-if="isRivalPokemon" class="text-yellow-400 text-xl">⭐</span>

                    <!-- No seleccionado -->
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        class="w-6 h-6 text-gray-500">
                        <circle cx="12" cy="12" r="9" stroke-width="2"></circle>
                        <circle cx="12" cy="12" r="4" stroke-width="2"></circle>
                    </svg>
                </button>
            </div>

            <!-- Información del Pokémon -->
            <div class="mt-6 text-center">
                <p class="text-gray-400 font-semibold text-sm">No.{{ pokemon.id }}</p>
                <h2 class="text-xl font-bold text-yellow-400">{{ pokemon.name }}</h2>
            </div>

            <!-- Tipos de Pokémon -->
            <div class="mt-2 flex flex-wrap justify-center">
                <span v-for="(type, index) in pokemon.types" :key="index" :class="getTypeClass(type)"
                    class="text-sm font-semibold px-4 py-1 rounded-lg m-1">
                    {{ type }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getTypeClass } from '../../../utilities/utilities';
import type { Pokemon } from '../../../domain/interface/ui/Pokemon.interface';
import check from '../../../assets/check.svg';
import { usePokemonSelectedTeam } from '../composables/usePokemonSelected';

const props = defineProps<{ pokemon: Pokemon }>();

const isHovered = ref(false);

const router = useRouter();

const {
    isFavorite,
    addFavoritoPokemon,
    isSelected,
    addStorePokemon,
    maxTeam,
    addRivalPokemon,
    isSelectedRival,
    maxTeamRival
} = usePokemonSelectedTeam();

const currentImg = computed(() =>
    isHovered.value && props.pokemon.imgUrlGift
        ? props.pokemon.imgUrlGift
        : props.pokemon.imgUrl
);

const isPokemonFavorite = computed(() => isFavorite(props.pokemon));
const isSelectedPokemon = computed(() => isSelected(props.pokemon));
const isRivalPokemon = computed(() => isSelectedRival(props.pokemon));

const isLimited = computed(() => maxTeam.value);
const isRivalLimited = computed(() => maxTeamRival.value);

const isButtonDisabled = computed(() => {
    const notSelected = !isSelectedPokemon.value && !isRivalPokemon.value;
    return Boolean(notSelected && isLimited.value && isRivalLimited.value);
});

const goToPokemon = (id: number) => {
    router.push({ name: 'pokemon-id', params: { id } });
};

const toggleFavorite = (pokemon: Pokemon) => {
    addFavoritoPokemon(pokemon);
};

const toggleTeam = (pokemon: Pokemon) => {
    if (isSelectedPokemon.value) {
        
        addStorePokemon(pokemon);
    } else if (!isLimited.value) {
       
        addStorePokemon(pokemon);
    } else if (isRivalPokemon.value) {
        
        addRivalPokemon(pokemon);
    } else if (!isRivalLimited.value) {

        addRivalPokemon(pokemon);
    }
};
</script>

<style scoped>
button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.2s;
}

button:hover {
    transform: scale(1.2);
}

button:focus {
    outline: none;
}
</style>