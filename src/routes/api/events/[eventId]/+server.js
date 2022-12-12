import {RemoteApiEvents} from "../../../../api/event.js";

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params: { eventId } }) {
	return RemoteApiEvents.deleteEvent(eventId);
}
