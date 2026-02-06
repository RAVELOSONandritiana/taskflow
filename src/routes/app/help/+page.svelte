<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import { fade, fly } from 'svelte/transition';
	import { theme } from '$lib/store/theme.store';

	let searchQuery = $state('');

	const categories = [
		{
			id: 'getting-started',
			title: 'Quick Start',
			icon: '🚀',
			description: 'Setup your workspace and master the basics.',
			color: 'bg-blue-500'
		},
		{
			id: 'collaboration',
			title: 'Collaboration',
			icon: '💬',
			description: 'Messaging Hub, Syncs, and Client Portal.',
			color: 'bg-indigo-500'
		},
		{
			id: 'task-management',
			title: 'Kanban & Tasks',
			icon: '📂',
			description: 'Managing projects and tracking progress.',
			color: 'bg-emerald-500'
		},
		{
			id: 'performance',
			title: 'Reporting',
			icon: '📈',
			description: 'Analytics, Health, and Velocity metrics.',
			color: 'bg-amber-500'
		}
	];

	const articles = [
		{
			id: 'dashboard',
			category: 'getting-started',
			title: 'Dashboard Overview',
			content:
				'Your central hub for high-level overview. See your current velocity, workspace health, and recent activities at a glance. Customize your widgets to focus on what matters most.'
		},
		{
			id: 'pomodoro',
			category: 'getting-started',
			title: 'Using Pomodoro',
			content:
				'Boost focus with the integrated Pomodoro timer. Switch between Focus, Short Break, and Long Break intervals. View your daily logs in the History section.'
		},
		{
			id: 'discussions',
			category: 'collaboration',
			title: 'Discussion Groups',
			content:
				'Use the Messaging Hub to collaborate in real-time. Share code snippets with Markdown support, invite members, and organize chats by project or guild.'
		},
		{
			id: 'client-portal',
			category: 'collaboration',
			title: 'External Access',
			content:
				'The Client Portal allows stakeholders to view project boards without full workspace access. Manage secure links and audit logs from the Portal settings.'
		},
		{
			id: 'kanban',
			category: 'task-management',
			title: 'Task Lifecycle',
			content:
				'Drag and drop cards between To Do, In Progress, and Done. Use project detail headers to store long-form documentation alongside your tasks.'
		},
		{
			id: 'velocity',
			category: 'performance',
			title: 'Tracking Velocity',
			content:
				'Monitor team throughput via Advanced Analytics. Use the Spline charts to identify bottlenecks and predict release cycles based on historical data.'
		}
	];

	let filteredArticles = $derived(
		articles.filter(
			(a) =>
				a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				a.content.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	let selectedCategory = $state<string | null>(null);
	let displayedArticles = $derived(
		selectedCategory
			? filteredArticles.filter((a) => a.category === selectedCategory)
			: filteredArticles
	);
</script>

<div class="h-full overflow-y-auto bg-gray-50/20 dark:bg-transparent">
	<!-- Hero Section -->
	<div
		class="relative overflow-hidden border-b border-gray-100 bg-white px-6 py-20 dark:border-gray-800 dark:bg-gray-950"
	>
		<div
			class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent dark:from-indigo-500/5"
		></div>

		<div class="mx-auto max-w-4xl text-center">
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-[10px] font-black tracking-widest text-indigo-600 uppercase dark:bg-indigo-500/10 dark:text-indigo-400"
				in:fade
			>
				<span class="relative flex h-2 w-2">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"
					></span>
					<span class="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
				</span>
				Support Center
			</div>

			<h1
				class="mb-6 text-4xl font-black tracking-tight text-gray-900 md:text-5xl dark:text-white"
				in:fly={{ y: 20, duration: 800 }}
			>
				How can we help <span class="text-indigo-600">you</span>?
			</h1>

			<div class="mx-auto max-w-xl" in:fly={{ y: 20, delay: 200, duration: 800 }}>
				<div class="group relative">
					<div
						class="absolute inset-0 -z-10 rounded-2xl bg-indigo-500/10 blur-xl transition-all group-focus-within:bg-indigo-500/20"
					></div>
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search for articles, guides..."
						class="h-16 w-full rounded-2xl border-none bg-white px-8 text-lg ring-1 ring-gray-100 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:ring-gray-800"
					/>
					<div class="absolute top-1/2 right-6 -translate-y-1/2 text-gray-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Categories Grid -->
	<div class="mx-auto max-w-6xl px-6 py-16">
		<div class="mb-12 flex items-center justify-between">
			<h2 class="text-xs font-black tracking-[0.2em] text-gray-400 uppercase">Browse Categories</h2>
			{#if selectedCategory}
				<button
					onclick={() => (selectedCategory = null)}
					class="text-xs font-bold text-indigo-500 hover:text-indigo-600"
				>
					Clear Filter
				</button>
			{/if}
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each categories as category}
				<button
					onclick={() => (selectedCategory = category.id)}
					class="group relative flex flex-col items-start overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-8 text-left transition-all hover:shadow-2xl hover:ring-2 hover:ring-indigo-500/20 dark:border-gray-800 dark:bg-gray-950 {selectedCategory ===
					category.id
						? 'ring-2 ring-indigo-500'
						: ''}"
				>
					<div
						class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl {category.color} text-2xl text-white shadow-lg shadow-indigo-200 transition-transform group-hover:scale-110 dark:shadow-none"
					>
						{category.icon}
					</div>
					<h3 class="mb-2 text-lg font-black tracking-tight text-gray-900 dark:text-white">
						{category.title}
					</h3>
					<p class="text-xs font-medium text-gray-400">{category.description}</p>
				</button>
			{/each}
		</div>

		<!-- Articles Section -->
		<div class="mt-24">
			<div class="mb-10 text-center">
				<h2 class="text-2xl font-black text-gray-900 dark:text-white">
					{searchQuery ? `Results for "${searchQuery}"` : 'Common Resources'}
				</h2>
			</div>

			<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
				{#each displayedArticles as article (article.id)}
					<div
						class="group flex flex-col rounded-[2.5rem] border border-gray-100 bg-white p-10 transition-all hover:border-transparent hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
						in:fade
					>
						<div class="mb-6 flex items-center gap-3">
							<span
								class="rounded-lg bg-gray-50 px-3 py-1 text-[9px] font-black tracking-widest text-gray-500 uppercase dark:bg-gray-900"
							>
								{article.category.replace('-', ' ')}
							</span>
						</div>
						<h3
							class="mb-4 text-xl font-black tracking-tight text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white"
						>
							{article.title}
						</h3>
						<p class="mb-8 text-sm leading-relaxed font-medium text-gray-500 dark:text-gray-400">
							{article.content}
						</p>
						<button
							class="mt-auto flex items-center gap-2 text-[10px] font-black tracking-widest text-indigo-500 uppercase transition-all hover:translate-x-1"
						>
							Read Full Article
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2.5"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</button>
					</div>
				{/each}
			</div>

			{#if displayedArticles.length === 0}
				<div class="py-20 text-center">
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-50 text-gray-300 dark:bg-gray-900"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-10 w-10"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 class="text-xl font-black text-gray-900 dark:text-white">No matches found</h3>
					<p class="text-sm font-medium text-gray-400">
						Try adjusting your search or category filter
					</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- Support Footer -->
	<div class="mx-auto max-w-6xl px-6 pb-20">
		<div
			class="relative overflow-hidden rounded-[3rem] bg-gray-900 px-8 py-12 text-center text-white md:px-16 md:py-16 dark:bg-indigo-600"
		>
			<div
				class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.1),_transparent)]"
			></div>
			<h2 class="mb-4 text-3xl font-black">Still have questions?</h2>
			<p
				class="mx-auto mb-10 max-w-xl text-lg font-medium text-gray-400 opacity-80 dark:text-indigo-100"
			>
				Our community and support teams are always available to help you get the most out of
				TaskFlow.
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<button
					class="w-full rounded-2xl bg-white px-8 py-4 text-sm font-black text-gray-900 transition-all hover:scale-105 active:scale-95 sm:w-auto"
				>
					Contact Support
				</button>
				<button
					class="w-full rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-black text-white backdrop-blur-md transition-all hover:bg-white/10 sm:w-auto"
				>
					Visit Community
				</button>
			</div>
		</div>
	</div>
</div>
