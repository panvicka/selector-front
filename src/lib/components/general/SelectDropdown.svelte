<script lang="ts">
	import Select from 'svelte-select';
	import { createEventDispatcher } from 'svelte';
	import type { SvelteSelectEvent } from '$lib/types/svelte-select/event';
	import type { SvelteSelectableItem } from '$lib/types/svelte-select/detail';
	import { removeFromArrayBasedOnKey } from 'utils/arrayUtils';

	export let items: Array<SvelteSelectableItem> = [];

	export let placeholder = '';
	export let value = '';
	export let colorStyle = 'primary';
	export let multiSelect = false;

	$: classesFromTheParent = $$props.class;

	let selectedItems: Array<SvelteSelectableItem> = [];

	const dispatch = createEventDispatcher<{
		dropdownSelect: { [key: number]: SvelteSelectableItem };
	}>();

	let selected: SvelteSelectableItem = {
		value: '',
		label: ''
	};

	const handleSelect = (e: SvelteSelectEvent) => {
		// console.log(e.detail);
		if (e.detail instanceof Array) {
			selectedItems = e.detail;
		} else {
			selectedItems = [
				{
					value: e.detail.value,
					label: e.detail.label
				}
			];
		}

		dispatch('dropdownSelect', {
			...selectedItems
		});
		// console.log('in handle select');
		// console.log(selectedItems);
	};

	const handleClear = (e) => {
		// console.log('in handle clear before');

		// console.log(e.detail.value);
		// console.log(selectedItems);
		removeFromArrayBasedOnKey('value', e.detail.value, selectedItems);
		// console.log('in handle clear after');

		// console.log(selectedItems);

		dispatch('dropdownSelect', {
			...selectedItems
		});
		// console.log(e.detail);
		// selected = {
		// 	value: e.detail.value,
		// 	label: e.detail.label
		// };
		// onSelect();
	};
</script>

<div class="themed-select-{colorStyle} {classesFromTheParent}">
	<Select
		id="dropdown"
		{items}
		multiple={multiSelect}
		{value}
		on:change={(e) => handleSelect(e)}
		on:clear={(e) => handleClear(e)}
	/>
</div>

<style>
	.themed-select-primary {
		--tw-ring-color: transparent;
		--border: 0.1em solid #641ae6;
		--border-focus-color: #641ae6;
		--border-radius: 10px;
		--background: #2a303c;
		--listBackground: #2a303c;
		--item-is-active-BG: #641ae6;
		--item-hover-BG: #171a20;
		--height: 50px;
		--list-max-height: 200px;
		--multi-max-width: 150px;
		--multi-item-bg: #c43766;
		--multi-item-active-outline: #9fe61a;
		--list-background: rgb(66, 17, 42);
	}
</style>
