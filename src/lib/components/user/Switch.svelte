<script lang="ts">
	import { theme } from '$lib/store/theme.store';
</script>

<div
	class="relative inline-flex items-center"
>
	<input type="checkbox" id="theme-toggle" class="peer sr-only" bind:checked={$theme} />
	
	<label
		for="theme-toggle"
		class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-700 peer-checked:bg-indigo-500"
	>
		{#if $theme}
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a5 5 0 100-10 5 5 0 000 10z" />
			</svg>
				<span class="sr-only">Light mode</span>
			{:else}
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
			</svg>
				<span class="sr-only">Dark mode</span>
			{/if}
	</label>
</div>
