<script>
	// @ts-nocheck

	import EventGroupOverview from '$lib/components/events/EventGroupOverview.svelte';

	export let person;
	export let futureEvents = [];
	export let runningEvents = [];
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

<style>
	.top {
		margin-top: 5em;
	}
</style>
