<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<button
	on:click={() => dispatch('press')}
	class="absolute right-6 bottom-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
>
	<slot /></button
>
