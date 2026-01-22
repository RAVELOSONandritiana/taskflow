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

	interface Provider {
		id: 'local' | 'puter';
		name: string;
		url?: string;
		description: string;
	}

	const providers: Provider[] = [
		{ id: 'local', name: 'Private Local (LM Studio)', url: 'http://localhost:1234/v1/chat/completions', description: 'Runs entirely on your machine. Maximum privacy, requires LM Studio.' },
		{ id: 'puter', name: 'Cloud AI (Puter.js)', description: 'Fast, free, and hosted. No setup required.' }
	];

	let messages = $state<Message[]>([
		{
			id: '1',
			role: 'assistant',
			content: 'Hello! I am your AI assistant. You can chat with me locally using LM Studio or instantly via Puter Cloud.',
			time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		}
	]);

	let newMessage = $state('');
	let isTyping = $state(false);
	let showHelp = $state(false);
	let showSettings = $state(false);
	let chatContainer = $state<HTMLDivElement>();
	
	let selectedProviderId = $state<'local' | 'puter'>('puter');
	let selectedProvider = $derived(providers.find(p => p.id === selectedProviderId)!);

	$effect(() => {
		if (chatContainer && (messages.length || isTyping)) {
			chatContainer.scrollTo({
				top: chatContainer.scrollHeight,
				behavior: 'smooth'
			});
		}
	});

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
			if (selectedProviderId === 'local') {
				const response = await fetch(selectedProvider.url!, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						model: 'local-model',
						messages: messages.map(m => ({ role: m.role, content: m.content })),
						temperature: 0.7
					})
				});

				if (!response.ok) throw new Error('Local server is not responding. Please check LM Studio.');

				const data = await response.json();
				const aiContent = data.choices[0].message.content;
				addMessage(aiContent);
			} else {
				// Use Puter.js v2 SDK
				// svelte-ignore lib_not_found
				// @ts-ignore
				if (typeof puter !== 'undefined') {
					// @ts-ignore
					const response = await puter.ai.chat(messages.map(m => ({ role: m.role, content: m.content })));
					addMessage(response.toString());
				} else {
					throw new Error('Puter SDK not loaded. Please refresh the page.');
				}
			}
		} catch (error: any) {
			console.error('LLM Error:', error);
			messages.push({
				id: 'error-' + Date.now(),
				role: 'assistant',
				content: `Error: ${error.message}. ${selectedProviderId === 'local' ? 'Make sure LM Studio "Local Server" is started.' : 'Puter.js connection failed.'}`,
				time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			});
		} finally {
			isTyping = false;
		}
	}

	function addMessage(content: string) {
		messages.push({
			id: Math.random().toString(36).substring(7),
			role: 'assistant',
			content,
			time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		});
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
				<h2 class="text-sm font-bold text-gray-900 dark:text-white">Intelligent Assistant</h2>
				<div class="flex items-center gap-1.5 focus-within:animate-pulse">
					<div class="h-1.5 w-1.5 rounded-full {selectedProviderId === 'local' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'}"></div>
					<span class="text-[10px] font-bold uppercase tracking-widest text-gray-500">{selectedProvider.name}</span>
				</div>
			</div>
		</div>

		<!-- Simplified Provider Selector -->
		<div class="flex items-center gap-3">
			<div class="flex items-center gap-1 rounded-2xl bg-gray-50 p-1 dark:bg-gray-900">
				{#each providers as provider}
					<button 
						onclick={() => selectedProviderId = provider.id}
						class="rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-all
						{selectedProviderId === provider.id 
							? 'bg-white text-indigo-600 shadow-sm dark:bg-gray-800 dark:text-indigo-400' 
							: 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}"
					>
						{provider.id}
					</button>
				{/each}
			</div>

			<div class="h-6 w-[1px] bg-gray-200 dark:bg-gray-800"></div>

			<button 
				onclick={() => showSettings = true}
				class="group flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition-all hover:bg-white hover:text-gray-600 hover:shadow-md dark:bg-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-200"
				aria-label="Provider Info"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</button>
			
			<button 
				onclick={() => showHelp = true}
				class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400"
				aria-label="Setup Guide"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
				</svg>
			</button>
		</div>
	</header>

	<!-- Chat History -->
	<div class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" bind:this={chatContainer}>
		{#each messages as msg (msg.id)}
			<MessageItem 
				sender={msg.role === 'user' ? 'You' : 'Assistant'}
				content={msg.content}
				time={msg.time}
				isMe={msg.role === 'user'}
			/>
		{/each}
		
		{#if isTyping}
			<div class="flex items-start gap-4" in:fade>
				<div class="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 animate-pulse">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
					</svg>
				</div>
				<div class="rounded-2xl bg-gray-50 px-5 py-3 text-sm font-medium text-gray-500 dark:bg-gray-900 flex items-center gap-2">
					Processing request...
					<div class="flex gap-1">
						<div class="h-1 w-1 bg-gray-400 rounded-full animate-bounce"></div>
						<div class="h-1 w-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
						<div class="h-1 w-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Input Area -->
	<footer class="border-t border-gray-100 p-6 dark:border-gray-800">
		<form onsubmit={handleSubmit} class="mx-auto flex max-w-4xl gap-4">
			<div class="relative flex-1 group">
				<input 
					type="text" 
					bind:value={newMessage}
					placeholder={selectedProviderId === 'local' ? "Message local AI (LM Studio)..." : "Ask Puter Cloud AI anything..."}
					class="w-full rounded-2xl border-none bg-gray-50 px-6 py-4 text-sm font-medium ring-1 ring-gray-200 transition-all outline-none group-focus-within:ring-2 group-focus-within:ring-indigo-500 dark:bg-gray-900 dark:ring-gray-800"
				/>
				<div class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
					<span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:block">Enter to Send</span>
				</div>
			</div>
			<button 
				type="submit"
				disabled={isTyping || !newMessage.trim()}
				aria-label="Send message"
				class="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 hover:shadow-indigo-200 disabled:opacity-50 disabled:scale-95 active:scale-90 dark:shadow-none"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12Zm0 0h7.5" />
				</svg>
			</button>
		</form>
	</footer>
</div>

<!-- Simple Help Modal -->
<Dialog bind:open={showHelp} onClose={() => showHelp = false}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div 
		onclick={(e) => e.stopPropagation()}
		class="flex w-full max-w-lg flex-col space-y-8 rounded-3xl border border-gray-100 bg-white p-10 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
	>
		<div class="space-y-3 text-center">
			<div class="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<h2 class="text-3xl font-black text-gray-900 dark:text-white">AI Setup Guide</h2>
			<p class="text-sm font-medium text-gray-400 uppercase tracking-widest">Choose your intelligence source</p>
		</div>

		<div class="grid grid-cols-1 gap-4">
			<div class="rounded-3xl border border-gray-100 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
				<h3 class="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-500">
					<div class="h-2 w-2 rounded-full bg-indigo-500"></div>
					Option 1: Puter Cloud
				</h3>
				<p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">Works instantly! No configuration or API keys needed. Perfect for quick questions and online tasks.</p>
			</div>
			
			<div class="rounded-3xl border border-gray-100 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
				<h3 class="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-500">
					<div class="h-2 w-2 rounded-full bg-orange-500"></div>
					Option 2: LM Studio (Local)
				</h3>
				<p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">Start the <b>Local Server</b> inside LM Studio on port <b>1234</b>. Your data never leaves your machine.</p>
			</div>
		</div>

		<button 
			onclick={() => showHelp = false}
			class="w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
		>
			Ready to Chat
		</button>
	</div>
</Dialog>

<!-- Info Modal -->
<Dialog bind:open={showSettings} onClose={() => showSettings = false}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div 
		onclick={(e) => e.stopPropagation()}
		class="flex w-full max-w-sm flex-col space-y-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
	>
		<div class="space-y-1">
			<h2 class="text-2xl font-black text-gray-900 dark:text-white">{selectedProvider.name}</h2>
			<p class="text-xs font-bold text-indigo-500 uppercase tracking-widest">Provider Details</p>
		</div>

		<p class="text-sm font-medium leading-relaxed text-gray-500 dark:text-gray-400">
			{selectedProvider.description}
		</p>

		<div class="rounded-2xl bg-gray-50 p-4 dark:bg-gray-900">
			<div class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
				<span>Status</span>
				<span class="text-green-500">Operational</span>
			</div>
		</div>

		<button 
			onclick={() => showSettings = false}
			class="w-full rounded-2xl bg-gray-900 py-3 text-sm font-black text-white shadow-xl transition-all hover:bg-black active:scale-95 dark:bg-indigo-600 dark:hover:bg-indigo-700"
		>
			Close Instance
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
