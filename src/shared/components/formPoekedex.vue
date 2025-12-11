<template>
    <div class="flex items-center justify-center mt-8">
        <div class="w-full max-w-md">
            <div v-if="alert.visible"
                :class="`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'} shadow-lg mb-4`">
                <svg v-if="alert.type === 'success'" xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{{ alert.message }}</span>
            </div>

            <!-- Formulario -->
            <form class="rounded-xl p-8 w-full space-y-6 text-black bg-white shadow" @submit.prevent="handleSubmit">
                <!-- Nombre -->
                <div>
                    <label class="block text-sm font-medium text-black">Nombre</label>
                    <input v-model="pokemon.name" type="text"
                        class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                        placeholder="Ej. Pikachu" />
                    <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
                </div>

                <!-- Tipo -->
                <div>
                    <label class="block text-sm font-medium text-black">Tipo</label>
                    <select v-model="pokemon.type"
                        class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black">
                        <option value="">Selecciona un tipo</option>
                        <option value="Eléctrico">Eléctrico</option>
                        <option value="Fuego">Fuego</option>
                        <option value="Agua">Agua</option>
                        <option value="Planta">Planta</option>
                        <option value="Volador">Volador</option>
                    </select>
                    <p v-if="errors.type" class="text-red-600 text-sm mt-1">{{ errors.type }}</p>
                </div>

                <!-- Nivel -->
                <div>
                    <label class="block text-sm font-medium text-black">Nivel</label>
                    <input v-model.number="pokemon.level" type="number" min="1" max="100"
                        class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                        placeholder="Ej. 25" />
                    <p v-if="errors.level" class="text-red-600 text-sm mt-1">{{ errors.level }}</p>
                </div>

                <!-- Imagen -->
                <div>
                    <label class="block text-sm font-medium text-black">Imagen</label>
                    <input :key="fileInputKey" type="file" @change="handleImageUpload" accept="image/*"
                        class="mt-1 block w-full text-sm text-black" />
                    <p v-if="errors.image" class="text-red-600 text-sm mt-1">{{ errors.image }}</p>

                    <div v-if="pokemon.imageUrl" class="mt-3">
                        <img :src="pokemon.imageUrl" alt="Preview" class="w-32 h-32 object-cover rounded-lg mx-auto" />
                    </div>
                </div>

                <button type="submit"
                    class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                    Registrar
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const emit = defineEmits(['pokemon-registrado'])
const fileInputKey = ref(0)

const pokemon = reactive({
    name: '',
    type: '',
    level: 1,
    image: null as File | null,
    imageUrl: ''
})

const errors = reactive({
    name: '',
    type: '',
    level: '',
    image: ''
})

const alert = reactive({
    type: '',
    message: '',
    visible: false
})

const showAlert = (type: 'success' | 'error', message: string) => {
    alert.type = type
    alert.message = message
    alert.visible = true
    setTimeout(() => {
        alert.visible = false
    }, 3000)
}

const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
        pokemon.image = target.files[0]
        pokemon.imageUrl = URL.createObjectURL(target.files[0])
    }
}

const handleSubmit = () => {
    // Limpiar errores
    errors.name = ''
    errors.type = ''
    errors.level = ''
    errors.image = ''

    let valid = true

    if (!pokemon.name.trim()) {
        errors.name = 'El nombre es obligatorio.'
        valid = false
    }

    if (!pokemon.type) {
        errors.type = 'El tipo es obligatorio.'
        valid = false
    }

    if (!pokemon.level || pokemon.level < 1 || pokemon.level > 100) {
        errors.level = 'El nivel debe estar entre 1 y 100.'
        valid = false
    }

    if (!pokemon.image) {
        errors.image = 'La imagen es obligatoria.'
        valid = false
    }

    if (!valid) return

    // Revisar duplicados
    const pokemons = JSON.parse(sessionStorage.getItem('pokemons') || '[]')
    const exists = pokemons.some((p: any) =>
        p.name.trim().toLowerCase() === pokemon.name.trim().toLowerCase()
    )

    if (exists) {
        errors.name = 'Ya existe un Pokémon con ese nombre.'
        showAlert('error', `El Pokémon "${pokemon.name}" ya está registrado.`)
        return
    }

    // Guardar
    pokemons.push({ ...pokemon })
    sessionStorage.setItem('pokemons', JSON.stringify(pokemons))
    showAlert('success', `Pokémon ${pokemon.name} registrado con éxito.`)

    // Limpiar formulario
    pokemon.name = ''
    pokemon.type = ''
    pokemon.level = 1
    pokemon.image = null
    pokemon.imageUrl = ''
    fileInputKey.value++
    emit('pokemon-registrado')
}
</script>

<style scoped>
input {
    height: 40px;
    border-radius: 14px;
    padding: 4px;
}

select {
    height: 40px;
    border-radius: 14px;
    padding: 4px;
}
</style>
