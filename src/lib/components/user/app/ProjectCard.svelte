<script lang="ts">
	import { goto } from '$app/navigation';
	import Dialog from '$lib/components/user/app/Dialog.svelte';
	import { projects, type ProjectI } from '$lib/store/project.store';

	let { id, src = undefined, title, description = undefined }: ProjectI = $props();
	let abr = $state('');
	let open = $state(false);
	let showImage = $state(false);
	let openConfirm = $state(false);
	let file: File | null = $state(null);
	let previewUrl: string | null = $state(null);
	let progress = $state(0);

	$effect(() => {
		const t = title.split(' ');
		let list: string[] = [];
		t.forEach((e) => {
			if (e[0]) list.push(e[0].toUpperCase());
		});
		abr = list.slice(0, 2).join('');
	});

	function onChange(e: Event) {
		const input = e.target as HTMLInputElement;
		const newFile = input.files?.[0] ?? null;
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}
		if (newFile) {
			file = newFile;
			previewUrl = URL.createObjectURL(file);
		} else {
			previewUrl = null;
		}
		input.value = '';
	}

	function deleteProject() {
		projects.update((v) => v.filter((e) => e.id != id));
		openConfirm = false;
	}
</script>

<div
	class="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-indigo-900/50"
>
	<!-- Hero Area -->
	<div class="relative h-44 w-full overflow-hidden bg-gray-50 dark:bg-gray-800/50">
		{#if src}
			<img
				{src}
				alt={title}
				class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
			/>
		{:else}
			<div
				class="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-8"
			>
				<div class="rounded-2xl bg-white/20 p-6 backdrop-blur-md">
					<span class="text-4xl font-black text-white">{abr}</span>
				</div>
			</div>
		{/if}

		<!-- Status Badge Overlay -->
		<div
			class="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black tracking-widest text-indigo-600 uppercase shadow-sm backdrop-blur-md dark:bg-gray-900/90 dark:text-indigo-400"
		>
			Active
		</div>

		<!-- Action Overlay -->
		<div
			class="absolute inset-0 flex items-center justify-center gap-3 bg-indigo-900/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
		>
			<button
				onclick={() => (open = true)}
				aria-label="Edit project"
				class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-lg transition-transform hover:scale-110 active:scale-95 dark:bg-gray-800 dark:text-indigo-400"
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
						d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
					/>
				</svg>
			</button>
			<button
				onclick={() => (openConfirm = true)}
				aria-label="Delete project"
				class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-600 shadow-lg transition-transform hover:scale-110 active:scale-95 dark:bg-gray-800 dark:text-red-400"
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
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
			</button>
		</div>
	</div>

	<!-- Content Area -->
	<div class="flex flex-1 flex-col p-6">
		<div class="mb-2">
			<h4
				class="line-clamp-1 text-xl font-black tracking-tight text-gray-900 dark:text-white"
				{title}
			>
				{title}
			</h4>
		</div>

		<p class="mb-6 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
			{description ?? 'Build something amazing with this workspace.'}
		</p>

		<!-- Meta Stats -->
		<div class="mb-6 space-y-3">
			<div
				class="flex items-center justify-between text-[11px] font-bold tracking-wider text-gray-400 uppercase"
			>
				<span>Progress</span>
				<span class="text-indigo-500">65%</span>
			</div>
			<div class="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
				<div
					class="h-full w-[65%] rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
				></div>
			</div>
		</div>

		<div class="mt-auto flex items-center justify-between">
			<div class="flex -space-x-2">
				<div
					class="h-8 w-8 rounded-full border-2 border-white bg-indigo-100 dark:border-gray-900"
				></div>
				<div
					class="h-8 w-8 rounded-full border-2 border-white bg-blue-100 dark:border-gray-900"
				></div>
				<div
					class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-50 text-[10px] font-bold text-gray-400 dark:border-gray-900 dark:bg-gray-800"
				>
					+3
				</div>
			</div>

			<button
				onclick={() => goto('/app/project/' + id)}
				class="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2 text-sm font-black text-gray-900 transition-all hover:bg-indigo-500 hover:text-white dark:bg-gray-800 dark:text-white dark:hover:bg-indigo-600"
			>
				Manage
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	</div>
</div>

<Dialog open={openConfirm} onClose={() => (openConfirm = false)}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		role="presentation"
		class="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900"
		onclick={(e) => e.stopPropagation()}
	>
		<div
			class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-900/20"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-7 w-7"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
				/>
			</svg>
		</div>
		<h4 class="text-xl font-black tracking-tight text-gray-900 dark:text-white">Delete: {title}</h4>
		<p class="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
			This action cannot be undone. All tasks and diagrams associated with this project will be
			permanently removed.
		</p>
		<div class="mt-8 flex gap-3">
			<button
				type="button"
				class="flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 hover:bg-red-600 dark:shadow-none"
				onclick={deleteProject}
			>
				Confirm Delete
			</button>
			<button
				type="button"
				class="dark:hover:bg-gray-750 flex-1 rounded-xl bg-gray-50 py-3 text-sm font-bold text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
				onclick={() => (openConfirm = false)}
			>
				Cancel
			</button>
		</div>
	</div>
</Dialog>

<Dialog
	{open}
	onClose={() => {
		open = false;
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			file = null;
		}
	}}
>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-100 flex items-center justify-center bg-black/50"
		onclick={() => ((open = false), previewUrl && (URL.revokeObjectURL(previewUrl), (file = null)))}
	>
		<div
			class="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900"
			onclick={(e) => e.stopPropagation()}
		>
			<form
				role="presentation"
				enctype="multipart/form-data"
				onsubmit={async (e) => {
					e.preventDefault();
					const data = new FormData(e.currentTarget);
					data.append('id', `${id}`);
					data.append('id_user', '1');
					if (file) data.append('image', file);

					const xhr = new XMLHttpRequest();
					xhr.open('POST', '?/update');
					xhr.responseType = 'json';
					xhr.upload.onprogress = (e) => {
						if (e.lengthComputable) progress = Math.round((e.loaded / e.total) * 100);
					};
					xhr.onload = () => {
						const json = xhr.response;
						src = JSON.parse(json.data)[JSON.parse(json.data)[0].filepath] ?? src;
						const object = Object.fromEntries(data.entries());
						title = object.title as string;
						description = object.description as string;
						projects.update((list) =>
							list.map((e) => (e.id == id ? { id, title, description, src } : e))
						);
						if (progress == 100)
							setTimeout(() => {
								open = false;
								progress = 0;
								if (previewUrl) {
									URL.revokeObjectURL(previewUrl);
									file = null;
								}
							}, 500);
					};
					xhr.send(data);
				}}
			>
				<div class="mb-6">
					<h4 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
						Project Settings
					</h4>
					<p class="text-sm font-medium text-gray-500">
						Update your project details and cover image.
					</p>
				</div>

				<div class="space-y-6">
					<label class="block">
						<span class="mb-2 block text-xs font-black tracking-widest text-gray-400 uppercase"
							>Project Name</span
						>
						<input
							type="text"
							name="title"
							required
							value={title}
							class="w-full rounded-xl border-none bg-gray-100 px-4 py-3 text-sm font-bold ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-gray-700"
						/>
					</label>

					<label class="block">
						<span class="mb-2 block text-xs font-black tracking-widest text-gray-400 uppercase"
							>Description</span
						>
						<textarea
							name="description"
							rows="3"
							class="w-full rounded-xl border-none bg-gray-100 px-4 py-3 text-sm font-medium ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-gray-700"
							value={description}
						></textarea>
					</label>

					<label
						class="relative flex h-44 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 transition-colors hover:border-indigo-400 hover:bg-indigo-50/10 dark:border-gray-700 dark:bg-gray-800/30"
					>
						{#if file == null}
							<div class="text-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mx-auto mb-2 h-10 w-10 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<p class="text-xs font-bold text-gray-500">Click to upload cover image</p>
							</div>
						{:else if previewUrl}
							<img src={previewUrl} alt="Preview" class="h-full w-full object-cover" />
						{/if}
						<input type="file" accept="image/*" class="hidden" onchange={onChange} />
					</label>

					{#if file}
						<div class="flex items-center justify-between">
							<span class="text-xs font-bold text-gray-500">Upload progress</span>
							<span class="text-xs font-black text-indigo-500">{progress}%</span>
						</div>
						<div class="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
							<div class="h-full rounded-full bg-indigo-500" style="width: {progress}%"></div>
						</div>
					{/if}

					<div class="pt-2">
						<button
							type="submit"
							class="w-full rounded-xl bg-indigo-500 py-3 text-sm font-black text-white shadow-lg shadow-indigo-200 hover:bg-indigo-600 dark:shadow-none"
						>
							Save Project Changes
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</Dialog>
