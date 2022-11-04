import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const url = `http://localhost:9090/person/get/`;
	const res = await fetch(url);

	const data = await res.json();
	if (data) {
		return data;
	}

	throw error(404, 'Not found');
}
