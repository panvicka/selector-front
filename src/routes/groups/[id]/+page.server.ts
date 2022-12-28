import { RemoteApiGroups } from '../../../api/groups';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	// console.log("params")
	// console.log(params);
	const res = await RemoteApiGroups.getGroupById(params.id);
	// console.log("response in page server")
	// console.log(res)
	return res;
}
