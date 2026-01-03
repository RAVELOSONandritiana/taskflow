<script lang="ts">
	import Notification from './Notification.svelte';
	import { asClassComponent } from 'svelte/legacy';
	import Badge from './Badge.svelte';
	import { page } from '$app/stores';
	import Logo from '$lib/images/file_0000000027bc722fa9a6c62735b1a346.png';
	import Avatar from '$lib/images/solo.png';
	import Slide from '../Slide.svelte';
	import Tooltip from '../Tooltip.svelte';
	let notifOpen = false;
	let msgOpen = false;
	const routes = [
		{
			path: '/app',
			name: 'Dashboard',
			img: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/>`
		},
		{
			path: '/app/project',
			name: 'Projects',
			img: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"/>`
		},
		{
			path: '/app/teams',
			name: 'Teams',
			img: ` <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/>`
		},
		{
			path: '/app/music',
			name: 'music',
			img: ` <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd"/>`
		}
	];
</script>

<svelte:head>
	<title>App TaskFlow</title>
</svelte:head>

<section class="flex h-screen flex-col">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<header class="flex h-16 items-center justify-between bg-white px-16 shadow-sm">
		<a href="/app" class="flex items-center justify-center">
			<img src={Logo} alt="Taskflow logo" class="mr-5 h-6" />
			<strong class="text-xl"> TaskFlow </strong>
		</a>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="flex items-center justify-center space-x-4">
			<Slide bind:open={notifOpen}>
				<div class="mx-5 flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-5 h-8 w-8 text-gray-800 opacity-75 hover:text-gray-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
						/>
					</svg>
					<h4 class="p-4 text-2xl font-bold text-gray-900">Notifications</h4>
				</div>
				<div>
					<Notification read={false} />
				</div>
			</Slide>
			<Slide bind:open={msgOpen}>
				<div class="flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-5 h-8 w-8 text-gray-800 opacity-75 hover:text-gray-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
						/>
					</svg>
					<h4 class="p-4 text-2xl font-bold text-gray-900">Messages</h4>
				</div>
			</Slide>
			<Tooltip text="notifications">
				<Badge value={10} onclick={() => (notifOpen = true)}>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
					/>
				</Badge>
			</Tooltip>
			<Tooltip text="messages">
				<Badge value={2} onclick={() => (msgOpen = true)}>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
					/>
				</Badge>
			</Tooltip>
			<Tooltip text="settings">
				<Badge onclick={() => 0}>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
					/>
				</Badge>
			</Tooltip>

			<img src={Avatar} alt="avatar" class="h-8 w-8 cursor-pointer rounded-full object-cover" />
		</div>
	</header>
	<div class="flex flex-1 overflow-hidden">
		<div class="space-y-4 overflow-auto rounded-lg border-r border-gray-400 p-4 lg:w-50">
			<ul>
				{#each routes as route}
					<a href={route.path}>
						<li
							class="mt-2 flex cursor-pointer items-center space-x-4 rounded-sm p-2 transition-colors duration-300 hover:bg-gray-100 {$page
								.url.pathname == route.path
								? 'border-r-2 border-indigo-400 bg-gray-200 hover:bg-gray-200'
								: ''}"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-5 opacity-75 transition-colors duration-300 {$page.url.pathname ==
								route.path
									? 'text-indigo-600'
									: ''}"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								{@html route.img}
							</svg>
							<h4 class="font-medium text-gray-800">{route.name}</h4>
						</li>
					</a>
				{/each}
			</ul>
		</div>
		<div class="flex-1 overflow-auto p-4">
			<slot />
		</div>
	</div>
</section>
