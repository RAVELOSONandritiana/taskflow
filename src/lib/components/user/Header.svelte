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

<header class="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-white/5 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl transition-all duration-300">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="flex h-20 items-center justify-between">
			<!-- Logo Section -->
			<div class="flex lg:flex-1">
				<a href="/" class="-m-1.5 p-1.5 flex items-center gap-3 group">
					<img src={Logo} alt="Taskflow logo" class="h-8 w-auto transition-transform group-hover:scale-110" />
					<span class="text-xl font-black tracking-tight text-gray-900 dark:text-white">TaskFlow</span>
				</a>
			</div>

			<!-- Mobile menu button -->
			<div class="flex lg:hidden">
				<button
					on:click={toggleButton}
					type="button"
					class="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
				>
					<span class="sr-only">Open main menu</span>
					{#if isOpen}
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						</svg>
					{/if}
				</button>
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden lg:flex lg:gap-x-12">
				{#each links as link}
					<a
						href={link.path}
						class="text-sm font-bold leading-6 transition-all duration-200 relative group {$page.url.pathname === link.path ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
					>
						{link.label}
						<span class="absolute -bottom-1 left-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 {$page.url.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}"></span>
					</a>
				{/each}
			</nav>

			<!-- Desktop Actions -->
			<div class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
				<Switch />
				<a href="/login" class="text-sm font-bold leading-6 text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Log in</a>
				<Button class="!px-5 !py-2 text-sm">Sign Up</Button>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	{#if isOpen}
		<div class="lg:hidden" role="dialog" aria-modal="true">
			<div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 backdrop-blur-xl border-l border-gray-200 dark:border-white/5">
				<div class="flex items-center justify-between">
					<a href="/" class="-m-1.5 p-1.5 flex items-center gap-3">
						<img src={Logo} alt="Taskflow logo" class="h-8 w-auto" />
						<span class="text-xl font-black text-gray-900 dark:text-white">TaskFlow</span>
					</a>
					<button
						on:click={toggleButton}
						type="button"
						class="-m-2.5 rounded-xl p-2.5 text-gray-700 dark:text-gray-200"
					>
						<span class="sr-only">Close menu</span>
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="mt-6 flow-root">
					<div class="-my-6 divide-y divide-gray-500/10">
						<div class="space-y-2 py-6">
							{#each links as link}
								<a
									href={link.path}
									class="-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 {$page.url.pathname === link.path ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10' : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5'}"
								>
									{link.label}
								</a>
							{/each}
						</div>
						<div class="py-6 space-y-4">
							<div class="flex items-center justify-between px-3">
								<span class="text-sm font-medium text-gray-500">Theme</span>
								<Switch />
							</div>
							<a href="/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-bold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5">Log in</a>
							<Button class="w-full !py-3">Sign Up</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>
