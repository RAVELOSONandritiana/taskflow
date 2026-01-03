<script lang="ts">
	import Dialog from '$lib/components/user/app/Dialog.svelte';
	import Button from '$lib/components/user/Button.svelte';
	import { projects } from '$lib/store/project.store';

	let {
		id,
		src = undefined,
		title,
		description = undefined
	}: {
		id: number;
		src?: string;
		title: string;
		description?: string;
	} = $props();
	let abr = $state('');
	let open = $state(false);
	let showImage = $state(false);
	let openConfirm = $state(false);
	let file: File | null = $state(null);
	let previewUrl: string | null = $state(null);
	let progress = $state(0);
	// svelte-ignore state_referenced_locally
	$effect(() => {
		const t = title.split(' ');
		let list: string[] = [];
		t.forEach((e) => list.push(e[0].toUpperCase()));
		abr = list.join('');
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

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore event_directive_deprecated -->
<div
	class="mt-4 flex flex-col justify-between rounded-md border border-gray-200 p-5 shadow-md"
	on:click|stopPropagation
>
	<Dialog open={openConfirm} onClose={() => (openConfirm = false)}>
		<div
			class="shadown-md flex w-1/3 flex-col space-y-4 rounded-md border border-gray-300 bg-white px-5 py-6 text-left"
			on:click|stopPropagation
		>
			<h4 class="text-lg font-bold">Delete: {title}</h4>
			<p class="text-sm text-gray-700">
				<strong>This action is not reversible!</strong><br />
				Please click on the confirm button if you want to delete this, else cancel button
			</p>
			<div class="float-end flex items-center justify-end space-x-4">
				<button
					class="cursor-pointer rounded-md bg-indigo-500 px-4 py-2 text-white shadow-sm hover:bg-indigo-400"
					on:click={deleteProject}>Confirm</button
				><button
					class="cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-black shadow-sm hover:bg-gray-300"
					on:click={() => (openConfirm = false)}>Cancel</button
				>
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
		<!-- svelte-ignore event_directive_deprecated -->
		<form
			class="shadown-md flex w-1/3 flex-col space-y-4 rounded-md border border-gray-300 bg-white px-5 py-6 text-left"
			enctype="multipart/form-data"
			method="POST"
			action="?/update"
			on:submit|preventDefault={async (e) => {
				const data = new FormData(e.currentTarget);
				data.append('id', `${id}`);
				data.append('id_user','1');
				if (file) {
					data.append('image', file);
				}
				const xhr = new XMLHttpRequest();
				xhr.open('POST', '?/update');
				xhr.responseType = 'json';
				xhr.upload.onprogress = (e) => {
					if (e.lengthComputable) {
						progress = Math.round((e.loaded / e.total) * 100);
					}
				};
				xhr.onload = () => {
					const json = xhr.response;
					console.log(JSON.parse(json.data));
					src = JSON.parse(json.data)[JSON.parse(json.data)[0].filepath] ?? src;
					const object = Object.fromEntries(data.entries());
					title = object.title as string;
					description = object.description as string;
					projects.update((list) =>
						list.map((e) =>
							e.id == id ? { id: id, title: title, description: description, src: src } : e
						)
					);
					if (progress == 100) {
						setTimeout(() => {
							open = false;
							progress = 0;
							if (previewUrl) {
								URL.revokeObjectURL(previewUrl);
								file = null;
							}
						}, 500);
					}
				};
				xhr.send(data);
			}}
			on:click|stopPropagation
		>
			<h4 class="text-lg font-bold">Update project name</h4>
			<label for="p_name" class="space-y-2">
				<p class="font-medium text-gray-700">Name<strong class="text-red-500">*</strong></p>
				<input
					type="text"
					id="p_name"
					name="title"
					placeholder="make a simple title"
					required={true}
					value={title}
					class="w-full rounded-sm border border-gray-300 bg-gray-100 px-4 py-1 focus:border-none focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
				/>
			</label>
			<label for="description" class="space-y-2">
				<p class="font-medium text-gray-700">Description</p>
				<textarea
					placeholder="you can add a small description of your project if you want"
					name="description"
					id="description"
					rows="4"
					value={description}
					class="w-full rounded-sm border border-gray-300 bg-gray-100 px-4 py-1 focus:border-none focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
				></textarea>
			</label>
			<label
				class="relative flex h-40 w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400"
			>
				{#if file == null}
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
					<p class="text-lg text-gray-700">Upload image here!</p>
				{:else if previewUrl}
					<img
						src={previewUrl}
						alt="previsualisation fichier"
						class="absolute inset-0 h-full w-full object-cover"
					/>
				{/if}

				<input type="file" accept="image/*" class="hidden" on:change={onChange} />
			</label>
			{#if file}
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
			<button
				type="submit"
				class="cursor-pointer rounded-md bg-indigo-500 px-4 py-2 text-white shadow-sm hover:bg-indigo-400"
				>Update</button
			>
		</form>
	</Dialog>
	<div class="flex items-center justify-between">
		<h4 class="text-lg font-bold text-gray-700">{title}</h4>
		<div class="flex space-x-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				aria-hidden="true"
				data-slot="icon"
				class="w-4 cursor-pointer transition-transform duration-100 hover:w-5 hover:text-gray-700"
				on:click={() => (open = true)}
			>
				<path
					d="M12.613 1.258a1.535 1.535 0 0 1 2.13 2.129l-1.905 2.856a8 8 0 0 1-3.56 2.939 4.011 4.011 0 0 0-2.46-2.46 8 8 0 0 1 2.94-3.56l2.855-1.904ZM5.5 8A2.5 2.5 0 0 0 3 10.5a.5.5 0 0 1-.7.459.75.75 0 0 0-.983 1A3.5 3.5 0 0 0 8 10.5 2.5 2.5 0 0 0 5.5 8Z"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				aria-hidden="true"
				data-slot="icon"
				class="w-4 cursor-pointer transition-transform duration-100 hover:w-5 hover:text-red-600"
				on:click={() => (openConfirm = true)}
			>
				<path
					d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"
				/>
			</svg>
		</div>
	</div>
	<div
		class="float-center my-4 flex h-30 items-center justify-center overflow-hidden rounded-md bg-gray-100 py-5"
	>
		{#if src != undefined}
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<img
				{src}
				alt={title}
				class="cursor-pointer grayscale-0 transition-all duration-300 hover:grayscale"
				on:click={() => (showImage = true)}
			/>
			<Dialog open={showImage} onClose={() => (showImage = false)}>
				<div class="h-100 w-100">
					<img {src} alt={title} />
				</div>
			</Dialog>
		{:else}
			<div
				class="flex h-25 w-25 items-center justify-center rounded-full {src == undefined
					? 'bg-purple-300'
					: ''}"
			>
				<h1 class="text-2xl font-bold">{abr}</h1>
			</div>
		{/if}
	</div>
	<div class="line-clamp-3 h-15">
		<p class="text-sm text-gray-700">
			{description ?? 'No description for this projects'}
		</p>
	</div>
	<div>
		<Button class="float-end mt-2">Manage</Button>
	</div>
</div>
