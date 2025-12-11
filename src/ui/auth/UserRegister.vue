<template>
    <div class="flex items-center justify-center p-4 mt-12">
        <div class="bg-white rounded-xl shadow-2xl p-10 w-full max-w-lg">
            <h2 class="text-3xl font-extrabold text-center text-blue-700 mb-8">Crear Cuenta</h2>

            <n-form @submit.prevent="onSubmit">
                <n-form-item label="Nombre completo" :feedback="errors.name"
                    :validation-status="errors.name ? 'error' : 'success'">
                    <n-input v-model:value="name" v-bind="nameAttrs" placeholder="Nombre completo" clearable />
                </n-form-item>

                <n-form-item label="Correo electrónico" :feedback="errors.email"
                    :validation-status="errors.email ? 'error' : 'success'">
                    <n-input v-model:value="email" v-bind="emailAttrs" placeholder="Correo electrónico" clearable />
                </n-form-item>

                <n-form-item label="Contraseña" :feedback="errors.password"
                    :validation-status="errors.password ? 'error' : 'success'">
                    <n-input type="password" v-model:value="password" v-bind="passwordAttrs" placeholder="Contraseña"
                        clearable />
                </n-form-item>


                <div class="flex justify-center mt-8">
                    <n-button type="primary" attr-type="submit" class="px-8 py-2" :disabled="!meta.valid || meta.dirty">
                        Registrarse
                    </n-button>
                </div>
            </n-form>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { useAuthLoginAxios } from '../pokedex/composables/useLoging'
import { useRouter } from 'vue-router'

const { createUser, user } = useAuthLoginAxios();
const router = useRouter();
const schema = toTypedSchema(
    yup.object({
        name: yup.string().required('El nombre es obligatorio'),
        email: yup
            .string()
            .required('El correo es obligatorio')
            .matches(
                /^[^@]+@[^@]+\.[^@]+$/,
                'El correo debe contener un "@" y un dominio válido'
            ),
        password: yup
            .string()
            .required('La contraseña es obligatoria')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                'Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo'
            ),
    })
)


const { errors, defineField, handleSubmit, resetForm, meta } = useForm({
    validationSchema: schema,
    initialValues: {
        name: '',
        email: '',
        password: '',
    },
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
    try {

        await createUser(values)

        console.log(user.value);

        resetForm()
        router.push({ name: "pokedex" });
    } catch (error) {
        console.error('Error al registrar usuario:', error)
        alert('Error al registrar usuario, intenta de nuevo.')
    }
})
</script>
