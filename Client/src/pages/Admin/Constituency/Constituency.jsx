import React, {useEffect, useState} from 'react';
import {
	addConstituency,
	deleteConstituency,
	getAllConstituencies,
} from '../../../services/AdminService.jsx';
import './constituency.css';

const Constituency = () => {
	const [name, setName] = useState('');
	const [invalidName, setInvalidName] = useState(true);
	const [province, setProvince] = useState('');
	const [invalidProvince, setInvalidProvince] =
		useState(true);
	const [canton, setCanton] = useState('');
	const [invalidCanton, setInvalidCanton] = useState(true);
	const [recinto, setRecinto] = useState('');
	const [invalidRecinto, setInvalidRecinto] =
		useState(true);
	const [parroquia, setParroquia] = useState('');
	const [invalidParroquia, setInvalidParroquia] =
		useState(true);

	const [junta, setJunta] = useState('');
	const [invalidJunta, setInvalidJunta] = useState(true);
	const [constituencies, setConstituencies] = useState([]);
	const [direccion, setDireccion] = useState('');
	const [invalidDireccion, setInvalidDireccion] =
		useState(true);

	const handleAddConstituency = () => {
		if (name !== '') {
			addConstituency({name: name})
				.then((res) => {
					console.log('added constituency');
					getAllConstituency();
					setName('');
					setProvince('');
					setCanton('');
					setRecinto('');
					setParroquia('');
					setJunta('');
					setDireccion('');
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setInvalidName(true);
			setInvalidProvince(true);
			setInvalidCanton(true);
			setInvalidRecinto(true);
			setInvalidParroquia(true);
			setInvalidJunta(true);
			setInvalidDireccion(true);
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

	useEffect(() => {
		return () => {
			getAllConstituency();
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

		<section className="max-w-4xl p-6 mx-auto bg-blueSecondary rounded-md shadow-md dark:bg-gray-800 mt-8">
			<form>
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
			</form>
		</section>
	);
};

export default Constituency;
