<script lang="ts">
	const tasks = [
		{ id: 1, title: 'Finalize UI Design', project: 'TaskFlow', due: 'Tomorrow', priority: 'High', color: 'bg-red-500' },
		{ id: 2, title: 'Database Migration', project: 'Backend API', due: 'Friday', priority: 'Medium', color: 'bg-orange-500' },
		{ id: 3, title: 'Team Sync Meeting', project: 'General', due: 'Today, 2:00 PM', priority: 'High', color: 'bg-red-500' },
		{ id: 4, title: 'Documentation Update', project: 'Open Source', due: 'Next Week', priority: 'Low', color: 'bg-blue-500' }
	];
</script>

<div class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
	<div class="mb-6 flex items-center justify-between">
		<h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Upcoming Tasks</h2>
		<button class="text-sm font-semibold text-indigo-500 hover:text-indigo-600">View all</button>
	</div>

	<div class="space-y-4">
		{#each tasks as task}
			<div class="group flex items-center justify-between rounded-lg border border-transparent p-3 transition-all hover:border-gray-100 hover:bg-gray-50 dark:hover:border-gray-700 dark:hover:bg-gray-800/50">
				<div class="flex items-center gap-4">
					<div class="h-10 w-1 flex-shrink-0 rounded-full {task.color}"></div>
					<div>
						<h4 class="text-[15px] font-semibold text-gray-900 dark:text-gray-100">{task.title}</h4>
						<p class="text-xs text-gray-500 dark:text-gray-400">{task.project} • {task.due}</p>
					</div>
				</div>
				<span class="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider {task.priority === 'High' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : task.priority === 'Medium' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}">
					{task.priority}
				</span>
			</div>
		{/each}
	</div>
</div>
