<template>
    <div class="min-h-screen bg-gradient-to-br from-yellow-100 via-blue-100 to-red-100 p-6 text-center">
        <!-- Título -->
        <h1 class="text-5xl md:text-6xl font-bold text-yellow-600 drop-shadow-lg animate-pulse mb-6">
            ¡Bienvenido a la PokéDex!
        </h1>

        <!-- Imagen destacada -->
        <div class="flex justify-center mb-8">
    <img
        :src="currentBanner"
        alt="Pokemon Banner"
        class="w-full max-w-3xl rounded-xl shadow-xl hover:scale-105 transition duration-500"
        @mouseenter="changeBanner"
        @mouseleave="resetBanner"
    />
</div>

        <!-- Descripción -->
        <p class="text-lg md:text-xl text-gray-700 max-w-xl mx-auto mb-10">
            Explora el maravilloso mundo Pokémon, descubre criaturas únicas, ¡y atrápalos todos!
        </p>

        <!-- Botones -->
        <div class="flex justify-center gap-4 mb-14">
            <router-link to="/pokedex"
                class="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-bold rounded-full text-lg shadow-md hover:bg-yellow-500 hover:scale-110 transition duration-300">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                    alt="pokeball" class="w-6 h-6" />
                Ver Pokémons
            </router-link>
            <router-link to="/pokemon-duelos"
                class="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-full text-lg shadow-md hover:bg-red-600 hover:scale-110 transition duration-300">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"
                    alt="masterball" class="w-6 h-6" />
                Duelos
            </router-link>
        </div>

        <!-- Carrusel de Pokémons -->
        <div class="overflow-x-auto whitespace-nowrap py-4">
            <div class="inline-flex gap-6 animate-scroll">
                <img v-for="pokemon in pokemons" :key="pokemon.id"
                    :src="pokemon.imgUrl"
                    :alt="`pokemon-${pokemon.name}`"
                    class="h-32 w-auto hover:scale-110 transition-transform duration-300 drop-shadow-md cursor-pointer"
                    @click="goToPokemon(pokemon.id)" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import banner from '../../../assets/banner.png'
import banner2 from '../../../assets/pokemons_banner.png'
import { usePokemonAxios } from '../../pokedex/composables/usePokemonAxios';
import { useRouter } from 'vue-router';
const { loadPokemons, pokemons } = usePokemonAxios(0, 150);

onMounted(() => {
    loadPokemons()
})

const router = useRouter();
const goToPokemon = (id: number) => {
    router.push({ name: 'pokemon-id', params: { id } });
};

const currentBanner = ref(banner);

const changeBanner = () => currentBanner.value = banner2;
const resetBanner = () => currentBanner.value = banner;

</script>

<style scoped>
@keyframes scroll {
    0% {
        transform: translateX(0%);
    }

    100% {
        transform: translateX(-50%);
    }
}

.animate-scroll {
    animation: scroll 30s linear infinite;
}
</style>