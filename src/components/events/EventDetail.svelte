<script>
	// @ts-nocheck

	import { createEventDispatcher } from 'svelte';
	import Card from '../general/Card.svelte';

	import * as Icons from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { onMount } from 'svelte';
	import { formatDate } from '../../utils/date';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import RoleBadge from '../roles/RoleBadge.svelte';
	import PersonLink from '../people/PersonLink.svelte';

	export let event = {};
	export let runningEvent = false;
	dayjs.extend(relativeTime);
</script>

<div class="card w-96 bg-neutral shadow-xl overflow-visible p-6 h-fit w-200">
	{event.endDate && event.endDate
		? `from ${formatDate(event.startDate)} to ${formatDate(event.endDate)}`
		: `on ${formatDate(event.startDate)}`}

	<br />
	{!runningEvent ? dayjs(event.startDate).fromNow() : ''}

	{#each event.participants || [] as participant}
		<div>
			<RoleBadge role={participant.role} />:<PersonLink person={participant.person} />
		</div>
	{/each}
</div>
