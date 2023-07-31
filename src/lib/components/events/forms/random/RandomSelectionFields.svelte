<script lang="ts">
	import type { RandomOptions, RandomResult } from '$lib/types/item';

	import ToggleInput from 'components/forms/ToggleInput.svelte';
	import Load from 'components/general/Load.svelte';
	import Slider from 'components/general/Slider.svelte';
	import { createEventDispatcher } from 'svelte/internal';

	const dispatch = createEventDispatcher<{ change: any; personSelect: any }>();

	export let randomOptions: RandomOptions;
	export let listOfResults: Array<RandomResult> = [];
	export let isLoading: boolean;
	$: {
		dispatch('change', {
			...randomOptions
		});
	}
	const rangeStepsDays = [0, 30, 60, 90, 120, 150, 182, 365];
	const rangeStepsLabels = ['N/A', '1', '2', '3', '4', '5', '6', '12'];
	let selectedStep = 0;
</script>

<div class="p-4">
	<form id="randomSelectorForm" class="mt-1">
		<ToggleInput
			inputLabel={'Has done the role'}
			class="toggle-primary"
			bind:value={randomOptions.hasDoneTheRole}
			inputLabelHelp={'Select only persons with experience in the role'}
		/>
		<ToggleInput
			inputLabel={'Less then average attendance'}
			class="toggle-primary"
			bind:value={randomOptions.lessThenAverage}
			inputLabelHelp={'Select people that have done the role less then average'}
		/>

		<ToggleInput
			inputLabel={'Not planned in future events'}
			class="toggle-primary"
			bind:value={randomOptions.notAlreadyPlanned}
			inputLabelHelp={'Select people that have done the role less then average'}
		/>

		<br />
		{#if selectedStep == 0}
			{`No restriction on last attended`}
		{:else}
			{`Last attended before ${rangeStepsLabels[selectedStep]} months ago`}
		{/if}
		<Slider
			value={selectedStep}
			rangeSteps={rangeStepsDays}
			rangeLabels={rangeStepsLabels}
			on:change={({ detail }) => {
				selectedStep = detail.step;
				randomOptions.daysSince = parseInt(detail.translatedValue.toString());
			}}
		/>

		<br />
		Top Results
		<br />
		<div class="flex flex-col">
			{#if isLoading}
				<Load />
			{:else if listOfResults.length > 0}
				{#each listOfResults as result, i}
					<a
						class="link link-accent"
						on:click={() => {
							dispatch('personSelect', {
								person: result
							});
						}}
					>
						{result.name}
					</a>
				{/each}
			{/if}
		</div>
	</form>
</div>
