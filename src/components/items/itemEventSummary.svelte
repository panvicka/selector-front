<script>
	// @ts-nocheck

	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import EventDetail from '../events/EventDetail.svelte';
	import { getActiveEvents, getEventsWithFutureDates } from '../../utils/date';

	const dispatch = createEventDispatcher();

	export let item = {};
	export let lastFewEvents = [];
	console.log(lastFewEvents);

	let lastEvent = lastFewEvents[lastFewEvents.length - 1];
	let runningEvents = [];
	let futureEvents = [];

	onMount(async () => {
		futureEvents = getEventsWithFutureDates(lastFewEvents);
		runningEvents = getActiveEvents(lastFewEvents);
	});
</script>

<div class="flex flex-col">
	<div class="w-full">
		<h3>Running</h3>
		<div class="flex flex-wrap flex-row gap-9 ">
			{#if runningEvents.length > 0}
				{#each runningEvents as runningEvent}
					<EventDetail runningEvent={true} event={runningEvent} />
				{/each}
			{:else}
				No running events!
			{/if}
		</div>
	</div>

	{#if lastEvent}
		<h3>Last</h3>
		<div class="flex flex-wrap flex-row gap-9 ">
			<EventDetail event={lastEvent} />
		</div>
	{/if}

	<div class="w-full">
		<h3>Comming up...</h3>
		<div class="flex flex-wrap flex-row gap-9 ">
			{#if futureEvents.length > 0}
				{#each futureEvents as futureEvent}
					<EventDetail event={futureEvent} />
				{/each}
			{:else}
				No comming up event, maybe define one?
			{/if}
		</div>
	</div>
</div>
