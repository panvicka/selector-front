<script lang="ts">
	import { ColorStyle } from '$lib/types/styles';

	export let href: string;
	export let text: string;
	export let type: ColorStyle | null = ColorStyle.primary;
</script>

<a class={`link link-${type}`} {href}>{text}</a>

<style>
</style>
