import type { Item, ItemRequestType } from '$lib/types/item';

import { LocalApiItems } from '$lib/apiClient/items';

export const handleCreateNewItem = async (event: CustomEvent<ItemRequestType>) => {
	return await LocalApiItems.createItem(event.detail);
};

export const handleDeleteItem = async (itemId: Item['_id']) => {
	return await LocalApiItems.deleteItem(itemId);
};

export const handleEditItem = async (event: CustomEvent<ItemRequestType>, itemId: Item['_id']) => {
	return await LocalApiItems.updateItem(itemId, event.detail);
};

export const getAllPeopleAndRoleCount = async (itemId: Item['_id']) => {
	return await LocalApiItems.getItemPeopleAttendance(itemId);
};
