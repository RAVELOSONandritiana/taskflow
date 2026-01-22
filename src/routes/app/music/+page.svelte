<script lang="ts">
	import { v4 } from 'uuid';
	import Music from '$lib/components/user/music/Music.svelte';
	import { page } from '$app/stores';
	import { id_user } from '$lib/store/id_user.store';
	import Dialog from '$lib/components/user/app/Dialog.svelte';
	import Header from '$lib/components/user/music/Header.svelte';
	import { goto } from '$app/navigation';
	import Title from '$lib/components/user/app/Title.svelte';
	import { fade, fly, scale } from 'svelte/transition';

	let { data } = $props();
	
	function cleanTitle(title: string) {
		return title.replace(/^\d+-/, '');
	}

	let files = $state<any[]>([]);
	$effect(() => {
		if (files.length === 0 && data.files) {
			files = data.files.map((f: any) => ({ 
				...f, 
				title: cleanTitle(f.title),
				_key: v4() 
			}));
		}
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
		input.value = '';
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
				<div class="rounded-lg bg-indigo-500 p-1.5 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
					</svg>
				</div>
				<Title>Music Library</Title>
			</div>
			
			<div class="h-6 w-[1px] bg-gray-200 dark:bg-gray-800"></div>
			
			<div class="flex gap-2">
				<button 
					onclick={() => (grid = false)}
					aria-label="List view"
					class="rounded-lg p-2 transition-all {!grid ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'}"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
				</button>
				<button 
					onclick={() => (grid = true)}
					aria-label="Grid view"
					class="rounded-lg p-2 transition-all {grid ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'}"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
				</button>
			</div>
		</div>

		<div class="flex-1 px-8">
			<div class="relative max-w-md">
				<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
				<input
					type="search"
					bind:value={search}
					placeholder="Search tracks..."
					class="w-full rounded-xl border-none bg-gray-100 pl-10 pr-4 py-2 text-sm outline-none ring-1 ring-gray-200 transition-all focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-gray-700"
				/>
			</div>
		</div>

		<button 
			onclick={() => (open = true)}
			class="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-600 dark:shadow-none"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
			Upload
		</button>
	</Header>

	<main class="flex-1 overflow-auto p-8">
		<div class="flex items-center justify-between mb-8">
			<div>
				<h3 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Music Collection</h3>
				<p class="text-sm font-medium text-gray-500">Manage and listen to your library</p>
			</div>
			<div class="flex items-center gap-2 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
				<span class="px-3 text-xs font-bold text-gray-500">{filteredFiles.length} Tracks</span>
			</div>
		</div>

		{#if grid}
			<div class="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
				{#each filteredFiles as file (file._key)}
					<button 
						onclick={() => playTrack(file)}
						class="flex flex-col items-center"
					>
						<Music title={file.title} url={file.url} {grid} />
					</button>
				{/each}
			</div>
		{:else}
			<div class="rounded-2xl border border-gray-100 bg-white overflow-hidden dark:border-gray-800 dark:bg-gray-950">
				<table class="min-w-full divide-y divide-gray-50 dark:divide-gray-800">
					<thead class="bg-gray-50/50 dark:bg-gray-900/50">
						<tr>
							<th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">#</th>
							<th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Title</th>
							<th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Artist</th>
							<th class="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">Duration</th>
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
										<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 transition-colors group-hover:bg-indigo-500 group-hover:text-white dark:bg-gray-800">
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
										</div>
										<p class="font-bold text-gray-900 dark:text-gray-100">{file.title}</p>
									</div>
								</td>
								<td class="px-6 py-4 text-sm text-gray-500">Various Artist</td>
								<td class="px-6 py-4 text-right text-sm text-gray-400 font-medium">3:45</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</main>

	<!-- Floating Mini Player -->
	{#if currentTrack}
		<div 
			class="fixed bottom-6 right-6 z-50 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/90"
			transition:fly={{ y: 50, duration: 400 }}
		>
			<div class="flex items-center gap-4">
				<div class="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-indigo-500 text-white shadow-lg">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full p-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
					{#if isPlaying}
						<!-- Simple soundwave animation -->
						<div class="absolute inset-0 flex items-center justify-center gap-1 bg-indigo-600/20 backdrop-blur-[1px]">
							<div class="sound-bar h-4 w-1 animate-sound" style="animation-delay: 0s"></div>
							<div class="sound-bar h-6 w-1 animate-sound" style="animation-delay: 0.2s"></div>
							<div class="sound-bar h-5 w-1 animate-sound" style="animation-delay: 0.1s"></div>
							<div class="sound-bar h-3 w-1 animate-sound" style="animation-delay: 0.3s"></div>
						</div>
					{/if}
				</div>
				
				<div class="min-w-0 flex-1">
					<h4 class="truncate text-sm font-black tracking-tight text-gray-900 dark:text-white" title={currentTrack.title}>{currentTrack.title}</h4>
					<p class="text-[10px] font-bold uppercase tracking-wider text-indigo-500">Various Artist</p>
					
					<div class="mt-2 flex items-center gap-4">
						<button aria-label="Previous" class="text-gray-400 hover:text-indigo-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6L18 6v12z" /></svg>
						</button>
						<button 
							onclick={() => (isPlaying = !isPlaying)}
							aria-label={isPlaying ? 'Pause' : 'Play'}
							class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
						>
							{#if isPlaying}
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
							{:else}
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
							{/if}
						</button>
						<button aria-label="Next" class="text-gray-400 hover:text-indigo-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6zM16 6v12h2V6z" /></svg>
						</button>
					</div>
				</div>
				
				<button 
					onclick={() => (currentTrack = null)}
					aria-label="Close Player"
					class="p-1 text-gray-300 hover:text-red-500"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
				</button>
			</div>
			
			<div class="mt-4 h-1 w-full rounded-full bg-gray-100 dark:bg-gray-800">
				<div class="h-full w-1/3 rounded-full bg-indigo-500"></div>
			</div>
		</div>
	{/if}

	<!-- Upload Dialog -->
	<Dialog bind:open onClose={() => (open = false)}>
		<!-- ... (existing form) -->
		<form
			onsubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				if (file) {
					formData.append('file', file);
					formData.append('id_user', $id_user);
				}
				files.push({ 
					title: cleanTitle(file?.name || 'New Track'), 
					url: previewUrl || '', 
					_key: v4() 
				});
				open = false;
				progress = 0;
			}}
			class="flex w-full max-w-lg flex-col space-y-6 rounded-2xl border border-gray-100 bg-white p-8 dark:border-gray-800 dark:bg-gray-950"
		>
			<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Upload Media</h2>
			<label class="relative flex h-56 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 transition-colors hover:border-indigo-400 dark:border-gray-800">
				{#if previewUrl == null}
					<div class="text-center">
						<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
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
				<input type="file" accept=".mp3,.mp4" class="hidden" onchange={onChange} />
			</label>
			
			<div class="flex justify-end gap-3">
				<button type="button" onclick={() => (open = false)} class="rounded-xl px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
				<button type="submit" class="rounded-xl bg-indigo-500 px-8 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-600 dark:shadow-none">Start Upload</button>
			</div>
		</form>
	</Dialog>
</div>

<style>
	.sound-bar {
		background: white;
		border-radius: 2px;
	}
	
	@keyframes sound {
		0%, 100% { height: 4px; }
		50% { height: 16px; }
	}
	
	.animate-sound {
		animation: sound 0.5s ease-in-out infinite;
	}
</style>
