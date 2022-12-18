<script>
	// @ts-nocheck

	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
 	import { getActiveEvents, getEventsWithFutureDates, getLastEvent } from 'utils/date';
	import EventGroupOverview from 'components/events/EventGroupOverview.svelte';

	const dispatch = createEventDispatcher();

	export let item = {};
	export let lastFewEvents = [];
	console.log(lastFewEvents);

	let lastEvent = getLastEvent(lastFewEvents);
	let runningEvents = [];
	let futureEvents = [];

	onMount(async () => {
		futureEvents = getEventsWithFutureDates(lastFewEvents);
		runningEvents = getActiveEvents(lastFewEvents);
	});
</script>

<EventGroupOverview runningEvent={true} eventArray={runningEvents}>
	<svelte:fragment slot="title">Events running</svelte:fragment>
	<p slot="noEventsText">No running events!</p>
</EventGroupOverview>

<EventGroupOverview futureEvent={true} eventArray={futureEvents}>
	<svelte:fragment slot="title">Comming up...</svelte:fragment>
	<p slot="noEventsText">No comming up event, maybe define one?</p>
</EventGroupOverview>
