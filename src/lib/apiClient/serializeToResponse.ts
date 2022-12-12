export const serializeToResponse = (data: unknown) => {
	return new Response(JSON.stringify(data));
};
