<script lang="ts">
	import Avatar from '$lib/images/solo.png';

	interface Props {
		sender: string;
		content: string;
		time: string;
		isMe?: boolean;
	}

	let { sender, content, time, isMe = false }: Props = $props();
</script>

<div class="flex w-full flex-col {isMe ? 'items-end' : 'items-start'} mb-6">
	<div class="flex max-w-[80%] items-end gap-3 {isMe ? 'flex-row-reverse' : 'flex-row'}">
		{#if !isMe}
			<img src={Avatar} alt={sender} class="h-8 w-8 rounded-full border border-gray-100 object-cover dark:border-gray-800" />
		{/if}
		
		<div class="flex flex-col {isMe ? 'items-end' : 'items-start'}">
			{#if !isMe}
				<span class="mb-1 ml-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{sender}</span>
			{/if}
			
			<div 
				class="relative rounded-2xl px-4 py-2.5 text-sm shadow-sm transition-all
				{isMe 
					? 'bg-indigo-600 text-white rounded-br-none' 
					: 'bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-gray-700'}"
			>
				{content}
			</div>
			
			<span class="mt-1.5 text-[10px] font-medium text-gray-400">{time}</span>
		</div>
	</div>
</div>
