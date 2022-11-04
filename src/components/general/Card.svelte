<script>
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import { faGear } from '@fortawesome/free-solid-svg-icons';

	export let width = 300;
	export let height = 250;

	const dispatch = createEventDispatcher();

	function deleteTrigger() {
		dispatch('deleteTrigger');
	}

	function settingsTrigger() {
		dispatch('settingsTrigger');
	}
</script>

<div
	class="card w-96 bg-neutral shadow-xl overflow-visible"
	style="width: {width}px; height: {height}px"
>
	<div class="card-body">
		<div class="card-header flex justify-between align-center">
			<h2 class="text-accent hover:text-accent-focus card-title"><slot name="title" /></h2>

			<div class="card-actions justify-end">
				<button on:click={settingsTrigger}><Fa size="lg" id="setting" icon={faGear} /></button>
				<button on:click={deleteTrigger}><Fa size="lg" id="delete" icon={faTrash} /></button>
			</div>
		</div>
		<slot name="content" />
	</div>
</div>

<style>
	:global(svg) {
		transition: color 0.4s ease-out 100ms;
	}

	:global(#delete:hover) {
		color: hsl(var(--er));
	}

	:global(#setting:hover) {
		color: hsl(var(--in));
	}
</style>
