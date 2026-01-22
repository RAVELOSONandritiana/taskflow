<script lang="ts">
	import { page } from '$app/stores';
	import { projects } from '$lib/store/project.store';
	import KanbanBoard from '$lib/components/user/app/KanbanBoard.svelte';
	import ProjectDiagram from '$lib/components/user/app/ProjectDiagram.svelte';
	import Title from '$lib/components/user/app/Title.svelte';
	
	const projectId = $page.params.projectId;
	let project = $derived($projects.find(p => p.id === projectId) || { title: 'Project Not Found', description: '' });
	
	let activeTab = $state('tasks'); // 'overview', 'tasks', 'diagram'
</script>

<div class="flex h-full flex-col bg-gray-50/50 dark:bg-transparent">
	<!-- Project Header -->
	<header class="sticky top-0 z-20 border-b border-gray-100 bg-white/80 px-8 pt-8 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
		<div class="mb-6 flex items-start justify-between">
			<div>
				<nav class="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-400">
					<a href="/app/project" class="hover:text-indigo-500">PROJECTS</a>
					<span>/</span>
					<span class="text-indigo-500 uppercase">{project?.title}</span>
				</nav>
				<Title>{project?.title}</Title>
				<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{project?.description || 'No description provided.'}</p>
			</div>
			
			<div class="flex gap-3">
				<button class="rounded-lg border border-gray-100 bg-white px-4 py-2 text-sm font-semibold transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800">
					Settings
				</button>
				<button class="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-600 dark:shadow-none">
					Share
				</button>
			</div>
		</div>

		<!-- Tabs -->
		<div class="flex gap-8">
			{#each ['tasks', 'diagram', 'overview'] as tab}
				<button 
					onclick={() => (activeTab = tab)}
					class="relative pb-4 text-sm font-bold uppercase tracking-wider transition-colors {activeTab === tab ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}"
				>
					{tab}
					{#if activeTab === tab}
						<div class="absolute bottom-0 h-1 w-full rounded-t-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
					{/if}
				</button>
			{/each}
		</div>
	</header>

	<main class="flex-1 overflow-auto p-8">
		{#if activeTab === 'tasks'}
			<KanbanBoard />
		{:else if activeTab === 'diagram'}
			<ProjectDiagram />
		{:else}
			<div class="max-w-3xl space-y-8">
				<section class="rounded-xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800">
					<h3 class="mb-4 text-lg font-bold">Project Overview</h3>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						Welcome to {project?.title}. This is your central workspace for planning, execution, and collaboration. Use the tabs above to manage your tasks or visualize your project architecture.
					</p>
				</section>
				
				<div class="grid grid-cols-2 gap-6">
					<div class="rounded-xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
						<h4 class="mb-2 text-sm font-bold text-gray-400 uppercase">Total Tasks</h4>
						<p class="text-3xl font-bold">24</p>
					</div>
					<div class="rounded-xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
						<h4 class="mb-2 text-sm font-bold text-gray-400 uppercase">Team Members</h4>
						<p class="text-3xl font-bold">5</p>
					</div>
				</div>
			</div>
		{/if}
	</main>
</div>
