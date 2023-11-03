import React, {useEffect, useState} from 'react';
import './result-page.css';
import {getAllElections} from '../../../services/AdminService';
import {Link} from 'react-router-dom';

const ResultPage = () => {
	const [elections, setElections] = useState([]);

	useEffect(() => {
		return () => {
			getAllElections().then((r) => {
				let _elections = r.data;
				setElections(
					_elections.filter((e, i) => e.result === true)
				);
			});
		};
	}, []);

	return (
		<div className="container-fluid result-page">
			<div className="container mt-3">
				{elections.length >= 1 ? (
					<>
						<table className="table table-hover">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Eleccion</th>
									<th scope="col">Descripcion</th>
									<th scope="col">Ver resultado</th>
								</tr>
							</thead>
							<tbody className="table-group-divider">
								{elections.map((e, i) => (
									<tr key={i}>
										<td>{i + 1}</td>
										<td className="election-data">
											{e.electionId}
										</td>
										<td className="election-data">
											{e.description}
										</td>
										<td>
											<Link
												className="btn btn-sm btn-warning btn-w-80"
												to={'/result/' + e.electionId}
												target="_blank">
												<i className="fa-solid fa-chart-simple"></i>
												&nbsp; Ver
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</>
				) : (
					<div className="card bg-opacity-10 container mt-5 p-5 text-center w-50 mx-auto">
						<div className="row">
							<div className="col-12">
								<div className="card-body">
									<h4 className="card-title">
										No hay elecciones con resultados
									</h4>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ResultPage;
