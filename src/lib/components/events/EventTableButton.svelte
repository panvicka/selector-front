<script>
	import Icon from 'components/general/Icon.svelte';

	// 	FIXME: cell not receive the data this probably bug on Grid.js
	// https://github.com/grid-js/gridjs/issues/904

	export let cell;
	console.log(cell);
	// export let row;
</script>

<button
	on:click={() => {
		cell.data.submitFce(cell.data.row.id);
	}}
>
	<Icon icon={cell.data.icon} />
</button>
<!-- <a href={`mailto:${cell.data}`}>Contact</a> -->
