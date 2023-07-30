<script lang="ts">
	import type { Event, EventRequestType } from '$lib/types/event';
	import type { Item, RandomOptions, RandomResult } from '$lib/types/item';
	import type { Role } from '$lib/types/role';
	import type { SvelteSelectableItem } from '$lib/types/svelte-select/detail';
	import DateInput from 'components/forms/DateInput.svelte';
	import SelectDropdown from 'components/forms/SelectDropdown.svelte';
	import TextField from 'components/forms/TextField.svelte';
	import ToggleInput from 'components/forms/ToggleInput.svelte';
	import RoleParticipantNumber from 'components/roles/RoleParticipantNumber.svelte';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import { bind, createEventDispatcher } from 'svelte/internal';
	import { replaceKeyValueInToArrayIfKeyExistOrAdd } from 'utils/arrayUtils';

	const dispatch = createEventDispatcher<{ change: any }>();

	export let randomOptions: RandomOptions;
	export let listOfResults: Array<RandomResult> = [];
	$: {
		console.log(randomOptions);
		dispatch('change', {
			...randomOptions
		});
	}

	const steps = [7, 14, 30, 60, 90, 182, 356];
	const labels = ['week', '14 days', 'month', '2 months', '1/4 year', '1/2 Year', 'Year'];
</script>

<div class="p-4">
	<form id="randomSelectorForm" class="mt-4">
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
		Days since last time
		<input
			type="range"
			min="0"
			max="100"
			bind:value={randomOptions.daysSince}
			class="range"
			step="25"
		/>
		<div class="w-full flex justify-between text-xs px-2">
			<span>5</span>
			<span>|</span>
			<span>|</span>
			<span>|</span>
			<span>|</span>
		</div>

		<br />
		Top Results
		<br />
		{#if listOfResults.length > 0}
			{#each listOfResults as result, i}
				<div>
					{result.name}
				</div>
			{/each}
		{/if}
	</form>
</div>
