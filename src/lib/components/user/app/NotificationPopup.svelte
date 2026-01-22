<script lang="ts">
	import Notification from './Notification.svelte';
	import { fade, fly, scale } from 'svelte/transition';

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
		class="fixed inset-0 z-[100] bg-gray-950/20 backdrop-blur-sm transition-opacity" 
		onclick={close}
		transition:fade={{ duration: 300 }}
	>
		<div 
			class="absolute right-0 top-0 h-full w-[400px] border-l border-gray-100 bg-white/95 shadow-2xl backdrop-blur-3xl lg:w-[450px] dark:border-gray-800 dark:bg-gray-950/95"
			transition:fly={{ x: 400, duration: 400, opacity: 1 }}
			onclick={(e) => e.stopPropagation()}
		>
			<div class="flex h-full flex-col">
				<!-- Header -->
				<div class="flex items-center justify-between border-b border-gray-100/50 p-6 dark:border-gray-800/50">
					<div class="flex items-center gap-4">
						<div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
							</svg>
						</div>
						<div>
							<h4 class="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Notifications</h4>
							<p class="text-xs font-semibold text-gray-500 dark:text-gray-400">You have 2 unread alerts</p>
						</div>
					</div>
					<button 
						class="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
						onclick={close}
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!-- Content -->
				<div class="flex-1 overflow-y-auto custom-scrollbar">
					<div class="divide-y divide-gray-50 dark:divide-gray-800/50">
						<Notification read={false} title="New Project Assigned" subtitle="System" time="Just now" description="You have been assigned to 'TaskFlow Redesign' project." />
						<Notification read={false} title="Team Invitation" subtitle="Sarah Miller" time="2h ago" description="Sarah invited you to join the 'Product Guild' team." />
						<Notification read={true} title="Security Update" subtitle="Security" time="Yesterday" description="Your password was last changed 3 months ago. Consider updating it." />
						<Notification read={true} title="Cloud Sync" subtitle="System" time="2 days ago" description="All your project files have been successfully synced to the cloud." />
					</div>
				</div>

				<!-- Footer -->
				<div class="border-t border-gray-100 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-950/50">
					<div class="flex items-center gap-3">
						<button 
							class="flex-1 rounded-2xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-[0.98] dark:shadow-none"
							onclick={() => console.log('Mark all read')}
						>
							Mark all as read
						</button>
						<a 
							href="/app/notifications" 
							onclick={close}
							class="flex h-[44px] w-[200px] items-center justify-center rounded-2xl border border-gray-200 bg-white text-sm font-bold text-gray-600 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
						>
							View History
						</a>
					</div>
				</div>
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
