import { RemoteApiItems } from '../../../../api/item';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params: { itemId } }) => {
	return json(await RemoteApiItems.getItemById(itemId));
};

export const DELETE: RequestHandler = async ({ params: { itemId } }) => {
	const mongoBackendResponse = await RemoteApiItems.deleteItem(itemId);
	return new Response(await mongoBackendResponse.json(), {
		status: mongoBackendResponse.status,
		statusText: mongoBackendResponse.statusText,
		headers: { 'Content-Type': 'application/json' }
	});
};

export const PATCH: RequestHandler = async ({ request, params: { itemId } }) => {
	return json(await RemoteApiItems.updateItem(itemId, await request.json()));
};
