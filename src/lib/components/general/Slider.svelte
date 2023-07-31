<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type sliderData = {
		step: number;
		translatedValue: number | string;
	};

	const dispatch = createEventDispatcher<{ change: sliderData }>();
	$: classesFromTheParent = $$props.class;
	export let value = 0;
	export let rangeSteps: number[] = [];
	export let rangeLabels: string[] = [];

	function change() {
		dispatch('change', {
			step: value,
			translatedValue: rangeSteps[value]
		});
	}
</script>

<input
	type="range"
	min="0"
	max={rangeSteps.length - 1}
	bind:value
	class={`range ${classesFromTheParent}`}
	step="1"
	on:change={change}
/>
<div class="w-full flex justify-between text-xs px-2 items-start">
	{#each rangeLabels as label}
		<span class="">{label}</span>
	{/each}
</div>

<style>
</style>
