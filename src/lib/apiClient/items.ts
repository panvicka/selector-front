import ClientAPI from '$lib/apiClient/ClientAPI.js';

export const LocalApiItems = {
	getAllEvents: async (itemId: string) => {
		return await ClientAPI.get(`/items/${itemId}/events`);
	},

	getAllItems: async () => {
		return await ClientAPI.get(`/items`);
	},

	getItem: async (itemId: string) => {
		return await ClientAPI.get(`/items/${itemId}`);
	},

	getItemPeopleAttendance: async (itemId: string) => {
		return await ClientAPI.get(`/items/${itemId}/attendance`);
	},

	createItem: async (payload: unknown) => {
		return await ClientAPI.post(`/items`, payload);
	},

	deleteItem: async (itemId: string) => {
		return await ClientAPI.delete(`/items/${itemId}`);
	},

	updateItem: async (itemId: string, payload: unknown) => {
		return await ClientAPI.patch(`/items/${itemId}`, payload);
	}
};
