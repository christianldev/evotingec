import axios from 'axios';

const API = import.meta.env.VITE_API;

export const authenticateUser = (data) => {
	const {nationalId} = data;

	return new Promise((resolve, reject) => {
		// get user by nationalId and send in body to backend
		axios
			.get(API + '/auth', {
				headers: {nationalId: nationalId},
			})
			.then((r) => {
				resolve(r);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};
