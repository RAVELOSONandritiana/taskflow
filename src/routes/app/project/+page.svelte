<script lang="ts">
	import { v4 } from 'uuid';
	import { page } from '$app/stores';
	import { projects, type ProjectI } from '$lib/store/project.store';
	import Title from '$lib/components/user/app/Title.svelte';
	import FloatingButton from '$lib/components/user/app/FloatingButton.svelte';
	import Dialog from '$lib/components/user/app/Dialog.svelte';
	import ProjectCard from '$lib/components/user/app/ProjectCard.svelte';
	import { goto } from '$app/navigation';
	import { theme } from '$lib/store/theme.store';
	let { data } = $props();

	$effect(() => {
		if ($projects.length === 0 && data.projects) {
			projects.set(data.projects);
		}
	});

	let search = $state($page.url.searchParams.get('q') ?? '');
	function addProject(a: ProjectI) {
		projects.update((v) => [...v, { ...a }]);
	}

	let filteredProjects = $derived(
		$projects.filter((e) =>
			`${e.title} ${e.description}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())
		)
	);

	$effect(() => {
		const currentQ = $page.url.searchParams.get('q') ?? '';
		if (search !== currentQ) {
			goto(`?q=${encodeURIComponent(search)}`, {
				replaceState: true,
				keepFocus: true,
				noScroll: true
			});
		}
	});

	let open = $state(false);
</script>

<div class="min-h-full bg-gray-50/50 p-6 dark:bg-transparent" class:dark={$theme}>
	<header
		class="sticky top-0 z-20 -mx-6 -mt-6 mb-8 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80"
	>
		<Title>Projects list</Title>
		<div class="flex items-center space-x-4">
			<input
				type="search"
				bind:value={search}
				placeholder="search project"
				class="rounded-md border border-gray-400 bg-gray-100 px-4 py-1 transition-all outline-none focus:w-80 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
			/>
		</div>
	</header>

	{#if $projects.length === 0}
		<div class="flex flex-col items-center justify-center py-20 text-center">
			<div class="mb-4 rounded-full bg-indigo-50 p-4 text-indigo-500 dark:bg-indigo-900/20">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-12 w-12"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
			</div>
			<p class="text-lg font-medium text-gray-900 dark:text-gray-100">No projects found</p>
			<p class="text-gray-500">Create your first project to get started.</p>
		</div>
	{/if}

	<section class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each filteredProjects as p (p.id)}
			<ProjectCard title={p.title} description={p.description} src={p.src} id={p.id} />
		{/each}
	</section>
</div>

<FloatingButton
	on:press={() => {
		open = true;
	}}
>
	<p class="text-black dark:text-white">+</p>
</FloatingButton>

<Dialog bind:open onClose={() => (open = false)}>
	<!-- svelte-ignore event_directive_deprecated -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<form
		class="shadown-md flex w-full max-w-lg flex-col space-y-4 rounded-xl border border-gray-100 bg-white px-8 py-10 text-left dark:border-gray-800 dark:bg-gray-900"
		on:submit={(e) => {
			const form = e.currentTarget;
			const formData = new FormData(form);
			const title = formData.get('title') as string;
			const description = formData.get('description') as string;
			addProject({ id: v4(), title, description, src: undefined });
			open = false;
			form.reset();
		}}
		on:click|stopPropagation={() => {}}
	>
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Project</h2>
		<div class="space-y-4">
			<label for="title" class="block space-y-2">
				<span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Title</span>
				<input
					type="text"
					id="title"
					name="title"
					placeholder="Enter project title"
					required={true}
					class="w-full rounded-md border border-gray-400 bg-gray-100 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
				/>
			</label>
			<label for="description" class="block space-y-2">
				<span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</span>
				<textarea
					placeholder="Optional description"
					name="description"
					id="description"
					rows="4"
					class="w-full rounded-md border border-gray-400 bg-gray-100 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
				></textarea>
			</label>
		</div>
		<div class="flex justify-end gap-3 pt-4">
			<button
				type="button"
				on:click={() => (open = false)}
				class="rounded-lg px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
				>Cancel</button
			>
			<button
				type="submit"
				class="rounded-lg bg-indigo-500 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-600 hover:shadow-indigo-300 dark:shadow-none"
				>Create Project</button
			>
		</div>
	</form>
</Dialog>
