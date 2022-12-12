import { RemoteApiItems } from '../../../api/item';
import { serializeToResponse } from '$lib/apiClient/serializeToResponse';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return serializeToResponse(await RemoteApiItems.getAllItems());
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	return serializeToResponse(await RemoteApiItems.createItem(await request.json()));
}
