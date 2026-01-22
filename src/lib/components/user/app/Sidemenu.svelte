<script lang="ts">
	import Notification from './Notification.svelte';
	import { asClassComponent } from 'svelte/legacy';
	import Badge from './Badge.svelte';
	import { page } from '$app/stores';
	import Logo from '$lib/images/file_0000000027bc722fa9a6c62735b1a346.png';
	import Avatar from '$lib/images/solo.png';
	import Slide from '../Slide.svelte';
	import Tooltip from '../Tooltip.svelte';
	import NotificationPopup from './NotificationPopup.svelte';
	import { theme } from '$lib/store/theme.store';
	
	let notifOpen = $state(false);
	let msgOpen = $state(false);

	const routes = [
		{
			path: '/app',
			name: 'Dashboard',
			icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/>`
		},
		{
			path: '/app/project',
			name: 'Projects',
			icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"/>`
		},
		{
			path: '/app/teams',
			name: 'Teams',
			icon: ` <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/>`
		},
		{
			path: '/app/music',
			name: 'Music',
			icon: ` <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd"/>`
		}
	];

	let { children } = $props();
</script>

<svelte:head>
	<title>TaskFlow | App</title>
</svelte:head>

<section class="flex h-screen flex-col bg-gray-50/50 dark:bg-gray-950">
	<!-- Top Bar / Header -->
	<header 
		class="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-100 px-6 backdrop-blur-xl bg-white/75 dark:border-gray-800 dark:bg-gray-950/75"
	>
		<a href="/app" class="group flex items-center gap-3">
			<div class="flex h-9 w-9 items-center justify-center shadow-indigo-200 transition-transform group-hover:scale-105 dark:shadow-none">
				<img src={Logo} alt="Taskflow" class="h-6 w-6" />
			</div>
			<div class="flex flex-col">
				<strong class="text-lg font-bold leading-none tracking-tight text-gray-900 dark:text-white">TaskFlow</strong>
				<span class="text-[10px] font-bold uppercase tracking-widest text-indigo-500">Workspace</span>
			</div>
		</a>

		<div class="flex items-center gap-2">
			<!-- Quick Actions Header Icons -->
			<Tooltip text="Notifications">
				<Badge value={2} onclick={() => (notifOpen = !notifOpen)}>
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
				</Badge>
			</Tooltip>

			<Tooltip text="Settings">
				<a href="/app/settings" aria-label="Settings" class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-indigo-500 dark:hover:bg-gray-800">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</a>
			</Tooltip>

			<div class="ml-2 h-8 w-[1px] bg-gray-100 dark:bg-gray-800"></div>

			<a href="/app/profile" class="ml-2 flex items-center gap-3 rounded-full border border-transparent p-0.5 pr-3 transition-all hover:border-gray-100 hover:bg-gray-50 dark:hover:border-gray-800 dark:hover:bg-gray-900">
				<img src={Avatar} alt="Profile" class="h-8 w-8 rounded-full border border-white object-cover shadow-sm dark:border-gray-800" />
				<span class="hidden text-sm font-semibold text-gray-700 md:block dark:text-gray-300">Alex</span>
			</a>
		</div>
	</header>

	<div class="flex flex-1 overflow-hidden">
		<!-- Dynamic Sidebar -->
		<aside class="flex w-16 flex-col border-r border-gray-100 bg-white py-6 lg:w-64 dark:border-gray-800 dark:bg-gray-950">
			<nav class="flex-1 space-y-1 px-3">
				{#each routes as route}
					{@const active = $page.url.pathname === route.path || (route.path !== '/app' && $page.url.pathname.startsWith(route.path))}
					<a 
						href={route.path}
						class="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all {active 
							? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400' 
							: 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100'}"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							{@html route.icon}
						</svg>
						<span class="hidden text-[15px] font-semibold lg:block">{route.name}</span>
						
						{#if active}
							<div class="absolute left-0 h-6 w-1 rounded-r-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
						{/if}
					</a>
				{/each}
			</nav>

			<!-- Sidebar Footer / Bottom Actions -->
			<div class="mt-auto space-y-1 border-t border-gray-50 px-3 pt-6 dark:border-gray-800">
				<button 
					onclick={() => theme.update(v => !v)}
					class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
				>
					{#if $theme}
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
						</svg>
						<span class="hidden font-semibold lg:block">Light Mode</span>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
						</svg>
						<span class="hidden font-semibold lg:block">Dark Mode</span>
					{/if}
				</button>
				
				<a 
					href="/auth/login"
					class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-900/10"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
					</svg>
					<span class="hidden font-semibold lg:block">Logout</span>
				</a>
			</div>
		</aside>

		<!-- Main Content Area -->
		<main class="flex-1 overflow-auto">
			{#key $page.url.pathname}
				{@render children()}
			{/key}
		</main>
	</div>

	<!-- Notifications Drawer -->
	<NotificationPopup bind:open={notifOpen} />
</section>

