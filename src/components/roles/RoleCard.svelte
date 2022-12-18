<script lang="ts">
	import * as Icons from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	import { createEventDispatcher } from 'svelte';
	import Card from '../general/Card.svelte';
	import type { Role } from 'types/role';

	export let role: Role;

	const dispatch = createEventDispatcher<{ delete: Role; edit: Role }>();
</script>

<Card
	width={400}
	height={200}
	on:deleteTrigger={() => {
		dispatch('delete', {
			...role
		});
	}}
	on:settingsTrigger={() => {
		dispatch('edit', {
			...role
		});
	}}
>
	<svelte:fragment slot="title"
		><Fa size="lg" class="role-icon" icon={Icons[role.icon]} />
		<span>{role.name}</span></svelte:fragment
	>

	<div slot="content">
		<div>{role.description}</div>
		<div>{role.icon}</div>
	</div>
</Card>

<style>
</style>
