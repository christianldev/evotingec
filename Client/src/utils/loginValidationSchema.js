import * as yup from 'yup';


const loginValidationSchema = yup.object({
    nationalId: yup.string().required('La cédula es requerida')
        .matches(/^[0-9]+$/, "Solo números")
        .min(10, 'Mínimo 10 caracteres')
        .max(10, 'Máximo 10 caracteres'),
    password: yup.string().required('La contraseña es requerida'),
})

export default loginValidationSchema;