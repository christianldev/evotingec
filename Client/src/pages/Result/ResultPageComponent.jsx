import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
	formatDate,
	getElectionResults,
} from '../../services/AdminService';
import CandidateCard from '../../components/CandidateCard';
import './result-page-component.css';
import trophy from '../../assets/images/trophy.png';
import {getElectionDetails} from '../../services/VoterService';

const ResultPageComponent = () => {
	let Election = {
		electionId: '',
		description: '',
		startDate: '',
		endDate: '',
		status: false,
		result: true,
		createdAt: '',
		updatedAt: '',
		constituencyId: 0,
		constituency: {
			id: 0,
			circunscriptionId: '',
			createdAt: '',
			updatedAt: '',
		},
	};
	let {id} = useParams();
	const [candidates, setCandidates] = useState([]);
	const [election, setElection] = useState(Election);
	const [noWinner, setNoWinner] = useState(false);
	const [prg, setPrg] = useState('Cargando...');

	useEffect(() => {
		return () => {
			getElectionDetails(id)
				.then((e) => {
					setElection(e.data);
					let _e = e.data;

					getElectionResults(id)
						.then((r) => {
							if (r.length >= 1) {
								if (r.length > 1) {
									r.sort((a, b) => {
										return b.votes - a.votes;
									});
									if (r[0].votes === r[1].votes) {
										setNoWinner(true);
									}
								}

								setCandidates(r);

								_e = {..._e, votes: 0};
								r.forEach((c, i) => {
									_e.votes = _e.votes + parseInt(c.votes);
									// console.log(_e);
									if (i === r.length - 1) setElection(_e);
								});
							} else {
								setPrg('No hay candidatos...');
							}
						})
						.catch((err) => {
							console.log(err);
							setPrg(err);
						});
				})
				.catch((err) => {
					console.log(err);
					setPrg('Eleccion no encontrada');
				});
		};
	}, []);

	console.log(election.result);
	// console.log(candidates);

	return (
		<div className="container-fluid result-page-comp bg-body-tertiary">
			<div className="container d-flex align-items-center justify-content-center flex-column mb-3">
				{candidates.length >= 1 ? (
					<>
						{election.result ? (
							<div className="accordion shadow-base dark:shadow-none rounded-md w-4/5">
								<div className="flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-60 rounded-t-md ">
									<button
										id="headingOne"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#collapseOne"
										aria-controls="collapseOne">
										DETALLE DE ELECCION{' '}
									</button>
									<span className="text-slate-900 dark:text-white text-[22px] transition-all duration-300 h-5 rotate-180 transform">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink"
											aria-hidden="true"
											role="img"
											className="iconify iconify--heroicons-outline"
											width="1em"
											height="1em"
											viewBox="0 0 24 24">
											<path
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="m19 9l-7 7l-7-7"></path>
										</svg>
									</span>
								</div>
								<div
									id="collapseOne"
									className="dark:border dark:border-slate-700 dark:border-t-0 text-sm text-slate-600 font-normal bg-white dark:bg-slate-900 dark:text-slate-300 rounded-b-md">
									<div className="px-8 py-4">
										<pre>
											Eleccion: {election.description}
											<br />
											Circunscripcion :{' '}
											{
												election.constituency
													?.circunscriptionId
											}
											<br />
											Fecha de Inicio :{' '}
											{formatDate(election.startDate)}
											<br />
											Fecha de Finalizacion :{' '}
											{formatDate(election.endDate)}
											<br />
											Votos totales : {election.votes}
										</pre>
									</div>
								</div>
							</div>
						) : null}

						<div className="main-card bg-body-emphasis mb-5">
							<div className="row">
								{!noWinner ? (
									<>
										<div className="col-12">
											<div className="winner p-3 rounded-4 shadow-lg border border-success m-2">
												<img
													className="trophy-icon m-2"
													src={trophy}
													alt=""
													width="80"
													height="80"
												/>
												<div className="p-2">
													<CandidateCard
														result={true}
														candidate={candidates[0]}
													/>
												</div>
											</div>
										</div>
										{candidates.slice(1).map((c, i) => (
											<div key={i}>
												<div className="col">
													<div className="candidates">
														<CandidateCard
															result={true}
															candidate={c}
														/>
													</div>
												</div>
											</div>
										))}
									</>
								) : (
									<>
										{' '}
										<span className="w-100 text-center text-danger fw-bold fst-italic fs-4 p-2">
											No Winners
										</span>
										{candidates.map((c, i) => (
											<div key={i}>
												<div className="col">
													<div className="candidates">
														<CandidateCard
															result={true}
															candidate={c}
														/>
													</div>
												</div>
											</div>
										))}
									</>
								)}
							</div>
						</div>
					</>
				) : (
					<div className="container-fluid min-vh-100">
						{prg}
					</div>
				)}
			</div>
		</div>
	);
};

export default ResultPageComponent;
