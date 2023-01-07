<script lang="ts">
	import type { Role } from '$lib/types/role';
	import type { SvelteSelectableItem } from '$lib/types/svelte-select/detail';
	import SelectDropdown from 'components/general/SelectDropdown.svelte';
	import Select from 'svelte-select';

	export let role: Role;
	export let peopleToSelectFrom: Array<SvelteSelectableItem> = [];

	const handleSelect = (e) => {
		console.log(e.detail);
	};

	const handleClear = (e) => {
		console.log(e.detail);
	};
</script>

<div class="themed-select-primary max-w-xs	 ">
	<!-- <span class="label-text"> {role.name}</span> -->
	<Select
		items={peopleToSelectFrom}
		multiple={true}
		on:change={(e) => handleSelect(e)}
		on:clear={(e) => handleClear(e)}
	/>

    <Select
    items={peopleToSelectFrom}
    multiple={false}
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
