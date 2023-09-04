import React, {useEffect, useState} from 'react';
import {
	getAllCandidatesServer,
	getAllConstituencies,
} from '../../services/AdminService';
import CandidateCard from '../../components/CandidateCard';
import {
	checkIsVoter,
	getActiveElectionsUser,
	getUser,
	hasVotingEnded,
	verifyAge,
	vote,
} from '../../services/VoterService';
import './userpage.css';
import user_image from '../../assets/images/user.png';
import web3Service from '../../services/Web3Service';
import ProgressComponent from '../../components/ProgressComponent';
import ResultPage from '../Admin/Results/Result';
import Web3 from 'web3';

const UserPage = () => {
	let user = {
		id: 1,
		userId: '',
		fName: '',
		nationalId: '',
		email: '',
		createdAt: '',
		updatedAt: '',
		constituencyId: '',
	};
	let Progress = {
		msg: 'Cargando...',
		success: false,
		warn: false,
	};
	const [isVoter, setIsVoter] = useState(false);
	const [election, setElection] = useState('');
	const [elections, setElections] = useState([]);
	const [constituencies, setConstituencies] = useState([]);
	const [allCandidates, setAllCandidates] = useState([]);
	const [candidates, setCandidates] = useState([]);
	const [userDetails, setUserDetails] = useState(user);
	const [progress, setProgress] = useState(Progress);
	const [showProgress, setShowProgress] = useState(false);

	const getCandidates = () => {
		getAllCandidatesServer().then((r) => {
			setAllCandidates(r.data);
		});
	};

	const getUserDetails = (uid) => {
		getUser(uid).then((u) => {
			setUserDetails(u.data);
			getActiveElectionsUser(u.data).then((e) => {
				setElections(e);
				if (e.length === 0)
					setProgress({
						...progress,
						msg: 'No active elections for your constituency.!!!',
					});
			});
		});
	};

	useEffect(() => {
		return () => {
			setProgress({
				...progress,
				msg: 'Checking is Voter...',
			});
			checkIsVoter()
				.then((v) => {
					setIsVoter(v);

					if (v) {
						new web3Service()
							.getCurrentAccount()
							.then((a) => {
								getUserDetails(a);
								getAllConstituencies().then((r) => {
									setConstituencies(r.data);
								});
								getCandidates();
							});
					} else {
						setProgress({
							...progress,
							msg: 'Only voters have access to this page',
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};
	}, []);

	const handleViewCandidates = (eId) => {
		const candidateModal = new bootstrap.Modal('#c-modal');
		setElection(eId);
		setCandidates(
			allCandidates.filter((c, i) => c.electionId === eId)
		);
		candidateModal.show();

		console.log(
			allCandidates.filter((c, i) => {
				return c.electionId === eId;
			})
		);
	};

	function closeProgress() {
		setProgress(Progress);
		setShowProgress(false);
	}

	const handleVote = async (cId) => {
		setShowProgress(true);
		setProgress({...progress, msg: 'Votando'});
		document.getElementById('ca-modal').click();
		const diferenciaAnios = ObtainAge(userDetails);

		// convert endDate to unix timestamp
		const endDate = new Date(elections[0].endDate);
		const votingEndTime = endDate.getTime() / 1000;

		const result = await verifyAge(diferenciaAnios);
		// const EndVotation = await hasVotingEnded(votingEndTime);

		// console.log(EndVotation);
		if (!result) {
			setProgress({
				...progress,
				msg: 'No es mayor de edad',
				warn: true,
			});
			let i = setInterval(() => {
				closeProgress();
				clearInterval(i);
			}, 5000);
			return;
		}
		// else if (EndVotation) {
		// 	setProgress({
		// 		...progress,
		// 		msg: 'La votación ha terminado',
		// 		warn: true,
		// 	});
		// 	let i = setInterval(() => {
		// 		closeProgress();
		// 		clearInterval(i);
		// 	}, 5000);
		// 	return;
		// }

		vote(cId, election)
			.then((r) => {
				console.log(r);
				setProgress({
					...progress,
					msg: 'Voto exitoso',
					success: true,
				});
				let i = setInterval(() => {
					closeProgress();
					clearInterval(i);
				}, 5000);
			})
			.catch((err) => {
				console.log(err);
				setProgress({
					...progress,
					msg: 'Error al votar',
					warn: true,
				});
			});
	};
	const handleLogout = () => {
		window.location.replace('/');
	};

	const ObtainAge = (userDetails) => {
		const {birthDate} = userDetails;
		const fechaNacimiento = new Date(birthDate);
		const fechaActual = new Date();

		// Convertir ambas fechas a UTC
		const fechaNacimientoUTC = new Date(
			fechaNacimiento.getUTCFullYear(),
			fechaNacimiento.getUTCMonth(),
			fechaNacimiento.getUTCDate(),
			fechaNacimiento.getUTCHours(),
			fechaNacimiento.getUTCMinutes(),
			fechaNacimiento.getUTCSeconds()
		);

		const fechaActualUTC = new Date(
			fechaActual.getUTCFullYear(),
			fechaActual.getUTCMonth(),
			fechaActual.getUTCDate(),
			fechaActual.getUTCHours(),
			fechaActual.getUTCMinutes(),
			fechaActual.getUTCSeconds()
		);

		// Calcular la diferencia en años
		const diferenciaAnios =
			fechaActualUTC.getUTCFullYear() -
			fechaNacimientoUTC.getUTCFullYear();

		return diferenciaAnios;
	};

	return (
		<>
			{isVoter === true ? (
				<div className="container-fluid m-0 p-0 bg-body-tertiary user-page">
					{showProgress ? (
						<ProgressComponent
							onClose={() => closeProgress()}
							success={progress.warn}
							msg={progress.msg}
							warn={progress.warn}
						/>
					) : null}
					<nav className="navbar navbar-expand-lg bg-primary shadow-lg">
						<div className="container-fluid">
							<span className="navbar-brand text-white">
								Decide Ya
							</span>
							<div className="d-flex justify-content-center align-items-center">
								<div className="usr-details d-flex flex-column justify-content-center align-items-end pe-2">
									<span className="uname text-white">
										{userDetails.fName}
									</span>
									<span className="fst-italic uid">
										{userDetails.userId}
									</span>
								</div>
								<div className="usr-img fs-3 me-3">
									<img
										className="img border rounded-circle border-warning"
										src={user_image}
										alt="user image"
										width="40"
										height="40"
									/>
								</div>
								<button
									className="btn btn-sm btn-warning"
									onClick={() => handleLogout()}>
									<i className="fa-solid fa-right-from-bracket"></i>{' '}
									Logout
								</button>
							</div>
						</div>
					</nav>

					<div className="container mt-3">
						<ul
							className="nav nav-pills mb-3"
							id="pills-tab"
							role="tablist">
							<li className="nav-item" role="presentation">
								<button
									className="nav-link active"
									id="pills-home-tab"
									data-bs-toggle="pill"
									data-bs-target="#pills-home"
									type="button"
									role="tab"
									aria-controls="pills-home"
									aria-selected="true">
									Elecciones
								</button>
							</li>
							<li className="nav-item" role="presentation">
								<button
									className="nav-link"
									id="pills-profile-tab"
									data-bs-toggle="pill"
									data-bs-target="#pills-profile"
									type="button"
									role="tab"
									aria-controls="pills-profile"
									aria-selected="false">
									Resultados
								</button>
							</li>
						</ul>
						<div
							className="tab-content"
							id="pills-tabContent">
							<div
								className="tab-pane fade show active"
								id="pills-home"
								role="tabpanel"
								aria-labelledby="pills-home-tab"
								tabIndex="0">
								{elections.length >= 1 ? (
									<>
										<h3>Elecciones activas</h3>
										<hr />
										<table className="table table-hover mt-3">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">Election Id</th>
													{/*<th scope="col">Constituency</th>*/}
													<th scope="col">Action</th>
												</tr>
											</thead>
											<tbody className="table-group-divider">
												{elections.map(
													(election, index) => (
														<tr key={index}>
															<th scope="row">
																{index + 1}
															</th>
															<td className="election-data">
																{election.electionId}
															</td>
															{/*<td className="election-data">{getConstituencyName(election.constituencyId)}</td>*/}
															<td className="election-data">
																<button
																	className="btn bn-sm btn-dark btn-w-80"
																	onClick={() =>
																		handleViewCandidates(
																			election.electionId
																		)
																	}>
																	<i className="fa-solid fa-check-to-slot"></i>{' '}
																	VOTAR
																</button>
															</td>
														</tr>
													)
												)}
											</tbody>
										</table>
									</>
								) : (
									<div>{progress.msg}</div>
								)}
							</div>
							<div
								className="tab-pane fade"
								id="pills-profile"
								role="tabpanel"
								aria-labelledby="pills-profile-tab"
								tabIndex="0">
								<ResultPage />
							</div>
						</div>
					</div>
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
										Candidates
									</h1>
									<button
										type="button"
										id="ca-modal"
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close">
										X
									</button>
								</div>
								<div className="modal-body">
									{candidates.length >= 1 ? (
										<div>
											{' '}
											{candidates.map((c, i) => (
												<CandidateCard
													candidate={c}
													vote={true}
													onVote={(cId) => handleVote(cId)}
													key={i}
												/>
											))}{' '}
										</div>
									) : (
										<>No Candidates...</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div>{progress.msg}</div>
			)}
		</>
	);
};

export default UserPage;
