<template>
    <div v-if="pokemons.length > 0" class="mt-10 space-y-4 text-black">
        <h2 class="text-2xl font-bold mb-4 text-center">Pokémon Registrados</h2>

        <div v-for="(poke, index) in pokemons" :key="index"
            class="flex items-center justify-between bg-white shadow-md rounded-xl p-4">
            <div class="flex items-center space-x-4">
                <img :src="poke.imageUrl" alt="Imagen" class="w-16 h-16 object-cover rounded-lg" />
                <div>
                    <p class="font-semibold text-lg">{{ poke.name }}</p>
                    <p class="text-sm">Tipo: {{ poke.type }}</p>
                    <p class="text-sm">Nivel: {{ poke.level }}</p>
                </div>
            </div>

            <!-- Botón eliminar -->
            <button class="btn btn-error btn-sm text-white" @click="removePokemon(index)">
                Eliminar
            </button>
        </div>
    </div>

    <div v-else class="mt-10 text-center text-gray-500">No hay Pokémon registrados.</div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineExpose } from 'vue'

const pokemons = ref<any[]>([])

const loadPokemons = () => {
    pokemons.value = JSON.parse(sessionStorage.getItem('pokemons') || '[]')
}

// Exponer función para que el padre pueda recargar
defineExpose({
    reload: loadPokemons
})

const removePokemon = (index: number) => {
    const updated = [...pokemons.value]
    updated.splice(index, 1)
    sessionStorage.setItem('pokemons', JSON.stringify(updated))
    pokemons.value = updated
}

onMounted(() => {
    loadPokemons()
})
</script>
