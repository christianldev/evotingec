import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import loginValidationSchema from '../utils/loginValidationSchema';

const LoginComponent = ({onRegister, onLogin}) => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({
		resolver: yupResolver(loginValidationSchema),
	});

	return (
		<div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
			<div className="mb-2.5 text-4xl font-bold text-dark">
				Bienvenido
			</div>

			<form onSubmit={handleSubmit(onLogin)}>
				<div className="mb-3">
					<label
						className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
						htmlFor="floatingInput">
						Cedula*
					</label>
					<input
						type="text"
						className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
						id="floatingInput"
						placeholder="Cedula"
						{...register('nationalId')}
					/>
				</div>
				<div className="mb-3">
					<label
						className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
						htmlFor="floatingPassword">
						Contraseña*
					</label>
					<input
						type="password"
						className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
						id="floatingPassword"
						placeholder="Contraseña"
						{...register('password')}
					/>
				</div>
				<div className="mb-4 flex items-center justify-between px-2">
					<div className="flex items-center">
						<input
							type="checkbox"
							className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
      justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
      checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400 undefined"
							name="weekly"
						/>
						<p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
							Manternerme conectado
						</p>
					</div>
					<a
						className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
						href=" ">
						Contraseña olvidada?
					</a>
				</div>
				{errors.nationalId || errors.password ? (
					<p className="text-red-500 text-xs flex justify-center items-center">
						{errors.nationalId?.message ||
							errors.password?.message}
					</p>
				) : (
					''
				)}
				<div className="d-flex justify-content-end">
					<button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
						Iniciar sesion
					</button>
				</div>
			</form>
			<div className="mt-2">
				<span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
					No tienes una cuenta?
				</span>
				<button
					onClick={() => onRegister()}
					className="ml-1 text-sm font-medium text-brand-500
					hover:text-brand-600 dark:text-white">
					Registrarse
				</button>
			</div>
		</div>
	);
};

export default LoginComponent;
