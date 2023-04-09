<script lang="ts">
	import ItemCard from './itemCard.svelte';
	import { onMount } from 'svelte';
	import Modal from 'components/general/Modal.svelte';
	import ItemForm from 'components/forms/ItemFormFields.svelte';
	import DangerZoneConfirmDeleteAction from 'components/general/DangerZoneConfirmDeleteAction.svelte';
	import { handleCreateNewItem, handleDeleteItem, handleEditItem } from './itemHandlerFunctions';
	import Load from 'components/general/Load.svelte';
	import { LocalApiItems } from '$lib/apiClient/items';
	import { LocalApiGroups } from '$lib/apiClient/groups';
	import { LocalApiRoles } from '$lib/apiClient/roles';
	import type { Item } from '$lib/types/item';
	import type { Group } from '$lib/types/group';
	import type { Role } from '$lib/types/role';
	import Icon from 'components/general/Icon.svelte';
	import Alert from 'components/general/Alert.svelte';
	import type { AlertInfo } from '$lib/types/alert';
	import ItemFormModal from 'components/forms/ItemFormModal.svelte';
	import DangerZoneConfirmDeleteActionModal from 'components/general/DangerZoneConfirmDeleteActionModal.svelte';

	let disabledScroll = true;

	let items: Array<Item> = [];
	let allRoles: Array<Role> = [];
	let allGroupes: Array<Group> = [];
	let workingItemReference: Item = {
		_id: '',
		description: '',
		groupes: [],
		isLongerThenOneDay: false,
		name: '',
		roles: []
	};
	let isLoading = true;
	let showAlert = false;

	let alertInfo: AlertInfo = {
		text: 'sample text',
		timer: 4000,
		type: 'success'
	};

	onMount(async () => {
		await fetchEverything();
		isLoading = false;
	});

	const fetchEverything = async () => {
		items = await LocalApiItems.getAllItems();
		allRoles = await LocalApiRoles.getAllRoles();
		allGroupes = await LocalApiGroups.getAllGroups();
	};

	let showCreateItemModal = false;
	let showDeleteItemModal = false;
	let showEditItemModal = false;
</script>

<svelte:head>
	<title>Tracked Items</title>
	{#if showCreateItemModal || showDeleteItemModal || showEditItemModal}
		<style>
			body {
				overflow-y: hidden;
			}
		</style>
	{/if}
</svelte:head>

<div class="mt-16 mb-8">
	<h1 class="mb-5">Tracked items</h1>
	<button
		class="btn btn-accent"
		on:click={() => {
			showCreateItemModal = true;
		}}
	>
		<Icon size="lg" class="mr-4" icon="faPlus" />
		Add new tracking
	</button>
</div>
{#if isLoading}
	<Load />
{:else}
	<div class="flex flex-wrap gap-9 ">
		{#each items as item}
			<div>
				<ItemCard
					{item}
					on:delete={(event) => {
						workingItemReference = event.detail;
						showDeleteItemModal = true;
					}}
					on:edit={(event) => {
						showEditItemModal = true;
						workingItemReference = event.detail;
						console.log(workingItemReference);
						console.log(event.detail);
					}}
				/>
			</div>
		{/each}
	</div>
{/if}

{#if showCreateItemModal}
	<ItemFormModal
		{allGroupes}
		{allRoles}
		class="lg:w-fit w-full"
		on:submit={(event) => {
			handleCreateNewItem(event).then(() => {
				showCreateItemModal = false;
				fetchEverything();
			});
		}}
		on:close={() => {
			showCreateItemModal = false;
		}}
	>
		<h1 slot="title">Create new item</h1>
	</ItemFormModal>
{/if}

{#if showDeleteItemModal}
	<DangerZoneConfirmDeleteActionModal
		class="lg:w-1/2"
		subject="Item"
		expectedConfirmationText={workingItemReference.name}
		on:cancel={() => {
			showDeleteItemModal = false;
		}}
		on:ok={() => {
			handleDeleteItem(workingItemReference._id)
				.then(() => {
					showDeleteItemModal = false;
					alertInfo.text = 'Item deleted.';
					alertInfo.type = 'success';
					showAlert = true;
					fetchEverything();
				})
				.catch((e) => {
					showDeleteItemModal = false;
					alertInfo.text = `Error when deleting item: <${e}>`;
					alertInfo.type = 'error';
					showAlert = true;
				});
		}}
	>
		<h1 slot="title">Delete confirmation</h1>
		<span slot="confirmation-content"
			>Do you really want to delete {workingItemReference.name}? You can not reverse this action.
		</span>
	</DangerZoneConfirmDeleteActionModal>
{/if}

{#if showEditItemModal}
	<ItemFormModal
		{allGroupes}
		{allRoles}
		item={workingItemReference}
		class="lg:w-fit w-full"
		on:submit={(event) => {
			handleEditItem(event, workingItemReference._id).then(() => {
				showEditItemModal = false;
				fetchEverything();
			});
		}}
		on:close={() => {
			showEditItemModal = false;
		}}
	>
		<h1 slot="title">
			edit <span class="text-primary">{workingItemReference.name}</span>'s details
		</h1>
	</ItemFormModal>
{/if}

{#if showAlert}
	<Alert
		{alertInfo}
		on:timeout={() => {
			showAlert = false;
		}}
		on:click={() => {
			showAlert = false;
		}}
	/>
{/if}
