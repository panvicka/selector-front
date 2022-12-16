import { RemoteApiEvents } from '../../../../../api/event';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params: { itemId } }) => {
	return json(await RemoteApiEvents.getAllEventsForItem(itemId));
};
