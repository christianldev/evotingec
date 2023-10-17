import React, {useEffect, useState} from 'react';
import './adminpage.css';
import {Outlet, useNavigate} from 'react-router-dom';
import vote from '../../assets/images/vote.png';
import {checkIsAdmin} from '../../services/AdminService';
import AdminLogin from '../../components/AdminLogin';
import {ForbbidenPage} from '../Error/ForbbidenPage';
import {FaVoteYea} from 'react-icons/fa';
import {
	FaUsersGear,
	FaUsersLine,
	FaMapLocation,
} from 'react-icons/fa6';
import {HiPresentationChartLine} from 'react-icons/hi2';
import {AiFillDashboard} from 'react-icons/ai';

const AdminPage = () => {
	let _prg = {
		prgMsg: 'Cargando..',
		warn: false,
		success: false,
		code: '',
		button: '',
	};

	const [isAdmin, setIsAdmin] = useState(false);
	const [page, setPage] = useState(0);
	const [title, setTitle] = useState(
		'Panel administrativo'
	);
	const [login, setLogin] = useState(false);
	const [prg, setPrg] = useState(_prg);
	const navigate = useNavigate();

	const handleTabChange = (page) => {
		switch (page) {
			case 0:
				navigate('dashboard');
				setTitle('Panel administrativo');
				setPage(0);
				break;
			case 1:
				navigate('election');
				setTitle('Gestión de elecciones');
				setPage(1);
				break;
			case 2:
				navigate('candidates');
				setTitle('Gestion de candidatos');
				setPage(2);
				break;
			case 3:
				navigate('voters');
				setTitle('Gestión de votantes');
				setPage(3);
				break;
			case 4:
				navigate('constituency');
				setTitle('Gestión de padrones');
				setPage(4);
				break;
			case 5:
				navigate('results');
				setTitle('Resultados de las elecciones');
				setPage(5);
				break;
		}
	};

	const handleLogout = () => {
		localStorage.setItem('admin', '0');
		window.location.replace('/');
	};

	const checkAdmin = () => {
		setPrg({..._prg, prgMsg: 'Verificando acceso...'});
		checkIsAdmin()
			.then((r) => {
				setIsAdmin(r);
				if (r) {
					setPrg({..._prg, prgMsg: ''});
					// setLogin(true)
				} else {
					setPrg({
						..._prg,
						prgMsg: 'No tiene acceso a esta página',
						code: '403',
						button: 'Volver al inicio',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onLogin = (v) => {
		if (parseInt(v)) {
			setLogin(true);
			handleTabChange(0);
			localStorage.setItem('admin', '1');
		}
	};

	useEffect(() => {
		return () => {
			if (parseInt(localStorage.getItem('admin')))
				setLogin(true);
			checkAdmin();
		};
	}, []);

	return (
		<div className="flex h-full w-full">
			{isAdmin && login ? (
				<>
					<div className="sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 translate-x-0">
						<span className="absolute top-4 right-4 block cursor-pointer xl:hidden">
							<svg
								stroke="currentColor"
								fill="currentColor"
								strokeWidth="0"
								viewBox="0 0 20 20"
								aria-hidden="true"
								height="1em"
								width="1em"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"></path>
							</svg>
						</span>
						<div className="mx-[56px] mt-[50px] flex items-center">
							<div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
								Horizon{' '}
								<span className="font-medium">FREE</span>
							</div>
						</div>
						<div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30"></div>

						<ul className="mb-auto pt-1">
							<div className="relative mb-3 flex hover:cursor-pointer">
								<li
									className={
										page === 0
											? ' my-[3px] flex cursor-pointer items-center px-8'
											: ' my-[3px] flex cursor-pointer items-center px-8 text-gray-700'
									}
									id="v-pills-home-tab"
									type="button"
									role="tab"
									onClick={() => handleTabChange(0)}>
									<AiFillDashboard
										className={
											page === 0
												? ' font-bold text-blueSecondary w-6 h-6'
												: 'font-bold  text-gray-600 w-6 h-6'
										}
									/>

									<p
										className={
											page === 0
												? 'leading-1 flex ms-4 font-bold text-gray-800'
												: 'leading-1 flex ms-4 font-bold text-gray-600'
										}>
										Inicio
									</p>
								</li>
								{page === 0 && (
									<div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 end-0 dark:bg-brand-400"></div>
								)}
							</div>

							<div className="relative mb-3 flex hover:cursor-pointer">
								<li
									className={
										page === 1
											? ' my-[3px] flex cursor-pointer items-center px-8'
											: ' my-[3px] flex cursor-pointer items-center px-8 text-gray-700'
									}
									id="v-pills-profile-tab"
									type="button"
									role="tab"
									onClick={() => handleTabChange(1)}>
									<FaVoteYea
										className={
											page === 1
												? ' font-bold text-blueSecondary w-6 h-6'
												: 'font-bold  text-gray-600 w-6 h-6'
										}
									/>
									<p
										className={
											page === 1
												? 'leading-1 flex ms-4 font-bold text-gray-800'
												: 'leading-1 flex ms-4 font-bold text-gray-600'
										}>
										Elecciones
									</p>
								</li>
								{page === 1 && (
									<div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 end-0 dark:bg-brand-400"></div>
								)}
							</div>

							<div className="relative mb-3 flex hover:cursor-pointer">
								<li
									className={
										page === 2
											? ' my-[3px] flex cursor-pointer items-center px-8'
											: ' my-[3px] flex cursor-pointer items-center px-8 text-gray-700'
									}
									id="v-pills-messages-tab"
									type="button"
									role="tab"
									onClick={() => handleTabChange(2)}>
									<FaUsersGear
										className={
											page === 2
												? ' font-bold text-blueSecondary w-6 h-6'
												: 'font-bold  text-gray-600 w-6 h-6'
										}
									/>
									<p
										className={
											page === 2
												? 'leading-1 flex ms-4 font-bold text-gray-800'
												: 'leading-1 flex ms-4 font-bold text-gray-600'
										}>
										Candidatos
									</p>
								</li>
								{page === 2 && (
									<div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 end-0 dark:bg-brand-400"></div>
								)}
							</div>

							<div className="relative mb-3 flex hover:cursor-pointer">
								<li
									className={
										page === 3
											? ' my-[3px] flex cursor-pointer items-center px-8'
											: ' my-[3px] flex cursor-pointer items-center px-8 text-gray-700'
									}
									id="v-pills-voters-tab"
									type="button"
									role="tab"
									onClick={() => handleTabChange(3)}>
									<FaUsersLine
										className={
											page === 3
												? ' font-bold text-blueSecondary w-6 h-6'
												: 'font-bold  text-gray-600 w-6 h-6'
										}
									/>
									<p
										className={
											page === 3
												? 'leading-1 flex ms-4 font-bold text-gray-800'
												: 'leading-1 flex ms-4 font-bold text-gray-600'
										}>
										Votantes
									</p>
								</li>
								{page === 3 && (
									<div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 end-0 dark:bg-brand-400"></div>
								)}
							</div>

							<div className="relative mb-3 flex hover:cursor-pointer">
								<li
									className={
										page === 4
											? ' my-[3px] flex cursor-pointer items-center px-8'
											: ' my-[3px] flex cursor-pointer items-center px-8 text-gray-700'
									}
									id="v-pills-settings-tab"
									type="button"
									role="tab"
									onClick={() => handleTabChange(4)}>
									<FaMapLocation
										className={
											page === 4
												? ' font-bold text-blueSecondary w-6 h-6'
												: 'font-bold  text-gray-600 w-6 h-6'
										}
									/>
									<p
										className={
											page === 4
												? 'leading-1 flex ms-4 font-bold text-gray-800'
												: 'leading-1 flex ms-4 font-bold text-gray-600'
										}>
										Padron electoral
									</p>
								</li>
								{page === 4 && (
									<div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 end-0 dark:bg-brand-400"></div>
								)}
							</div>

							<div className="relative mb-3 flex hover:cursor-pointer">
								<li
									className={
										page === 5
											? ' my-[3px] flex cursor-pointer items-center px-8'
											: ' my-[3px] flex cursor-pointer items-center px-8 text-gray-700'
									}
									id="v-pills-settings-tab"
									type="button"
									role="tab"
									onClick={() => handleTabChange(5)}>
									<HiPresentationChartLine
										className={
											page === 5
												? ' font-bold text-blueSecondary w-6 h-6'
												: 'font-bold  text-gray-600 w-6 h-6'
										}
									/>
									<p
										className={
											page === 5
												? 'leading-1 flex ms-4 font-bold text-gray-800'
												: 'leading-1 flex ms-4 font-bold text-gray-600'
										}>
										Resultados
									</p>
								</li>
								{page === 5 && (
									<div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 end-0 dark:bg-brand-400"></div>
								)}
							</div>
						</ul>
					</div>
					<div
						className="h-full w-full bg-lightPrimary dark:!bg-navy-900"
						id="v-pills-tabContent">
						<main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
							<div className="h-full">
								<nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-blueSecondary p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
									<div className="container-fluid d-flex justify-content-center align-items-center px-3">
										<div className="h4 title text-center text-gray-200 mx-3 mt-1 flex-grow-1">
											{title}
										</div>
										<button
											className="btn btn-sm btn-warning"
											onClick={() => handleLogout()}>
											<i className="fa-solid fa-right-from-bracket"></i>{' '}
											Cerrar sesión
										</button>
									</div>
								</nav>
								<div className="pt-2 mx-auto mb-auto h-full min-h-[84vh] md:pr-2">
									<Outlet />
								</div>
							</div>
						</main>
					</div>
				</>
			) : isAdmin && !login ? (
				<div className="admin-login">
					<AdminLogin onLogin={(v) => onLogin(v)} />
				</div>
			) : (
				<ForbbidenPage title={prg} />
			)}
		</div>
	);
};

export default AdminPage;
