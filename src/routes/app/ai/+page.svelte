<script lang="ts">
	import AIChat from '$lib/components/user/app/AIChat.svelte';
	import Title from '$lib/components/user/app/Title.svelte';
	import { fade } from 'svelte/transition';

	let { data } = $props();
	// svelte-ignore state_referenced_locally
	let conversations = $state(data.conversations);

	$effect(() => {
		conversations = data.conversations;
	});
	let selectedConversationId = $state<string | null>(null);

	let selectedConversation = $derived(conversations.find((c) => c.id === selectedConversationId));

	async function createConversation() {
		try {
			const res = await fetch('/api/ai/conversations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: 'New Chat' })
			});
			if (res.ok) {
				const data = await res.json();
				location.reload(); // Simple reload for now
			}
		} catch (e) {
			console.error(e);
		}
	}
</script>

<div class="flex h-full overflow-hidden bg-white dark:bg-transparent">
	<!-- Sidebar -->
	<aside
		class="flex hidden w-64 flex-shrink-0 flex-col border-r border-gray-100 bg-gray-50/30 md:flex dark:border-gray-800 dark:bg-gray-950/30"
	>
		<div
			class="flex items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800"
		>
			<h2 class="text-sm font-black tracking-wider text-gray-400 uppercase">History</h2>
			<button
				onclick={createConversation}
				class="rounded-lg p-2 text-indigo-500 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
				</svg>
			</button>
		</div>
		<div class="flex-1 space-y-1 overflow-y-auto p-2">
			{#each conversations as conv}
				<button
					onclick={() => (selectedConversationId = conv.id)}
					class="w-full truncate rounded-xl p-3 text-left text-xs font-medium transition-all
                    {selectedConversationId === conv.id
						? 'bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-500/10 dark:bg-gray-900 dark:text-indigo-400'
						: 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900'}"
				>
					{conv.title}
				</button>
			{/each}
		</div>
	</aside>

	<div class="flex min-w-0 flex-1 flex-col">
		{#if selectedConversationId}
			<AIChat conversationId={selectedConversationId} />
		{:else}
			<div
				class="flex flex-1 flex-col items-center justify-center bg-white p-8 text-center dark:bg-gray-950"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
						/>
					</svg>
				</div>
				<h2 class="mb-2 text-2xl font-black text-gray-900 dark:text-white">
					Welcome to AI Assistant
				</h2>
				<p class="mx-auto mb-8 max-w-md text-sm text-gray-500">
					Select a conversation from the history or start a new chat to get help with your code,
					design, or project planning.
				</p>
				<button
					onclick={createConversation}
					class="rounded-2xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-xl shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95 dark:shadow-none"
				>
					Start New Chat
				</button>
			</div>
		{/if}
	</div>
</div>
