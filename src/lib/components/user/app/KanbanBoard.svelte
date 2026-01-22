<script lang="ts">
	import { v4 } from 'uuid';
	import { flip } from 'svelte/animate';

	interface Task {
		id: string;
		content: string;
		priority: 'Low' | 'Medium' | 'High';
	}

	interface Column {
		id: string;
		title: string;
		tasks: Task[];
	}

	let columns = $state<Column[]>([
		{
			id: 'todo',
			title: 'To Do',
			tasks: [
				{ id: v4(), content: 'Initial Research', priority: 'Medium' },
				{ id: v4(), content: 'Define Requirements', priority: 'High' }
			]
		},
		{
			id: 'inprogress',
			title: 'In Progress',
			tasks: [
				{ id: v4(), content: 'UI Mockups', priority: 'High' }
			]
		},
		{
			id: 'review',
			title: 'Review',
			tasks: []
		},
		{
			id: 'done',
			title: 'Done',
			tasks: [
				{ id: v4(), content: 'Project Kickoff', priority: 'Low' }
			]
		}
	]);

	function addTask(colId: string) {
		const content = prompt('Enter task description:');
		if (content) {
			const col = columns.find(c => c.id === colId);
			if (col) {
				col.tasks.push({ id: v4(), content, priority: 'Medium' });
			}
		}
	}
</script>

<div class="flex h-full gap-6 overflow-x-auto pb-4">
	{#each columns as column (column.id)}
		<div class="flex w-80 flex-shrink-0 flex-col rounded-xl bg-gray-100/50 p-4 dark:bg-gray-900/50">
			<div class="mb-4 flex items-center justify-between px-2">
				<div class="flex items-center gap-2">
					<h3 class="text-sm font-bold uppercase tracking-wider text-gray-500">{column.title}</h3>
					<span class="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
						{column.tasks.length}
					</span>
				</div>
				<button 
					onclick={() => addTask(column.id)}
					aria-label="Add task to {column.title}"
					class="rounded-lg p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-800"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				</button>
			</div>

			<div class="flex-1 space-y-3">
				{#each column.tasks as task (task.id)}
					<div 
						class="group cursor-grab rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md active:cursor-grabbing dark:border-gray-800 dark:bg-gray-800 dark:hover:border-indigo-900"
					>
						<div class="mb-3 flex items-center justify-between">
							<span class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider {task.priority === 'High' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : task.priority === 'Medium' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}">
								{task.priority}
							</span>
							<button aria-label="Delete task" class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
							</button>
						</div>
						<p class="text-[15px] font-medium text-gray-700 dark:text-gray-200 leading-snug">
							{task.content}
						</p>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
