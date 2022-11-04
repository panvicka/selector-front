import Api from '../services/Api';

export const getAllItems = async () => {
	try {
		const response = await Api.get('/rotationItems/get/');
		return response.rotationItems;
	} catch (error) {
		console.error(error);
	}
};

export const deleteItem = async (itemId) => {
	try {
		const response = await Api.delete(`/rotationItems/delete/${itemId}`);
		return response.rotationItems;
	} catch (error) {
		console.error(error);
	}
};

export const updateItem = async (itemId, payload) => {
	try {
		const response = await Api.patch(`/rotationItems/update/${itemId}`, payload);
		return response.rotationItemId;
	} catch (error) {
		console.error(error);
	}
};

export const createItem = async (payload) => {
	try {
		// to do trimm trailing spaces
		console.log(payload);
		const response = await Api.post(`/rotationItems/create/`, payload);
 		return response.rotationItemId;
	} catch (error) {
		console.error(error);
	}
};

export const getItemById = async (itemId) => {
	try {
		const response = await Api.get(`/rotationItems/get/${itemId}`);
 		return response.rotationItemId;
	} catch (error) {
		console.error(error);
	}
};

export const getItemPeopleAttendance = async (itemId) => {
	try {
		const response = await Api.get(`/rotationItems/get/${itemId}/peopleCount`);
 		return response.attendanceByRole;
	} catch (error) {
		console.error(error);
	}
};
