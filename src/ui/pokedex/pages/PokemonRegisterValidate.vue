<template>
    <div class="bg-base-200 flex items-center justify-center min-h-screen p-4">
        <div class="w-full max-w-md">

            <div v-if="alertVisible"
                class="alert alert-success shadow-lg mb-4 transition-opacity duration-300 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>¡Pokémon registrado correctamente!</span>
            </div>


            <n-form class="bg-white p-8 rounded-lg shadow-lg w-full" @submit.prevent="onSubmit">
                <h2 class="text-2xl font-bold mb-6 text-center text-primary">Registro de Pokémon</h2>

                <n-form-item label="Nombre" :feedback="errors.nombre"
                    :validation-status="errors.nombre ? 'error' : 'success'">
                    <n-input v-model:value="nombre" v-bind="nombreAttrs" placeholder="Nombre del Pokémon" clearable />
                </n-form-item>

                <n-form-item label="Tipo" :feedback="errors.tipo"
                    :validation-status="errors.tipo ? 'error' : 'success'">
                    <n-input v-model:value="tipo" v-bind="tipoAttrs" placeholder="Tipo del Pokémon" clearable />
                </n-form-item>

                <n-form-item label="Nivel" :feedback="errors.nivel"
                    :validation-status="errors.nivel ? 'error' : 'success'">
                    <n-input v-model:value="nivel" v-bind="nivelAttrs" min="1" placeholder="Nivel (mínimo 1)"
                        clearable />
                </n-form-item>

                <n-button type="primary" attr-type="submit" class="w-full mt-6">
                    Registrar
                </n-button>
            </n-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'

// Alerta de éxito
const alertVisible = ref(false)

const schema = toTypedSchema(
    yup.object({
        nombre: yup.string().required('El nombre es obligatorio'),
        tipo: yup.string().required('El tipo es obligatorio'),
        nivel: yup
            .string()
            .required('El nivel es obligatorio')
            .min(1, 'El nivel debe ser al menos 1'),
    })
)

const { errors, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
        nombre: '',
        tipo: '',
        nivel: '',
    }
})

const [nombre, nombreAttrs] = defineField('nombre')
const [tipo, tipoAttrs] = defineField('tipo')
const [nivel, nivelAttrs] = defineField('nivel')

const onSubmit = handleSubmit((values) => {
    console.log('Pokémon registrado:', values)

    alertVisible.value = true


    setTimeout(() => {
        alertVisible.value = false
    }, 3000)


    resetForm()
})
</script>
