import React, {useEffect, useState} from 'react';
import './dashboard-page.css';
import CardTile from '../../../components/CardTile';
import {getCounts} from '../../../services/AdminService';

const AdminDashboard = () => {
	let cards = [
		{
			title: 'Elecciones activas',
			count: 0,
			icon: 'fa-person-booth',
			bg: 'text-bg-success',
		},
		{
			title: 'Votantes activos',
			count: 0,
			icon: 'fa-users-viewfinder',
			bg: 'text-bg-danger',
		},
		{
			title: 'Total elecciones',
			count: 0,
			icon: 'fa-square-poll-vertical',
			bg: 'text-bg-primary',
		},
		{
			title: 'Votantes registrados',
			count: 0,
			icon: 'fa-users',
			bg: 'text-bg-dark',
		},
		{
			title: 'Recintos electorales',
			count: 0,
			icon: 'fa-map',
			bg: 'text-bg-warning',
		},
	];

	const [cardTiles, setCardTiles] = useState(cards);

	useEffect(() => {
		return () => {
			getCounts().then((r) => {
				let temp = cardTiles.slice();
				temp[0].count = r.activeElectionsCount;
				temp[1].count = r.activeVoters;
				temp[2].count = r.electionsCount;
				temp[3].count = r.votersCount;
				temp[4].count = r.constituencyCount;
				setCardTiles(temp);
			});
		};
	}, []);

	return (
		<div className="container-fluid dashboard-page">
			<div className="row g-3 justify-content-center">
				{cardTiles.map((c, i) => (
					<div className="col" key={i}>
						<CardTile prop={c} />
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminDashboard;
