// TODO switch to private var, when RemoteAPI is called only server side import { env } from '$env/dynamic/private';
import { env } from '$env/dynamic/private';

const opsGenieRequest = async () => {
	const response = await fetch(
		`https://api.opsgenie.com/v2/schedules/b2700d37-4eb7-4f4e-9019-dc2eecef0b09/on-calls`,
		{
			headers: {
				Authorization: `GenieKey ${env.PRIVATE_OCD_API_KEY}`,
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			}
		}
	);
	return await response.json();
};

export default opsGenieRequest;
