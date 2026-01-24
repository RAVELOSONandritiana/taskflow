<script lang="ts">
	import { currentTrack, titleStore } from './../../../store/track.store.ts';
	interface Props {
		title: string;
		url: string;
		grid?: boolean;
	}

	let { title, url, grid = true }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore event_directive_deprecated -->
<div
	class="group relative w-full rounded-sm p-4 transition-all {url == $currentTrack?.url
		? 'bg-gray-300 dark:bg-gray-600'
		: ''}"
	onclick={() => {
		currentTrack.set({
			url: url,
			isPlay: true
		});
		titleStore.set(title);
	}}
>
	{#if grid}
		<div
			class="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 transition-all group-hover:-translate-y-1 group-hover:shadow-lg dark:bg-gray-800"
		>
			<div
				class="flex h-full w-full items-center justify-center text-gray-300 transition-colors group-hover:text-indigo-400 dark:text-gray-600"
			>
				{#if url.toLowerCase().endsWith('.mp4')}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-1/2 w-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-1/2 w-1/2"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
						/>
					</svg>
				{/if}
			</div>

			<div
				class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
			>
				<div
					class="rounded-full bg-white p-2 text-indigo-600 shadow-xl transition-transform group-hover:scale-110"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="ml-0.5 h-5 w-5"
						fill="currentColor"
						viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg
					>
				</div>
			</div>
		</div>
		<div class="mt-2 w-full text-center">
			<p class="truncate text-[11px] font-bold text-gray-800 dark:text-gray-200" {title}>{title}</p>
			<p class="truncate text-[9px] font-medium text-gray-400">Various Artist</p>
		</div>
	{:else}{/if}
</div>
