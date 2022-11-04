<script>
	import Select from 'svelte-select';
	import { createEventDispatcher } from 'svelte';

	export let items = [];
	export let placeholder = '';
	export let value = '';
	export let colorStyle = 'primary';

	const dispatch = createEventDispatcher();

	let selected = {};

	const handleSelect = (e) => {
		selected = {
			value: e.detail.value,
			label: e.detail.label
		};
		onSelect();
	};

	function onSelect() {
		if (selected.value && selected.label) {
			dispatch('dropdownSelect', {
				selected
			});
		}
	}
</script>

<div class="themed-select-{colorStyle}">
	<Select {items} {placeholder} {value} on:select={(e) => handleSelect(e)} />
</div>

<style>
	.themed-select-primary {
		--tw-ring-color: transparent;
		--padding: 1em;
		--border: 0.1em solid #641ae6;
		--borderFocusColor: #641ae6;
		--borderRadius: 10px;
		--background: #2a303c;
		--listBackground: #2a303c;
		--itemIsActiveBG: #641ae6;
		--itemHoverBG: #171a20;
		--height: 50px;
		--listMaxHeight: 200px;
	}
</style>
