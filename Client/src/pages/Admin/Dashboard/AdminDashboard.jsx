import React, {useEffect, useState} from 'react';
import './dashboard-page.css';
import CardTile from '../../../components/CardTile';
import {getCounts} from '../../../services/AdminService';
import {
	FaMapLocationDot,
	FaUserCheck,
	FaArrowsDownToPeople,
	FaFileCircleCheck,
	FaRegCalendarCheck,
} from 'react-icons/fa6';

const AdminDashboard = () => {
	let cards = [
		{
			title: 'Elecciones activas',
			count: 0,
			icon: <FaFileCircleCheck />,
			bg: 'text-bg-success',
		},
		{
			title: 'Votantes activos',
			count: 0,
			icon: <FaUserCheck />,
			bg: 'text-bg-danger',
		},
		{
			title: 'Total elecciones',
			count: 0,
			icon: <FaRegCalendarCheck />,
			bg: 'text-bg-primary',
		},
		{
			title: 'Votantes registrados',
			count: 0,
			icon: <FaArrowsDownToPeople />,
			bg: 'text-bg-dark',
		},
		{
			title: 'Recintos electorales',
			count: 0,
			icon: <FaMapLocationDot />,
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
		<div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
			{cardTiles.map((c, i) => (
				<div className="col" key={i}>
					<CardTile prop={c} />
				</div>
			))}
		</div>
	);
};

export default AdminDashboard;
