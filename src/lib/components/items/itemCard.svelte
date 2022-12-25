<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Item } from '$lib/types/item';
	import Card from 'components/general/Card.svelte';
	import RoleBadge from 'components/roles/RoleBadge.svelte';

	export let item: Item;

	const dispatch = createEventDispatcher<{ delete: Item; edit: Item }>();

</script>

<Card
	width={400}
	height={300}
	testId="ItemCard"
	on:deleteTrigger={() => {
		dispatch('delete', {
			...item
		});
	}}
	on:settingsTrigger={() => {
		dispatch('edit', {
			...item
		});
	}}
>
	<a slot="title" href={`items/${item._id}`}>{item.name}</a>

	<div slot="content" class="prose">
		<p data-testid="ItemDescription">{item.description}</p>

		<span class="font-semibold mt-3">Roles </span>
		<div class="">
			{#each item.roles || [] as role}
				<RoleBadge {role} />
			{/each}
		</div>

		<span class="font-semibold mt-3">Group </span>

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
