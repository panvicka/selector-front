<script>
	// @ts-nocheck
	import dayjs from 'dayjs';

	export let format = 'YYYY-MM-DD';
	export let date = new Date();

	let internal;

	const input = (x) => (internal = dayjs(x).format(format));
	const output = (x) => (date = dayjs(x, format).toDate());

	$: input(date);
	$: output(internal);
</script>

<input type="date" class="input input-bordered input-primary w-full focus:ring-0 focus:ring-offset-0" bind:value={internal} />
