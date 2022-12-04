<script>
	// @ts-nocheck

	import { createEventDispatcher } from 'svelte';
	import Card from '../general/Card.svelte';

	import * as Icons from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { onMount } from 'svelte';
	import { formatDate, getRemainingTime } from '../../utils/date';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import RoleBadge from '../roles/RoleBadge.svelte';
	import PersonLink from '../people/PersonLink.svelte';
	import Counter from '../general/Counter.svelte';
	import ItemLink from '../items/ItemLink.svelte';

	export let event = {};
	// export let item = null;
	export let runningEvent = false;
	export let futureEvent = false;
	export let highlightPersonId = null;
	export let showItemDetails = false;
	console.log(highlightPersonId);

	dayjs.extend(relativeTime);

	const timeToEnd = getRemainingTime(new Date(event.endDate));
	const timeToStart = getRemainingTime(new Date(event.startDate));
</script>

<div class="card w-96 bg-neutral shadow-xl overflow-visible p-6 h-fit w-200">
	{#if event.item && showItemDetails}
	<h4> 
		<ItemLink item={event.item} />
	</h4>
	{/if}

	{#if runningEvent}
		Ends in
		<Counter days={timeToEnd.days} hours={timeToEnd.hours} />
	{:else if futureEvent}
		Starts in
		<Counter days={timeToStart.days} hours={timeToStart.hours} />
	{/if}
	<br />
	{event.endDate && event.endDate
		? `from ${formatDate(event.startDate)} to ${formatDate(event.endDate)}`
		: `on ${formatDate(event.startDate)}`}
	<br />

	{#each event.participants || [] as participant}
		<div>
			<RoleBadge
				type={highlightPersonId === participant.person._id ? 'primary' : 'ghost'}
				role={participant.role}
			/>:<PersonLink
				person={participant.person}
				type={highlightPersonId === participant.person._id && 'primary'}
			/>
		</div>
	{/each}
</div>
