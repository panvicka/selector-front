import { getItemById } from './../../../api/item';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const res = await getItemById(params.id);
	return res;
}
