import React, {useEffect, useState} from 'react';
import {
	addConstituency,
	deleteConstituency,
	getAllConstituencies,
} from '../../../services/AdminService.jsx';
import './constituency.css';
import ProgressComponent from '../../../components/ProgressComponent.jsx';

const Constituency = () => {
	let Progress = {
		success: false,
		warn: false,
		msg: 'Cargando...',
	};
	const [name, setName] = useState('');

	const [constituencies, setConstituencies] = useState([]);
	const [showProgress, setShowProgress] = useState(false);
	const [eModal, setEModal] = useState('');
	const [progress, setProgress] = useState(Progress);

	const handleAddConstituency = () => {
		eModal.hide();
		setShowProgress(true);
		if (name !== '') {
			setProgress({
				...progress,
				msg: 'Agregando padrón electoral',
			});
			addConstituency({name: name})
				.then((res) => {
					getAllConstituency();
					setName('');
					setProvince('');
					setCanton('');
					setRecinto('');
					setParroquia('');
					setJunta('');
					setDireccion('');
					closeProgress();
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setProgress({
				...progress,
				warn: true,
				msg: 'Falta llenar campos',
			});
		}
	};

	function getAllConstituency() {
		getAllConstituencies()
			.then((r) => {
				setConstituencies(r.data);
				// console.log(r.data)
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function deleteConst(id) {
		console.log(id);
		deleteConstituency(id)
			.then((r) => {
				getAllConstituency();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function closeProgress() {
		setProgress(Progress);
		setShowProgress(false);
	}

	useEffect(() => {
		return () => {
			getAllConstituencies().then((r) => {
				setConstituencies(r.data);
				setEModal(new bootstrap.Modal('#e-modal'));
			});
		};
	}, []);

	return (
		// <div className="container-fluid">
		// 	<div className="container my-2">
		// 		<table className="table mt-3 px-2">
		// 			<thead>
		// 				<tr>
		// 					<th scope="col">Nombre</th>
		// 					<th scope="col">Recinto</th>
		// 					<th scope="col">Direccion</th>
		// 					<th scope="col">Provincia</th>
		// 					<th scope="col">Canton</th>
		// 					<th scope="col">Parroquia</th>
		// 					<th scope="col">Junta</th>
		// 					<th scope="col">Accion</th>
		// 				</tr>
		// 			</thead>
		// 			<tbody>
		// 				<tr className="bg-body-tertiary">
		// 					<td valign={'middle'}>
		// 						<div>
		// 							<input
		// 								type="text"
		// 								className={
		// 									invalidName
		// 										? 'form-control'
		// 										: 'form-control is-invalid'
		// 								}
		// 								id="exampleFormControlInput1"
		// 								value={name}
		// 								onChange={(event) => {
		// 									setName(event.target.value);
		// 									event.target.value.length === 0
		// 										? setInvalidName(true)
		// 										: null;
		// 								}}
		// 								placeholder="Nombre de distrito"
		// 							/>
		// 							<div
		// 								id="validationServer03Feedback"
		// 								className="invalid-feedback">
		// 								Ingrese un nombre
		// 							</div>
		// 						</div>
		// 					</td>
		// 					<td valign={'middle'}>
		// 						<div>
		// 							<input
		// 								type="text"
		// 								className={
		// 									invalidRecinto
		// 										? 'form-control'
		// 										: 'form-control is-invalid'
		// 								}
		// 								id="exampleFormControlInput1"
		// 								value={recinto}
		// 								onChange={(event) => {
		// 									setRecinto(event.target.value);
		// 									event.target.value.length === 0
		// 										? setInvalidRecinto(true)
		// 										: null;
		// 								}}
		// 								placeholder="Recinto"
		// 							/>
		// 							<div
		// 								id="validationServer03Feedback"
		// 								className="invalid-feedback">
		// 								Ingrese un recinto
		// 							</div>
		// 						</div>
		// 					</td>
		// 					<td valign={'middle'}>
		// 						<div>
		// 							<input
		// 								type="text"
		// 								className={
		// 									invalidDireccion
		// 										? 'form-control'
		// 										: 'form-control is-invalid'
		// 								}
		// 								id="exampleFormControlInput1"
		// 								value={direccion}
		// 								onChange={(event) => {
		// 									setDireccion(event.target.value);
		// 									event.target.value.length === 0
		// 										? setInvalidDireccion(true)
		// 										: null;
		// 								}}
		// 								placeholder="Direccion"
		// 							/>
		// 							<div
		// 								id="validationServer03Feedback"
		// 								className="invalid-feedback">
		// 								Ingrese una direccion
		// 							</div>
		// 						</div>
		// 					</td>
		// 					<td valign={'middle'}>
		// 						<div>
		// 							<input
		// 								type="text"
		// 								className={
		// 									invalidProvince
		// 										? 'form-control'
		// 										: 'form-control is-invalid'
		// 								}
		// 								id="exampleFormControlInput1"
		// 								value={province}
		// 								onChange={(event) => {
		// 									setProvince(event.target.value);
		// 									event.target.value.length === 0
		// 										? setInvalidProvince(true)
		// 										: null;
		// 								}}
		// 								placeholder="Provincia"
		// 							/>
		// 							<div
		// 								id="validationServer03Feedback"
		// 								className="invalid-feedback">
		// 								Ingrese una provincia
		// 							</div>
		// 						</div>
		// 					</td>

		// 					<td valign={'middle'}>
		// 						<div>
		// 							<input
		// 								type="text"
		// 								className={
		// 									invalidCanton
		// 										? 'form-control'
		// 										: 'form-control is-invalid'
		// 								}
		// 								id="exampleFormControlInput1"
		// 								value={canton}
		// 								onChange={(event) => {
		// 									setProvince(event.target.value);
		// 									event.target.value.length === 0
		// 										? setInvalidCanton(true)
		// 										: null;
		// 								}}
		// 								placeholder="Canton"
		// 							/>
		// 							<div
		// 								id="validationServer03Feedback"
		// 								className="invalid-feedback">
		// 								Ingrese un canton
		// 							</div>
		// 						</div>
		// 					</td>
		// 					<td valign={'middle'}>
		// 						<div>
		// 							<input
		// 								type="text"
		// 								className={
		// 									invalidParroquia
		// 										? 'form-control'
		// 										: 'form-control is-invalid'
		// 								}
		// 								id="exampleFormControlInput1"
		// 								value={parroquia}
		// 								onChange={(event) => {
		// 									setParroquia(event.target.value);
		// 									event.target.value.length === 0
		// 										? setInvalidParroquia(true)
		// 										: null;
		// 								}}
		// 								placeholder="parroquia"
		// 							/>
		// 							<div
		// 								id="validationServer03Feedback"
		// 								className="invalid-feedback">
		// 								Ingrese un parroquia
		// 							</div>
		// 						</div>
		// 					</td>

		// 					<td valign={'middle'}>
		// 						<div>
		// 							<input
		// 								type="text"
		// 								className={
		// 									invalidJunta
		// 										? 'form-control'
		// 										: 'form-control is-invalid'
		// 								}
		// 								id="exampleFormControlInput1"
		// 								value={junta}
		// 								onChange={(event) => {
		// 									setJunta(event.target.value);
		// 									event.target.value.length === 0
		// 										? setInvalidJunta(true)
		// 										: null;
		// 								}}
		// 								placeholder="junta"
		// 							/>
		// 							<div
		// 								id="validationServer03Feedback"
		// 								className="invalid-feedback">
		// 								Ingrese una junta
		// 							</div>
		// 						</div>
		// 					</td>

		// 					<td valign={'middle'}>
		// 						<button
		// 							className="btn btn-sm btn-outline-success btn-w-80"
		// 							onClick={() => handleAddConstituency()}>
		// 							<i className="fa-solid fa-plus"></i>&nbsp;
		// 							Guardar
		// 						</button>
		// 					</td>
		// 				</tr>
		// 				{constituencies.map((item, index) => (
		// 					<tr key={index}>
		// 						<th scope="row">{index + 1}</th>
		// 						<td>{item.name}</td>
		// 						<td>
		// 							<button
		// 								className="btn btn-sm btn-danger btn-w-80"
		// 								onClick={() => deleteConst(item.id)}>
		// 								<i className="fa-regular fa-trash-can"></i>
		// 								&nbsp; DELETE
		// 							</button>
		// 						</td>
		// 					</tr>
		// 				))}
		// 			</tbody>
		// 		</table>
		// 	</div>
		// </div>

		<section className="mx-auto items-center justify-between dark:bg-gray-800 mt-8">
			{/* <form>
				<div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
					<div>
						<label
							className="text-white dark:text-gray-200"
							for="username">
							Username
						</label>
						<input
							id="username"
							type="text"
							className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
						/>
					</div>

					<div>
						<label
							className="text-white dark:text-gray-200"
							for="emailAddress">
							Email Address
						</label>
						<input
							id="emailAddress"
							type="email"
							className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
						/>
					</div>

					<div>
						<label
							className="text-white dark:text-gray-200"
							for="password">
							Password
						</label>
						<input
							id="password"
							type="password"
							className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
						/>
					</div>

					<div>
						<label
							className="text-white dark:text-gray-200"
							for="passwordConfirmation">
							Password Confirmation
						</label>
						<input
							id="passwordConfirmation"
							type="password"
							className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
						/>
					</div>
					<div>
						<label
							className="text-white dark:text-gray-200"
							for="passwordConfirmation">
							Color
						</label>
						<input
							id="color"
							type="color"
							className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
						/>
					</div>
					<div>
						<label
							className="text-white dark:text-gray-200"
							for="passwordConfirmation">
							Select
						</label>
						<select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
							<option>Surabaya</option>
							<option>Jakarta</option>
							<option>Tangerang</option>
							<option>Bandung</option>
						</select>
					</div>

					<div>
						<label
							className="text-white dark:text-gray-200"
							for="passwordConfirmation">
							Date
						</label>
						<input
							id="date"
							type="date"
							className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
						/>
					</div>
					<div>
						<label
							className="text-white dark:text-gray-200"
							for="passwordConfirmation">
							Text Area
						</label>
						<textarea
							id="textarea"
							type="textarea"
							className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
					</div>
				</div>

				<div className="flex justify-end mt-6">
					<button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
						Save
					</button>
				</div>
			</form> */}
			{showProgress ? (
				<ProgressComponent
					success={progress.success}
					warn={progress.warn}
					msg={progress.msg}
					onClose={() => closeProgress()}
				/>
			) : null}
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
					<div>
						<button
							className="inline-flex items-center text-gray-500 bg-blueSecondary border  focus:outline-none hover:bg-blue-600 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
							onClick={() => handleAddConstituency()}>
							Agregar padrón
							<svg
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								className="w-5 h-5 ml-2"
								viewBox="0,0,256,256">
								<g fill="#ffffff" fillRule="nonzero">
									<g transform="scale(5.12,5.12)">
										<path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM24,13v11h-11v2h11v11h2v-11h11v-2h-11v-11z"></path>
									</g>
								</g>
							</svg>
						</button>
					</div>
					<label htmlFor="table-search" className="sr-only">
						Search
					</label>
					<div className="relative">
						<input
							type="text"
							id="table-search-users"
							className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Buscar padron electoral"
						/>
					</div>
				</div>
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-4 py-3">
								Recinto
							</th>
							<th scope="col" className="px-4 py-3">
								Direccion
							</th>
							<th scope="col" className="px-4 py-3">
								Provincia
							</th>
							<th scope="col" className="px-4 py-3">
								Cantón
							</th>
							<th scope="col" className="px-4 py-3">
								Parroquia
							</th>
							<th scope="col" className="px-4 py-3">
								Junta
							</th>
							<th scope="col" className="px-4 py-3">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody>
						{constituencies.map((item) => (
							<tr
								key={item.id}
								className="bg-white text-xs text-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<th className="px-3 py-2">
									{item.enclosure}
								</th>

								<td className="px-3 py-2">
									{item.address}
								</td>
								<td className="px-3 py-2">
									{item.province}
								</td>
								<td className="px-3 py-2">
									{item.district}
								</td>
								<td className="px-3 py-2">{item.parish}</td>
								<td className="px-3 py-2">
									<div className="flex items-center">
										{item.council} -{' '}
										{item.councilGender === 'Masculino'
											? 'M'
											: 'F'}
									</div>
								</td>
								<td className="px-3 py-4">
									<div className="flex items-center space-x-4 text-sm">
										<a
											href="#"
											type="button"
											data-modal-show="editUserModal"
											className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
											Editar
										</a>
										<button
											onClick={() => deleteConst(item.id)}
											type="button"
											data-modal-show="editUserModal"
											className="font-medium text-blue-600
											dark:text-blue-500 hover:underline
											ml-2">
											{' '}
											Eliminar
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{/* Add Constituency Modal */}

				<div
					className="modal fade"
					data-bs-backdrop="static"
					data-bs-keyboard="false"
					tabIndex="-1"
					id="e-modal"
					aria-labelledby="staticBackdropLabel"
					aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1
									className="modal-title fs-5"
									id="staticBackdropLabel">
									Agregar Eleccion
								</h1>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal">
									X
								</button>
							</div>
							<div className="modal-body">
								<div className="mb-3">
									<label htmlFor="name">Nombre</label>
									<input
										type="text"
										className="form-control"
										id="name"
										placeholder="Nombre de eleccion"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</div>
							</div>

							<div className="modal-footer">
								<button
									type="button"
									className="bg-gray-600 hover:bg-gray-800 text-white px-3 py-1 rounded-2"
									data-bs-dismiss="modal"
									onClick={() => eModal.hide()}>
									Cerrar
								</button>
								<button
									type="button"
									className="bg-blueSecondary hover:bg-blue-700 text-white px-3 py-1 rounded-2"
									onClick={() => handleAddElection()}>
									Guardar
								</button>
							</div>
						</div>
					</div>
				</div>

				<div
					id="editUserModal"
					tabIndex="-1"
					aria-hidden="true"
					className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
					<div className="relative w-full max-w-2xl max-h-full">
						<form
							action="#"
							className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
									Editar
								</h3>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
									Eliminar
								</h3>
								<button
									type="button"
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-hide="editUserModal">
									<svg
										className="w-3 h-3"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 14">
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
										/>
									</svg>
									<span className="sr-only">
										Close modal
									</span>
								</button>
							</div>

							<div className="p-6 space-y-6">
								<div className="grid grid-cols-6 gap-6">
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="first-name"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											First Name
										</label>
										<input
											type="text"
											name="first-name"
											id="first-name"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Bonnie"
											required=""
										/>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="last-name"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Last Name
										</label>
										<input
											type="text"
											name="last-name"
											id="last-name"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Green"
											required=""
										/>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="email"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Email
										</label>
										<input
											type="email"
											name="email"
											id="email"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="example@company.com"
											required=""
										/>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="phone-number"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Phone Number
										</label>
										<input
											type="number"
											name="phone-number"
											id="phone-number"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="e.g. +(12)3456 789"
											required=""
										/>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="department"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Department
										</label>
										<input
											type="text"
											name="department"
											id="department"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Development"
											required=""
										/>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="company"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Company
										</label>
										<input
											type="number"
											name="company"
											id="company"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="123456"
											required=""
										/>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="current-password"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Current Password
										</label>
										<input
											type="password"
											name="current-password"
											id="current-password"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="••••••••"
											required=""
										/>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="new-password"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											New Password
										</label>
										<input
											type="password"
											name="new-password"
											id="new-password"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="••••••••"
											required=""
										/>
									</div>
								</div>
							</div>

							<div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
								<button
									type="submit"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
									Save all
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Constituency;
