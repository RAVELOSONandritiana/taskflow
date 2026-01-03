<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<button
	{...$$restProps}
	on:click={() => dispatch('press')}
	class="cursor-pointer rounded-md bg-indigo-500 px-6 py-2 text-white shadow-sm hover:bg-indigo-400 {$$restProps.class ??
		''}"
>
	<slot />
</button>
