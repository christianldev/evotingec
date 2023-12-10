import Web3Service from './Web3Service';
import axios from 'axios';
import {getAllElections} from './AdminService';
import {saveAs} from 'file-saver';

const API = import.meta.env.VITE_API;
const ws = new Web3Service();
const SECRET_KEY = import.meta.env
	.VITE_GOOGLE_RECAPTCHA_SECRET_KEY;

export const registerVoter = (data, recaptcha) => {
	let user = null;

	return new Promise((resolve, reject) => {
		axios
			.post(API + '/user', {
				data,
				recaptcha,
			})
			.then((u) => {
				user = u.data;
				ws.getContract().then((c) => {
					ws.getCurrentAccount().then((a) => {
						c.methods
							.addUser(data.nationalId, data.password)
							.send({from: a})
							.on('confirmation', (res) => {
								resolve(true);
							})
							.catch((err) => {
								axios
									.delete(API + `/user/${user.id}`)
									.then((r) => {
										console.log(r);
									})
									.catch((err) => {
										console.log(err);
									});
								console.log(err.response.data.message);
								reject(err.response.data.message);
							});
					});
				});
			})
			.catch((err) => {
				console.log(err.response.data.message);
				reject(err.response.data.message);
				if (user) {
					axios
						.delete(API + `/user/${user.id}`)
						.then((r) => {});
				}
			});
	});
};

export const voterLogin = (data) => {
	return new Promise((resolve, reject) => {
		ws.getContract().then((contract) => {
			ws.getCurrentAccount().then((a) => {
				contract.methods
					.login(data.nationalId, data.password)
					.call({from: a})
					.then((r) => {
						if (r.nationalId !== '') {
							resolve(r);
						}
						resolve(false);
					})
					.catch((err) => {
						console.log(
							err.message.replace(
								'Internal JSON-RPC error.',
								''
							)
						);
						console.log();
						let _err = JSON.parse(
							err.message
								.replace('Internal JSON-RPC error.', '')
								.trim()
						)
							.message.split(':')[1]
							.replace('revert', '')
							.trim();
						console.log(_err);
						reject(_err);
					});
			});
		});
	});
};

export const vote = (cId, eId) => {
	return new Promise((resolve, reject) => {
		ws.getContract().then((c) => {
			ws.getCurrentAccount().then((a) => {
				c.methods
					.vote(cId.toString(), eId)
					.send({from: a})
					.on('confirmation', (result) => {
						resolve(result);
					})
					.catch((err) => {
						console.log(err);
						reject(err);
					});
			});
		});
	});
};

export const createPdf = async (data) => {
	try {
		const response = await axios.post(
			API + '/createPdf',
			{data: data},
			{responseType: 'blob'}
		);
		const file = new Blob([response.data], {
			type: 'application/pdf',
		});
		const fileURL = URL.createObjectURL(file);
		return fileURL;
	} catch (err) {
		console.log(err);
	}
};

export const fetchPdf = async (data) => {
	try {
		const response = await axios.get(API + '/fetchPdf', {
			responseType: 'blob',
		});
		const file = new Blob([response.data], {
			type: 'application/pdf',
		});
		saveAs(file, 'certificado.pdf');
	} catch (err) {
		console.log(err);
	}
};

export const sendCertificate = async (
	email,
	startDate,
	nationalId
) => {
	try {
		const certificate = await axios.post(
			API + '/sendCertificate',
			{email, startDate, nationalId}
		);
		if (certificate.data) {
			return true;
		}

		return false;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export const verifyAge = async (diferenciaAnios) => {
	try {
		const contract = await ws.getContract();
		const account = await ws.getCurrentAccount();
		const result = await contract.methods
			.verifyAge(diferenciaAnios)
			.call({from: account});

		return result;
	} catch (err) {
		throw err;
	}
};

export const hasVotingEnded = async (votingEndTime) => {
	try {
		const contract = await ws.getContract();
		const account = await ws.getCurrentAccount();
		const result = await contract.methods
			.hasVotingEnded(votingEndTime)
			.call({from: account});

		return result;
	} catch (err) {
		// get error message from ws service and return it
		console.log(err);
		throw err;
	}
};

export const checkIsVoter = () => {
	return new Promise((resolve, reject) => {
		ws.getContract().then((c) => {
			ws.getCurrentAccount().then((a) => {
				c.methods
					.isVoter()
					.call({from: a})
					.then((r) => {
						resolve(r);
					})
					.catch((err) => {
						reject(err);
					});
			});
		});
	});
};

export const getUser = (uId) => {
	return axios.get(API + '/user/' + uId);
};

export const getActiveElectionsUser = async (
	userDetails
) => {
	let elections = [];
	elections = await getAllElections().then((r) => {
		let allElections = r.data;
		return allElections.filter((e, i) => e.status === true);
	});
	return elections;
};

export const sentVerificationCode = (email) => {
	return axios.post(
		API + '/sendVerificationCode',
		{email: email},
		{withCredentials: true}
	);
};

export const verifyOTP = (otp) => {
	return axios.post(
		API + '/verify',
		{otp: parseInt(otp)},
		{withCredentials: true}
	);
};

export const getElectionDetails = (eId) => {
	return axios.get(API + '/election/' + eId);
};

export const verifyToken = async (token) => {
	let APIResponse = [];

	try {
		let response = await axios.post(
			API + `/user/verify-recaptcha`,
			{
				reCAPTCHA_TOKEN: token,
				Secret_Key: SECRET_KEY,
			}
		);

		APIResponse.push(response['data']);
		return APIResponse;
	} catch (error) {
		console.log(error);
	}
};
