<template>
    <div
        class="min-h-screen bg-gradient-to-br from-yellow-100 via-blue-100 to-red-100 flex items-center justify-center p-4">
        <div class="flex flex-row gap-6 w-full max-w-6xl">
            <div class="w-1/2 bg-white shadow-xl rounded-2xl p-8 text-black">
                <h1 class="text-3xl font-bold mb-2 text-center">Registro Nuevo Pokémon</h1>
                <formPoekedex @pokemon-registrado="handlePokemonRegistrado" />
            </div>

            <div class="w-1/2">
                <pokemonList ref="pokemonListRef" />

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import formPoekedex from '../../../shared/components/formPoekedex.vue';
import pokemonList from '../../../shared/components/PokemonList.vue';

const pokemonListRef = ref()

const handlePokemonRegistrado = () => {
    pokemonListRef.value?.reload()
}
</script>

<style scoped></style>
