import React, {useEffect, useState} from 'react';
import {
	getAllVoters,
	verifyVoter,
} from '../../../services/AdminService';
import ProgressComponent from '../../../components/ProgressComponent';

const Voters = () => {
	let _prg = {
		prgMsg: 'Cargando...',
		warn: false,
		success: false,
	};
	const [voters, setVoters] = useState([]);
	const [prgMsg, setPrgMsg] = useState('Cargando...');
	const [progress, setProgress] = useState(_prg);
	const [showProgress, setShowProgress] = useState(false);

	function getAllUsers() {
		getAllVoters().then((r) => {
			setVoters(r);
			if (r.length === 0)
				setPrgMsg('No hay votantes registrados...!');
		});
	}

	useEffect(() => {
		return () => {
			getAllUsers();
		};
	}, []);

	const handleVoterVerify = (v) => {
		setShowProgress(true);

		verifyVoter(v.key)
			.then((r) => {
				setProgress({
					...progress,
					success: true,
					prgMsg: 'Votante verificado',
				});
				let i = setInterval(() => {
					handleCloseProgress();
					clearInterval(i);
				}, 3000);
				getAllUsers();
			})
			.catch((err) => {
				setProgress({
					...progress,
					warn: true,
					prgMsg: 'Votante no verificado',
				});
			});
	};

	function handleCloseProgress() {
		setProgress(_prg);
		setShowProgress(false);
	}

	return (
		<div className="pt-5 mx-auto mb-auto h-full min-h-[84vh] md:pr-2">
			{showProgress ? (
				<ProgressComponent
					success={progress.success}
					warn={progress.warn}
					msg={progress.prgMsg}
					onClose={() => handleCloseProgress()}
				/>
			) : null}

			<div className="container">
				{voters.length >= 1 ? (
					<table className="table table-hover">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Usuario</th>
								<th scope="col">Cedula</th>
								<th scope="col">Accion</th>
							</tr>
						</thead>
						<tbody>
							{voters.map(
								(v, i) => (
									console.log(v),
									(
										<tr key={i}>
											<th scope="row">{i + 1}</th>
											<td className="election-data">
												{v.fName}
											</td>
											<td className="election-data">
												{v.nationalId}
											</td>
											<td>
												{v.isActive ? (
													<button
														className="btn btn-sm btn-dark"
														disabled>
														{' '}
														Verified
													</button>
												) : (
													<button
														className="btn btn-sm btn-success"
														onClick={() =>
															handleVoterVerify(v)
														}>
														<i className="fa-solid fa-user-check"></i>
														&nbsp; Verify
													</button>
												)}
											</td>
										</tr>
									)
								)
							)}
						</tbody>
					</table>
				) : (
					<div className="card bg-opacity-10 container mt-5 p-5 text-center w-50 mx-auto">
						<div className="row">
							<div className="col-12">
								<div className="card-body">
									<h4 className="card-title">{prgMsg}</h4>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Voters;
