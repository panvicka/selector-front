<script>
	// @ts-nocheck

 
	import { createEventDispatcher } from 'svelte';
	import Card from '../general/Card.svelte';

	export let group;

	const dispatch = createEventDispatcher();
</script>

<Card
	width={400}
	height={200}
	on:deleteTrigger={() => {
		dispatch('delete', {
			group
		});
	}}
	on:settingsTrigger={() => {
		console.log('edit', group._id);
		dispatch('edit', {
			group
		});
	}}
>
	<svelte:fragment slot="title"><span>{group.name}</span></svelte:fragment>

	<div slot="content">
		<div>{group.description}</div>
	</div>
</Card>

<style>
</style>
