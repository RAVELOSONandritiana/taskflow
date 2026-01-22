<script lang="ts">
	export let value = 0;
	const circumference = 2 * Math.PI * 45;
	$: filled = (value / 100) * circumference;
	$: empty = circumference - filled;
</script>

<div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800">
	<div class="mb-6 flex flex-col items-center text-center">
		<h2 class="text-sm font-black uppercase tracking-widest text-gray-400">Total Progress</h2>
	</div>
	
	<div
		class="relative mx-auto size-40"
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
			<span class="text-3xl font-black tracking-tighter text-gray-900 dark:text-white">{value}%</span>
			<span class="text-[10px] font-bold uppercase tracking-widest text-indigo-500">System Health</span>
		</div>
	</div>
</div>
