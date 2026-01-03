<script lang="ts">
	export let value = 0;
	export let onclick: () => void;
</script>

<div {...$$restProps} class="relative h-10 cursor-pointer p-2 {$$restProps.class ?? ''}">
	{#if value > 0}
		<span
			class="absolute top-0 -right-1 z-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white"
		>
			{value < 10 ? value : '9+'}
		</span>
	{/if}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="size-5 h-full w-full text-gray-800 opacity-75 hover:text-gray-500"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
		{onclick}
	>
		<slot />
	</svg>
</div>
