import { LocalApiEvents } from '$lib/apiClient/events';
import type { Item } from '../../../types/item';
import type { Event } from '../../../types/event';

export const handleCreateNewEvent = async (event: Event, item: Item) => {
	const payload = {
		item: item._id,
		people: event.people,
		startDate: event.startDate,
		endDate: event.endDate,
		participants: event.participants
	};
	return await LocalApiEvents.createEvent(payload);
};

export const handleUpdateEvent = async (event: Event) => {
	return await LocalApiEvents.updateEvent(event._id, {
		item: event.item._id,
		people: event.people,
		startDate: event.startDate,
		endDate: event.endDate,
		participants: event.participants
	});
};

export const handleDeleteEvent = async (event: Event) => {
	return await LocalApiEvents.deleteEvent(event._id);
};
