import type { RequestHandler } from './$types';
import { RemoteApiEvents } from '../../../api/event';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	return json(await RemoteApiEvents.createEvent(await request.json()));
};
