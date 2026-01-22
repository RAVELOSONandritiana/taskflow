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
		class="relative flex cursor-pointer gap-4 border-b border-gray-50 p-4 transition-all duration-300 hover:bg-indigo-50/50 dark:border-gray-800 dark:hover:bg-gray-800/50 {read
			? 'bg-transparent'
			: 'bg-indigo-50/80 dark:bg-indigo-500/10'}"
		onclick={() => (read = true)}
	>
		<!-- Unread Indicator -->
		{#if !read}
			<div class="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
		{/if}

		<div class="relative h-12 w-12 flex-shrink-0">
			<img src={Logo} alt="sender" class="h-full w-full rounded-full border border-gray-100 object-cover shadow-sm dark:border-gray-700" />
			<div class="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 dark:border-gray-900"></div>
		</div>

		<div class="flex-1 min-w-0">
			<div class="flex items-start justify-between">
				<div class="flex flex-col">
					<h4 class="truncate text-[15px] font-semibold text-gray-900 dark:text-gray-100">
						{title}
					</h4>
					<p class="text-xs font-medium text-indigo-500">{subtitle}</p>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-[11px] font-medium text-gray-400">{time}</span>
					<button
						class="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800"
						onclick={(e) => {
							e.stopPropagation();
							visible = false;
						}}
						aria-label="Delete notification"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
			
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<p
				class="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400 {moreText ? '' : 'line-clamp-2'}"
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

