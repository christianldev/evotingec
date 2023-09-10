import React, {useEffect, useState} from 'react';
import './adminpage.css';
import {Outlet, useNavigate} from 'react-router-dom';
import vote from '../../assets/images/vote.png';
import {checkIsAdmin} from '../../services/AdminService';
import AdminLogin from '../../components/AdminLogin';
import {ForbbidenPage} from '../Error/ForbbidenPage';

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
				setTitle('Gestión de circunscripciones');
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
						<span class="absolute top-4 right-4 block cursor-pointer xl:hidden">
							<svg
								stroke="currentColor"
								fill="currentColor"
								stroke-width="0"
								viewBox="0 0 20 20"
								aria-hidden="true"
								height="1em"
								width="1em"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"></path>
							</svg>
						</span>
						<div class="mx-[56px] mt-[50px] flex items-center">
							<div class="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
								Horizon{' '}
								<span class="font-medium">FREE</span>
							</div>
						</div>
						<div class="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30"></div>

						<div
							className="nav d-flex flex-column nav-pills p-4 align-items-center tabs shadow"
							id="v-pills-tab"
							role="tablist"
							aria-orientation="vertical">
							<button
								className={
									page === 0
										? ' my-[3px] flex cursor-pointer rounded-xl items-center  p-2 text-white bg-blueSecondary'
										: ' my-[3px] flex cursor-pointer rounded-xl items-center p-2'
								}
								id="v-pills-home-tab"
								type="button"
								role="tab"
								onClick={() => handleTabChange(0)}>
								<i
									className={
										page === 0
											? 'fa-solid fa-gauge-high font-bold text-white '
											: 'fa-solid fa-gauge-high font-bold  text-blueSecondary'
									}></i>
								&nbsp; Dashboard
							</button>
							<button
								className={
									page === 1
										? ' my-[3px] flex cursor-pointer rounded-xl items-center  p-2 text-white bg-blueSecondary'
										: ' my-[3px] flex cursor-pointer rounded-xl items-center p-2'
								}
								id="v-pills-profile-tab"
								type="button"
								role="tab"
								onClick={() => handleTabChange(1)}>
								<i
									className={
										page === 1
											? 'fa-solid fa-gauge-high font-bold text-white '
											: 'fa-solid fa-gauge-high font-bold  text-blueSecondary'
									}></i>
								&nbsp;Elections
							</button>
							<button
								className={
									page === 2
										? ' my-[3px] flex cursor-pointer rounded-xl items-center  p-2 text-white bg-blueSecondary'
										: ' my-[3px] flex cursor-pointer rounded-xl items-center p-2'
								}
								id="v-pills-messages-tab"
								type="button"
								role="tab"
								onClick={() => handleTabChange(2)}>
								<i
									className={
										page === 2
											? 'fa-solid fa-gauge-high font-bold text-white '
											: 'fa-solid fa-gauge-high font-bold  text-blueSecondary'
									}></i>
								&nbsp; Candidates
							</button>
							<button
								className={
									page === 3
										? ' my-[3px] flex cursor-pointer rounded-xl items-center  p-2 text-white bg-blueSecondary'
										: ' my-[3px] flex cursor-pointer rounded-xl items-center p-2'
								}
								id="v-pills-voters-tab"
								type="button"
								role="tab"
								onClick={() => handleTabChange(3)}>
								<i
									className={
										page === 3
											? 'fa-solid fa-gauge-high font-bold text-white '
											: 'fa-solid fa-gauge-high font-bold  text-blueSecondary'
									}></i>
								&nbsp; Voters
							</button>
							<button
								className={
									page === 4
										? ' my-[3px] flex cursor-pointer rounded-xl items-center  p-2 text-white bg-blueSecondary'
										: ' my-[3px] flex cursor-pointer rounded-xl items-center p-2'
								}
								id="v-pills-settings-tab"
								type="button"
								role="tab"
								onClick={() => handleTabChange(4)}>
								<i
									className={
										page === 4
											? 'fa-solid fa-gauge-high font-bold text-white '
											: 'fa-solid fa-gauge-high font-bold  text-blueSecondary'
									}></i>
								&nbsp; Constituency
							</button>
							<button
								className={
									page === 5
										? ' my-[3px] flex cursor-pointer rounded-xl items-center  p-2 text-white bg-blueSecondary'
										: ' my-[3px] flex cursor-pointer rounded-xl items-center p-2'
								}
								id="v-pills-settings-tab"
								type="button"
								role="tab"
								onClick={() => handleTabChange(5)}>
								<i
									className={
										page === 5
											? 'fa-solid fa-gauge-high font-bold text-white '
											: 'fa-solid fa-gauge-high font-bold  text-blueSecondary'
									}></i>
								&nbsp; Results
							</button>
						</div>
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
								<div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
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
