<script lang="ts">
	let { value = 0, compact = false }: { value?: number, compact?: boolean } = $props();
	const circumference = 2 * Math.PI * 45;
	let filled = $derived((value / 100) * circumference);
	let empty = $derived(circumference - filled);
</script>

<div class="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800 {compact ? 'p-4' : 'p-8'}">
	<div class="mb-4 flex flex-col items-center text-center">
		<h2 class="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Progress</h2>
	</div>
	
	<div
		class="relative mx-auto {compact ? 'size-28' : 'size-40'}"
		role="progressbar"
		aria-valuenow={value}
		aria-valuemin="0"
		aria-valuemax="100"
	>
		<svg class="size-full" viewBox="0 0 100 100">
			<!-- Background circle -->
			<circle
				cx="50"
				cy="50"
				r="44"
				fill="none"
				stroke="currentColor"
				stroke-width="6"
				class="text-gray-50 dark:text-gray-900"
			></circle>

			<!-- Progress circle -->
			<circle
				cx="50"
				cy="50"
				r="44"
				fill="none"
				stroke="currentColor"
				stroke-width="6"
				stroke-dasharray="{filled} {empty}"
				stroke-linecap="round"
				class="origin-center text-indigo-500 transition-all duration-1000 ease-out"
				style="transform: rotate(-90deg)"
			></circle>
		</svg>

		<div class="absolute inset-0 flex flex-col items-center justify-center">
			<span class="{compact ? 'text-xl' : 'text-3xl'} font-black tracking-tighter text-gray-900 dark:text-white">{value}%</span>
			<span class="text-[8px] font-bold uppercase tracking-widest text-indigo-500">System</span>
		</div>
	</div>
</div>
