import React, {useState} from 'react';
import {adminLogin} from '../services/AdminService';

const AdminLogin = (props) => {
	const [uName, setUName] = useState('admin');
	const [pwd, setPwd] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [progress, setProgress] = useState(false);
	const handleLogin = () => {
		setProgress(true);
		setErrorMsg('');
		if (uName !== '' && pwd !== '') {
			adminLogin({pwd: pwd})
				.then((r) => {
					if (parseInt(r)) {
						props.onLogin(r);
					} else {
						setProgress(false);
						setErrorMsg('Incorrect Password');
					}
				})
				.catch((err) => {
					setProgress(false);
					setErrorMsg('Unable to connect with blockchain');
					console.log(err);
				});
		} else {
			setProgress(false);
			setErrorMsg('fill all the fields');
		}
	};
	return (
		<div className=" antialiased relative text-sm font-normal">
			<div className="text-gray-800 dark:text-white-dark min-h-screen">
				<div className="flex justify-center items-center min-h-screen bg-cover bg-center">
					<div className=" sm:w-[480px] m-6 max-w-lg w-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-xl p-10">
						<div className="font-bold text-2xl mb-3">
							Bienvenido, Administrador
						</div>
						<form className="space-y-5">
							<div className="form-floating mb-3">
								<input
									type="text"
									className="form-control"
									id="floatingInput"
									placeholder="national id"
									value={uName}
									onChange={(event) =>
										setUName(event.target.value)
									}
									disabled
								/>
								<label htmlFor="floatingInput">
									User name
								</label>
							</div>
							<div className="form-floating">
								<input
									type="password"
									className="form-control"
									id="floatingPassword"
									placeholder="Password"
									value={pwd}
									onChange={(event) =>
										setPwd(event.target.value)
									}
								/>
								<label htmlFor="floatingPassword">
									Password
								</label>
							</div>
							<div className="d-flex flex-column align-items-center small text-danger mt-2">
								{progress ? <progress></progress> : null}
								{errorMsg}
							</div>
							<div className="d-flex justify-content-end">
								<button
									type="button"
									className="btn bg-blue-600 text-gray-200 w-full hover:text-gray-200 hover:bg-blue-700 mt-3"
									onClick={() => handleLogin()}>
									Iniciar sesion
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
