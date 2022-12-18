import ClientAPI from '$lib/apiClient/ClientAPI.js';
import type { Event } from '$lib/types/event';
import type { Item } from '$lib/types/item';

export const LocalApiItems = {
	getAllEvents: async (itemId: string): Promise<Event[]> => {
		return await ClientAPI.get(`/items/${itemId}/events`);
	},

	getAllItems: async (): Promise<Item[]> => {
		return await ClientAPI.get(`/items`);
	},

	getItem: async (itemId: string): Promise<Item> => {
		return await ClientAPI.get(`/items/${itemId}`);
	},

	/* TODO types for return */
	getItemPeopleAttendance: async (itemId: string): Promise<unknown> => {
		return await ClientAPI.get(`/items/${itemId}/attendance`);
	},

	/* TODO types for payloads and return */
	createItem: async (payload: unknown): Promise<unknown> => {
		return await ClientAPI.post(`/items`, payload);
	},

	/* TODO types for return */
	deleteItem: async (itemId: string): Promise<unknown> => {
		return await ClientAPI.delete(`/items/${itemId}`);
	},

	/* TODO types for payloads and return */
	updateItem: async (itemId: string, payload: unknown): Promise<unknown> => {
		return await ClientAPI.patch(`/items/${itemId}`, payload);
	}
};
