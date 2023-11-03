import React, {useEffect, useState} from 'react';
import AddElection from '../../../components/AddElection.jsx';
import './elections.css';
import {
	addElection,
	deleteElection,
	formatDate,
	getAllCandidatesServer,
	getAllConstituencies,
	getAllElections,
	getElectionReportDetails,
	updateElection,
} from '../../../services/AdminService';
import CandidateCard from '../../../components/CandidateCard';
import ProgressComponent from '../../../components/ProgressComponent';
import jsPDF from 'jspdf';
import ElectionReport from '../../../components/ElectionReport';
import ReactDOMServer from 'react-dom/server';

const Elections = (src, options) => {
	let Election = {
		startDate: '',
		endDate: '',
		description: '',
	};
	let Progress = {
		success: false,
		warn: false,
		msg: 'Cargando...',
	};
	const [election, setElection] = useState(Election);
	const [elections, setElections] = useState([]);
	const [constituencies, setConstituencies] = useState([]);
	const [allCandidates, setAllCandidates] = useState([]);
	const [candidates, setCandidates] = useState([]);
	const [eModal, setEModal] = useState('');
	const [showProgress, setShowProgress] = useState(false);
	const [progress, setProgress] = useState(Progress);

	const getElections = () => {
		getAllElections().then((r) => {
			// console.log(r)
			setElections(r.data);
		});
	};

	useEffect(() => {
		return () => {
			getElections();
			getAllConstituencies().then((r) => {
				setConstituencies(r.data);
				setEModal(new bootstrap.Modal('#e-modal'));
			});
			getCandidates();
		};
	}, []);

	const handleAddElection = () => {
		eModal.hide();
		setShowProgress(true);
		if (
			election.endDate !== '' &&
			election.startDate !== '' &&
			election.description !== ''
		) {
			setProgress({
				...progress,
				msg: 'Agregando eleccion...',
			});
			addElection(election).then((r) => {
				if (r) {
					setProgress({
						...progress,
						success: true,
						msg: 'Elección agregada exitosamente',
					});
					getElections();
					closeProgress();
				} else {
					setProgress({
						...progress,
						warn: true,
						msg: 'Error al agregar elección',
					});
				}
			});
		} else {
			setProgress({
				...progress,
				warn: true,
				msg: 'Falta llenar los detalles',
			});
		}
	};

	function closeProgress() {
		setProgress(Progress);
		setShowProgress(false);
	}

	const getCandidates = () => {
		getAllCandidatesServer().then((r) => {
			setAllCandidates(r.data);
		});
	};

	const handleViewCandidates = (eId) => {
		const candidateModal = new bootstrap.Modal('#c-modal');

		setCandidates(
			allCandidates.filter((c, i) => c.electionId === eId)
		);
		candidateModal.show();
		// console.log(
		// 	allCandidates.filter((c, i) => {
		// 		console.log(c, eId);
		// 		return c.electionId === eId;
		// 	})
		// );
	};

	const onUpdateElection = (e) => {
		updateElection(e).then((r) => {
			getElections();
		});
	};

	const handleDeleteElection = (id) => {
		deleteElection(id).then((r) => {
			console.log(r);
			if (r.data.status === 'success') {
				getElections();
			}
		});
	};

	const handleGenerateElectionReport = (eId) => {
		getElectionReportDetails(eId).then((r) => {
			console.log(Object.keys(r.e));
			let candidates = allCandidates.filter(
				(c, i) => c.electionId === eId
			);
			const doc = new jsPDF({
				orientation: 'portrait',
				unit: 'pt',
				format: 'a4',
				hotfixes: ['px_scaling'],
				compress: true,
			});
			let docWidth = doc.internal.pageSize.getWidth();
			let election = r.election;
			election = {...election, candidates: candidates};
			election = {...election, votes: r.e['2']};
			console.log(r.e);
			election.voters = r.e['1'];
			console.log(election);
			doc.html(
				ReactDOMServer.renderToString(
					<ElectionReport election={election} />
				),
				{
					autoPaging: 'slice',
					pagesplit: true,
					callback(doc) {
						let pageCount = doc.internal.getNumberOfPages();
						console.log(pageCount);
						for (let i = 2; i <= pageCount; i++) {
							doc.deletePage(i);
						}
						doc.save(`${eId}_report.pdf`);
						// doc.output("dataurlnewwindow");
						// window.open(doc.output('bloburl'));
					},
					width: docWidth - 50,
					windowWidth: 1200,
					x: 20,
					y: 20,
				}
			);
		});
	};

	// function getConstituencyName(id) {
	// 	return constituencies.filter((c, i) => c.id === id)[0]
	// 		?.name;
	// }

	const handleOnAddElection = () => {
		// if (constituencies.length >= 1) {
		// 	eModal.show();
		// } else {
		// 	setShowProgress(true);
		// 	setProgress({
		// 		...progress,
		// 		msg: 'No hay un padron registrado',
		// 		warn: true,
		// 	});
		// }
		eModal.show();
	};

	return (
		<div className="pt-5 mx-auto mb-auto h-full min-h-[84vh] md:pr-2">
			<div className="container-fluid" id="pdf"></div>
			{showProgress ? (
				<ProgressComponent
					success={progress.success}
					warn={progress.warn}
					msg={progress.msg}
					onClose={() => closeProgress()}
				/>
			) : null}

			<button
				type="button"
				className="btn btn-outline-primary m-2"
				onClick={() => handleOnAddElection()}>
				<i className="fa-solid fa-square-poll-vertical"></i>
				&nbsp; Agregar Elección
			</button>
			<div className="container">
				<table className="table table-hover">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Eleccion</th>
							<th scope="col">Candidato</th>
							<th scope="col">Fecha inicio</th>
							<th scope="col">Fecha culminacion</th>
							<th scope="col">Acciones</th>
							<th scope="col">Reporte</th>
						</tr>
					</thead>
					<tbody className="table-group-divider">
						{elections.length < 1 ? (
							<tr>
								<td colSpan="7" className="text-center">
									No hay elecciones registradas
								</td>
							</tr>
						) : (
							elections.map((election, index) => (
								<tr key={index}>
									<th scope="row">{index + 1}</th>
									<td className="election-data">
										{election.electionId}
										<br />
										{/* {getConstituencyName(
											election.constituencyId
										)} */}
										{election.description}
									</td>
									<td className="election-data">
										<button
											className="btn bn-sm btn-dark btn-w-80"
											onClick={() =>
												handleViewCandidates(
													election.electionId
												)
											}>
											<i className="fa-solid fa-eye"></i>{' '}
											Ver
										</button>
									</td>
									<td className="election-data">
										{formatDate(election.startDate)}
									</td>
									<td className="election-data">
										{formatDate(election.endDate)}
									</td>
									<td className="election-data">
										<div className="d-flex">
											{/*<button className="btn btn-sm btn-danger mx-1">STOP</button>*/}

											{election.status ? (
												<button
													className="btn btn-sm btn-danger mx-1 btn-w-80"
													onClick={() =>
														onUpdateElection({
															...election,
															status: false,
														})
													}>
													<i className="fa-solid fa-stop"></i>
													&nbsp; Detener
												</button>
											) : (
												<button
													className="btn btn-sm btn-success mx-1 btn-w-40"
													onClick={() =>
														onUpdateElection({
															...election,
															status: true,
														})
													}>
													<i className="fa-solid fa-play"></i>
													&nbsp; Iniciar
												</button>
											)}

											{election.result ? (
												<button
													className="btn btn-sm btn-info mx-1 "
													onClick={() =>
														onUpdateElection({
															...election,
															result: false,
														})
													}>
													<i className="fa-solid fa-download"></i>
													&nbsp; No publicar
												</button>
											) : null}
											{!election.result ? (
												<button
													className="btn btn-sm btn-warning mx-1 btn-w-40"
													onClick={() =>
														onUpdateElection({
															...election,
															result: true,
														})
													}>
													<i className="fa-solid fa-upload"></i>
													&nbsp; Publicar
												</button>
											) : null}

											<button
												className="btn btn-sm btn-danger mx-1 px-3"
												onClick={() =>
													handleDeleteElection(
														election.electionId
													)
												}>
												<i className="fa-solid fa-trash"></i>
											</button>
										</div>
									</td>
									<td>
										{candidates.length >= 2 ? (
											<button
												className="btn btn-sm btn-outline-primary"
												onClick={() =>
													handleGenerateElectionReport(
														election.electionId
													)
												}
												// target="_blank"
												// to={`/report/${election.electionId}`}
											>
												<i className="fa-solid fa-file-pdf"></i>{' '}
												Generar
											</button>
										) : (
											<button
												className="btn btn-sm btn-outline-primary"
												disabled>
												<i className="fa-solid fa-file-pdf"></i>{' '}
												Generar
											</button>
										)}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			{/* Add Election Modal */}

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
							<AddElection
								// constituencies={constituencies}
								election={election}
								setElection={setElection}
							/>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								onClick={() => eModal.hide()}>
								Close
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => handleAddElection()}>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>

			{/*    Candidates Modal */}
			<div
				className="modal fade"
				id="c-modal"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1
								className="modal-title fs-5"
								id="staticBackdropLabel">
								Candidatos
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body">
							{candidates.length >= 1 ? (
								<div>
									{' '}
									{candidates.map((c, i) => (
										<CandidateCard candidate={c} key={i} />
									))}{' '}
								</div>
							) : (
								<>No hay candidatos registrados</>
							)}
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="bg-gray-800 hover:bg-gray-900 text-gray-300 px-3 py-1 rounded-2"
								data-bs-dismiss="modal">
								Cerrar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Elections;
