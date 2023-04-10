<script lang="ts">
	import { onMount } from 'svelte';
	import RoleCard from 'components/roles/RoleCard.svelte';
	import Load from 'components/general/Load.svelte';
	import { LocalApiRoles } from '$lib/apiClient/roles';
	import type { Role } from '$lib/types/role';
	import Icon from 'components/general/Icon.svelte';
	import RoleFormModal from 'components/forms/roleFormModal.svelte';
	import DangerZoneConfirmDeleteActionModal from 'components/general/DangerZoneConfirmDeleteActionModal.svelte';

	let roles: Array<Role> = [];

	let roleToBeDeleted: Role = {
		_id: '',
		description: '',
		name: '',
		icon: ''
	};
	let roleToBeEdited: Role = {
		_id: '',
		description: '',
		name: '',
		icon: ''
	};

	let showDeleteModal = false;
	let letShowCreateModal = false;
	let letShowEditModal = false;

	let isLoading = true;

	onMount(async () => {
		await fetchAllRoles();
		isLoading = false;
	});

	const fetchAllRoles = async () => {
		roles = await LocalApiRoles.getAllRoles();
	};

	const handleCreateNewRole = async (event: CustomEvent<Role>) => {
		await LocalApiRoles.createRole(event.detail);
		letShowCreateModal = false;
		fetchAllRoles();
	};

	const handleDeleteRole = async (roleId: Role['_id']) => {
		await LocalApiRoles.deleteRole(roleId);
		fetchAllRoles();
		showDeleteModal = false;
	};

	const handleEditRole = async (event: CustomEvent<Role>) => {
		await LocalApiRoles.updateRole(roleToBeEdited._id, event.detail);
		fetchAllRoles();
		letShowEditModal = false;
	};

	const triggeredDeleteRole = async (event: CustomEvent<Role>) => {
		roleToBeDeleted = event.detail;
		showDeleteModal = true;
	};
</script>

<svelte:head>
	{#if letShowEditModal || letShowCreateModal || showDeleteModal}
		<style>
			body {
				overflow-y: hidden;
			}
		</style>
	{/if}
</svelte:head>

<div class="mt-16 mb-8">
	<h1 class="mb-5">Roles</h1>

	<button
		class="btn btn-accent"
		on:click={(e) => {
			letShowCreateModal = true;
		}}
	>
		<Icon size="lg" class="mr-4" icon="faPlus" />
		Add Role</button
	>
</div>

{#if isLoading}
	<Load />
{:else}
	<div class="flex flex-wrap gap-9 ">
		{#each roles as role}
			<div>
				<RoleCard
					{role}
					on:delete={triggeredDeleteRole}
					on:edit={(event) => {
						letShowEditModal = true;
						roleToBeEdited = event.detail;
					}}
				/>
			</div>
		{/each}
	</div>
{/if}

{#if letShowCreateModal}
	<RoleFormModal
		class="lg:w-fit w-full"
		on:submit={handleCreateNewRole}
		on:close={() => {
			letShowCreateModal = false;
		}}
	>
		<h1 slot="title">Create new role</h1>
	</RoleFormModal>
{/if}

{#if letShowEditModal}
	<RoleFormModal
		class="lg:w-fit w-full"
		role={roleToBeEdited}
		on:submit={handleEditRole}
		on:close={() => {
			letShowEditModal = false;
		}}
	>
		<h1 slot="title">
			edit <span class="text-primary">{roleToBeEdited.name}</span>'s details
		</h1>
	</RoleFormModal>
{/if}

{#if showDeleteModal}
	<DangerZoneConfirmDeleteActionModal
		class="lg:w-1/2"
		subject="role"
		expectedConfirmationText={roleToBeDeleted.name}
		on:cancel={() => {
			showDeleteModal = false;
		}}
		on:ok={() => {
			handleDeleteRole(roleToBeDeleted._id);
		}}
	>
		<h1 slot="title">Delete confirmation</h1>
		<span slot="confirmation-content"
			>Do you really want to delete {roleToBeDeleted.name}? You can not reverse this action.
		</span>
	</DangerZoneConfirmDeleteActionModal>
{/if}
