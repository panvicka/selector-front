import type { ItemRequestType } from '$lib/types/item';
import { LocalApiItems } from '$lib/apiClient/items';

export const handleCreateNew = async (event) => {
	return await LocalApiItems.createItem({
		name: event.detail.item.name,
		roles: event.detail.item.roles,
		description: event.detail.item.description,
		isLongerThenOneDay: event.detail.item.isLongerThenOneDay,
		groupes: event.detail.item.groupes
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
