import Api from '../services/Api';

export const getAllRoles = async () => {
	try {
		const response = await Api.get('/roles/get/');
		return response.roles;
	} catch (error) {
		console.error(error);
	}
};


export const deleteRole = async (roleId) => {
	try {
		const response = await Api.delete(`/roles/delete/${roleId}`);
		return response.role;
	} catch (error) {
		console.error(error);
	}
};

export const updateRole = async (roleId, payload) => {
	try {
		const response = await Api.patch(`/roles/update/${roleId}`, payload);
		return response.roleId;
	} catch (error) {
		console.error(error);
	}
};

export const createRole = async (payload) => {
    console.log(payload)
	try {
		const response = await Api.post(`/roles/create/`, payload);
		return response.roleId;
	} catch (error) {
		console.error(error);
	}
};

export const getRoleById = async (roleId) => {
	try {
		const response = await Api.get(`/roles/get/${roleId}`);
		return response.roleId;
	} catch (error) {
		console.error(error);
	}
};
