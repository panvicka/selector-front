<script lang="typescript">
	// @ts-nocheck
	import ItemCard from './itemCard.svelte';
	import { onMount } from 'svelte';
	import { getAllItems } from '../../api/item';
	import Modal from '../general/Modal.svelte';
	import ItemForm from '../forms/ItemForm.svelte';
	import ConfirmAction from '../general/ConfirmAction.svelte';
	import { handleCreateNew, handleDeleteItem, handleEditItem } from './itemHandlerFunctions';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getAllRoles } from '../../api/roles';

 


	let items = [];
	let allRoles = [];
	let workingItemReference = {};

	onMount(async () => {
		await fetch();
	});

	const fetch = async () => {
		items = await getAllItems();
		allRoles = await getAllRoles();
		console.log(allRoles);
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
		on:click={(e) => {
			showCreateItemModal = true;
		}}><Fa size="lg" class="add-new-tracking-icon" icon={faPlus} /> Add new tracking</button
	>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-9">
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

{#if showCreateItemModal}
	<Modal>
		<ItemForm
			title={'create new item'}
			{allRoles}
			on:submit={(event) => {
				handleCreateNew(event, fetch);
				showCreateItemModal = false;
			}}
			on:close={() => {
				showCreateItemModal = false;
			}}
		/>
	</Modal>
{/if}

{#if showDeleteItemModal}
	<Modal>
		<ConfirmAction
			on:cancel={() => {
				showDeleteItemModal = false;
			}}
			on:ok={() => {
				handleDeleteItem(workingItemReference._id, fetch);
				showDeleteItemModal = false;
			}}
		>
			<svelte:fragment slot="title">Confirmation</svelte:fragment>
			<span slot="content"
				>Do you really want to delete {workingItemReference.name}? You can not reverse this action.
			</span>
		</ConfirmAction>
	</Modal>
{/if}

{#if showEditItemModal}
	<Modal>
		<ItemForm
			title={'edit Item'}
			item={workingItemReference}
			{allRoles}
			on:submit={(event) => {
				handleEditItem(event, workingItemReference._id, fetch);
				showEditItemModal = false;
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
