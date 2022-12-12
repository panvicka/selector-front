import { LocalApiItems } from '$lib/apiClient/items';

export const handleCreateNew = async (event, fetchAllFunction) => {
	console.log(event.detail.item);
	await LocalApiItems.createItem({
		name: event.detail.item.name,
		roles: event.detail.item.roles,
		description: event.detail.item.description,
		isLongerThenOneDay: event.detail.item.isLongerThenOneDay,
		groupes: event.detail.item.groupes
	});
	fetchAllFunction(); /* TODO ebert why call this here? */
};

export const handleDeleteItem = async (itemId, fetchAllFunction) => {
	await LocalApiItems.deleteItem(itemId);
	fetchAllFunction(); /* TODO ebert why call this here? */
};

export const handleEditItem = async (event, itemId, fetchAllFunction) => {
	await LocalApiItems.updateItem(itemId, event.detail.item);
	fetchAllFunction(); /* TODO ebert why call this here? */
};

export const getAllPeopleAndRoleCount = async (itemId) => {
	return await LocalApiItems.getItemPeopleAttendance(itemId);
};
