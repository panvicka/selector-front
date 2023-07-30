import { json } from '@sveltejs/kit';
import { RemoteApiItems } from 'api/item';
import type { RequestHandler } from '../../$types';

export const GET: RequestHandler = async ({ params, url }) => {
	// todo why is this not working? the roleId is there
	const { itemId, roleId } = params;

	const daysSince = url.searchParams.get('days-since');
	const lessThenAverage = url.searchParams.get('less-average');
	const notAlreadyPlanned = url.searchParams.get('not-planned');
	const hasDoneTheRole = url.searchParams.get('has-done');

	return json(
		await RemoteApiItems.getRandomizedPeopleForAttendance(itemId, roleId, {
			daysSince,
			lessThenAverage,
			notAlreadyPlanned,
			hasDoneTheRole
		})
	);
};
