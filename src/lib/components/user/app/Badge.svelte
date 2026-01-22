<script lang="ts">
	let { value = 0, onclick, children, ...rest }: { value?: number, onclick?: () => void, children?: any } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
	{...rest} 
	class="relative h-10 cursor-pointer p-2 {rest.class ?? ''}"
	onclick={onclick}
>
	{#if value > 0}
		<span
			class="absolute top-0 -right-1 z-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-sm"
		>
			{value < 10 ? value : '9+'}
		</span>
	{/if}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-full w-full text-gray-800 opacity-75 transition-colors hover:text-gray-500 dark:text-gray-200"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		{@render children?.()}
	</svg>
</div>
