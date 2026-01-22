<script lang="ts">
	import { page } from '$app/stores';
	import { projects } from '$lib/store/project.store';
	import KanbanBoard from '$lib/components/user/app/KanbanBoard.svelte';
	import ProjectDiagram from '$lib/components/user/app/ProjectDiagram.svelte';
	import Title from '$lib/components/user/app/Title.svelte';
	import Avatar from '$lib/images/solo.png';
	import { fade, fly } from 'svelte/transition';
	
	const id_project = $page.params.id_project;
	let project = $derived($projects.find(p => p.id === id_project) || { title: 'Project Not Found', description: '' });
	
	let activeTab = $state('tasks'); // 'overview', 'tasks', 'diagram'

	// Simulated Data for Overview
	const stats = [
		{ label: 'Completed', value: '12', total: '24', icon: 'check', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/10' },
		{ label: 'In Progress', value: '8', total: '24', icon: 'refresh', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/10' },
		{ label: 'High Priority', value: '4', total: '24', icon: 'alert', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/10' }
	];

	const members = [
		{ name: 'Alex Rivera', role: 'Lead Developer', status: 'online' },
		{ name: 'Sarah Chen', role: 'UI Designer', status: 'away' },
		{ name: 'Marcus Bell', role: 'Product Manager', status: 'online' },
		{ name: 'Elena Vance', role: 'QA Engineer', status: 'offline' }
	];

	const activities = [
		{ user: 'Sarah Chen', action: 'updated the', target: 'Design Phase', project: 'landing-page', time: '2h ago', type: 'diagram' },
		{ user: 'Alex Rivera', action: 'moved', target: 'API Integration', project: 'todo-list', time: '4h ago', type: 'task' },
		{ user: 'Marcus Bell', action: 'sent a message in', target: 'Development Team', project: 'chat', time: 'Yesterday', type: 'message' }
	];
</script>

<div class="flex h-full flex-col bg-gray-50/30 dark:bg-transparent">
	<!-- Project Header -->
	<header class="sticky top-0 z-20 border-b border-gray-100 bg-white/80 px-8 pt-8 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
		<div class="mb-6 flex items-start justify-between">
			<div>
				<nav class="mb-2 flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-400 uppercase">
					<a href="/app/project" class="hover:text-indigo-500 transition-colors">Projects</a>
					<span class="opacity-30">/</span>
					<span class="text-indigo-500">{project?.title}</span>
				</nav>
				<Title>{project?.title}</Title>
				<p class="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">{project?.description || 'No description provided.'}</p>
			</div>
			
			<div class="flex gap-3">
				<button class="rounded-xl border border-gray-100 bg-white px-5 py-2.5 text-xs font-bold transition-all hover:bg-gray-50 active:scale-95 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800">
					Settings
				</button>
				<button class="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-black text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none">
					Share Project
				</button>
			</div>
		</div>

		<!-- Tabs -->
		<div class="flex gap-10">
			{#each ['overview', 'tasks', 'diagram'] as tab}
				<button 
					onclick={() => (activeTab = tab)}
					class="relative pb-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all {activeTab === tab ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}"
				>
					{tab}
					{#if activeTab === tab}
						<div 
							layout:fly={{ y: 2, duration: 300 }}
							class="absolute bottom-0 h-1 w-full rounded-t-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
						></div>
					{/if}
				</button>
			{/each}
		</div>
	</header>

	<main class="flex-1 overflow-auto p-8 custom-scrollbar">
		{#if activeTab === 'tasks'}
			<div in:fade={{ duration: 200 }}>
				<KanbanBoard />
			</div>
		{:else if activeTab === 'diagram'}
			<div in:fade={{ duration: 200 }} class="h-full">
				<ProjectDiagram />
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3" in:fly={{ y: 20, duration: 400 }}>
				<!-- Left Column: Main Info & Stats -->
				<div class="space-y-8 lg:col-span-2">
					<!-- Project Score/Health Card -->
					<section class="flex flex-col gap-6 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 md:flex-row md:items-center">
						<div class="relative flex h-32 w-32 shrink-0 items-center justify-center">
							<svg class="h-full w-full -rotate-90">
								<circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" stroke-width="8" class="text-gray-100 dark:text-gray-800" />
								<circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" stroke-width="8" stroke-dasharray="364.4" stroke-dashoffset="182.2" class="text-indigo-500" stroke-linecap="round" />
							</svg>
							<div class="absolute flex flex-col items-center">
								<span class="text-2xl font-black text-gray-900 dark:text-white">50%</span>
								<span class="text-[8px] font-black uppercase tracking-widest text-gray-400">Progress</span>
							</div>
						</div>
						
						<div class="space-y-2">
							<div class="flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
								<h3 class="text-sm font-black uppercase tracking-widest text-gray-400">Project Health: On Track</h3>
							</div>
							<h4 class="text-xl font-black text-gray-900 dark:text-white">Mid-journey through {project?.title}</h4>
							<p class="text-sm font-medium leading-relaxed text-gray-500 dark:text-gray-400">
								You've completed half of your planned tasks. The team velocity is stable, and no clinical blockers are currently identified. Keep the momentum!
							</p>
						</div>
					</section>

					<!-- Stats Grid -->
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
						{#each stats as stat}
							<div class="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
								<div class="flex h-12 w-12 items-center justify-center rounded-2xl {stat.bg} {stat.color}">
									{#if stat.icon === 'check'}
										<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
									{:else if stat.icon === 'refresh'}
										<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
									{:else}
										<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
									{/if}
								</div>
								<div>
									<p class="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
									<p class="text-xl font-black text-gray-900 dark:text-white">{stat.value}<span class="text-xs text-gray-300"> / {stat.total}</span></p>
								</div>
							</div>
						{/each}
					</div>

					<!-- Recent Activity -->
					<section class="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
						<div class="mb-6 flex items-center justify-between">
							<h3 class="text-sm font-black uppercase tracking-widest text-gray-400">Recent Activity</h3>
							<button class="text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-600 transition-colors">View All</button>
						</div>
						
						<div class="space-y-6">
							{#each activities as activity}
								<div class="flex items-start gap-4">
									<img src={Avatar} alt={activity.user} class="h-8 w-8 rounded-xl border border-gray-100 object-cover dark:border-gray-800" />
									<div class="flex flex-col">
										<p class="text-sm font-medium text-gray-600 dark:text-gray-400">
											<span class="font-black text-gray-900 dark:text-white">{activity.user}</span> {activity.action} <span class="font-bold text-indigo-500">{activity.target}</span>
										</p>
										<span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{activity.time}</span>
									</div>
									<div class="ml-auto flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-400 dark:bg-gray-800">
										{#if activity.type === 'diagram'}
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
										{:else if activity.type === 'task'}
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
										{:else}
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</section>
				</div>

				<!-- Right Column: Team & Quick Tools -->
				<div class="space-y-8">
					<!-- Team Section -->
					<section class="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
						<div class="mb-6 flex items-center justify-between">
							<h3 class="text-sm font-black uppercase tracking-widest text-gray-400">Project Team</h3>
							<button class="h-8 w-8 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m6-6H6" /></svg>
							</button>
						</div>
						
						<div class="space-y-5">
							{#each members as member}
								<div class="flex items-center justify-between group">
									<div class="flex items-center gap-3">
										<div class="relative">
											<img src={Avatar} alt={member.name} class="h-10 w-10 rounded-2xl border border-gray-100 object-cover dark:border-gray-800 shadow-sm" />
											<div class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white {member.status === 'online' ? 'bg-green-500' : member.status === 'away' ? 'bg-orange-400' : 'bg-gray-300'} dark:border-gray-900"></div>
										</div>
										<div class="flex flex-col">
											<p class="text-sm font-black text-gray-900 dark:text-white">{member.name}</p>
											<p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{member.role}</p>
										</div>
									</div>
									<button class="opacity-0 group-hover:opacity-100 transition-all text-gray-400 hover:text-indigo-500">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
									</button>
								</div>
							{/each}
						</div>
						
						<button class="mt-8 w-full rounded-2xl bg-gray-50 py-3 text-xs font-black uppercase tracking-widest text-gray-500 transition-all hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 active:scale-[0.98]">
							Manage Access
						</button>
					</section>

					<!-- Quick Summary / Links -->
					<section class="rounded-[2rem] bg-indigo-600 p-8 text-white shadow-2xl shadow-indigo-200 dark:shadow-none">
						<h3 class="mb-4 text-sm font-black uppercase tracking-[0.2em] opacity-60">Pro Tip</h3>
						<p class="text-sm font-bold leading-relaxed">
							Connect with your team in the <a href="/app/chat" class="underline decoration-indigo-300 underline-offset-4 hover:text-indigo-200">real-time chat</a> or use our AI assistant to optimize your workflow strategy.
						</p>
						<div class="mt-6 flex items-center gap-2">
							<div class="flex -space-x-2">
								{#each [1, 2, 3] as i}
									<img src={Avatar} alt="Member" class="h-8 w-8 rounded-full border-2 border-indigo-600 object-cover" />
								{/each}
							</div>
							<span class="text-[10px] font-black uppercase tracking-widest opacity-60">+2 Online</span>
						</div>
					</section>
				</div>
			</div>
		{/if}
	</main>
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #e2e8f0;
		border-radius: 10px;
	}
	:global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
		background: #1e293b;
	}
</style>
