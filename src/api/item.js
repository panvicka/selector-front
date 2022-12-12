import Api from './RemoteAPI';

export const RemoteApiItems = {
	getAllItems: async () => {
		try {
			const response = await Api.get('/rotationItems/get/');
			return response.rotationItems;
		} catch (error) {
			console.error(error);
		}
	},

	deleteItem: async (itemId) => {
		try {
			const response = await Api.delete(`/rotationItems/delete/${itemId}`);
			return response.rotationItems;
		} catch (error) {
			console.error(error);
		}
	},

	updateItem: async (itemId, payload) => {
		try {
			const response = await Api.patch(`/rotationItems/update/${itemId}`, payload);
			return response.rotationItemId;
		} catch (error) {
			console.error(error);
		}
	},

	createItem: async (payload) => {
		try {
			// to do trimm trailing spaces
			console.log(payload);
			const response = await Api.post(`/rotationItems/create/`, payload);
			return response.rotationItemId;
		} catch (error) {
			console.error(error);
		}
	},

	getItemById: async (itemId) => {
		try {
			const response = await Api.get(`/rotationItems/get/${itemId}`);
			return response.rotationItemId;
		} catch (error) {
			console.error(error);
		}
	},

	getItemPeopleAttendance: async (itemId) => {
		try {
			const response = await Api.get(`/rotationItems/get/${itemId}/peopleCount`);
			return response.attendanceByRole;
		} catch (error) {
			console.error(error);
		}
	}
};
