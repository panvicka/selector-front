<script lang="typescript">
	// @ts-nocheck
	import ItemCard from './itemCard.svelte';
	import { onMount } from 'svelte';
	import Modal from 'components/general/Modal.svelte';
	import ItemForm from 'components/forms/ItemForm.svelte';
	import DangerZoneConfirmDeleteAction from 'components/general/DangerZoneConfirmDeleteAction.svelte';
	import { handleCreateNew, handleDeleteItem, handleEditItem } from './itemHandlerFunctions';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Loader from 'components/general/Loader.svelte';
	import { LocalApiItems } from '$lib/apiClient/items';
	import { LocalApiGroups } from '$lib/apiClient/groups';
	import { LocalApiRoles } from '$lib/apiClient/roles';

	let items = [];
	let allRoles = [];
	let allGroupes = [];
	let workingItemReference = {};
	let isLoading = true;
	onMount(async () => {
		await fetchEverything();
		isLoading = false;
	});

	const fetchEverything = async () => {
		items = await LocalApiItems.getAllItems();
		console.log(items);
		allRoles = await LocalApiRoles.getAllRoles();
		allGroupes = await LocalApiGroups.getAllGroups();
	};

	let showCreateItemModal = false;
	let showDeleteItemModal = false;
	let showEditItemModal = false;
</script>

<svelte:head>
	<title>Index page</title>
</svelte:head>

<div class="top prose">
	<h1>Tracked items</h1>
	<button
		class="btn btn-accent"
		on:click={() => {
			showCreateItemModal = true;
		}}><Fa size="lg" class="add-new-tracking-icon" icon={faPlus} /> Add new tracking</button
	>
</div>
{#if isLoading}
	<Loader />
{:else}
	<div class="flex flex-wrap gap-9 ">
		{#each items as item}
			<div>
				<ItemCard
					{item}
					on:onDelete={(event) => {
						workingItemReference = event.detail.item;
						showDeleteItemModal = true;
					}}
					on:onEdit={(event) => {
						showEditItemModal = true;
						workingItemReference = event.detail.item;
					}}
				/>
			</div>
		{/each}
	</div>
{/if}

{#if showCreateItemModal}
	<Modal>
		<ItemForm
			title={'create new item'}
			{allRoles}
			{allGroupes}
			on:submit={(event) => {
				handleCreateNew(event).then(() => {
					showCreateItemModal = false;
					fetchEverything();
				});
			}}
			on:close={() => {
				showCreateItemModal = false;
			}}
		/>
	</Modal>
{/if}

{#if showDeleteItemModal}
	<Modal>
		<DangerZoneConfirmDeleteAction
			subject="item"
			expectedConfirmationText={workingItemReference.name}
			on:cancel={() => {
				showDeleteItemModal = false;
			}}
			on:ok={() => {
				handleDeleteItem(workingItemReference._id).then(() => {
					showDeleteItemModal = false;
					fetchEverything();
				});
			}}
		>
			<svelte:fragment slot="title">Confirmation</svelte:fragment>
			<span slot="content"
				>Do you really want to delete {workingItemReference.name}? You can not reverse this action.
			</span>
		</DangerZoneConfirmDeleteAction>
	</Modal>
{/if}

{#if showEditItemModal}
	<Modal>
		<ItemForm
			title={'edit Item'}
			item={workingItemReference}
			{allRoles}
			{allGroupes}
			on:submit={(event) => {
				handleEditItem(event, workingItemReference._id).then(() => {
					showEditItemModal = false;
					fetchEverything();
				});
			}}
			on:close={() => {
				showEditItemModal = false;
			}}
		/>
	</Modal>
{/if}

<style>
	button {
		margin: 2em;
		margin-left: 0em;
	}

	.top {
		margin-top: 5em;
	}
	h1 {
		margin-bottom: 0;
	}

	:global(.add-new-tracking-icon) {
		margin-right: 1em;
	}
</style>
