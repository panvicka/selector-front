<script lang="ts">
	export let inputLabel: string;
	export let inputPlaceholder: string = 'Type here';
	export let textValue: string;
	export let onInputHandle: (e) => void | null;
	export let onChangeHandle: (e) => void | null;
	export let onBlurHandle: (e) => void | null;

	$: classesFromTheParent = $$props.class;
</script>

<label class="label" for={`${inputLabel}-ID`}>
	<span class="label-text">{inputLabel}</span>
</label>
<input
	bind:value={textValue}
	on:input={onInputHandle}
	on:change={onChangeHandle}
	on:blur={onBlurHandle}
	type="text"
	id={`${inputLabel}-ID`}
	placeholder={inputPlaceholder}
	class={`input input-bordered w-full max-w-xs focus:ring-0 focus:ring-offset-0 placeholder-opacity-75 placeholder-gray-500 ${classesFromTheParent}`}
/>

<style>
	input:focus {
		border: none;
	}
</style>
