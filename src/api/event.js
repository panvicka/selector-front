import Api from '../services/Api';

export const getAllEvents = async () => {
	try {
		const response = await Api.get('/rotationEvents/get/');
		return response.rotationEvents;
	} catch (error) {
		console.error(error);
	}
};

export const getAllEventsForItem = async (itemId) => {
	try {
		const response = await Api.get(`/rotationEvents/get/?item=${itemId}`);
		return response.rotationEvents;
	} catch (error) {
		console.error(error);
	}
};

export const deleteEvent = async (eventId) => {
	try {
		const response = await Api.delete(`/rotationEvents/delete/${eventId}`);
		return response.message;
	} catch (error) {
		console.error(error);
	}
};

export const updateEvent = async (eventId, payload) => {
	try {
		const response = await Api.patch(`/rotationEvents/update/${eventId}`, payload);
		return response.rotationEvents;
	} catch (error) {
		console.error(error);
	}
};

export const createEvent = async (payload) => {
	console.log(payload);
	try {
		const response = await Api.post(`/rotationEvents/create/`, payload);
		return response.rotationEventId;
	} catch (error) {
		console.error(error);
	}
};

export const getEventById = async (eventId) => {
	try {
		const response = await Api.get(`/rotationEvents/get/${eventId}`);
		return response.rotationEventId;
	} catch (error) {
		console.error(error);
	}
};
