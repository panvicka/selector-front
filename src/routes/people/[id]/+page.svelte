<script>
	export let data;
	import PersonDetail from '../../../components/personDetail.svelte';
	import { onMount } from 'svelte';
	import { getActiveEvents, getEventsWithFutureDates } from '../../../utils/date';
	import Loader from '../../../components/general/Loader.svelte';
	import Error from '../../../components/general/Error.svelte';
	import { LocalApiPeople } from '$lib/apiClient/people';

	export let person;
	let isLoading = true;
	let allAttendedEvents = [];
	let futureEvents = [];
	let runningEvents = [];

	let invalidPerson = false;

	console.log(data);

	onMount(async () => {
		if (data._id) {
			allAttendedEvents = await LocalApiPeople.getAllPersonEvents(data._id);

			futureEvents = getEventsWithFutureDates(allAttendedEvents);
			runningEvents = getActiveEvents(allAttendedEvents);
			console.log('future events');
			console.log(futureEvents);
			console.log('running events');
			console.log(runningEvents);
			isLoading = false;
		} else {
			invalidPerson = true;
			isLoading = false;
		}
	});
</script>

{#if isLoading}
	<Loader />
{:else if invalidPerson}
	<Error
		>Uh no. This person doesnt exist.
		<a class="link" href="/people">Check all people here.</a>
	</Error>
{:else}
	<PersonDetail person={data} {futureEvents} {runningEvents} />
{/if}
