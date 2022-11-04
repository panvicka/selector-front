<script>
	export let inputLabel;
	export let inputPlaceholder;
	export let textValue;

	export let styleClass = 'input-accent';
</script>

<label class="label" for={`${inputLabel}-ID`}>
	<span class="label-text">{inputLabel}</span>
</label>
<input
	bind:value={textValue}
	type="text"
	id={`${inputLabel}-ID`}
	placeholder={inputPlaceholder || 'Type here'}
	class={`input input-bordered ${styleClass} w-full max-w-xs focus:ring-0 focus:ring-offset-0`}
/>


<style>
input:focus {
	border: none;
}
</style>