<script>
	import EventTable from '../eventTable.svelte';
	import EventForm from '../forms/eventForm.svelte';
	import Modal from '../general/Modal.svelte';
	import { onMount } from 'svelte';
	import { getAllEventsForItem, getEventById } from '../../api/event';
	import PeopleTable from '../people/peopleTable.svelte';
	import { getAllSelectablePeople } from '../people/peopleHandlerFunctions';
	import {
		handleCreateNewEvent,
		handleUpdateEvent,
		handleDeleteEvent
	} from '../events/eventHandlerFuntions';
	import ConfirmAction from '../general/ConfirmAction.svelte';
	import { getAllPeopleAndRoleCount } from './itemHandlerFunctions';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import ItemEventSummary from './itemEventSummary.svelte';
	import Loader from '../general/Loader.svelte';

	export let item;

	let itemEvents = [];
	let selectablePeople = [];
	let workingEventReference;

	let showCreateEventModalOpened = false;
	let showEditModalOpened = false;
	let showDeleteEventModal = false;

	let isLoading = true;

	onMount(async () => {
		selectablePeople = await getAllSelectablePeople(item._id);
		fetchAllItemEvents();
		isLoading = false;
	});

	const fetchAllItemEvents = async () => {
		itemEvents = await getAllEventsForItem(item._id);
	};
</script>

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
				handleCreateNewEvent(event.detail.event, item);
				showCreateEventModalOpened = false;
				fetchAllItemEvents();
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
				handleUpdateEvent(event.detail.event, fetchAllItemEvents);
				showEditModalOpened = false;
			}}
		/>
	</Modal>
{/if}

{#if showDeleteEventModal}
	<Modal>
		<ConfirmAction
			on:cancel={() => {
				showDeleteEventModal = false;
			}}
			on:ok={() => {
				handleDeleteEvent(workingEventReference, fetchAllItemEvents);
				showDeleteEventModal = false;
			}}
		>
			<svelte:fragment slot="title">Delete confirmation</svelte:fragment>
			<span slot="content"
				>Do you really want to delete this event? You can not reverse this action.
			</span>
		</ConfirmAction>
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
			workingEventReference = await getEventById(event.detail.eventId);
			showEditModalOpened = true;
		}}
		on:submitDelete={async (event) => {
			workingEventReference = await getEventById(event.detail.eventId);
			showDeleteEventModal = true;
		}}
		eventsToShow={itemEvents}
	/>
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
