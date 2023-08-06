<script lang="ts">
	import type { RandomOptions, RandomResult } from '$lib/types/item';

	import ToggleInput from 'components/forms/ToggleInput.svelte';
	import Load from 'components/general/Load.svelte';
	import Slider from 'components/general/Slider.svelte';
	import { createEventDispatcher } from 'svelte/internal';
	import { formatDateForHuman, timeFrom } from 'utils/date';

	const dispatch = createEventDispatcher<{ change: any; personSelect: any }>();

	export let randomOptions: RandomOptions;
	export let listOfResults: Array<RandomResult> = [];
	export let averageAttendace: number;
	export let isLoading: boolean;
	$: {
		dispatch('change', {
			...randomOptions
		});
	}
	const rangeStepsDays = [0, 30, 60, 90, 120, 150, 182, 365];
	const rangeStepsLabels = ['N/A', '1', '2', '3', '4', '5', '6', '12'];
	let selectedStep = 0;

	let hoveredResult: RandomResult | undefined = undefined;
</script>

<div class="p-4">
	<form id="randomSelectorForm" class="mt-1">
		<div class="mb-4">
			<div class="flex">
				<label class="label cursor-pointer ">
					<input
						type="radio"
						bind:group={randomOptions.hasDoneTheRole}
						name="scoops"
						value={true}
						class="radio radio-primary mr-4"
					/>
					<span class="label-text">Has done the role</span>
				</label>
			</div>

			<div class="flex">
				<label class="label cursor-pointer">
					<input
						type="radio"
						bind:group={randomOptions.hasDoneTheRole}
						name="scoops"
						value={false}
						class="radio radio-primary mr-4"
					/>
					<span class="label-text">Has not done the role</span>
				</label>
			</div>

			<div class="flex">
				<label class="label cursor-pointer">
					<input
						type="radio"
						bind:group={randomOptions.hasDoneTheRole}
						name="scoops"
						value={undefined}
						class="radio radio-primary mr-4"
					/>
					<span class="label-text">All</span>
				</label>
			</div>
		</div>
		<div class="flex items-center">
			<ToggleInput
				inputOrder={'inputFirst'}
				inputLabel={`Less then average attendance ${averageAttendace ? `(${averageAttendace})` : ''}`}
				class="toggle-primary"
				bind:value={randomOptions.lessThenAverage}
				inputLabelHelp={'Select people that have done the role less then average'}
			/>
		</div>

		<div class="flex items-center">
			<ToggleInput
				inputOrder={'inputFirst'}
				inputLabel={'Not planned in future events'}
				class="toggle-primary"
				bind:value={randomOptions.notAlreadyPlanned}
				inputLabelHelp={'Filter out people that are already planned in future events'}
			/>
		</div>

		<br />
		{#if selectedStep == 0}
			{`No restriction on last attended`}
		{:else}
			{`Last attended before at least ${rangeStepsLabels[selectedStep]} months ago`}
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
		<h3 class="mt-4">Top Results</h3>
		<div class="flex flex-row flex-start justify-between h-44">
			{#if isLoading}
				<Load />
			{:else if listOfResults?.length > 0}
				<div class="flex flex-col">
					{#each listOfResults as result, i}
						<button
							class="link link-accent text-left"
							on:click={() => {
								dispatch('personSelect', {
									person: result
								});
							}}
							on:mouseover={() => {
								hoveredResult = result;
							}}
							on:focus={() => {
								hoveredResult = result;
							}}
							on:mouseleave={() => {
								hoveredResult = undefined;
							}}
						>
							{result.name}
						</button>
					{/each}
				</div>
				<div>
					{#if hoveredResult}
						Attended {hoveredResult.attended} times
						<br />
						{#if hoveredResult.latestDate}
							Last time on {formatDateForHuman(hoveredResult.latestDate)}
							<br />
							({timeFrom(hoveredResult.latestDate)} ago)
						{/if}

						<br />
					{/if}
				</div>
			{:else}
				<div class="mt-4">No results :( Try changing the search criteria</div>
			{/if}
		</div>
	</form>
</div>
