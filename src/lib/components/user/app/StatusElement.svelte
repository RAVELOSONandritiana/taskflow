<script lang="ts">
	interface Props {
		title: string;
		value: number | string;
		color?: string;
		icon?: string;
		compact?: boolean;
	}

	let { title, value, color = 'text-indigo-600', icon = '', compact = false }: Props = $props();
</script>

<div class="group relative overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-800 {compact ? 'p-4' : 'p-6'}">
	<div class="flex items-start justify-between">
		<div>
			<p class="{compact ? 'text-[10px]' : 'text-sm'} font-medium text-gray-500 dark:text-gray-400">{title}</p>
			<h2 class="mt-1 {compact ? 'text-xl' : 'text-3xl'} font-bold tracking-tight text-gray-900 dark:text-white">
				{value}
			</h2>
		</div>
		<div class="rounded-lg bg-gray-50 {compact ? 'p-1.5' : 'p-2'} text-gray-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:bg-gray-900 dark:group-hover:bg-indigo-900/30">
			<svg xmlns="http://www.w3.org/2000/svg" class="{compact ? 'h-4 w-4' : 'h-6 w-6'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				{@html icon}
			</svg>
		</div>
	</div>
	
	<!-- Subtle progress arc decoration -->
	<div class="absolute -bottom-6 -right-6 h-24 w-24 opacity-[0.03] transition-opacity group-hover:opacity-[0.08] dark:opacity-[0.05]">
		<svg viewBox="0 0 100 100" class="h-full w-full fill-current {color}">
			<circle cx="50" cy="50" r="40" />
		</svg>
	</div>
</div>
