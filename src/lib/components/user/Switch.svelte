<script lang="ts">
	import { theme } from '$lib/store/theme.store';
</script>

<label
	for="AcceptConditions"
	class="relative block h-6 w-10 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:transparent] has-checked:bg-indigo-900"
>
	<input type="checkbox" id="AcceptConditions" class="peer sr-only" bind:checked={$theme} />

	<span
		class="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-4"
	></span>
</label>
