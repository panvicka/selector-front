import type { ItemRequestType } from '$lib/types/item';
import { LocalApiItems } from '$lib/apiClient/items';

export const handleCreateNew = async (event) => {
	return await LocalApiItems.createItem({
		name: event.detail.name,
		roles: event.detail.roles,
		description: event.detail.description,
		isLongerThenOneDay: event.detail.isLongerThenOneDay,
		groupes: event.detail.groupes
	});
};

export const handleDeleteItem = async (itemId) => {
	return await LocalApiItems.deleteItem(itemId);
};

export const handleEditItem = async (event, itemId: Item['_id']) => {
	const editedItem: ItemRequestType = event.detail;
	return await LocalApiItems.updateItem(itemId, editedItem);
};

export const getAllPeopleAndRoleCount = async (itemId) => {
	return await LocalApiItems.getItemPeopleAttendance(itemId);
};
