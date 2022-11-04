import Api from '../services/Api';

export const getAllPeople = async () => {
	try {
		const response = await Api.get('/person/get/');
		return response.persons;
	} catch (error) {
		console.error(error);
	}
};

export const getAllPeopleByItem = async (itemId) => {
	try {
		const response = await Api.get(`/person/get/?item=${itemId}`);
		return response.persons;
	} catch (error) {
		console.error(error);
	}
};

export const deletePerson = async (personId) => {
	try {
		const response = await Api.delete(`/person/delete/${personId}`);
		return response.person;
	} catch (error) {
		console.error(error);
	}
};

export const updatePerson = async (personId, payload) => {
	try {
		const response = await Api.patch(`/person/update/${personId}`, payload);
		return response.personId;
	} catch (error) {
		console.error(error);
	}
};

export const createPerson = async (payload) => {
	try {
		const response = await Api.post(`/person/create/`, payload);
		return response.personId;
	} catch (error) {
		console.error(error);
	}
};

export const getPersonById = async (personId) => {
	try {
		const response = await Api.get(`/person/get/${personId}`);
		return response.personId;
	} catch (error) {
		console.error(error);
	}
};
