<script>
	// @ts-nocheck

	import { createEventDispatcher } from 'svelte';
	import Card from '../general/Card.svelte';

	export let item;

	import * as Icons from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import RoleBadge from '../roles/RoleBadge.svelte';

	const dispatch = createEventDispatcher();
</script>

<Card
	width={400}
	height={300}
	on:deleteTrigger={() => {
		dispatch('onDelete', {
			item
		});
	}}
	on:settingsTrigger={() => {
		dispatch('onEdit', {
			item
		});
	}}
>
	<a slot="title" href={`items/${item._id}`}>{item.name}</a>

	<div slot="content">
		<p>{item.description}</p>

		<br />
		Roles
		{#each item.roles || [] as role}
			<RoleBadge {role} />
		{/each}
		<br />
		Group
		{#each item.groupes || [] as group}
			<div class="tooltip tooltip-info" data-tip={group.description}>
				<div class="badge badge-ghost">
					{group.name}
				</div>
			</div>
		{/each}
	</div>
</Card>

<style>
	.badge {
		margin: 0 1em 0 0;
	}
</style>
