<script lang="ts">
	import Notification from './Notification.svelte';
	import { fade, scale } from 'svelte/transition';

	let { open = $bindable() }: { open: boolean } = $props();

	function close() {
		open = false;
	}
</script>

{#if open}
	<!-- Backdrop for outside click -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div 
		class="fixed inset-0 z-50 overflow-hidden" 
		onclick={close}
	>
		<div 
			class="absolute right-6 top-20 w-[400px] origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl backdrop-blur-3xl dark:border-gray-700 dark:bg-gray-900"
			transition:scale={{ duration: 200, start: 0.95, opacity: 0 }}
			onclick={(e) => e.stopPropagation()}
		>
			<div class="flex items-center justify-between border-b border-gray-100/50 p-4 dark:border-gray-800/50">
				<div class="flex items-center gap-3">
					<div class="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
						</svg>
					</div>
					<h4 class="text-base font-bold text-gray-900 dark:text-gray-100">Notifications</h4>
				</div>
				<button 
					class="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
					onclick={() => console.log('Mark all read')}
				>
					Mark all read
				</button>
			</div>

			<div class="max-h-[480px] overflow-y-auto py-2 custom-scrollbar">
				<Notification read={false} title="New Project Assigned" subtitle="System" time="Just now" description="You have been assigned to 'TaskFlow Redesign' project." />
				<Notification read={false} title="Team Invitation" subtitle="Sarah Miller" time="2h ago" description="Sarah invited you to join the 'Product Guild' team." />
				<Notification read={true} title="Security Update" subtitle="Security" time="Yesterday" description="Your password was last changed 3 months ago. Consider updating it." />
			</div>

			<div class="border-t border-gray-100 p-2 dark:border-gray-800">
				<a 
					href="/app/notifications" 
					onclick={close}
					class="flex w-full items-center justify-center rounded-xl bg-gray-50/80 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
				>
					View all history
				</a>
			</div>
		</div>
	</div>
{/if}

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
