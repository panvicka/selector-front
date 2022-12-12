import RemoteAPI from './RemoteAPI';

export const RemoteApiEvents = {
	getAllEventsForItem: async (itemId) => {
		try {
			const response = await RemoteAPI.get(`/rotationEvents/get/?item=${itemId}`);
			return response.rotationEvents;
		} catch (error) {
			console.error(error);
		}
	},

	deleteEvent: async (eventId) => {
		try {
			const response = await RemoteAPI.delete(`/rotationEvents/delete/${eventId}`);
			return response.message;
		} catch (error) {
			console.error(error);
		}
	},

	updateEvent: async (eventId, payload) => {
		try {
			const response = await RemoteAPI.patch(`/rotationEvents/update/${eventId}`, payload);
			return response.rotationEvents;
		} catch (error) {
			console.error(error);
		}
	},

	createEvent: async (payload) => {
		console.log(payload);
		try {
			const response = await RemoteAPI.post(`/rotationEvents/create/`, payload);
			return response.rotationEventId;
		} catch (error) {
			console.error(error);
		}
	},

	getEventById: async (eventId) => {
		try {
			const response = await RemoteAPI.get(`/rotationEvents/get/${eventId}`);
			return response.rotationEventId;
		} catch (error) {
			console.error(error);
		}
	}
};
