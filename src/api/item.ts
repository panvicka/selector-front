import Api from './RemoteAPI';
import type { Item } from '../../types/item';

export const RemoteApiItems = {
	getAllItems: async (): Promise<Item[]> => {
		try {
			const response = await Api.get('/rotationItems/get/');
			return response.rotationItems;
		} catch (error) {
			console.error(error);
			return [];
		}
	},

	deleteItem: async (itemId?: string) => {
		try {
			const response = await Api.delete(`/rotationItems/delete/${itemId}`);
			return response.rotationItems;
		} catch (error) {
			console.error(error);
		}
	},

	updateItem: async (itemId?: string, payload?: Item): Promise<void> => {
		try {
			return await Api.patch(`/rotationItems/update/${itemId}`, payload);
		} catch (error) {
			console.error(error);
		}
	},

	createItem: async (payload: Item) => {
		try {
			// to do trimm trailing spaces
			console.log(payload);
			const response = await Api.post(`/rotationItems/create/`, payload);
			return response.rotationItemId;
		} catch (error) {
			console.error(error);
		}
	},

	getItemById: async (itemId?: string) => {
		try {
			const response = await Api.get(`/rotationItems/get/${itemId}`);
			return response.rotationItemId;
		} catch (error) {
			console.error(error);
		}
	},

	getItemPeopleAttendance: async (itemId?: string): Promise<Item | null> => {
		try {
			const response = await Api.get(`/rotationItems/get/${itemId}/peopleCount`);
			return response.attendanceByRole;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
};
