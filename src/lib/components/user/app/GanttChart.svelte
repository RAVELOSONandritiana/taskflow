<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { v4 } from 'uuid';

	interface GanttTask {
		id: string;
		name: string;
		startDay: number; // 0-indexed day from project start
		duration: number; // in days
		progress: number; // 0-100
		color: string;
	}

	let tasks = $state<GanttTask[]>([
		{
			id: v4(),
			name: 'Planning Phase',
			startDay: 0,
			duration: 5,
			progress: 100,
			color: 'bg-indigo-500'
		},
		{
			id: v4(),
			name: 'Design Concept',
			startDay: 4,
			duration: 8,
			progress: 60,
			color: 'bg-pink-500'
		},
		{
			id: v4(),
			name: 'Development',
			startDay: 10,
			duration: 15,
			progress: 20,
			color: 'bg-blue-500'
		},
		{
			id: v4(),
			name: 'Testing & QA',
			startDay: 22,
			duration: 7,
			progress: 0,
			color: 'bg-emerald-500'
		},
		{ id: v4(), name: 'Launch Prep', startDay: 28, duration: 3, progress: 0, color: 'bg-amber-500' }
	]);

	const days = Array.from({ length: 32 }, (_, i) => i + 1);
	const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

	let showAddTask = $state(false);
	let newTask = $state({
		name: '',
		startDay: 0,
		duration: 3,
		color: 'bg-indigo-500'
	});

	function addTask() {
		if (!newTask.name.trim()) return;
		tasks.push({
			id: v4(),
			...newTask,
			progress: 0
		});
		newTask = { name: '', startDay: 0, duration: 3, color: 'bg-indigo-500' };
		showAddTask = false;
	}

	function removeTask(id: string) {
		tasks = tasks.filter((t) => t.id !== id);
	}
</script>

<div
	class="flex flex-col rounded-[2.5rem] border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
>
	<!-- Header -->
	<div class="flex items-center justify-between border-b border-gray-50 p-8 dark:border-gray-900">
		<div>
			<h3 class="text-xl font-black tracking-tight text-gray-900 uppercase dark:text-white">
				Project Timeline
			</h3>
			<p class="mt-1 text-xs font-bold tracking-widest text-indigo-500 uppercase">
				Interactive Gantt Chart
			</p>
		</div>
		<button
			onclick={() => (showAddTask = true)}
			class="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-black text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="3"
				><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg
			>
			Add Task
		</button>
	</div>

	<!-- Chart Area -->
	<div class="custom-scrollbar flex-1 overflow-auto p-8">
		<div class="min-w-[1200px]">
			<!-- Timeline Header -->
			<div class="mb-6 flex border-b border-gray-100 pb-4 dark:border-gray-800">
				<div class="w-64 shrink-0 px-4">
					<span class="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">Tasks</span>
				</div>
				<div class="flex flex-1">
					{#each weeks as week}
						<div class="flex-1 border-l border-gray-100 px-4 dark:border-gray-800">
							<span class="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase"
								>{week}</span
							>
						</div>
					{/each}
				</div>
			</div>

			<!-- Grid and Bars -->
			<div class="relative space-y-4">
				<!-- Vertical Grid Lines -->
				<div class="pointer-events-none absolute inset-0 flex pl-64">
					{#each Array(32) as _, i}
						<div class="flex-1 border-l border-gray-50 dark:border-gray-900/50"></div>
					{/each}
				</div>

				{#each tasks as task (task.id)}
					<div class="group relative flex h-12 items-center" in:fade>
						<!-- Task Name -->
						<div class="flex w-64 shrink-0 items-center justify-between px-4">
							<span class="truncate pr-4 text-xs font-black text-gray-700 dark:text-gray-300"
								>{task.name}</span
							>
							<button
								onclick={() => removeTask(task.id)}
								aria-label="Remove task"
								class="text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-3.5 w-3.5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="3"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/></svg
								>
							</button>
						</div>

						<!-- Timeline Bar Workspace -->
						<div class="relative h-full flex-1">
							<div
								class="absolute top-2 h-8 rounded-full {task.color} group/bar cursor-pointer shadow-lg shadow-indigo-500/10 transition-all hover:scale-[1.02]"
								style="left: {(task.startDay / 32) * 100}%; width: {(task.duration / 32) * 100}%"
							>
								<!-- Progress Overlay -->
								<div
									class="h-full rounded-full bg-white/30 backdrop-blur-[2px]"
									style="width: {task.progress}%"
								></div>

								<!-- Tooltip -->
								<div
									class="pointer-events-none absolute -top-10 left-1/2 z-30 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-1.5 text-[10px] font-bold whitespace-nowrap text-white opacity-0 shadow-xl transition-all group-hover/bar:opacity-100"
								>
									{task.progress}% complete • {task.duration} days
									<div
										class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-t-4 border-r-4 border-l-4 border-t-gray-900 border-r-transparent border-l-transparent"
									></div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Timeline Footer (Days) -->
			<div class="mt-8 flex border-t border-gray-100 pt-4 opacity-30 dark:border-gray-800">
				<div class="w-64 shrink-0"></div>
				<div class="flex flex-1">
					{#each days as day}
						<div class="flex-1 text-center">
							<span class="text-[8px] font-black">{day}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Add Task Modal (Absolute) -->
{#if showAddTask}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm"
		transition:fade
		role="button"
		tabindex="0"
		onclick={() => (showAddTask = false)}
		onkeydown={(e) => e.key === 'Escape' && (showAddTask = false)}
	>
		<div
			class="w-full max-w-sm rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
			transition:fly={{ y: 20 }}
			role="dialog"
			aria-labelledby="gantt-modal-title"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<h4 id="gantt-modal-title" class="mb-2 text-2xl font-black text-gray-900 dark:text-white">
				New Timeline Task
			</h4>
			<p class="mb-8 text-xs font-bold tracking-widest text-indigo-500 uppercase">
				Scheduling your next move
			</p>

			<div class="space-y-6">
				<label class="block">
					<span class="mb-2 block text-[10px] font-black tracking-widest text-gray-400 uppercase"
						>Task Name</span
					>
					<input
						type="text"
						bind:value={newTask.name}
						placeholder="e.g. Backend Architecture"
						class="w-full rounded-2xl border-none bg-gray-100 px-5 py-3.5 text-sm font-bold ring-1 ring-gray-200 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:ring-gray-800"
					/>
				</label>

				<div class="grid grid-cols-2 gap-4">
					<label class="block">
						<span class="mb-2 block text-[10px] font-black tracking-widest text-gray-400 uppercase"
							>Start Day</span
						>
						<input
							type="number"
							bind:value={newTask.startDay}
							min="0"
							max="30"
							class="w-full rounded-2xl border-none bg-gray-100 px-5 py-3.5 text-sm font-bold ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:ring-gray-800"
						/>
					</label>
					<label class="block">
						<span class="mb-2 block text-[10px] font-black tracking-widest text-gray-400 uppercase"
							>Duration (Days)</span
						>
						<input
							type="number"
							bind:value={newTask.duration}
							min="1"
							max="30"
							class="w-full rounded-2xl border-none bg-gray-100 px-5 py-3.5 text-sm font-bold ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:ring-gray-800"
						/>
					</label>
				</div>

				<div class="space-y-3">
					<span class="block text-[10px] font-black tracking-widest text-gray-400 uppercase"
						>Theme Color</span
					>
					<div class="flex gap-3">
						{#each ['bg-indigo-500', 'bg-pink-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500'] as color}
							<button
								onclick={() => (newTask.color = color)}
								aria-label="Select color {color}"
								class="h-8 w-8 rounded-full {color} transition-transform {newTask.color === color
									? 'scale-125 ring-4 ring-gray-100 dark:ring-gray-800'
									: 'hover:scale-110'}"
							></button>
						{/each}
					</div>
				</div>
			</div>

			<div class="mt-10 flex flex-col gap-3">
				<button
					onclick={addTask}
					class="w-full rounded-2xl bg-gray-900 py-4 text-sm font-black text-white shadow-xl transition-all hover:bg-black active:scale-95 dark:bg-indigo-600 dark:hover:bg-indigo-700"
				>
					Add Task to Timeline
				</button>
				<button
					onclick={() => (showAddTask = false)}
					class="w-full rounded-2xl bg-gray-50 py-3 text-xs font-bold text-gray-500 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
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
