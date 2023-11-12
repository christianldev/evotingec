import './App.css';
import {Link, RouterProvider} from 'react-router-dom';
import {RouterList} from './routes/router.jsx';
import {useEffect, useState} from 'react';
import Web3Service from './services/Web3Service';

function App() {
	const [isConnected, setIsConnected] = useState(false);
	const [prgMsg, setPrgMsg] = useState(
		'Conectando a la red Ethereum...'
	);
	useEffect(() => {
		return () => {
			let ws = new Web3Service();
			ws.getWeb3()
				.then((w) => {
					if (w === undefined)
						setPrgMsg('Instala Metamask para continuar');
				})
				.catch((err) => {
					console.log(err);
				});
			ws.getContract()
				.then((c) => {
					if (c != null) {
						setIsConnected(true);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};
	}, []);

	return (
		<div>
			{isConnected ? (
				<RouterProvider router={RouterList} />
			) : (
				<main className="bg-white dark:bg-tg-dark-bg">
					<section className="flex min-h-screen items-center justify-center">
						<div className="container">
							<div className="-mx-4 flex">
								<div className="w-full px-4">
									<div className="relative z-10 mx-auto max-w-[570px] rounded-[20px] bg-primary px-10 py-16 text-center sm:px-16 md:py-24">
										<h4 className="mb-3 text-2xl font-semibold leading-tight text-white">
											{prgMsg}
										</h4>

										{prgMsg ===
										'Conectando a la red Ethereum...' ? (
											<div className="inline-block  justify-center items-center w-16 h-16 border-8 border-dashed rounded-full animate-spin border-gray-200"></div>
										) : (
											<Link
												className="inline-block rounded-lg border border-white bg-white px-8 py-3 text-center text-base font-semibold text-primary duration-300 hover:bg-white/90"
												to="/">
												Instalar Metamask
											</Link>
										)}

										<div>
											<span className="absolute top-3 left-3 z-[-1]">
												<svg
													width="50"
													height="79"
													viewBox="0 0 50 79"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<circle
														cx="47.7119"
														cy="76.9617"
														r="1.74121"
														transform="rotate(180 47.7119 76.9617)"
														fill="white"></circle>
													<circle
														cx="47.7119"
														cy="61.6385"
														r="1.74121"
														transform="rotate(180 47.7119 61.6385)"
														fill="white"></circle>
													<circle
														cx="47.7119"
														cy="46.3163"
														r="1.74121"
														transform="rotate(180 47.7119 46.3163)"
														fill="white"></circle>
													<circle
														cx="47.7119"
														cy="16.7159"
														r="1.74121"
														transform="rotate(180 47.7119 16.7159)"
														fill="white"></circle>
													<circle
														cx="47.7119"
														cy="31.3421"
														r="1.74121"
														transform="rotate(180 47.7119 31.3421)"
														fill="white"></circle>
													<circle
														cx="47.7119"
														cy="1.74121"
														r="1.74121"
														transform="rotate(180 47.7119 1.74121)"
														fill="white"></circle>
													<circle
														cx="32.3916"
														cy="76.9617"
														r="1.74121"
														transform="rotate(180 32.3916 76.9617)"
														fill="white"></circle>
													<circle
														cx="32.3877"
														cy="61.6384"
														r="1.74121"
														transform="rotate(180 32.3877 61.6384)"
														fill="white"></circle>
													<circle
														cx="32.3916"
														cy="46.3162"
														r="1.74121"
														transform="rotate(180 32.3916 46.3162)"
														fill="white"></circle>
													<circle
														cx="32.3916"
														cy="16.7161"
														r="1.74121"
														transform="rotate(180 32.3916 16.7161)"
														fill="white"></circle>
													<circle
														cx="32.3877"
														cy="31.342"
														r="1.74121"
														transform="rotate(180 32.3877 31.342)"
														fill="white"></circle>
													<circle
														cx="32.3916"
														cy="1.74145"
														r="1.74121"
														transform="rotate(180 32.3916 1.74145)"
														fill="white"></circle>
													<circle
														cx="17.0674"
														cy="76.9617"
														r="1.74121"
														transform="rotate(180 17.0674 76.9617)"
														fill="white"></circle>
													<circle
														cx="17.0674"
														cy="61.6384"
														r="1.74121"
														transform="rotate(180 17.0674 61.6384)"
														fill="white"></circle>
													<circle
														cx="17.0674"
														cy="46.3162"
														r="1.74121"
														transform="rotate(180 17.0674 46.3162)"
														fill="white"></circle>
													<circle
														cx="17.0674"
														cy="16.7161"
														r="1.74121"
														transform="rotate(180 17.0674 16.7161)"
														fill="white"></circle>
													<circle
														cx="17.0674"
														cy="31.342"
														r="1.74121"
														transform="rotate(180 17.0674 31.342)"
														fill="white"></circle>
													<circle
														cx="17.0674"
														cy="1.74145"
														r="1.74121"
														transform="rotate(180 17.0674 1.74145)"
														fill="white"></circle>
													<circle
														cx="1.74316"
														cy="76.9617"
														r="1.74121"
														transform="rotate(180 1.74316 76.9617)"
														fill="white"></circle>
													<circle
														cx="1.74316"
														cy="61.6384"
														r="1.74121"
														transform="rotate(180 1.74316 61.6384)"
														fill="white"></circle>
													<circle
														cx="1.74316"
														cy="46.3162"
														r="1.74121"
														transform="rotate(180 1.74316 46.3162)"
														fill="white"></circle>
													<circle
														cx="1.74316"
														cy="16.7161"
														r="1.74121"
														transform="rotate(180 1.74316 16.7161)"
														fill="white"></circle>
													<circle
														cx="1.74316"
														cy="31.342"
														r="1.74121"
														transform="rotate(180 1.74316 31.342)"
														fill="white"></circle>
													<circle
														cx="1.74316"
														cy="1.74145"
														r="1.74121"
														transform="rotate(180 1.74316 1.74145)"
														fill="white"></circle>
												</svg>
											</span>
											<span className="absolute bottom-3 right-3 z-[-1]">
												<svg
													width="50"
													height="79"
													viewBox="0 0 50 79"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<circle
														cx="47.7119"
														cy="76.9617"
														r="1.74121"
														transform="rotate(180 47.7119 76.9617)"
														fill="white"></circle>
													<circle
														cx="47.7119"
														cy="61.6385"
														r="1.74121"
														transform="rotate(180 47.7119 61.6385)"
														fill="white"></circle>
													<circle
														cx="47.7119"
														cy="46.3163"
														r="1.74121"
														transform="rotate(180 47.7119 46.3163)"
														fill="white"></circle>
													<circle
														cx="47.7119"
														cy="16.7159"
														r="1.74121"
														transform="rotate(180 47.7119 16.7159)"
														fill="white"></circle>
													<circle
														cx="47.7119"
														cy="31.3421"
														r="1.74121"
														transform="rotate(180 47.7119 31.3421)"
														fill="white"></circle>
													<circle
														cx="47.7119"
														cy="1.74121"
														r="1.74121"
														transform="rotate(180 47.7119 1.74121)"
														fill="white"></circle>
													<circle
														cx="32.3916"
														cy="76.9617"
														r="1.74121"
														transform="rotate(180 32.3916 76.9617)"
														fill="white"></circle>
													<circle
														cx="32.3877"
														cy="61.6384"
														r="1.74121"
														transform="rotate(180 32.3877 61.6384)"
														fill="white"></circle>
													<circle
														cx="32.3916"
														cy="46.3162"
														r="1.74121"
														transform="rotate(180 32.3916 46.3162)"
														fill="white"></circle>
													<circle
														cx="32.3916"
														cy="16.7161"
														r="1.74121"
														transform="rotate(180 32.3916 16.7161)"
														fill="white"></circle>
													<circle
														cx="32.3877"
														cy="31.342"
														r="1.74121"
														transform="rotate(180 32.3877 31.342)"
														fill="white"></circle>
													<circle
														cx="32.3916"
														cy="1.74145"
														r="1.74121"
														transform="rotate(180 32.3916 1.74145)"
														fill="white"></circle>
													<circle
														cx="17.0674"
														cy="76.9617"
														r="1.74121"
														transform="rotate(180 17.0674 76.9617)"
														fill="white"></circle>
													<circle
														cx="17.0674"
														cy="61.6384"
														r="1.74121"
														transform="rotate(180 17.0674 61.6384)"
														fill="white"></circle>
													<circle
														cx="17.0674"
														cy="46.3162"
														r="1.74121"
														transform="rotate(180 17.0674 46.3162)"
														fill="white"></circle>
													<circle
														cx="17.0674"
														cy="16.7161"
														r="1.74121"
														transform="rotate(180 17.0674 16.7161)"
														fill="white"></circle>
													<circle
														cx="17.0674"
														cy="31.342"
														r="1.74121"
														transform="rotate(180 17.0674 31.342)"
														fill="white"></circle>
													<circle
														cx="17.0674"
														cy="1.74145"
														r="1.74121"
														transform="rotate(180 17.0674 1.74145)"
														fill="white"></circle>
													<circle
														cx="1.74316"
														cy="76.9617"
														r="1.74121"
														transform="rotate(180 1.74316 76.9617)"
														fill="white"></circle>
													<circle
														cx="1.74316"
														cy="61.6384"
														r="1.74121"
														transform="rotate(180 1.74316 61.6384)"
														fill="white"></circle>
													<circle
														cx="1.74316"
														cy="46.3162"
														r="1.74121"
														transform="rotate(180 1.74316 46.3162)"
														fill="white"></circle>
													<circle
														cx="1.74316"
														cy="16.7161"
														r="1.74121"
														transform="rotate(180 1.74316 16.7161)"
														fill="white"></circle>
													<circle
														cx="1.74316"
														cy="31.342"
														r="1.74121"
														transform="rotate(180 1.74316 31.342)"
														fill="white"></circle>
													<circle
														cx="1.74316"
														cy="1.74145"
														r="1.74121"
														transform="rotate(180 1.74316 1.74145)"
														fill="white"></circle>
												</svg>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			)}
		</div>
	);
}

export default App;
