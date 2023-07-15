<script lang="ts">
	import PersonDetail from 'components/people/personDetail.svelte';
	import { onMount } from 'svelte';
	import { getActiveEvents, getEventsWithFutureDates } from 'utils/date';
	import Load from 'components/general/Load.svelte';
	import Error from 'components/general/Error.svelte';
	import { LocalApiPeople } from '$lib/apiClient/people';
	import type { Person } from '$lib/types/person';
	import type { Event } from '$lib/types/event';

	export let data: Person;
	let isLoading = true;
	let allAttendedEvents: Array<Event> = [];
	let futureEvents: Array<Event> = [];
	let runningEvents: Array<Event> = [];

	onMount(async () => {
		if (data._id) {
			allAttendedEvents = await LocalApiPeople.getAllPersonEvents(data._id);
			futureEvents = getEventsWithFutureDates(allAttendedEvents);
			runningEvents = getActiveEvents(allAttendedEvents);
			isLoading = false;
		} else {
			isLoading = false;
		}
	});
</script>

{#if isLoading}
	<Load />
{:else}
	<PersonDetail person={data} {futureEvents} {runningEvents} />
{/if}
