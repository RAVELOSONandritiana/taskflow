<script lang="ts">
	import Avatar from '$lib/images/solo.png';
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';

	interface Props {
		sender: string;
		content: string;
		time: string;
		isMe?: boolean;
	}

	let { sender, content, time, isMe = false }: Props = $props();

	// Custom renderer to add copy buttons to code blocks
	const renderer = new marked.Renderer();
	const originalCode = renderer.code.bind(renderer);
	
	renderer.code = function(code, language, escaped) {
		const id = Math.random().toString(36).substring(7);
		const escapedCode = typeof code === 'string' ? code : (code as any).text;
		const lang = language || 'code';
		
		return `
			<div class="code-block-container relative group my-4 not-prose">
				<div class="flex items-center justify-between px-4 py-2 bg-gray-800 rounded-t-xl text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-700/50">
					<span class="flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
						</svg>
						${lang}
					</span>
					<button 
						class="copy-button flex items-center gap-1.5 hover:text-white transition-colors active:scale-95"
						data-code="${encodeURIComponent(escapedCode)}"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
						</svg>
						Copy
					</button>
				</div>
				<pre class="!m-0 !rounded-t-none rounded-b-xl bg-gray-900/90 p-4 overflow-x-auto custom-scrollbar"><code class="text-gray-100 font-mono text-xs leading-relaxed">${escapedCode}</code></pre>
			</div>
		`;
	};

	let html = $derived(DOMPurify.sanitize(marked.parse(content, { renderer }) as string));

	function handleAction(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const btn = target.closest('.copy-button') as HTMLButtonElement;
		
		if (btn) {
			const code = decodeURIComponent(btn.getAttribute('data-code') || '');
			navigator.clipboard.writeText(code);
			
			const originalText = btn.innerHTML;
			btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg> Copied!`;
			btn.classList.add('text-green-400');
			
			setTimeout(() => {
				btn.innerHTML = originalText;
				btn.classList.remove('text-green-400');
			}, 2000);
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex w-full flex-col {isMe ? 'items-end' : 'items-start'} mb-8" onclick={handleAction}>
	<div class="flex max-w-[85%] items-end gap-3 {isMe ? 'flex-row-reverse' : 'flex-row'}">
		{#if !isMe}
			<div class="relative shrink-0">
				<img src={Avatar} alt={sender} class="h-9 w-9 rounded-2xl border-2 border-white bg-indigo-50 object-cover shadow-sm dark:border-gray-800 dark:bg-gray-900" />
				<div class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-950"></div>
			</div>
		{/if}
		
		<div class="flex flex-col {isMe ? 'items-end' : 'items-start'}">
			{#if !isMe}
				<div class="mb-1.5 flex items-center gap-2 px-1">
					<span class="text-[11px] font-black tracking-widest text-gray-900 uppercase dark:text-gray-400">{sender}</span>
					<span class="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
					<span class="text-[10px] font-bold text-gray-400">{time}</span>
				</div>
			{/if}
			
			<div 
				class="relative overflow-hidden rounded-3xl p-5 shadow-sm transition-all
				{isMe 
					? 'bg-indigo-600 text-white rounded-br-none shadow-indigo-100 dark:shadow-none' 
					: 'bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-gray-800'}"
			>
				<div class="prose prose-sm max-w-none {isMe ? 'prose-invert text-white' : 'dark:prose-invert'} prose-p:leading-relaxed prose-pre:bg-transparent prose-pre:p-0">
					{@html html}
				</div>
				
				{#if isMe}
					<div class="mt-2 flex justify-end">
						<span class="text-[9px] font-black uppercase tracking-widest opacity-50">{time}</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	:global(.custom-scrollbar)::-webkit-scrollbar {
		height: 4px;
	}
	:global(.custom-scrollbar)::-webkit-scrollbar-track {
		background: transparent;
	}
	:global(.custom-scrollbar)::-webkit-scrollbar-thumb {
		background: rgba(156, 163, 175, 0.3);
		border-radius: 10px;
	}
</style>
