<script lang="ts">
	let { title = '', children } = $props();
</script>

<details class="group mt-4 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm transition-all duration-300">
	<summary
		class="flex cursor-pointer justify-between items-center px-6 py-4 list-none font-bold text-gray-900 dark:text-white hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
	>
		<span class="text-lg">{title}</span>

		<svg
			class="size-5 shrink-0 text-indigo-500 transition-transform duration-300 group-open:rotate-180"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
			></path>
		</svg>
	</summary>
	<div class="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4">
        {@render children?.()}
    </div>
</details>

