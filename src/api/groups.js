import Api from '../services/Api';

export const getAllGroups = async () => {
	try {
		const response = await Api.get('/groups/get/');
		return response.groups;
	} catch (error) {
		console.error(error);
	}
};


export const deleteGroup = async (groupId) => {
	try {
		const response = await Api.delete(`/groups/delete/${groupId}`);
		return response.group;
	} catch (error) {
		console.error(error);
	}
};

export const updateGroups = async (groupId, payload) => {
	try {
		const response = await Api.patch(`/groups/update/${groupId}`, payload);
		return response.groupId;
	} catch (error) {
		console.error(error);
	}
};

export const createGroup = async (payload) => {
	console.log("...")
	console.log(payload);
 	try {
		const response = await Api.post(`/groups/create/`, payload);
		return response.groupId;
	} catch (error) {
		console.error(error);
	}
};

export const getGroupById = async (groupId) => {
	try {
		const response = await Api.get(`/groups/get/${groupId}`);
		return response.groupId;
	} catch (error) {
		console.error(error);
	}
};
