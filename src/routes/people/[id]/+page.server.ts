import { getPersonById } from './../../../api/people';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const res = await getPersonById(params.id);
	return res;
}
