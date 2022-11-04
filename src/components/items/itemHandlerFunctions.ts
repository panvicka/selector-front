import { createItem, deleteItem, getItemPeopleAttendance, updateItem } from '../../api/item';

export const handleCreateNew = async (event, fetchAllFunction) => {
	console.log(event.detail.item)
	await createItem({
		name: event.detail.item.name,
		roles: event.detail.item.roles,
		description: event.detail.item.description,
		isLongerThenOneDay: event.detail.item.isLongerThenOneDay,
		groups: event.detail.item.groups
	});
	fetchAllFunction();
};

export const handleDeleteItem = async (itemId, fetchAllFunction) => {
	await deleteItem(itemId);
	fetchAllFunction();
};

export const handleEditItem = async (event, itemId, fetchAllFunction) => {
	await updateItem(itemId, event.detail.item);
	fetchAllFunction();
};

export const getAllPeopleAndRoleCount = async (itemId) => {
	return await getItemPeopleAttendance(itemId);
};
