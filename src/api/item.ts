import Api from './RemoteAPI';
import type { Item } from '$lib/types/item';

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
			return response.message;
		} catch (error) {
			console.error(error);
		}
	},

	updateItem: async (itemId?: string, payload?: Item): Promise<void> => {
		try {
			const response = await Api.patch(`/rotationItems/update/${itemId}`, payload);
			return response.rotationItem;
		} catch (error) {
			console.error(error);
		}
	},

	createItem: async (payload: Item) => {
		try {
			// to do trimm trailing spaces
			const response = await Api.post(`/rotationItems/create/`, payload);
			return response.rotationItem;
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

	getItemEvents: async (itemId?: string, timeRange?: string | null, limit?: string | null) => {
		const params = new URLSearchParams();

		if (timeRange) {
			params.append('timeRange', timeRange);
		}
		if (limit) {
			params.append('limit', limit.toString());
		}

		try {
			const response = await Api.get(
				`/rotationItems/get/${itemId}/events${params && `?${params}`}`
			);
			return response.events;
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
	},

	getRandomizedPeopleForAttendance: async (
		itemId: string,
		roleId: string,
		{
			daysSince,
			lessThenAverage,
			notAlreadyPlanned,
			hasDoneTheRole
		}: {
			daysSince?: string | null;
			lessThenAverage?: string | null;
			notAlreadyPlanned?: string | null;
			hasDoneTheRole?: string | null;
		}
	): Promise<Item | null> => {
		const params = new URLSearchParams();

		if (daysSince) {
			params.append('days-since', daysSince.toString());
		}
		if (lessThenAverage) {
			params.append('less-average', lessThenAverage.toString());
		}
		if (notAlreadyPlanned) {
			params.append('not-planned', notAlreadyPlanned.toString());
		}
		if (hasDoneTheRole) {
			params.append('has-done', hasDoneTheRole.toString());
		}

		try {
			const response = await Api.get(
				`/rotationItems/get/${itemId}/randomize/${roleId}${params && `?${params}`}`
			);
			return response.possibleMatches;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
};
