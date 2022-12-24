<script lang="ts">
	import EventTable from 'components/events/eventTable.svelte';
	import EventForm from 'components/forms/eventForm.svelte';
	import Modal from 'components/general/Modal.svelte';
	import { onMount } from 'svelte';
	import PeopleTable from 'components/people/peopleTable.svelte';
	import { getAllSelectablePeople } from 'components/people/peopleHandlerFunctions';
	import {
		handleCreateNewEvent,
		handleUpdateEvent,
		handleDeleteEvent
	} from '$lib/components/events/eventHandlerFuntions';
	import ConfirmDeleteAction from 'components/general/ConfirmDeleteAction.svelte';
	import { getAllPeopleAndRoleCount } from './itemHandlerFunctions';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import ItemEventSummary from './itemEventSummary.svelte';
	import Loader from 'components/general/Loader.svelte';
	import Error from 'components/general/Error.svelte';
	import { LocalApiItems } from '$lib/apiClient/items';
	import type { Item } from '$lib/types/item';
	import type { Event } from '$lib/types/event';
	import type { Person } from '$lib/types/person';
	import { LocalApiEvents } from '$lib/apiClient/events.js';

	export let item: Item;

	let itemEvents: Array<Event> = [];
	let selectablePeople: Array<Person> = [];
	let workingEventReference: Event;

	let showCreateEventModalOpened = false;
	let showEditModalOpened = false;
	let showDeleteEventModal = false;

	let isLoading = true;

	let nonExistingItem = false;

	onMount(async () => {
		if (item._id) {
			selectablePeople = await getAllSelectablePeople(item._id);
			console.log('selecteable people');
			console.log(item._id);
			console.log(selectablePeople);
			await fetchAllItemEvents();
			isLoading = false;
		} else {
			nonExistingItem = true;
		}
	});

	const fetchAllItemEvents = async () => {
		itemEvents = await LocalApiItems.getAllEvents(item._id);
	};
</script>

{#if !nonExistingItem}
	<div class="info">
		<div class="prose max-w-none">
			<h1 class="">Detail of <span class="text-accent">{item.name}</span></h1>

			{#if isLoading}
				<Loader />
			{:else}
				{#if itemEvents.length > 0}
					<ItemEventSummary lastFewEvents={itemEvents.slice(-10)} />
				{/if}

				<button
					class="btn btn-accent"
					on:click={() => {
						showCreateEventModalOpened = true;
					}}><Fa size="lg" class="add-new-tracking-icon" icon={faPlus} /> Add new event</button
				>
			{/if}
		</div>
	</div>

	{#if showCreateEventModalOpened}
		<Modal>
			<EventForm
				title={'Create new event'}
				peopleToSelectFrom={selectablePeople}
				{item}
				on:close={() => {
					showCreateEventModalOpened = false;
				}}
				on:submit={(event) => {
					handleCreateNewEvent(event.detail, item).then(() => {
						showCreateEventModalOpened = false;
						fetchAllItemEvents();
					});
				}}
			/>
		</Modal>
	{/if}

	{#if showEditModalOpened}
		<Modal>
			<EventForm
				title={'Edit event'}
				peopleToSelectFrom={selectablePeople}
				event={workingEventReference}
				{item}
				on:close={() => {
					showEditModalOpened = false;
				}}
				on:submit={(event) => {
					handleUpdateEvent(event.detail).then(() => {
						showEditModalOpened = false;
						fetchAllItemEvents();
					});
				}}
			/>
		</Modal>
	{/if}

	{#if showDeleteEventModal}
		<Modal>
			<ConfirmDeleteAction
				on:cancel={() => {
					showDeleteEventModal = false;
				}}
				on:ok={() => {
					handleDeleteEvent(workingEventReference).then(() => fetchAllItemEvents());
					showDeleteEventModal = false;
				}}
			>
				<svelte:fragment slot="title">Delete confirmation</svelte:fragment>
				<span slot="content"
					>Do you really want to delete this event? You can not reverse this action.
				</span>
			</ConfirmDeleteAction>
		</Modal>
	{/if}

	<div class="prose">
		<h2>People</h2>
	</div>
	{#await getAllPeopleAndRoleCount(item._id)}
		<p>loading</p>
	{:then peopleAttendance}
		<PeopleTable data={peopleAttendance} {item} />
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}

	<div class="prose">
		<h2>Event List</h2>
	</div>
	{#if itemEvents.length > 0}
		<EventTable
			itemHasIntervalTracking={item.isLongerThenOneDay}
			on:submitEdit={async (event) => {
				workingEventReference = await LocalApiEvents.getEventById(event.detail.eventId);
				showEditModalOpened = true;
			}}
			on:submitDelete={async (event) => {
				workingEventReference = await LocalApiEvents.getEventById(event.detail.eventId);
				showDeleteEventModal = true;
			}}
			eventsToShow={itemEvents}
		/>
	{/if}
{:else}
	<Error>
		Oh no. Looks like this item doesnt exits.
		<a class={`link`} href="/">Go home.</a>
	</Error>
{/if}

<style>
	.info {
		margin-top: 5em;
	}

	button {
		margin: 2em;
		margin-left: 0em;
	}
</style>