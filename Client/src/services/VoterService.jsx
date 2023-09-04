import Web3Service from './Web3Service';
import axios from 'axios';
import {getAllElections} from './AdminService';

const API = import.meta.env.VITE_API;
const ws = new Web3Service();

export const registerVoter = (data) => {
	let user = null;
	return new Promise((resolve, reject) => {
		axios
			.post(API + '/user', data)
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
						console.log(r);
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

// export const vote = (
// 	cId,
// 	eId,
// 	diferenciaAnios,
// 	unixEndDate
// ) => {
// 	return new Promise((resolve, reject) => {
// 		ws.getContract().then((c) => {
// 			ws.getCurrentAccount().then((a) => {
// 				c.methods
// 					.vote(
// 						cId.toString(),
// 						eId,
// 						diferenciaAnios,
// 						unixEndDate
// 					)
// 					.send({from: a})
// 					.on('confirmation', (result) => {
// 						resolve(result);
// 					})
// 					.catch((err) => {
// 						console.log(err);
// 						reject(err);
// 					});
// 			});
// 		});
// 	});
// };

export const vote = async (cId, eId) => {
	try {
		const contract = await ws.getContract();
		const account = await ws.getCurrentAccount();
		const result = await contract.methods
			.vote(cId.toString(), eId)
			.send({from: account});
		console.log(result);
		return result;
	} catch (err) {
		// get error message from ws service and return it
		console.log(err);
		throw err;
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

export const hasVotingEnded = async (unixEndDate) => {
	console.log(unixEndDate);
	try {
		const contract = await ws.getContract();
		const account = await ws.getCurrentAccount();
		const result = await contract.methods
			.hasVotingEnded(unixEndDate)
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
		return allElections.filter(
			(e, i) =>
				e.status === true &&
				e.constituencyId === userDetails.constituencyId
		);
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
