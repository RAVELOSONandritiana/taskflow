<script lang="ts">
	interface Props {
		title: string;
		url?: string;
		grid?: boolean;
	}

	let { title, grid = true }: Props = $props();
</script>

<div class="group relative w-full transition-all">
	{#if grid}
		<div class="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 transition-all group-hover:shadow-lg group-hover:-translate-y-1">
			<div class="flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-600 transition-colors group-hover:text-indigo-400">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
				</svg>
			</div>
			
			<!-- Play Overlay -->
			<div class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black/40">
				<div class="rounded-full bg-white p-2 text-indigo-600 shadow-xl transition-transform group-hover:scale-110">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
				</div>
			</div>
		</div>
		<div class="mt-2 w-full text-center">
			<p class="truncate text-[11px] font-bold text-gray-800 dark:text-gray-200" title={title}>{title}</p>
			<p class="truncate text-[9px] font-medium text-gray-400">Various Artist</p>
		</div>
	{:else}
		<!-- List view is handled inside the table in +page.svelte -->
	{/if}
</div>
