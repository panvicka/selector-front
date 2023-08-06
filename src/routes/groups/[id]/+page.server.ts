import { error } from '@sveltejs/kit';
import { RemoteApiGroups } from '../../../api/groups';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const res = await RemoteApiGroups.getGroupById(params.id).catch((e) => {
		console.log('There has been a problem with your fetch operation: ' + e.message);
	});

	if (res) return res;

	throw error(404, {
		message: 'Group was not found',
		button: {
			text: 'See all groupes',
			icon: 'faPeopleGroup',
			link: '/groups'
		}
	});
}
