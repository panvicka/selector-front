import { RemoteApiPeople } from '../../../api/people';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const res = await RemoteApiPeople.getPersonById(params.id).catch((e) => {
		console.log('There has been a problem with your fetch operation: ' + e.message);
	});

	if (res) return res;

	throw error(404, {
		message: 'Person was not found',
		button: {
			text: 'See all people',
			icon: 'faPerson',
			link: '/people'
		}
	});
}
