import { createEvent, updateEvent, deleteEvent } from '../../api/event';

export const handleCreateNewEvent = async (event, item) => {
	console.log(event.participants);
	const payload = {
		item: item._id,
		people: event.people,
		startDate: event.startDate,
		endDate: event.endDate,
		participants: event.participants
	};

	await createEvent(payload);
};

export const handleUpdateEvent = async (event, refetchFunction) => {
	await updateEvent(event._id, {
		item: event.item._id,
		people: event.people,
		startDate: event.startDate,
		endDate: event.endDate,
		participants: event.participants
	});

	if (typeof refetchFunction === 'function') {
		refetchFunction();
	}
};

export const handleDeleteEvent = async (event, refetchFunction) => {
	await deleteEvent(event._id);
	if (typeof refetchFunction === 'function') {
		refetchFunction();
	}
};
