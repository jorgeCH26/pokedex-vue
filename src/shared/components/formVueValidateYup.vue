<template>
    <Form @submit="onSubmit">
        <div>
            <label>Nombre:</label>
            <Field name="name" as="input" />
            <ErrorMessage name="name" />
        </div>

        <div>
            <label>Correo:</label>
            <Field name="email" as="input" type="email" />
            <ErrorMessage name="email" />
        </div>

        <div>
            <label>Contraseña:</label>
            <Field name="password" as="input" type="password" />
            <ErrorMessage name="password" />
        </div>

        <button type="submit">Enviar</button>
    </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
    password: yup
        .string()
        .min(8, 'Debe tener al menos 8 caracteres')
        .matches(/[A-Z]/, 'Debe tener una mayúscula')
        .matches(/[a-z]/, 'Debe tener una minúscula')
        .matches(/[0-9]/, 'Debe tener un número')
        .matches(/[@$!%*?&]/, 'Debe tener un carácter especial')
        .required('La contraseña es obligatoria'),
})

function onSubmit(values) {
    console.log('Datos enviados:', values)
}
</script>
