import React, {useState} from 'react';

const LoginComponent = ({register, onLogin}) => {
	let Login = {nationalId: '', password: ''};
	const [login, setLogin] = useState(Login);

	return (
		<div className="container-fluid">
			<div className="container">
				<div className="h1 mb-4 mt-3 fw-bold">
					Bienvenido
				</div>

				<div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="floatingInput"
						placeholder="national id"
						value={login.nationalId}
						onChange={(event) =>
							setLogin({
								...login,
								nationalId: event.target.value,
							})
						}
					/>
					<label htmlFor="floatingInput">Cedula</label>
				</div>
				<div className="form-floating">
					<input
						type="password"
						className="form-control"
						id="floatingPassword"
						placeholder="Password"
						value={login.password}
						onChange={(event) =>
							setLogin({
								...login,
								password: event.target.value,
							})
						}
					/>
					<label htmlFor="floatingPassword">
						Contraseña
					</label>
				</div>
				<div className="d-flex justify-content-end">
					<button
						type="button"
						className="btn bg-blue-600 mt-3 text-gray-200 hover:bg-blue-700 hover:text-gray-100 w-full"
						onClick={() => onLogin(login)}>
						Iniciar sesion
					</button>
				</div>
				<div className="reg-txt">
					No tienes una cuenta?
					<button
						type="button"
						className="btn btn-link"
						onClick={() => register()}>
						Registrarse
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginComponent;
