<script lang="ts">
	import { theme } from '$lib/store/theme.store';
</script>

<label
	for="AcceptConditions"
	class="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-700"
>
	<input type="checkbox" id="AcceptConditions" class="peer sr-only" bind:checked={$theme} />

	<span
		class="absolute inset-y-0 start-0 m-1 size-5 rounded-full bg-white shadow-md transition-all peer-checked:start-6 dark:bg-gray-900"
	></span>
</label>
