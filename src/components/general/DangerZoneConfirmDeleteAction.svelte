<script>
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export let subject;
	export let expectedConfirmationText;

	let confirmationTextValue;
	$: confirmationButtonIsDisabled =
		expectedConfirmationText === undefined || expectedConfirmationText !== confirmationTextValue;

	function cancel() {
		dispatch('cancel');
	}

	function ok() {
		dispatch('ok');
	}

	let confirmationInputField;
	onMount(() => {
		confirmationInputField.focus();
	});
</script>

<div>
	<div>
		<h1><slot name="title" /></h1>
		<slot name="content" />
	</div>
	<div class="flex flex-col gap-2">
		<label for="confirmationText"
			>Please type <span class="font-bold">{expectedConfirmationText}</span> to confirm.</label
		>
		<input
			id="confirmationText"
			name="confirmationText"
			bind:this={confirmationInputField}
			bind:value={confirmationTextValue}
			type="text"
			class="input input-bordered w-full max-w-xs input-accent"
		/>
	</div>
	<div class="flex mt-8 gap-2">
		<button
			class="btn btn-outline btn-secondary"
			type="button"
			on:click={() => {
				cancel();
			}}
		>
			Cancel
		</button>
		<button
			disabled={confirmationButtonIsDisabled}
			type="button"
			class="btn btn-outline btn-error"
			on:click={ok}
		>
			I understand the consequences, delete this {subject}
		</button>
	</div>
</div>
