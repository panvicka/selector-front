<script>
	export let data;
	import PersonDetail from '../../../components/personDetail.svelte';
	import { onMount } from 'svelte';
	import { getAllEventsForPerson } from '../../../components/people/peopleHandlerFunctions';
	import { getActiveEvents, getEventsWithFutureDates } from '../../../utils/date';
	import Loader from '../../../components/general/Loader.svelte';

	export let person;
	let isLoading = true;
	let allAttendedEvents = [];
	let futureEvents = [];
	let runningEvents = [];

	onMount(async () => {
		allAttendedEvents = await getAllEventsForPerson(data._id);

		futureEvents = getEventsWithFutureDates(allAttendedEvents);
		runningEvents = getActiveEvents(allAttendedEvents);
		console.log('future events');
		console.log(futureEvents);
		console.log('running events');
		console.log(runningEvents);
		isLoading = false;
	});
</script>

{#if isLoading}
	<Loader />
{:else}
	<PersonDetail person={data} {futureEvents} {runningEvents} />
{/if}
