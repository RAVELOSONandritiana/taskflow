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
	export let data;

	if ($projects.length === 0) {
		projects.set(data.projects);
	}
	let search: string = $page.url.searchParams.get('q') ?? '';
	function addProject(a: ProjectI) {
		projects.update((v) => [...v, { ...a }]);
	}

	$: filteredProjects = $projects.filter((e) =>
		`${e.title} ${e.description}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())
	);
	$: if (search != ($page.url.searchParams.get('q') ?? '')) {
		goto(`?q=${encodeURIComponent(search)}`, {
			replaceState: true,
			keepFocus: true,
			noScroll: true
		});
	}

	let open = false;
</script>

<div class="p-4" class:dark={$theme}>
	<div class="flex items-center justify-between">
		<Title>Manage your project here!</Title>
		<input
			type="search"
			bind:value={search}
			placeholder="search project"
			class="rounded-md border border-gray-400 bg-gray-100 px-4 py-1 outline-none focus:w-100 focus:border-none focus:ring-2 focus:ring-indigo-500
	"
		/>
	</div>
	{#if $projects.length === 0}
		<p class="text-gray-700">
			You can create your first project using floating button on the bottom right side
		</p>
	{/if}
	<section class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each filteredProjects as p (p.id)}
			<ProjectCard title={p.title} description={p.description} src={p.src} id={p.id} />
		{/each}
		<Dialog {open} onClose={() => (open = false)}>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<form
				class="shadown-md flex w-1/3 flex-col space-y-4 rounded-md border border-gray-300 bg-white px-5 py-6 text-left"
				on:click|stopPropagation
				on:submit={(e) => {
					const data = new FormData(e.currentTarget);
					let object = Object.fromEntries(data.entries());
					const v = {
						id: v4(),
						src: undefined,
						title: object['title'] as string,
						description: object['description'] as string | undefined
					};
					addProject(v);
					open = false;
				}}
			>
				<h4 class="text-lg font-bold">Add new project</h4>
				<label for="title" class="space-y-2">
					<p class="font-medium text-gray-700">
						Project name<strong class="text-red-500">*</strong>
					</p>
					<input
						type="text"
						id="title"
						name="title"
						placeholder="make a simple title"
						required={true}
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
						class="w-full rounded-sm border border-gray-300 bg-gray-100 px-4 py-1 focus:border-none focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
					></textarea>
				</label>
				<button
					type="submit"
					class="cursor-pointer rounded-md bg-indigo-500 px-4 py-2 text-white shadow-sm hover:bg-indigo-400"
					>Add</button
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
	</section>
</div>
