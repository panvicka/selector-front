<script>
	// @ts-nocheck
	import { getActiveEvents, getEventsWithFutureDates } from '../utils/date';

	import { onMount } from 'svelte';
	import { getAllEventsForPerson } from './people/peopleHandlerFunctions';
	import EventDetail from './events/EventDetail.svelte';
	import EventGroupOverview from './events/EventGroupOverview.svelte';

	export let person;
	let isLoading = true;
	// export let allAttendedEvents = [];
	export let futureEvents = [];
	export let runningEvents = [];

	// onMount(async () => {
	// 	allAttendedEvents = await getAllEventsForPerson(person._id);
	// 	isLoading = false;

	// 	futureEvents = getEventsWithFutureDates(allAttendedEvents);
	// 	runningEvents = getActiveEvents(allAttendedEvents);
	// 	console.log(futureEvents);
	// 	console.log(runningEvents);
	// });
</script>

<div class="top prose">
	<h1><span class="text-accent"> {person.name}</span>'s details</h1>
</div>

<EventGroupOverview
	showItemDetails={true}
	runningEvent={true}
	eventArray={runningEvents}
	highlightPersonId={person._id}
>
	<svelte:fragment slot="title">Events running</svelte:fragment>
	<p slot="noEventsText">Looks like you are free :)</p>
</EventGroupOverview>

<EventGroupOverview
	showItemDetails={true}
	futureEvent={true}
	eventArray={futureEvents}
	highlightPersonId={person._id}
>
	<svelte:fragment slot="title">Comming up</svelte:fragment>
	<p slot="noEventsText">There is nothing planned for you yet.</p>
</EventGroupOverview>

<!-- <div class="w-full">
	<h3>Running</h3>
	<div class="flex flex-wrap flex-row gap-9 ">
		{#if runningEvents.length > 0}
			{#each runningEvents as runningEvent}
				<EventDetail runningEvent={true} event={runningEvent} highlightPersonId={person._id} />
			{/each}
		{:else}{/if}
	</div>
</div> -->

<!-- 
<div class="w-full">
	<h3>Comming up...</h3>
	<div class="flex flex-wrap flex-row gap-9 ">
		{#if futureEvents.length > 0}
			{#each futureEvents as futureEvent}
				<EventDetail event={futureEvent} highlightPersonId={person._id} />
			{/each}
		{:else}
			No comming up event, maybe define one?
		{/if}
	</div>
</div> -->
<style>
	.top {
		margin-top: 5em;
	}
</style>
