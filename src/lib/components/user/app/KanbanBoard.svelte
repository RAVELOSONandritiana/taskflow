<script lang="ts">
	import { v4 } from 'uuid';
	import Dialog from './Dialog.svelte';
	import { fade } from 'svelte/transition';

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

	let dragTask = $state<{ task: Task; fromColId: string } | null>(null);
	let taskToDelete = $state<{ task: Task; colId: string } | null>(null);
	let openConfirm = $state(false);
	let openAddTask = $state(false);
	let newTaskData = $state({
		content: '',
		priority: 'Medium' as 'Low' | 'Medium' | 'High'
	});

	function addTask(colId: string) {
		openAddTask = true;
	}

	function submitTask() {
		if (!newTaskData.content.trim()) return;
		const col = columns.find((c) => c.id === 'todo');
		if (col) {
			col.tasks.push({ 
				id: v4(), 
				content: newTaskData.content, 
				priority: newTaskData.priority 
			});
		}
		newTaskData = { content: '', priority: 'Medium' };
		openAddTask = false;
	}

	function handleDragStart(e: DragEvent, task: Task, colId: string) {
		dragTask = { task, fromColId: colId };
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', task.id);
		}
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		if (e.dataTransfer) {
			e.dataTransfer.dropEffect = 'move';
		}
	}

	function handleDrop(e: DragEvent, toColId: string) {
		e.preventDefault();
		if (!dragTask) return;

		const { task, fromColId } = dragTask;
		if (fromColId === toColId) return;

		// Remove from source
		const fromCol = columns.find((c) => c.id === fromColId);
		if (fromCol) {
			fromCol.tasks = fromCol.tasks.filter((t) => t.id !== task.id);
		}

		// Add to destination
		const toCol = columns.find((c) => c.id === toColId);
		if (toCol) {
			toCol.tasks.push(task);
		}

		dragTask = null;
	}

	function confirmDelete(task: Task, colId: string) {
		taskToDelete = { task, colId };
		openConfirm = true;
	}

	function deleteTask() {
		if (!taskToDelete) return;
		const { task, colId } = taskToDelete;
		const col = columns.find((c) => c.id === colId);
		if (col) {
			col.tasks = col.tasks.filter((t) => t.id !== task.id);
		}
		openConfirm = false;
		taskToDelete = null;
	}
</script>

<div class="flex h-full gap-6 overflow-x-auto pb-4 custom-scrollbar">
	{#each columns as column (column.id)}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="flex w-80 flex-shrink-0 flex-col rounded-2xl bg-gray-50/50 p-4 transition-colors dark:bg-gray-900/50"
			ondragover={handleDragOver}
			ondrop={(e) => handleDrop(e, column.id)}
		>
			<div class="mb-5 flex items-center justify-between px-2">
				<div class="flex items-center gap-2.5">
					<h3 class="text-[11px] font-black uppercase tracking-widest text-gray-400">
						{column.title}
					</h3>
					<span
						class="rounded-lg bg-gray-100 px-2 py-0.5 text-[10px] font-black text-gray-500 dark:bg-gray-800 dark:text-gray-400"
					>
						{column.tasks.length}
					</span>
				</div>

				{#if column.id === 'todo'}
					<button
						onclick={() => addTask(column.id)}
						aria-label="Add task to {column.title}"
						class="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm transition-all hover:scale-105 hover:bg-indigo-50 active:scale-95 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2.5"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>
				{/if}
			</div>

			<div class="flex-1 space-y-4">
				{#each column.tasks as task (task.id)}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="group cursor-grab rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-indigo-200 hover:shadow-xl active:cursor-grabbing dark:border-gray-800 dark:bg-gray-800/80 dark:hover:border-indigo-900/50"
						draggable="true"
						ondragstart={(e) => handleDragStart(e, task, column.id)}
					>
						<div class="mb-4 flex items-center justify-between">
							<span
								class="rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider 
                                {task.priority === 'High'
									? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
									: task.priority === 'Medium'
										? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
										: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}"
							>
								{task.priority}
							</span>
							<button
								onclick={() => confirmDelete(task, column.id)}
								aria-label="Delete task"
								class="rounded-lg p-1.5 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2.5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
						</div>
						<p class="text-[15px] font-bold leading-relaxed text-gray-800 dark:text-gray-100">
							{task.content}
						</p>
					</div>
				{/each}

				{#if column.tasks.length === 0}
					<div
						class="flex h-32 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-100 opacity-50 dark:border-gray-800"
					>
						<p class="text-xs font-bold text-gray-400 italic">Drop tasks here</p>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<!-- Add Task Dialog -->
<Dialog bind:open={openAddTask} onClose={() => (openAddTask = false)}>
	<form
		onclick={(e) => e.stopPropagation()}
		onsubmit={(e) => { e.preventDefault(); submitTask(); }}
		class="flex w-full max-w-md flex-col space-y-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
	>
		<div class="space-y-2">
			<h2 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">New Task</h2>
			<p class="text-sm font-medium text-gray-500 italic">Define what needs to be done next in your project.</p>
		</div>

		<div class="space-y-4">
			<label class="block">
				<span class="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">Description</span>
				<textarea 
					bind:value={newTaskData.content}
					placeholder="What needs to be done?"
					required
					rows="3"
					class="w-full rounded-2xl border-none bg-gray-100 px-4 py-3 text-sm font-bold ring-1 ring-gray-200 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-gray-700"
				></textarea>
			</label>

			<div class="space-y-3">
				<span class="block text-[11px] font-black uppercase tracking-widest text-gray-400">Priority Level</span>
				<div class="grid grid-cols-3 gap-3">
					{#each ['Low', 'Medium', 'High'] as priority}
						<button
							type="button"
							onclick={() => newTaskData.priority = priority as any}
							class="rounded-xl border-2 py-2.5 text-[10px] font-black uppercase tracking-wider transition-all
							{newTaskData.priority === priority 
								? priority === 'High' ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-900/20' : 
								  priority === 'Medium' ? 'border-orange-500 bg-orange-50 text-orange-600 dark:bg-orange-900/20' : 
								  'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/20'
								: 'border-transparent bg-gray-50 text-gray-400 hover:bg-gray-100 dark:bg-gray-900'}"
						>
							{priority}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-3 pt-2">
			<button 
				type="submit"
				class="w-full rounded-2xl bg-indigo-600 py-3.5 text-sm font-black text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
			>
				Add to List
			</button>
			<button 
				type="button" 
				onclick={() => { openAddTask = false; newTaskData = { content: '', priority: 'Medium' }; }}
				class="w-full rounded-2xl bg-gray-50 py-3 text-sm font-bold text-gray-500 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
			>
				Cancel
			</button>
		</div>
	</form>
</Dialog>

<!-- Deletion Confirmation Dialog -->
<Dialog bind:open={openConfirm} onClose={() => (openConfirm = false)}>
	<div
		onclick={(e) => e.stopPropagation()}
		class="flex w-full max-w-sm flex-col space-y-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
	>
		<div class="space-y-4 text-center">
			<div
				class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-500 dark:bg-red-900/20"
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
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
			</div>
			<div class="space-y-1">
				<h2 class="text-xl font-black text-gray-900 dark:text-white">Delete Task?</h2>
				<p class="text-sm font-medium text-gray-500">
					This will permanently remove the task from this project.
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-3">
			<button
				onclick={deleteTask}
				class="w-full rounded-2xl bg-red-500 py-3.5 text-sm font-black text-white shadow-xl shadow-red-100 transition-all hover:bg-red-600 active:scale-95 dark:shadow-none"
			>
				Confirm Delete
			</button>
			<button
				onclick={() => (openConfirm = false)}
				class="w-full rounded-2xl bg-gray-50 py-3.5 text-sm font-bold text-gray-500 transition-all hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
			>
				Cancel
			</button>
		</div>
	</div>
</Dialog>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		height: 6px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #e2e8f0;
		border-radius: 10px;
	}
	:global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
		background: #1e293b;
	}
</style>
