import React, {useEffect, useState} from 'react';
import {
	addConstituency,
	deleteConstituency,
	getAllConstituencies,
	getAllGenres,
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

	const [genreId, setGenreId] = useState('');
	const [invalidGenreId, setInvalidGenreId] =
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

	function getGenres() {
		getAllGenres()
			.then((r) => {
				setGenreId(r.data);
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
			getGenres();
		};
	}, []);

	console.log(genreId);

	return (
		<div className="container-fluid">
			<div className="container my-2">
				<table className="table mt-3 px-2">
					<thead>
						<tr>
							<th scope="col">Nombre</th>
							<th scope="col">Recinto</th>
							<th scope="col">Direccion</th>
							<th scope="col">Provincia</th>
							<th scope="col">Canton</th>
							<th scope="col">Parroquia</th>
							<th scope="col">Junta</th>
							<th scope="col">Genero</th>
							<th scope="col">Accion</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-body-tertiary">
							<td valign={'middle'}>
								<div>
									<input
										type="text"
										className={
											invalidName
												? 'form-control'
												: 'form-control is-invalid'
										}
										id="exampleFormControlInput1"
										value={name}
										onChange={(event) => {
											setName(event.target.value);
											event.target.value.length === 0
												? setInvalidName(true)
												: null;
										}}
										placeholder="Nombre de distrito"
									/>
									<div
										id="validationServer03Feedback"
										className="invalid-feedback">
										Ingrese un nombre
									</div>
								</div>
							</td>
							<td valign={'middle'}>
								<div>
									<input
										type="text"
										className={
											invalidRecinto
												? 'form-control'
												: 'form-control is-invalid'
										}
										id="exampleFormControlInput1"
										value={recinto}
										onChange={(event) => {
											setRecinto(event.target.value);
											event.target.value.length === 0
												? setInvalidRecinto(true)
												: null;
										}}
										placeholder="Recinto"
									/>
									<div
										id="validationServer03Feedback"
										className="invalid-feedback">
										Ingrese un recinto
									</div>
								</div>
							</td>
							<td valign={'middle'}>
								<div>
									<input
										type="text"
										className={
											invalidDireccion
												? 'form-control'
												: 'form-control is-invalid'
										}
										id="exampleFormControlInput1"
										value={direccion}
										onChange={(event) => {
											setDireccion(event.target.value);
											event.target.value.length === 0
												? setInvalidDireccion(true)
												: null;
										}}
										placeholder="Direccion"
									/>
									<div
										id="validationServer03Feedback"
										className="invalid-feedback">
										Ingrese una direccion
									</div>
								</div>
							</td>
							<td valign={'middle'}>
								<div>
									<input
										type="text"
										className={
											invalidProvince
												? 'form-control'
												: 'form-control is-invalid'
										}
										id="exampleFormControlInput1"
										value={province}
										onChange={(event) => {
											setProvince(event.target.value);
											event.target.value.length === 0
												? setInvalidProvince(true)
												: null;
										}}
										placeholder="Provincia"
									/>
									<div
										id="validationServer03Feedback"
										className="invalid-feedback">
										Ingrese una provincia
									</div>
								</div>
							</td>

							<td valign={'middle'}>
								<div>
									<input
										type="text"
										className={
											invalidCanton
												? 'form-control'
												: 'form-control is-invalid'
										}
										id="exampleFormControlInput1"
										value={canton}
										onChange={(event) => {
											setProvince(event.target.value);
											event.target.value.length === 0
												? setInvalidCanton(true)
												: null;
										}}
										placeholder="Canton"
									/>
									<div
										id="validationServer03Feedback"
										className="invalid-feedback">
										Ingrese un canton
									</div>
								</div>
							</td>
							<td valign={'middle'}>
								<div>
									<input
										type="text"
										className={
											invalidParroquia
												? 'form-control'
												: 'form-control is-invalid'
										}
										id="exampleFormControlInput1"
										value={parroquia}
										onChange={(event) => {
											setParroquia(event.target.value);
											event.target.value.length === 0
												? setInvalidParroquia(true)
												: null;
										}}
										placeholder="parroquia"
									/>
									<div
										id="validationServer03Feedback"
										className="invalid-feedback">
										Ingrese un parroquia
									</div>
								</div>
							</td>

							<td valign={'middle'}>
								<div>
									<input
										type="text"
										className={
											invalidJunta
												? 'form-control'
												: 'form-control is-invalid'
										}
										id="exampleFormControlInput1"
										value={junta}
										onChange={(event) => {
											setJunta(event.target.value);
											event.target.value.length === 0
												? setInvalidJunta(true)
												: null;
										}}
										placeholder="junta"
									/>
									<div
										id="validationServer03Feedback"
										className="invalid-feedback">
										Ingrese una junta
									</div>
								</div>
							</td>

							<td valign={'middle'}>
								<div>
									<select className="form-select">
										<option value="1">Masculino</option>
										<option value="2">Femenino</option>
									</select>
								</div>
							</td>
							<td valign={'middle'}>
								<button
									className="btn btn-sm btn-outline-success btn-w-80"
									onClick={() => handleAddConstituency()}>
									<i className="fa-solid fa-plus"></i>&nbsp;
									Guardar
								</button>
							</td>
						</tr>
						{constituencies.map((item, index) => (
							<tr key={index}>
								<th scope="row">{index + 1}</th>
								<td>{item.name}</td>
								<td>
									<button
										className="btn btn-sm btn-danger btn-w-80"
										onClick={() => deleteConst(item.id)}>
										<i className="fa-regular fa-trash-can"></i>
										&nbsp; DELETE
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Constituency;
