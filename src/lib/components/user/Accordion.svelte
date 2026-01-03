<script lang="ts">
	export let title = '';
</script>

<details class="group mt-5 [&[open]>summary_svg]:rotate-180">
	<summary
		class="flex cursor-pointer justify-between rounded-md border border-gray-300 px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-900"
	>
		<h6>{title}</h6>

		<svg
			class="size-5 shrink-0 transition-transform duration-300"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
			></path>
		</svg>
	</summary>
	<div class="ml-10 my-5">
        <slot/>
    </div>
</details>

