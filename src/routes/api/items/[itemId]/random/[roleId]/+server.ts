import { json } from '@sveltejs/kit';
import { RemoteApiItems } from 'api/item';
import type { RequestHandler } from '../../$types';

// todo why i have type error here? the roleId exists
export const POST: RequestHandler = async ({ request, params: { itemId, roleId } }) => {
	return json(
		await RemoteApiItems.getRandomizedPeopleForAttendance(itemId, roleId, await request.json())
	);
};
