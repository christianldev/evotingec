import React, {useEffect, useState, useRef} from 'react';
import './homepage.css';
import LoginComponent from '../../components/LoginComponent.jsx';
import {Link, useNavigate} from 'react-router-dom';
import RegisterComponent from '../../components/RegisterComponent';
import Web3Service from '../../services/Web3Service';
import {
	getAllConstituencies,
	getAllElections,
	verifyVoter,
} from '../../services/AdminService';
import {
	registerVoter,
	verifyToken,
	voterLogin,
} from '../../services/VoterService';
import ProgressComponent from '../../components/ProgressComponent';
import bgAuht from '../../assets/images/bgauth.jpg';

const HomePage = () => {
	let Voter = {
		userId: '',
		nationalId: '',
		password: '',
		birthDate: '',
		email: '',
		constituencyId: '',
		otp: '',
		recaptcha: '',
	};

	let Progress = {
		success: false,
		warn: false,
		msg: 'Cargando...',
	};

	const [register, setRegister] = useState(false);
	const [elections, setElections] = useState([]);
	const [voter, setVoter] = useState(Voter);
	const [showProgress, setShowProgress] = useState(false);
	const [progress, setProgress] = useState(Progress);
	const [rModal, setRModal] = useState('');
	const navigate = useNavigate();

	const [SuccessMsg, setSuccessMsg] = useState('');
	const [ErrorMsg, setErrorMsg] = useState('');
	const [valid_token, setValidToken] = useState([]);

	const captchaRef = useRef(null);

	const onRegisterClick = () => {
		setRegister(!register);
		rModal.show();
	};

	const handleVerifyRecaptcha = async () => {
		let token = captchaRef.current.getValue();
		captchaRef.current.reset();

		if (token) {
			let valid_token = await verifyToken(token);
			setValidToken(valid_token);

			if (valid_token[0].success === true) {
				console.log('verified');
				setSuccessMsg(
					'Has sido verificado, puedes continuar'
				);

				return token;
			} else {
				console.log('No verificado');
				setErrorMsg('Lo sentimos, no eres humano');
			}
		}
	};

	const handleRegister = (voter) => {
		rModal.hide();
		setShowProgress(true);
		if (
			voter.userId !== '' &&
			voter.nationalId !== '' &&
			voter.password !== '' &&
			voter.birthDate !== '' &&
			voter.email !== ''
		) {
			setProgress({...progress, msg: 'Registrando...'});
			try {
				handleVerifyRecaptcha()
					.then((valid_token) => {
						// getAllUsers();
						registerVoter(voter, valid_token)
							.then((r) => {
								setProgress({
									...progress,
									success: true,
									msg: 'Registro exitoso',
								});
								setVoter(Voter);
								setRegister(false);

								verifyVoter(voter.userId)
									.then((r) => {
										console.log(r);
										setProgress({
											...progress,
											success: true,
											prgMsg: 'Votante verificado',
										});
										let i = setInterval(() => {
											handleProgressClose();
											clearInterval(i);
										}, 5000);
									})
									.catch((err) => {
										setProgress({
											...progress,
											warn: true,
											prgMsg: 'Votante no verificado',
										});
									});
							})
							.catch((err) => {
								setProgress({
									...progress,
									warn: true,
									msg: err,
								});
							});
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (err) {
				setProgress({
					...progress,
					warn: true,
					msg: err,
				});
			}
		} else {
			setProgress({
				...progress,
				msg: 'Datos incompletos',
				warn: true,
			});
		}
	};

	const handleLogin = (login) => {
		setShowProgress(true);
		if (login.nationalId !== '' && login.password !== '') {
			setProgress({...progress, msg: 'Validando...'});

			voterLogin(login)
				.then((r) => {
					setProgress({
						...progress,
						success: true,
						msg: 'Autenticado',
					});
					if (!r) {
						setProgress({
							...progress,
							warn: true,
							msg: 'Credenciales invalidas',
						});
					} else if (!r.isActive) {
						setProgress({
							...progress,
							warn: true,
							msg: 'Cuenta no verificada',
						});
					} else {
						navigate('user');
					}
				})
				.catch((err) => {
					setProgress({...progress, warn: true, msg: err});
				});
		} else {
			setProgress({
				...progress,
				warn: true,
				msg: 'Por favor ingrese todos los datos',
			});
		}
	};

	useEffect(() => {
		return () => {
			new Web3Service().getCurrentAccount().then((a) => {
				setRModal(new bootstrap.Modal('#r-modal'));
				setVoter({...voter, userId: a});
				// getAllConstituencies().then((r) => {
				// 	setConstituencies(r.data);
				// });
				// getAllElections().then((r) => {
				// 	console.log(r.data);
				// 	setElections(r.data);
				// });
			});
		};
	}, []);

	const handleProgressClose = () => {
		setProgress(Progress);
		setShowProgress(false);
	};

	return (
		<>
			<div className="home-page">
				<nav className="navbar bg-transparent">
					<div className="container-fluid">
						<a className="navbar-brand">
							<i className="fa-solid fa-check-to-slot fs-3 px-2 text-dark opacity-75"></i>
							Decide Ya
						</a>
						<div className="d-flex" role="search">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link
										className="nav-link nav-btn text-gray-200 hover:text-gray-200"
										aria-current="page"
										to="admin">
										<i className="fa-solid fa-user-shield"></i>
										&nbsp;Admin
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
					<main className="mx-auto min-h-screen">
						<div className="relative flex">
							<div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
								<div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
									<div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
										<LoginComponent
											onRegister={() => onRegisterClick()}
											onLogin={(login) =>
												handleLogin(login)
											}
										/>
										<RegisterComponent
											voter={voter}
											setVoter={setVoter}
											// constituencies={constituencies}
											onRegister={(voter) =>
												handleRegister(voter)
											}
											modal={rModal}
											SuccessMsg={SuccessMsg}
											ErrorMsg={ErrorMsg}
											captchaRef={captchaRef}
											valid_token={valid_token}
										/>
									</div>
									<div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
										<div className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]">
											<img src={bgAuht} alt="bg" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
				{showProgress ? (
					<ProgressComponent
						success={progress.success}
						warn={progress.warn}
						msg={progress.msg}
						onClose={() => handleProgressClose()}
					/>
				) : null}
			</div>
		</>
	);
};

export default HomePage;
