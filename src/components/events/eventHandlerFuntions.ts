import {RemoteApiEvents} from '../../api/event';

export const handleCreateNewEvent = async (event, item) => {
	const payload = {
		item: item._id,
		people: event.people,
		startDate: event.startDate,
		endDate: event.endDate,
		participants: event.participants
	};

	await RemoteApiEvents.createEvent(payload);
};

export const handleUpdateEvent = async (event, refetchFunction) => {
	await RemoteApiEvents.updateEvent(event._id, {
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
	await RemoteApiEvents.deleteEvent(event._id);
	if (typeof refetchFunction === 'function') {
		refetchFunction();
	}
};
