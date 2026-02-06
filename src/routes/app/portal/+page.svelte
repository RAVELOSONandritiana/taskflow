<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';
	import Title from '$lib/components/user/app/Title.svelte';
	import { v4 } from 'uuid';

	let portals = $state([
		{
			id: v4(),
			client: 'Starlight Agency',
			project: 'Brand Refresh',
			lastAccess: '2 hours ago',
			status: 'active',
			permissions: ['View Progress', 'Download Assets'],
			views: 124
		},
		{
			id: v4(),
			client: 'Nexus Hub',
			project: 'Market Strategy',
			lastAccess: 'Never',
			status: 'pending',
			permissions: ['Full Access'],
			views: 0
		}
	]);

	function togglePortalStatus(id: string) {
		portals = portals.map((p) =>
			p.id === id ? { ...p, status: p.status === 'active' ? 'disabled' : 'active' } : p
		);
	}
</script>

<div class="min-h-full bg-gray-50/30 p-8 dark:bg-transparent">
	<header
		class="mb-8 flex flex-col justify-between gap-6 lg:mb-10 lg:flex-row lg:items-end"
		in:fly={{ y: -20, duration: 600 }}
	>
		<div class="space-y-1">
			<div
				class="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-indigo-500 uppercase"
			>
				<span class="h-1 w-4 rounded-full bg-indigo-500"></span>
				External Cooperation
			</div>
			<Title class="text-2xl font-black tracking-tight text-gray-900 lg:text-4xl dark:text-white">
				Client Portal
			</Title>
			<p class="text-sm font-medium text-gray-500 dark:text-gray-400">
				Manage secure external access for your clients and collaborators.
			</p>
		</div>

		<button
			class="rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-black text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
		>
			Generate Access Link
		</button>
	</header>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
		<!-- Active Portals -->
		<div class="order-2 space-y-6 lg:order-1 lg:col-span-8" in:fade>
			<h3 class="px-2 text-[11px] font-black tracking-widest text-gray-400 uppercase">
				Active External Portals
			</h3>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				{#each portals as portal (portal.id)}
					<div
						class="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg md:rounded-[2.5rem] md:p-8 dark:border-gray-800 dark:bg-gray-950"
					>
						<div class="mb-6 flex items-center justify-between">
							<div
								class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
									/>
								</svg>
							</div>
							<div
								class="h-6 w-12 cursor-pointer rounded-full p-1 transition-colors {portal.status ===
								'active'
									? 'bg-green-500'
									: 'bg-gray-200 dark:bg-gray-800'}"
								onclick={() => togglePortalStatus(portal.id)}
								onkeydown={(e) => e.key === 'Enter' && togglePortalStatus(portal.id)}
								role="button"
								tabindex="0"
							>
								<div
									class="h-4 w-4 rounded-full bg-white transition-all {portal.status === 'active'
										? 'ml-6'
										: 'ml-0'}"
								></div>
							</div>
						</div>

						<h4 class="mb-1 text-xl font-black text-gray-900 dark:text-white">{portal.client}</h4>
						<p class="mb-6 text-[10px] font-black tracking-widest text-indigo-500 uppercase">
							Accessing: {portal.project}
						</p>

						<div class="space-y-4">
							<div class="flex flex-wrap gap-2">
								{#each portal.permissions as perm}
									<span
										class="rounded-lg bg-gray-50 px-2.5 py-1 text-[9px] font-bold text-gray-500 dark:bg-gray-900 dark:text-gray-400"
										>{perm}</span
									>
								{/each}
							</div>

							<div
								class="flex items-center justify-between border-t border-gray-50 pt-4 dark:border-gray-900"
							>
								<div class="flex flex-col">
									<span class="text-[9px] font-bold tracking-widest text-gray-400 uppercase"
										>Total Views</span
									>
									<span class="text-sm font-black text-gray-900 dark:text-white"
										>{portal.views}</span
									>
								</div>
								<div class="flex flex-col text-right">
									<span class="text-[9px] font-bold tracking-widest text-gray-400 uppercase"
										>Last Activity</span
									>
									<span class="text-sm font-black text-gray-900 dark:text-white"
										>{portal.lastAccess}</span
									>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Security Logs -->
		<div class="order-1 space-y-6 lg:order-2 lg:col-span-4">
			<h3 class="px-2 text-[11px] font-black tracking-widest text-gray-400 uppercase">
				Security & Privacy
			</h3>
			<div
				class="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950"
			>
				<div
					class="mb-8 rounded-2xl border border-orange-100 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10"
				>
					<p class="text-xs leading-relaxed font-bold text-orange-600 dark:text-orange-400">
						Security tip: We recommend rotating access links every 30 days for sensitive projects.
					</p>
				</div>

				<div class="space-y-6">
					<div class="flex items-center justify-between">
						<span class="text-xs font-bold text-gray-900 dark:text-white">IP Whitelisting</span>
						<div class="h-5 w-10 rounded-full bg-gray-200 p-1 dark:bg-gray-800">
							<div class="h-3 w-3 rounded-full bg-white"></div>
						</div>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-xs font-bold text-gray-900 dark:text-white">Password Protection</span>
						<div class="h-5 w-10 rounded-full bg-indigo-600 p-1">
							<div class="ml-auto h-3 w-3 rounded-full bg-white"></div>
						</div>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-xs font-bold text-gray-900 dark:text-white">Auto-expire Links</span>
						<div class="h-5 w-10 rounded-full bg-indigo-600 p-1">
							<div class="ml-auto h-3 w-3 rounded-full bg-white"></div>
						</div>
					</div>
				</div>

				<button
					class="mt-8 w-full rounded-2xl bg-gray-900 py-4 text-sm font-black text-white transition-all hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-700"
					>Audit Access Logs</button
				>
			</div>
		</div>
	</div>
</div>
