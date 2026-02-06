<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { v4 } from 'uuid';

	function autofocusAction(node: HTMLInputElement) {
		node.focus();
	}

	interface SwotItem {
		id: string;
		text: string;
	}

	let swot = $state({
		strengths: [
			{ id: v4(), text: 'Experienced core team' },
			{ id: v4(), text: 'Modern tech stack' }
		],
		weaknesses: [{ id: v4(), text: 'Limited marketing budget' }],
		opportunities: [
			{ id: v4(), text: 'Growing market demand' },
			{ id: v4(), text: 'Potential partnerships' }
		],
		threats: [{ id: v4(), text: 'High competition' }]
	});

	let newItem = $state('');
	let activeCategory = $state<keyof typeof swot | null>(null);

	function addItem(category: keyof typeof swot) {
		if (!newItem.trim()) return;
		swot[category].push({ id: v4(), text: newItem });
		newItem = '';
		activeCategory = null;
	}

	function removeItem(category: keyof typeof swot, id: string) {
		swot[category] = swot[category].filter((item) => item.id !== id);
	}

	const categories = [
		{
			id: 'strengths',
			label: 'Strengths',
			color: 'bg-green-500',
			bg: 'bg-green-50/50 dark:bg-green-950/20',
			textColor: 'text-green-600 dark:text-green-400'
		},
		{
			id: 'weaknesses',
			label: 'Weaknesses',
			color: 'bg-red-500',
			bg: 'bg-red-50/50 dark:bg-red-950/20',
			textColor: 'text-red-600 dark:text-red-400'
		},
		{
			id: 'opportunities',
			label: 'Opportunities',
			color: 'bg-indigo-500',
			bg: 'bg-indigo-50/50 dark:bg-indigo-950/20',
			textColor: 'text-indigo-600 dark:text-indigo-400'
		},
		{
			id: 'threats',
			label: 'Threats',
			color: 'bg-orange-500',
			bg: 'bg-orange-50/50 dark:bg-orange-950/20',
			textColor: 'text-orange-600 dark:text-orange-400'
		}
	] as const;
</script>

<div class="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
	{#each categories as category}
		<div
			class="flex flex-col rounded-[2.5rem] border border-gray-100 p-8 shadow-sm transition-all hover:shadow-md dark:border-gray-800 {category.bg}"
			in:fly={{ y: 20, duration: 400 }}
		>
			<div class="mb-6 flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-2xl {category.color} text-white shadow-lg"
					>
						{#if category.id === 'strengths'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2.5"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/></svg
							>
						{:else if category.id === 'weaknesses'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2.5"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/></svg
							>
						{:else if category.id === 'opportunities'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2.5"
									d="M9.663 17h4.674a3 3 0 002.903-2.261l.883-3.09a3 3 0 00-2.903-3.649H11.12l.248-1.574a1.378 1.378 0 00-2.733-.311L7 11.233V17z"
								/></svg
							>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2.5"
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/></svg
							>
						{/if}
					</div>
					<h3 class="text-xl font-black tracking-tight text-gray-900 uppercase dark:text-white">
						{category.label}
					</h3>
				</div>
				<button
					onclick={() => (activeCategory = category.id)}
					aria-label="Add item to {category.label}"
					class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-gray-400 transition-all hover:bg-gray-50 hover:text-indigo-500 active:scale-90 dark:bg-gray-900 dark:hover:bg-gray-800"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2.5"
						><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m6-6H6" /></svg
					>
				</button>
			</div>

			<div class="flex-1 space-y-3">
				{#each swot[category.id] as item (item.id)}
					<div
						class="group flex items-center justify-between rounded-2xl bg-white/60 p-4 backdrop-blur-sm transition-all hover:translate-x-1 dark:bg-gray-900/40"
						in:fade
					>
						<p class="text-sm font-bold text-gray-700 dark:text-gray-300">{item.text}</p>
						<button
							onclick={() => removeItem(category.id, item.id)}
							aria-label="Remove item"
							class="text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2.5"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/></svg
							>
						</button>
					</div>
				{/each}

				{#if activeCategory === category.id}
					<div in:fly={{ y: 10, duration: 200 }} class="mt-4">
						<input
							type="text"
							bind:value={newItem}
							placeholder="Type and press enter..."
							use:autofocusAction
							onkeydown={(e) => e.key === 'Enter' && addItem(category.id)}
							onblur={() => {
								if (!newItem) activeCategory = null;
							}}
							class="w-full rounded-2xl border-none bg-white px-4 py-3 text-sm font-bold ring-2 ring-indigo-500 outline-none dark:bg-gray-900"
						/>
					</div>
				{/if}

				{#if swot[category.id].length === 0 && activeCategory !== category.id}
					<div
						class="flex h-32 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 opacity-40 dark:border-gray-800"
					>
						<p class="text-xs font-black tracking-widest text-gray-400 uppercase">Empty Section</p>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>
