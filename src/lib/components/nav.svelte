<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { env } from '$env/dynamic/public';

	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});

	let activePage = 'page-items';

	const activatePage = (page) => {
		activePage = page;
		showMenu = false;
	};

	let showMenu = false;
	$: {
		console.log({ showMenu });
	}

	// let linkClasses = `btn btn-ghost normal-case text-xl  `;

	let linkClasses = '';
	$: {
		linkClasses = `btn btn-ghost normal-case text-xl ${showMenu ? 'text-2xl' : ''}`;
	}

	let itemClasses = '';
	$: {
		itemClasses = `mr-2 md:w-auto w-full ${showMenu ? 'flex items-center justify-center p-3' : ''}`;
	}

	// const getLinkClasses = (page: string) => {

	// 	if (page === activePage) {
	// 		classes = classes + 'text-accent';
	// 	}
	// 	return classes;
	// };

	let showOcd = env.PUBLIC_OCD_SHOW === 'true';
</script>

<header>
	<nav
		class={`
		${!showMenu && 'flex'}
		 fixed top-0 left-0 right-0 z-50 bg-neutral-focus shadow-lg border-none
		 flex-wrap
		
		 justify-between
		 w-full
		 p-2
		 pl-3
		 xl:pl-36
		 pr-6
		`}
	>
		<svg
			on:click={() => {
				showMenu = !showMenu;
			}}
			xmlns="http://www.w3.org/2000/svg"
			id="menu-button"
			class="h-6 w-6 cursor-pointer md:hidden block mt-2"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			/>
		</svg>

		<div class={`${!showMenu && 'hidden'} md:flex md:items-center md:w-auto`} id="menu">
			<ul
				class="
			 pb-4
			 text-base text-gray-700
			 flex-column
			 flex
			 flex-wrap
			 md:flex
			 md:flex-column
			 md:justify-between 
			 md:pt-0
			 md:pb-0
			 "
			>
				<li on:click={() => activatePage('page-items')} class={itemClasses}>
					<a
						class={`${linkClasses} ${
							activePage === 'page-items' ? 'text-accent' : 'text-base-content'
						}`}
						href="/">Items</a
					>
				</li>
				<li on:click={() => activatePage('page-people')} class={itemClasses}>
					<a
						class={`${linkClasses}  ${
							activePage === 'page-people' ? 'text-accent' : 'text-base-content'
						}`}
						href="/people">People</a
					>
				</li>
				<li on:click={() => activatePage('page-roles')} class={itemClasses}>
					<a
						class={`${linkClasses}  ${
							activePage === 'page-roles' ? 'text-accent' : 'text-base-content'
						}`}
						href="/roles">Roles</a
					>
				</li>
				<li on:click={() => activatePage('page-groups')} class={itemClasses}>
					<a
						class={`${linkClasses}  ${
							activePage === 'page-groups' ? 'text-accent' : 'text-base-content'
						}`}
						href="/groups">Groups</a
					>
				</li>
				<li on:click={() => activatePage('page-about')} class={itemClasses}>
					<a
						class={`${linkClasses}  ${
							activePage === 'page-about' ? 'text-accent' : 'text-base-content'
						}`}
						href="/about">About</a
					>
				</li>
				{#if showOcd}
					<li on:click={() => activatePage('page-ocd')} class={itemClasses}>
						<a
							class={`${linkClasses}  ${
								activePage === 'page-ocd' ? 'text-accent' : 'text-base-content'
							} `}
							href="/ocd">On Call Duty</a
						>
					</li>
				{/if}
			</ul>
		</div>

		<div class={`${showMenu && 'hidden'} mt-1`}>
			<select class="dropdown-content menu p-2 shadow bg-base-100 rounded-box" data-choose-theme>
				<option disabled value=""> Pick a theme </option>
				<option value="">default (dark)</option>
				<option value="light">light</option>
				<option value="retro">retro</option>
				<option value="dracula">dracula</option>
				<option value="cyberpunk">cyberpunk</option>
				<option value="cupcake">cupcake</option>
				<option value="bumblebee">bumblebee</option>
				<option value="emerald">emerald</option>
				<option value="corporate">corporate</option>
				<option value="synthwave">synthwave</option>
				<option value="valentine">valentine</option>
				<option value="halloween">halloween</option>
				<option value="garden">garden</option>
				<option value="forest">forest</option>
				<option value="aqua">aqua</option>
				<option value="lofi">lofi</option>
				<option value="pastel">pastel</option>
				<option value="fantasy">fantasy</option>
				<option value="wireframe">wireframe</option>
				<option value="black">black</option>
				<option value="luxury">luxury</option>
				<option value="cmyk">cmyk</option>
				<option value="autumn">autumn</option>
				<option value="business">business</option>
				<option value="acid">acid</option>
				<option value="lemonade">lemonade</option>
				<option value="night">night</option>
				<option value="coffee">coffee</option>
				<option value="winter">winter</option>
			</select>
		</div>
	</nav>
</header>

<!-- <header class="header-area">
	<div class="navbar fixed top-0 left-0 right-0 z-50 bg-neutral-focus shadow-lg border-none">
		<div class="navbar-start">
			<div class="dropdown">
				<button tabindex="0" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/></svg
					>
				</button>
				<ul
					class="menu menu-compact dropdown-content mt-5 p-2 shadow-lg bg-neutral-focus rounded-box w-52"
				>
					<li><a class="btn btn-ghost normal-case text-xl" href="/">Items</a></li>
					<li><a class="btn btn-ghost normal-case text-xl" href="/people">People</a></li>
					<li><a class="btn btn-ghost normal-case text-xl" href="/roles">Roles</a></li>
					<li><a class="btn btn-ghost normal-case text-xl" href="/groups">Groups</a></li>
					<li><a class="btn btn-ghost normal-case text-xl" href="/about">About</a></li>
					{#if showOcd}
						<li><a class="btn btn-ghost normal-case text-xl" href="/ocd">OnCallDuty</a></li>
					{/if}
				</ul>
			</div>
		</div>

		<div class="navbar-end">
			<select
				class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				data-choose-theme
			>
				<option disabled value=""> Pick a theme </option>
				<option value="">default (dark)</option>
				<option value="light">light</option>
				<option value="retro">retro</option>
				<option value="dracula">dracula</option>
				<option value="cyberpunk">cyberpunk</option>
				<option value="cupcake">cupcake</option>
				<option value="bumblebee">bumblebee</option>
				<option value="emerald">emerald</option>
				<option value="corporate">corporate</option>
				<option value="synthwave">synthwave</option>
				<option value="valentine">valentine</option>
				<option value="halloween">halloween</option>
				<option value="garden">garden</option>
				<option value="forest">forest</option>
				<option value="aqua">aqua</option>
				<option value="lofi">lofi</option>
				<option value="pastel">pastel</option>
				<option value="fantasy">fantasy</option>
				<option value="wireframe">wireframe</option>
				<option value="black">black</option>
				<option value="luxury">luxury</option>
				<option value="cmyk">cmyk</option>
				<option value="autumn">autumn</option>
				<option value="business">business</option>
				<option value="acid">acid</option>
				<option value="lemonade">lemonade</option>
				<option value="night">night</option>
				<option value="coffee">coffee</option>
				<option value="winter">winter</option>
			</select>
		</div>
	</div>
</header> -->
