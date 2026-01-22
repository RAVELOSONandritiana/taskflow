<script lang="ts">
	import MessageItem from './MessageItem.svelte';
	import Title from './Title.svelte';
	import Dialog from './Dialog.svelte';
	import { fade, fly } from 'svelte/transition';

	interface Message {
		id: string;
		role: 'user' | 'assistant' | 'system';
		content: string;
		time: string;
	}

	let messages = $state<Message[]>([
		{
			id: '1',
			role: 'assistant',
			content: 'Hello! I am your local AI assistant. How can I help you today?',
			time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		}
	]);

	let newMessage = $state('');
	let isTyping = $state(false);
	let showHelp = $state(false);
	let apiUrl = $state('http://localhost:1234/v1/chat/completions');
	let modelName = $state('local-model');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!newMessage.trim() || isTyping) return;

		const userMsg: Message = {
			id: Math.random().toString(36).substring(7),
			role: 'user',
			content: newMessage,
			time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		};

		messages.push(userMsg);
		const currentInput = newMessage;
		newMessage = '';
		isTyping = true;

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					model: modelName,
					messages: messages.map(m => ({ role: m.role, content: m.content })),
					temperature: 0.7
				})
			});

			if (!response.ok) throw new Error('Failed to connect to local LLM');

			const data = await response.json();
			const aiContent = data.choices[0].message.content;

			messages.push({
				id: Math.random().toString(36).substring(7),
				role: 'assistant',
				content: aiContent,
				time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			});
		} catch (error) {
			console.error('LLM Error:', error);
			messages.push({
				id: 'error-' + Date.now(),
				role: 'assistant',
				content: 'Error: Could not connect to LM Studio. Please make sure the Local Server is running at ' + apiUrl,
				time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			});
		} finally {
			isTyping = false;
		}
	}
</script>

<div class="flex h-full flex-col overflow-hidden bg-white dark:bg-gray-950">
	<!-- Header -->
	<header class="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
		<div class="flex items-center gap-4">
			<div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
				</svg>
			</div>
			<div class="flex flex-col">
				<h2 class="text-sm font-bold text-gray-900 dark:text-white">Local AI Assistant</h2>
				<span class="text-[10px] font-bold uppercase tracking-widest text-green-500">LM Studio Connected</span>
			</div>
		</div>

		<div class="flex items-center gap-3">
			<button 
				onclick={() => showHelp = true}
				class="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2 text-sm font-bold text-gray-600 transition-all hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
				</svg>
				How to use
			</button>
		</div>
	</header>

	<!-- Chat History -->
	<div class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
		{#each messages as msg (msg.id)}
			<MessageItem 
				sender={msg.role === 'user' ? 'You' : 'AI Assistant'}
				content={msg.content}
				time={msg.time}
				isMe={msg.role === 'user'}
			/>
		{/each}
		
		{#if isTyping}
			<div class="flex items-start gap-3" in:fade>
				<div class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
				</div>
				<div class="rounded-2xl bg-gray-50 px-4 py-2 text-sm text-gray-500 dark:bg-gray-900">
					AI is thinking...
				</div>
			</div>
		{/if}
	</div>

	<!-- Input Area -->
	<footer class="border-t border-gray-100 p-6 dark:border-gray-800">
		<form onsubmit={handleSubmit} class="mx-auto flex max-w-4xl gap-4">
			<div class="relative flex-1">
				<input 
					type="text" 
					bind:value={newMessage}
					placeholder="Message your local AI..."
					class="w-full rounded-2xl border-none bg-gray-50 px-6 py-4 text-sm ring-1 ring-gray-200 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:ring-gray-800"
				/>
			</div>
			<button 
				type="submit"
				disabled={isTyping || !newMessage.trim()}
				class="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 disabled:opacity-50 dark:shadow-none"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12Zm0 0h7.5" />
				</svg>
			</button>
		</form>
	</footer>
</div>

<!-- Help Modal -->
<Dialog bind:open={showHelp} onClose={() => showHelp = false}>
	<div 
		onclick={(e) => e.stopPropagation()}
		class="flex w-full max-w-lg flex-col space-y-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
	>
		<div class="space-y-2 text-center">
			<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<h2 class="text-2xl font-black text-gray-900 dark:text-white">Connecting to LM Studio</h2>
			<p class="text-sm font-medium text-gray-500">Learn how to chat with your local AI models.</p>
		</div>

		<div class="space-y-4">
			<div class="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
				<h3 class="mb-2 text-xs font-black uppercase tracking-widest text-indigo-500">Step 1: Get LM Studio</h3>
				<p class="text-sm text-gray-600 dark:text-gray-400">Download and install LM Studio from <b>lmstudio.ai</b>.</p>
			</div>
			
			<div class="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
				<h3 class="mb-2 text-xs font-black uppercase tracking-widest text-indigo-500">Step 2: Start Local Server</h3>
				<p class="text-sm text-gray-600 dark:text-gray-400">Go to the <b>Local Server</b> tab (↔ icon) in LM Studio and click <b>Start Server</b>.</p>
			</div>

			<div class="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
				<h3 class="mb-2 text-xs font-black uppercase tracking-widest text-indigo-500">Step 3: Configuration</h3>
				<p class="text-sm text-gray-600 dark:text-gray-400">Ensure the server is running on <code class="text-indigo-600">localhost:1234</code>. The chat will automatically connect!</p>
			</div>
		</div>

		<button 
			onclick={() => showHelp = false}
			class="w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
		>
			Got it, thanks!
		</button>
	</div>
</Dialog>

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
