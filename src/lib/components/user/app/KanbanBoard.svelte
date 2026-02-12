<script lang="ts">
	import { v4 } from 'uuid';
	import Dialog from './Dialog.svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let { project } = $props();

	interface Task {
		id: string;
		content: string;
		description?: string;
		priority: 'Low' | 'Medium' | 'High';
		status: string;
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
			tasks: []
		},
		{
			id: 'inprogress',
			title: 'In Progress',
			tasks: []
		},
		{
			id: 'review',
			title: 'Review',
			tasks: []
		},
		{
			id: 'done',
			title: 'Done',
			tasks: []
		}
	]);

	let loading = $state(true);

	async function fetchTasks() {
		if (!project?.id) return;
		loading = true;
		try {
			const res = await fetch(`/api/tasks?projectId=${project.id}`);
			if (res.ok) {
				const data = await res.json();
				// Reset columns
				columns.forEach((c) => (c.tasks = []));

				// Distribute tasks
				if (data.data) {
					data.data.forEach((t: any) => {
						const task: Task = {
							id: t.id,
							content: t.title,
							description: t.description,
							priority: t.priority,
							status: t.status // needed for tracking
						};
						const col = columns.find((c) => c.id === t.status);
						if (col) {
							col.tasks.push(task);
						} else {
							// Default to todo if status unknown
							columns[0].tasks.push(task);
						}
					});
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		if (project?.id) {
			fetchTasks();
		}
	});

	let dragTask = $state<{ task: Task; fromColId: string } | null>(null);
	let taskToDelete = $state<{ task: Task; colId: string } | null>(null);
	let openConfirm = $state(false);
	let openAddTask = $state(false);
	let newTaskData = $state({
		content: '',
		description: '',
		priority: 'Medium' as 'Low' | 'Medium' | 'High'
	});

	let activeColumnId = $state('todo');

	function openAddModal(colId: string) {
		activeColumnId = colId;
		openAddTask = true;
	}

	async function submitTask() {
		if (!newTaskData.content.trim() || !project?.id) return;

		try {
			const res = await fetch('/api/tasks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title: newTaskData.content,
					description: newTaskData.description,
					priority: newTaskData.priority,
					colId: activeColumnId, // acting as status
					projectId: project.id
				})
			});

			if (res.ok) {
				const data = await res.json();
				const newTask = data.data;
				const col = columns.find((c) => c.id === activeColumnId);
				if (col) {
					col.tasks.push({
						id: newTask.id,
						content: newTask.title,
						description: newTask.description,
						priority: newTask.priority,
						status: newTask.status
					});
				}
				newTaskData = { content: '', description: '', priority: 'Medium' };
				openAddTask = false;
			}
		} catch (error) {
			console.error(error);
		}
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

	async function handleDrop(e: DragEvent, toColId: string) {
		e.preventDefault();
		if (!dragTask) return;

		const { task, fromColId } = dragTask;
		if (fromColId === toColId) return;

		// Remove from source (optimistic update)
		const fromCol = columns.find((c) => c.id === fromColId);
		if (fromCol) {
			fromCol.tasks = fromCol.tasks.filter((t) => t.id !== task.id);
		}

		// Add to destination
		const toCol = columns.find((c) => c.id === toColId);
		if (toCol) {
			task.status = toColId;
			toCol.tasks.push(task);
		}

		// Call API
		try {
			await fetch(`/api/tasks/${task.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					status: toColId,
					colId: toColId
				})
			});
		} catch (error) {
			console.error('Failed to update task position', error);
			// Revert changes if needed (complex implementation omitted for brevity)
			fetchTasks();
		}

		dragTask = null;
	}

	function confirmDelete(task: Task, colId: string) {
		taskToDelete = { task, colId };
		openConfirm = true;
	}

	async function deleteTask() {
		if (!taskToDelete) return;
		const { task, colId } = taskToDelete;

		try {
			const res = await fetch(`/api/tasks/${task.id}`, {
				method: 'DELETE'
			});

			if (res.ok) {
				const col = columns.find((c) => c.id === colId);
				if (col) {
					col.tasks = col.tasks.filter((t) => t.id !== task.id);
				}
			}
		} catch (error) {
			console.error(error);
		}

		openConfirm = false;
		taskToDelete = null;
	}
</script>

<div class="custom-scrollbar flex gap-6 overflow-x-auto pb-4">
	{#each columns as column (column.id)}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="flex w-80 flex-shrink-0 flex-col rounded-2xl bg-gray-50/50 p-4 transition-colors dark:bg-gray-900/50"
			ondragover={handleDragOver}
			ondrop={(e) => handleDrop(e, column.id)}
		>
			<div class="mb-5 flex items-center justify-between px-2">
				<div class="flex items-center gap-2.5">
					<h3 class="text-[11px] font-black tracking-widest text-gray-400 uppercase">
						{column.title}
					</h3>
					<span
						class="rounded-lg bg-gray-100 px-2 py-0.5 text-[10px] font-black text-gray-500 dark:bg-gray-800 dark:text-gray-400"
					>
						{column.tasks.length}
					</span>
				</div>

				<button
					onclick={() => openAddModal(column.id)}
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
			</div>

			<div class="min-h-[100px] flex-1 space-y-4">
				{#if loading}
					<div class="flex h-20 items-center justify-center">
						<span class="text-xs text-gray-400">Loading...</span>
					</div>
				{:else}
					{#each column.tasks as task (task.id)}
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="group cursor-grab rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-indigo-200 hover:shadow-xl active:cursor-grabbing dark:border-gray-800 dark:bg-gray-800/80 dark:hover:border-indigo-900/50"
							draggable="true"
							ondragstart={(e) => handleDragStart(e, task, column.id)}
						>
							<div class="mb-4 flex items-center justify-between">
								<span
									class="rounded-full px-2.5 py-1 text-[9px] font-black tracking-wider uppercase
                                    {task.priority === 'High'
										? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
										: task.priority === 'Medium'
											? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
											: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}"
								>
									{task.priority || 'Medium'}
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
							<p class="text-[15px] leading-relaxed font-bold text-gray-800 dark:text-gray-100">
								{task.content}
							</p>
							{#if task.description}
								<p class="mt-2 line-clamp-2 text-xs text-gray-500">{task.description}</p>
							{/if}
						</div>
					{/each}

					{#if column.tasks.length === 0}
						<div
							class="flex h-32 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-100 opacity-50 dark:border-gray-800"
						>
							<p class="text-xs font-bold text-gray-400 italic">Drop tasks here</p>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	{/each}
</div>

<!-- Add Task Dialog -->
<Dialog bind:open={openAddTask} onClose={() => (openAddTask = false)}>
	<form
		onclick={(e) => e.stopPropagation()}
		onsubmit={(e) => {
			e.preventDefault();
			submitTask();
		}}
		class="flex w-full max-w-md flex-col space-y-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
	>
		<div class="space-y-2">
			<h2 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">New Task</h2>
			<p class="text-sm font-medium text-gray-500 italic">
				Add a task to <span class="font-bold text-indigo-500"
					>{columns.find((c) => c.id === activeColumnId)?.title}</span
				>
			</p>
		</div>

		<div class="space-y-4">
			<label class="block">
				<span class="mb-2 block text-[11px] font-black tracking-widest text-gray-400 uppercase"
					>Task Title</span
				>
				<textarea
					bind:value={newTaskData.content}
					placeholder="What needs to be done?"
					required
					rows="2"
					class="w-full rounded-2xl border-none bg-gray-100 px-4 py-3 text-sm font-bold ring-1 ring-gray-200 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-gray-700"
				></textarea>
			</label>

			<label class="block">
				<span class="mb-2 block text-[11px] font-black tracking-widest text-gray-400 uppercase"
					>Description (Optional)</span
				>
				<textarea
					bind:value={newTaskData.description}
					placeholder="Add details..."
					rows="3"
					class="w-full rounded-2xl border-none bg-gray-100 px-4 py-3 text-sm font-medium ring-1 ring-gray-200 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-gray-700"
				></textarea>
			</label>

			<div class="space-y-3">
				<span class="block text-[11px] font-black tracking-widest text-gray-400 uppercase"
					>Priority Level</span
				>
				<div class="grid grid-cols-3 gap-3">
					{#each ['Low', 'Medium', 'High'] as priority}
						<button
							type="button"
							onclick={() => (newTaskData.priority = priority as any)}
							class="rounded-xl border-2 py-2.5 text-[10px] font-black tracking-wider uppercase transition-all
							{newTaskData.priority === priority
								? priority === 'High'
									? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-900/20'
									: priority === 'Medium'
										? 'border-orange-500 bg-orange-50 text-orange-600 dark:bg-orange-900/20'
										: 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/20'
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
				onclick={() => {
					openAddTask = false;
					newTaskData = { content: '', description: '', priority: 'Medium' };
				}}
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
