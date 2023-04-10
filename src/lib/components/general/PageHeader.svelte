<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher<{ buttonClick: void }>();

	export let buttonIcon = 'faPlus';
	export let buttonText = 'add';

	function buttonClick() {
		dispatch('buttonClick');
	}
</script>

<div class="mt-16 mb-16">
	<h1 class="mb-5"><slot name="title" /></h1>

	<button class="btn btn-accent" on:click={buttonClick}>
		<Icon size="lg" class="mr-4" icon={buttonIcon} />
		{buttonText}</button
	>
</div>
