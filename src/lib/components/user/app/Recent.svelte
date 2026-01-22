<script lang="ts">
	import RecentElement from './RecentElement.svelte';
	let { limit = 3 }: { limit?: number } = $props();

	const projects = [
		{ title: "Marketing Website", value: 75, color: "bg-indigo-500" },
		{ title: "Product Launch", value: 45, color: "bg-green-500" },
		{ title: "Social Media", value: 60, color: "bg-orange-500" },
		{ title: "Mobile App", value: 90, color: "bg-blue-500" }
	];
</script>

<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
	<div class="mb-6 flex items-center justify-between">
		<h2 class="text-lg font-black tracking-tight text-gray-900 dark:text-white">Recent Projects</h2>
		<div class="rounded-lg bg-indigo-50 p-1.5 text-indigo-500 dark:bg-indigo-900/30">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
			</svg>
		</div>
	</div>
	<div class="space-y-6">
		{#each projects.slice(0, limit) as project}
			<RecentElement title={project.title} value={project.value} color={project.color} />
		{/each}
	</div>
</div>
