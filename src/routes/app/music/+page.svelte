<script lang="ts">
	import { v4 } from 'uuid';
	import Music from '$lib/components/user/music/Music.svelte';
	import { page } from '$app/stores';
	import { id_user } from '$lib/store/id_user.store';
	import Dialog from '$lib/components/user/app/Dialog.svelte';
	import Header from '$lib/components/user/music/Header.svelte';
	import { goto, invalidate } from '$app/navigation';
	import Title from '$lib/components/user/app/Title.svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	onMount(() => {
		invalidate('app:music');
	});

	function cleanTitle(title: string) {
		return title.replace(/^\d+-/, '');
	}

	let files = $state<any[]>([]);
	$effect(() => {
		files = (data.files ?? []).map((f: any) => ({
			...f,
			title: cleanTitle(f.title),
			_key: f._key || v4()
		}));
	});

	let filteredFiles = $derived(
		files.filter((f: any) => f.title.toLowerCase().includes(search.toLowerCase()))
	);

	let grid = $state(true);
	let open = $state(false);
	let progress = $state(0);
	let file: File | null = $state(null);
	let previewUrl: string | null = $state(null);
	let previewType: string = $state('audio');
	let search = $state($page.url.searchParams.get('q') ?? '');

	$effect(() => {
		const currentQ = $page.url.searchParams.get('q') ?? '';
		if (search !== currentQ) {
			goto(`?q=${encodeURIComponent(search)}`, {
				replaceState: true,
				noScroll: true,
				keepFocus: true
			});
		}
	});

	// Player State
	let currentTrack = $state<any>(null);
	let isPlaying = $state(false);
	let isUploading = $state(false);

	function onChange(e: Event) {
		const input = e.target as HTMLInputElement;
		const newFile = input.files?.[0] ?? null;
		if (previewUrl != null) {
			URL.revokeObjectURL(previewUrl);
			previewUrl = null;
		}
		if (newFile) {
			file = newFile;
			previewUrl = URL.createObjectURL(newFile);
			previewType = newFile.type.startsWith('audio') ? 'audio' : 'video';
		}
	}

	function playTrack(track: any) {
		currentTrack = track;
		isPlaying = true;
	}
</script>

<div class="relative flex h-full flex-col bg-gray-50/30 dark:bg-transparent">
	<Header>
		<div class="flex items-center gap-4">
			<div class="flex items-center gap-2">
				<div
					class="rounded-lg bg-indigo-500 p-1.5 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
						/>
					</svg>
				</div>
				<Title>Music Library</Title>
			</div>

			<div class="h-6 w-px bg-gray-200 dark:bg-gray-800"></div>

			<div class="flex gap-2">
				<button
					onclick={() => (grid = false)}
					aria-label="List view"
					class="rounded-lg p-2 transition-all {!grid
						? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30'
						: 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'}"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					>
				</button>
				<button
					onclick={() => (grid = true)}
					aria-label="Grid view"
					class="rounded-lg p-2 transition-all {grid
						? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30'
						: 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'}"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
						/></svg
					>
				</button>
			</div>
		</div>

		<div class="flex-1 px-8">
			<div class="relative max-w-md">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/></svg
				>
				<input
					type="search"
					bind:value={search}
					placeholder="Search tracks..."
					class="w-full rounded-xl border-none bg-gray-100 py-2 pr-4 pl-10 text-sm ring-1 ring-indigo-500/30 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-indigo-500/20"
				/>
			</div>
		</div>

		<button
			onclick={() => (open = true)}
			class="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-600 dark:shadow-none"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
				><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg
			>
			Upload
		</button>
	</Header>

	<main class="flex-1 overflow-auto p-8">
		<div class="mb-8 flex items-center justify-between">
			<div>
				<h3 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
					Music Collection
				</h3>
				<p class="text-sm font-medium text-gray-500">Manage and listen to your library</p>
			</div>
			<div class="flex items-center gap-2 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
				<span class="px-3 text-xs font-bold text-gray-500">{filteredFiles.length} Tracks</span>
			</div>
		</div>

		{#if grid}
			<div class="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
				{#each filteredFiles as file (file._key)}
					<!-- svelte-ignore event_directive_deprecated -->
					<button onclick={() => playTrack(file)} class="flex flex-col items-center">
						<Music title={file.title} url={file.url} {grid} />
					</button>
				{/each}
			</div>
		{:else}
			<div
				class="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950"
			>
				<table class="min-w-full divide-y divide-gray-50 dark:divide-gray-800">
					<thead class="bg-gray-50/50 dark:bg-gray-900/50">
						<tr>
							<th
								class="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-400 uppercase"
								>#</th
							>
							<th
								class="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-400 uppercase"
								>Title</th
							>
							<th
								class="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-400 uppercase"
								>Artist</th
							>
							<th
								class="px-6 py-4 text-right text-xs font-bold tracking-wider text-gray-400 uppercase"
								>Duration</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-50 dark:divide-gray-800">
						{#each filteredFiles as file, i (file._key)}
							<tr
								onclick={() => playTrack(file)}
								class="group cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50"
							>
								<td class="px-6 py-4 text-sm font-medium text-gray-400">{i + 1}</td>
								<td class="px-6 py-4">
									<div class="flex items-center gap-3">
										<div
											class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 transition-colors group-hover:bg-indigo-500 group-hover:text-white dark:bg-gray-800"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-4 w-4"
												fill="currentColor"
												viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg
											>
										</div>
										<p class="font-bold text-gray-900 dark:text-gray-100">{file.title}</p>
									</div>
								</td>
								<td class="px-6 py-4 text-sm text-gray-500">Various Artist</td>
								<td class="px-6 py-4 text-right text-sm font-medium text-gray-400">3:45</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</main>

	<!-- Upload Dialog -->
	<Dialog bind:open onClose={() => (open = false)}>
		<!-- ... (existing form) -->
		<!-- svelte-ignore event_directive_deprecated -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<form
			method="POST"
			action="?/uploadfile"
			enctype="multipart/form-data"
			use:enhance={() => {
				isUploading = true;
				return async ({ result, update }) => {
					isUploading = false;
					if (result.type === 'success') {
						if (result.data?.error) {
							console.error('Server error:', result.data.error);
							alert(result.data.error);
						} else {
							open = false;
							progress = 0;
							file = null;
							if (previewUrl) {
								URL.revokeObjectURL(previewUrl);
								previewUrl = null;
							}
							invalidate('app:music');
						}
					} else if (result.type === 'failure' || result.type === 'error') {
						console.error('Upload failed:', result);
						alert('Upload failed. Please try again.');
					}
					await update();
				};
			}}
			onclick={(e) => e.stopPropagation()}
			class="flex w-full max-w-lg flex-col space-y-6 rounded-2xl border border-gray-100 bg-white p-8 dark:border-gray-800 dark:bg-gray-950"
		>
			<input type="hidden" name="id_user" value={$id_user} />
			<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Upload Media</h2>
			<label
				class="relative flex h-56 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 transition-colors hover:border-indigo-400 dark:border-gray-800"
			>
				{#if previewUrl == null}
					<div class="text-center">
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								/>
							</svg>
						</div>
						<p class="text-sm font-bold text-gray-700 dark:text-gray-300">Choose your audio</p>
					</div>
				{:else if previewType === 'audio'}
					<audio controls src={previewUrl} class="w-4/5"></audio>
				{:else}
					<video controls src={previewUrl} class="h-full w-full rounded-xl object-cover">
						<track kind="captions" />
					</video>
				{/if}
				<input name="file" type="file" accept=".mp3,.mp4" class="hidden" onchange={onChange} />
			</label>

			<div class="flex justify-end gap-3">
				<button
					type="button"
					onclick={() => (open = false)}
					class="rounded-xl px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
					>Cancel</button
				>
				<button
					type="submit"
					disabled={isUploading || !file}
					class="rounded-xl bg-indigo-500 px-8 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-none"
				>
					{#if isUploading}
						Uploading...
					{:else}
						Start Upload
					{/if}
				</button>
			</div>
		</form>
	</Dialog>
</div>
