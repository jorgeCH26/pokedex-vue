<template>
    <div class="flex items-center justify-center p-4 mt-10">
        <div class="w-full max-w-md">
            <div v-if="alertVisible"
                class="alert alert-success shadow-lg mb-4 transition-opacity duration-300 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>¡Login exitoso!</span>
            </div>

            <n-form class="bg-white p-8 rounded-lg shadow-lg w-full" @submit.prevent="onSubmit">
                <h2 class="text-2xl font-bold mb-6 text-center text-cyan-950">Iniciar Sesión</h2>

                <n-form-item label="Usuario" :feedback="errors.usuario"
                    :validation-status="errors.usuario ? 'error' : 'success'">
                    <n-input v-model:value="usuario" v-bind="usuarioAttrs" placeholder="Usuario" clearable />
                </n-form-item>

                <n-form-item label="Contraseña" :feedback="errors.password"
                    :validation-status="errors.password ? 'error' : 'success'">
                    <n-input type="password" v-model:value="password" v-bind="passwordAttrs" placeholder="Contraseña"
                        clearable />
                </n-form-item>
                <div class="flex justify-center m-2">
                    <span class="text-cyan-950">
                        ¿No tienes cuenta?
                        <router-link to="/pokemon-crear-usuario" class="text-blue-600 underline hover:text-blue-800">
                            Regístrate
                        </router-link>
                    </span>
                </div>
                <div class="flex items-center justify-center">
                    <n-button type="primary" size="large" attr-type="submit" class="mt-6">
                        Entrar
                    </n-button>
                </div>

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
import { useAuthLoginAxios } from '../pokedex/composables/useLoging'
import { useRouter } from 'vue-router'

const { login, user } = useAuthLoginAxios();
const alertVisible = ref(false)
const router = useRouter();

const schema = toTypedSchema(
    yup.object({
        usuario: yup.string().required('El usuario es obligatorio'),
        password: yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    })
)

const { errors, defineField, handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
        usuario: '',
        password: '',
    },
})

const [usuario, usuarioAttrs] = defineField('usuario')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
    try {
        await login(values.usuario, values.password)
        alertVisible.value = true

        setTimeout(() => {
            alertVisible.value = false
        }, 3000)

        console.log(user.value);

        resetForm()
        router.push({ name: "pokedex" });
    } catch (error) {
        console.log(error);
    }

})
</script>
