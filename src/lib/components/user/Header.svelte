<script lang="ts">
	import Button from './Button.svelte';
	import { page } from '$app/stores';
	import Logo from '$lib/images/file_0000000027bc722fa9a6c62735b1a346.png';
	import Switch from './Switch.svelte';
	const links = [
		{ path: '/', label: 'Home' },
		{ path: '/about', label: 'About' },
		{ path: '/contact', label: 'Contact' }
	];

	let isOpen = false;

	const toggleButton = () => {
		isOpen = !isOpen;
	};
</script>

<svelte:head>
	<title>TaskFlow | Task management</title>
</svelte:head>

<header class="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-950">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<a href="/" class="flex items-center justify-center">
				<img src={Logo} alt="Taskflow logo" class="h-6 mr-5" />
				<strong class="text-xl"> TaskFlow </strong>
			</a>
			<div class="flex items-center">
				<nav class="hidden list-none space-x-10 px-14 md:flex md:items-center md:justify-center">
					{#each links as link}
						<a
							href={link.path}
							class={$page.url.pathname === link.path
								? 'text-indigo-500'
								: 'text-black dark:text-white'}
						>
							<li class="cursor-pointer font-bold hover:text-indigo-400">{link.label}</li>
						</a>
					{/each}
					<Switch />
				</nav>
				<div class="hidden space-x-4 sm:flex">
					<Button>Sign In</Button>
					<Button class="border-sm border bg-white text-black! hover:bg-gray-100!">Sign Up</Button>
				</div>
				<button
					on:click={toggleButton}
					class="ml-4 cursor-pointer rounded-md bg-gray-100 dark:bg-gray-900 px-2 py-2 md:hidden"
				>
					{#if isOpen}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-5"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
						</svg>
					{/if}
					{#if !isOpen}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="size-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>
	{#if isOpen}
		<div class="flex list-none flex-col px-5 space-y-2 md:hidden bg-white dark:bg-gray-950 shadow-lg">
			{#each links as link}
				<a
					href={link.path}
					class={$page.url.pathname === link.path ? 'text-indigo-600 dark:text-indigo-500' : 'text-black dark:text-white'}
				>
					<li class="cursor-pointer hover:text-indigo-400 px-4 py-2">{link.label}</li>
				</a>
			{/each}
			<div class="px-4 py-2">
				<Switch />
			</div>
			<div class="mb-2 flex space-x-4 sm:hidden px-4 py-2">
				<div class="space-x-4 sm:block sm:space-x-6 lg:space-x-8">
					<Button>Sign In</Button>
					<Button class="border-sm border bg-white text-black! hover:bg-gray-100!">Sign Up</Button>
				</div>
			</div>
		</div>
	{/if}
</header>
