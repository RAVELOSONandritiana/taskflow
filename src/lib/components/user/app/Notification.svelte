<script lang="ts">
	import Logo from '$lib/images/solo.png';
	import { theme } from '$lib/store/theme.store';

	interface Props {
		read: boolean;
		title?: string;
		subtitle?: string;
		time?: string;
		description?: string;
	}

	let {
		read = $bindable(),
		title = 'Notification Title',
		subtitle = 'Alex Tasker',
		time = '2m ago',
		description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi recusandae quos eum id, itaque eius mollitia officia dicta.'
	}: Props = $props();

	let visible = $state(true);
	let moreText = $state(false);
</script>

{#if visible}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="group relative flex cursor-pointer gap-4 border-b border-gray-50/50 p-6 transition-all duration-300 hover:bg-gray-50 dark:border-gray-800/50 dark:hover:bg-gray-900/50 {read
			? 'bg-transparent'
			: 'bg-indigo-50/30 dark:bg-indigo-500/5'}"
		onclick={() => (read = true)}
	>
		<!-- Unread Indicator -->
		{#if !read}
			<div class="absolute left-0 top-0 h-full w-1 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.4)]"></div>
		{/if}

		<div class="relative h-12 w-12 flex-shrink-0">
			<img src={Logo} alt="sender" class="h-full w-full rounded-2xl border border-gray-100 object-cover shadow-sm transition-transform group-hover:scale-105 dark:border-gray-800" />
			<div class="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-sm dark:border-gray-900"></div>
		</div>

		<div class="flex-1 min-w-0">
			<div class="flex items-start justify-between gap-2">
				<div class="flex flex-col min-w-0">
					<h4 class="truncate text-[15px] font-bold text-gray-900 dark:text-white">
						{title}
					</h4>
					<div class="mt-0.5 flex items-center gap-1.5">
						<span class="text-xs font-bold text-indigo-500">{subtitle}</span>
						<span class="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
						<span class="text-[11px] font-medium text-gray-400">{time}</span>
					</div>
				</div>
				<button
					class="opacity-0 group-hover:opacity-100 rounded-xl p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
					onclick={(e) => {
						e.stopPropagation();
						visible = false;
					}}
					aria-label="Delete notification"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<p
				class="mt-2 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400 {moreText ? '' : 'line-clamp-2'}"
				onclick={(e) => {
					e.stopPropagation();
					moreText = !moreText;
				}}
			>
				{description}
			</p>
		</div>
	</div>
{/if}

