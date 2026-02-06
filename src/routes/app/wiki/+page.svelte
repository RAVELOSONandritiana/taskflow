<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';
	import Title from '$lib/components/user/app/Title.svelte';
	import { v4 } from 'uuid';

	// Wiki State
	let searchQuery = $state('');
	let selectedCategory = $state('All');
	let isEditing = $state(false);
	let currentArticle = $state<any>(null);

	const categories = ['All', 'Product', 'Engineering', 'Design', 'Onboarding', 'Policies'];

	let articles = $state([
		{
			id: v4(),
			title: 'Welcome to TaskFlow',
			category: 'Onboarding',
			author: 'Alex',
			date: '2 Oct 2025',
			content:
				'# Welcome!\nThis is the central knowledge base for our team. Feel free to contribute!',
			tags: ['Getting Started', 'Intro']
		},
		{
			id: v4(),
			title: 'Design Philosophy',
			category: 'Design',
			author: 'Sarah',
			date: '15 Jan 2026',
			content: 'We focus on high-stakes project management with a premium feel.',
			tags: ['UI', 'UX', 'Branding']
		},
		{
			id: v4(),
			title: 'API Rate Limits',
			category: 'Engineering',
			author: 'Marcus',
			date: '3 Feb 2026',
			content: 'Internal API limits are set to 5000 requests per hour.',
			tags: ['Backend', 'DevOps']
		}
	]);

	let filteredArticles = $derived(
		articles.filter((a) => {
			const matchesSearch =
				a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
			const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
			return matchesSearch && matchesCategory;
		})
	);

	function openArticle(article: any) {
		currentArticle = { ...article };
		isEditing = true;
	}

	function createNew() {
		currentArticle = {
			id: v4(),
			title: '',
			category: 'Product',
			author: 'Alex',
			date: 'Today',
			content: '',
			tags: []
		};
		isEditing = true;
	}

	function saveArticle() {
		const index = articles.findIndex((a) => a.id === currentArticle.id);
		if (index !== -1) {
			articles[index] = currentArticle;
		} else {
			articles = [currentArticle, ...articles];
		}
		isEditing = false;
	}

	function cancelEdit() {
		isEditing = false;
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
				Collective Intelligence
			</div>
			<Title class="text-2xl font-black tracking-tight text-gray-900 lg:text-4xl dark:text-white">
				Knowledge Base
			</Title>
			<p class="text-sm font-medium text-gray-500 dark:text-gray-400">
				Centralized team documentation and shared resources.
			</p>
		</div>

		<div class="flex flex-col gap-4 sm:flex-row sm:items-center">
			<div class="relative w-full sm:w-auto">
				<input
					type="text"
					placeholder="Search articles..."
					bind:value={searchQuery}
					class="w-full rounded-2xl border-none bg-white px-5 py-3 pl-12 text-xs font-bold shadow-sm ring-1 ring-gray-100 transition-all focus:ring-2 focus:ring-indigo-500 sm:w-64 dark:bg-gray-900 dark:ring-gray-800"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="absolute top-3.5 left-4 h-4 w-4 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
			<button
				onclick={createNew}
				class="rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-black text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
			>
				Create Article
			</button>
		</div>
	</header>

	{#if !isEditing}
		<!-- Category Filter bar -->
		<div class="no-scrollbar mb-8 flex flex-wrap gap-2 overflow-x-auto pb-2" in:fade>
			{#each categories as category}
				<button
					onclick={() => (selectedCategory = category)}
					class="rounded-xl px-5 py-2.5 text-[9px] font-black tracking-widest whitespace-nowrap uppercase transition-all md:text-[10px] {selectedCategory ===
					category
						? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none'
						: 'bg-white text-gray-400 shadow-sm hover:text-gray-600 dark:bg-gray-900 dark:hover:text-gray-300'}"
				>
					{category}
				</button>
			{/each}
		</div>

		<!-- Articles Grid -->
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" in:fade>
			{#each filteredArticles as article (article.id)}
				<button
					onclick={() => openArticle(article)}
					class="group flex flex-col items-start rounded-[2rem] border border-gray-100 bg-white p-6 text-left transition-all hover:border-indigo-100 hover:shadow-xl md:rounded-[2.5rem] md:p-8 dark:border-gray-800 dark:bg-gray-950"
				>
					<div class="mb-5 flex w-full items-center justify-between">
						<span
							class="rounded-full bg-indigo-50 px-3 py-1 text-[9px] font-black tracking-widest text-indigo-500 uppercase dark:bg-indigo-500/10 dark:text-indigo-400"
						>
							{article.category}
						</span>
						<span class="text-[9px] font-bold tracking-widest text-gray-400 uppercase"
							>{article.date}</span
						>
					</div>
					<h3
						class="mb-3 text-xl font-black tracking-tight text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white"
					>
						{article.title}
					</h3>
					<p
						class="mb-6 line-clamp-3 text-sm leading-relaxed font-medium text-gray-500 dark:text-gray-400"
					>
						{article.content.replace(/[#*]/g, '')}
					</p>
					<div class="mt-auto flex w-full items-center gap-2">
						{#each article.tags as tag}
							<span class="text-[9px] font-black tracking-[0.1em] text-gray-400 uppercase"
								>#{tag}</span
							>
						{/each}
						<div class="ml-auto flex items-center gap-2">
							<span class="text-[10px] font-black text-gray-900 dark:text-white"
								>{article.author}</span
							>
						</div>
					</div>
				</button>
			{/each}
		</div>
	{:else}
		<!-- Editor View -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8" in:fly={{ y: 20, duration: 600 }}>
			<div class="order-2 space-y-6 lg:order-1 lg:col-span-8">
				<div
					class="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:rounded-[2.5rem] md:p-10 dark:border-gray-800 dark:bg-gray-950"
				>
					<input
						type="text"
						bind:value={currentArticle.title}
						placeholder="Article Title"
						class="mb-6 w-full border-none bg-transparent p-0 text-2xl font-black tracking-tight text-gray-900 outline-none placeholder:text-gray-200 md:text-4xl dark:text-white dark:placeholder:text-gray-800"
					/>

					<div class="mb-6 flex gap-4">
						<select
							bind:value={currentArticle.category}
							class="rounded-xl border-none bg-gray-50 px-4 py-2 text-[10px] font-black tracking-widest text-gray-500 uppercase ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800"
						>
							{#each categories.filter((c) => c !== 'All') as cat}
								<option value={cat}>{cat}</option>
							{/each}
						</select>
					</div>

					<textarea
						bind:value={currentArticle.content}
						placeholder="Start writing your thoughts..."
						class="min-h-[300px] w-full resize-none border-none bg-transparent p-0 text-base leading-relaxed font-medium text-gray-600 outline-none placeholder:text-gray-200 md:min-h-[400px] md:text-lg dark:text-gray-400 dark:placeholder:text-gray-800"
					></textarea>
				</div>
			</div>

			<div class="order-1 space-y-6 lg:order-2 lg:col-span-4">
				<div
					class="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:rounded-[2.5rem] md:p-8 dark:border-gray-800 dark:bg-gray-950"
				>
					<h3 class="mb-6 text-[11px] font-black tracking-widest text-gray-400 uppercase">
						Settings & Tags
					</h3>
					<div class="space-y-6">
						<div>
							<span
								class="mb-2 block text-[10px] font-black tracking-widest text-gray-400 uppercase"
								>Author</span
							>
							<div class="flex items-center gap-3">
								<div class="h-8 w-8 rounded-full bg-indigo-500"></div>
								<span class="text-sm font-bold text-gray-900 dark:text-white"
									>{currentArticle.author}</span
								>
							</div>
						</div>

						<!-- Simulating Tag Input -->
						<div>
							<span
								class="mb-2 block text-[10px] font-black tracking-widest text-gray-400 uppercase"
								>Article Visibility</span
							>
							<div
								class="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-900"
							>
								<span class="text-xs font-bold">Public to Team</span>
								<div class="h-5 w-10 rounded-full bg-indigo-600 p-1">
									<div class="ml-auto h-3 w-3 rounded-full bg-white"></div>
								</div>
							</div>
						</div>
					</div>

					<div class="mt-8 flex flex-col gap-3">
						<button
							onclick={saveArticle}
							class="w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
						>
							Save & Publish
						</button>
						<button
							onclick={cancelEdit}
							class="w-full rounded-2xl bg-gray-50 py-4 text-sm font-bold text-gray-500 transition-all hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
						>
							Discard Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
