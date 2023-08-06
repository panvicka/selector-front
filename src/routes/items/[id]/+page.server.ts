import { RemoteApiItems } from '../../../api/item';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const res = await RemoteApiItems.getItemById(params.id).catch((e) => {
		console.log('There has been a problem with your fetch operation: ' + e.message);
	});

	if (res) return res;

	throw error(404, {
		message: 'Item was not found',
		button: {
			text: 'See all items',
			icon: 'faHome',
			link: '/'
		}
	});
}
