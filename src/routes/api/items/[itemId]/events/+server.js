import { RemoteApiEvents } from '../../../../../api/event';
import { serializeToResponse } from '$lib/apiClient/serializeToResponse';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params: { itemId } }) {
	return serializeToResponse(await RemoteApiEvents.getAllEventsForItem(itemId));
}
