<script>
	import { page } from '$app/stores';
	import Icon from 'components/general/Icon.svelte';
	import { onMount } from 'svelte';

	const sweets = [
		'faCookie',
		'faIceCream',
		'faPizzaSlice',
		'faCakeCandles',
		'faCandyCane',
		'faBeerMugEmpty',
		'faMugHot',
		'faMartiniGlassCitrus',
		'faWhiskeyGlass'
	];
	let icon = '';
	onMount(async () => {
		console.log('called');
		icon = sweets[Math.floor(Math.random() * sweets.length)];
	});
</script>

<svelte:head>
	<title>Oh no!</title>
</svelte:head>

{#if icon}
	<div class="mt-40 mb-16 lg:w-auto lg:block w-full flex flex-col grow-0 items-center">
		<div class="container flex flex-col md:flex-row items-center justify-center px-5">
			<div class="max-w-md">
				<div class="text-5xl font-dark font-bold">
					Oh no!
					<strong class="text-accent"> {$page?.status} </strong>
				</div>
				<br />
				<br />
				<p class="text-2xl md:text-3xl">
					<strong>{$page?.error?.message || 'Page not found...'}</strong>
				</p>

				<p class="text-xl md:text-2xl font-light leading-normal mt-6">
					Can I offer you some <Icon class="inline-block" {icon} /> as an appology?
				</p>
				<br />
				<br />

				<a href="/">
					<button class="btn btn-accent lg:w-auto w-full">
						<Icon size="lg" class="mr-4" icon={'faHome'} />
						Go home</button
					>
				</a>
			</div>
		</div>
	</div>
{/if}
