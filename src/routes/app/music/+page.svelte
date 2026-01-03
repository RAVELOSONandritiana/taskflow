<script lang="ts">
	import Music from '$lib/components/user/music/Music.svelte';
	import { page } from '$app/stores';
	import { id_user } from '$lib/store/id_user.store';
	import Dialog from '$lib/components/user/app/Dialog.svelte';
	import FloatingButton from '$lib/components/user/app/FloatingButton.svelte';
	import Header from '$lib/components/user/music/Header.svelte';
	import Tooltip from '$lib/components/user/Tooltip.svelte';
	import { goto } from '$app/navigation';
	let { data } = $props();
	// svelte-ignore state_referenced_locally
	let files = $state(
		data.files.map((f) => {
			return { ...f, _key: crypto.randomUUID() };
		})
	);
	// svelte-ignore state_referenced_locally
	// svelte-ignore state_referenced_locally
	let filteredFiles = $state(files);
	let open = $state(false);
	let progress = $state(0);
	let file: File | null = $state(null);
	let previewUrl: string | null = $state(null);
	let previewType: string = $state('audio');
	let search: string = $state($page.url.searchParams.get('q') ?? '');
	$effect(() => {
		filteredFiles = files.filter((f) => f.title.toLowerCase().includes(search.toLowerCase()));
		goto(`?q=${encodeURIComponent(search)}`, {
			replaceState: true,
			noScroll: true,
			keepFocus: true
		});
	});

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
			if (newFile.type.startsWith('audio')) {
				previewType = 'audio';
			} else if (newFile.type.startsWith('video')) {
				previewType = 'video';
			}
		}
		input.value = '';
	}
</script>

<Dialog {open} onClose={() => (open = false)}>
	<!-- svelte-ignore event_directive_deprecated -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<form
		on:click|stopPropagation
		on:submit|preventDefault={(e) => {
			const formData = new FormData();
			if (file) {
				formData.append('file', file);
				formData.append('id_user', $id_user);
			}
			const xhr = new XMLHttpRequest();
			xhr.responseType = 'json';
			xhr.open('POST', '?/uploadfile');

			xhr.upload.onprogress = (e) => {
				if (e.lengthComputable) {
					progress = Math.round((e.loaded / e.total) * 100);
				}
			};

			xhr.onload = () => {
				const res = xhr.response;
				files.push({
					url: JSON.parse(res.data)[JSON.parse(res.data)[0].url],
					title: JSON.parse(res.data)[JSON.parse(res.data)[0].title],
					_key: crypto.randomUUID()
				});

				if (progress == 100) {
					setTimeout(() => {
						if (previewUrl) {
							progress = 0;
							URL.revokeObjectURL(previewUrl);
							previewUrl = null;
						}
						open = false;
					}, 500);
				}
			};

			xhr.send(formData);
		}}
		class="flex w-100 flex-col items-center justify-center space-y-4 rounded-md bg-white p-6"
	>
		<label
			class="relative flex h-40 w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400"
		>
			{#if previewUrl == null}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					data-slot="icon"
					class="h-16 w-16 text-gray-400"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
					/>
				</svg>
				<p class="text-lg text-gray-700">Upload audio here!</p>
			{:else if previewType == 'audio'}
				<audio controls src={previewUrl}></audio>
			{:else if previewType == 'video'}
				<div class="mx-4 overflow-hidden">
					<video controls src={previewUrl} class="h-full w-full">
						<track kind="captions" />
					</video>
				</div>
			{/if}

			<!-- svelte-ignore event_directive_deprecated -->
			<input type="file" accept=".mp3,.mp4" class="hidden" on:change={onChange} />
		</label>
		<div class="w-full">
			{#if file != null}
				<div role="progressbar" aria-valuemin="0" aria-valuemax="100">
					<div class="mt-2 h-2 w-full rounded-full bg-gray-200">
						<div class="h-full rounded-full bg-blue-400" style="width: {progress}%"></div>
					</div>
				</div>
				{#if progress != 100}
					<p class="text-gray-700">Upload: {progress}%</p>
				{:else}
					<p class="text-gray-700">Upload: <span class="text-green-500">Success</span></p>
				{/if}
			{/if}
		</div>
		<button
			type="submit"
			class="cursor-pointer rounded-md bg-indigo-500 px-4 py-2 text-white shadow-sm hover:bg-indigo-400"
			>Upload</button
		>
	</form>
</Dialog>

<FloatingButton on:press={() => (open = true)}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		class="h-5 w-5 text-gray-700"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		aria-hidden="true"
		data-slot="icon"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
	</svg>
</FloatingButton>

<section class="flex flex-col">
	<Header>
		<span class="flex items-center space-x-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
				data-slot="icon"
				class="w-5 text-blue-500"
			>
				<path
					fill-rule="evenodd"
					d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
					clip-rule="evenodd"
				/>
			</svg>
			<p class="font-bold">player</p>
		</span>
		<input
			type="search"
			bind:value={search}
			placeholder="search music"
			class="rounded-md border border-gray-400 bg-gray-100 px-4 py-1 outline-none focus:w-80 focus:border-none focus:ring-2 focus:ring-indigo-500
	"
		/>
		<Tooltip text="view">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
				data-slot="icon"
				class=" h-5 w-5"
			>
				<path
					fill-rule="evenodd"
					d="M7.491 5.992a.75.75 0 0 1 .75-.75h12a.75.75 0 1 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM7.49 11.995a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM7.491 17.994a.75.75 0 0 1 .75-.75h12a.75.75 0 1 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.24 3.745a.75.75 0 0 1 .75-.75h1.125a.75.75 0 0 1 .75.75v3h.375a.75.75 0 0 1 0 1.5H2.99a.75.75 0 0 1 0-1.5h.375v-2.25H2.99a.75.75 0 0 1-.75-.75ZM2.79 10.602a.75.75 0 0 1 0-1.06 1.875 1.875 0 1 1 2.652 2.651l-.55.55h.35a.75.75 0 0 1 0 1.5h-2.16a.75.75 0 0 1-.53-1.281l1.83-1.83a.375.375 0 0 0-.53-.53.75.75 0 0 1-1.062 0ZM2.24 15.745a.75.75 0 0 1 .75-.75h1.125a1.875 1.875 0 0 1 1.501 2.999 1.875 1.875 0 0 1-1.501 3H2.99a.75.75 0 0 1 0-1.501h1.125a.375.375 0 0 0 .036-.748H3.74a.75.75 0 0 1-.75-.75v-.002a.75.75 0 0 1 .75-.75h.411a.375.375 0 0 0-.036-.748H2.99a.75.75 0 0 1-.75-.75Z"
					clip-rule="evenodd"
				/>
			</svg>
		</Tooltip>
	</Header>
	{#if filteredFiles.length != 0}
		<table class="my-4 min-w-full divide-y rounded-md border border-gray-100">
			<thead>
				<tr>
					<th class="py-4 pl-4 text-left text-sm font-medium text-gray-700">preview</th>
					<th class="py-4 pl-4 text-left text-sm font-medium text-gray-700">title</th>
					<th class="py-4 pl-4 text-left text-sm font-medium text-gray-700">play</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredFiles as file (file._key)}
					{#if file.title.endsWith('mp3')}
						<Music title={file.title} url={file.url} />
					{/if}
				{/each}
			</tbody>
		</table>
	{/if}
	<div class="mx-auto mt-10 flex items-center justify-center">
		{#if filteredFiles.length == 0 && search == ''}
			<p class="font-medium text-gray-800">None music for you</p>
		{:else if filteredFiles.length == 0 && search != ''}
			<p class="font-medium text-gray-800">None corrspondance for:</p>
			<strong class="mx-1 font-bold text-gray-800">{search}</strong>
		{/if}
	</div>
</section>
