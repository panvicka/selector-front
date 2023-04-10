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

<div class="mt-16 mb-16 lg:w-auto w-full">
	<h1 class="mb-5"><slot name="title" /></h1>

	<button class="btn btn-accent md:w-auto lg:w-auto w-full" on:click={buttonClick}>
		<Icon size="lg" class="mr-4" icon={buttonIcon} />
		{buttonText}</button
	>
</div>
