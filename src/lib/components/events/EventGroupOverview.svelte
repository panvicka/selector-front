<script lang="ts">
	import type { Event } from '$lib/types/event';
	import EventDetail from './EventDetail.svelte';

	export let eventArray: Event[] = [];
	export let highlightPersonId = '';
	export let runningEvent = false;
	export let futureEvent = false;
	export let showItemDetails = false;
	$: dataTestIds = $$props['data-testid'];
</script>

<div class="mt-1 mr-5  w-full" data-testid={dataTestIds}>
	{#if eventArray.length > 0}
		<h4 class="text-2xl font-bold mb-5">
			<slot name="title" />
		</h4>
	{/if}

	<div class="lg:flex lg:flex-row lg:gap-9">
		{#if eventArray.length > 0}
			{#each eventArray as event}
				<EventDetail
					on:delete
					on:edit
					{showItemDetails}
					{runningEvent}
					{futureEvent}
					{event}
					{highlightPersonId}
				/>
			{/each}
		{/if}
	</div>
</div>
