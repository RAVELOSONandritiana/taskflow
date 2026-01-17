<script lang="ts">
	export let value = 0;
	const circumference = 2 * Math.PI * 45;
	$: filled = (value / 100) * circumference;
	$: empty = circumference - filled;
</script>

<div class="mt-4 rounded-md border py-10 text-center shadow-md dark:bg-gray-800 dark:border-gray-700">
	<div
		class="relative mx-auto size-32"
		role="progressbar"
		aria-valuenow={value}
		aria-valuemin="0"
		aria-valuemax="100"
	>
		<svg class="size-full" viewBox="0 0 100 100">
			<circle
				cx="50"
				cy="50"
				r="45"
				fill="none"
				stroke="currentColor"
				stroke-width="8"
				class="text-gray-200 dark:text-gray-700"
			></circle>

			<circle
				cx="50"
				cy="50"
				r="45"
				fill="none"
				stroke="currentColor"
				stroke-width="8"
				stroke-dasharray="{filled} {empty}"
				stroke-linecap="round"
				class="origin-center text-blue-400"
				style="transform: rotate(-90deg)"
			></circle>
		</svg>

		<div class="absolute inset-0 grid place-content-center">
			<span class="text-xl font-semibold text-gray-700 dark:text-white">{value}%</span>
		</div>
	</div>

	<p class="text-md mt-2 font-bold text-gray-700 dark:text-white">Global State</p>
</div>
