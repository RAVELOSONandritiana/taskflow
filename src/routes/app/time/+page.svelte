<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Title from '$lib/components/user/app/Title.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { v4 } from 'uuid';

	// Pomodoro State
	let timeLeft = $state(25 * 60);
	let isRunning = $state(false);
	let sessionType = $state('work'); // 'work', 'short', 'long'
	let timer: any;

	const sessions = {
		work: { label: 'Focus Work', time: 25 * 60, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
		short: { label: 'Short Break', time: 5 * 60, color: 'text-green-500', bg: 'bg-green-500/10' },
		long: { label: 'Long Break', time: 15 * 60, color: 'text-blue-500', bg: 'bg-blue-500/10' }
	};

	function toggleTimer() {
		isRunning = !isRunning;
		if (isRunning) {
			timer = setInterval(() => {
				if (timeLeft > 0) {
					timeLeft--;
				} else {
					clearInterval(timer);
					isRunning = false;
					playAlarm();
				}
			}, 1000);
		} else {
			clearInterval(timer);
		}
	}

	function resetTimer() {
		clearInterval(timer);
		isRunning = false;
		timeLeft = sessions[sessionType as keyof typeof sessions].time;
	}

	function setSession(type: string) {
		sessionType = type;
		resetTimer();
	}

	function formatTime(seconds: number) {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
	}

	function playAlarm() {
		// Browser sound notification could go here
		alert(`${sessions[sessionType as keyof typeof sessions].label} session complete!`);
	}

	// Time Logging State
	let logs = $state([
		{
			id: v4(),
			project: 'API Integration',
			task: 'Schema Design',
			duration: '2h 15m',
			date: 'Today',
			status: 'completed'
		},
		{
			id: v4(),
			project: 'Design System',
			task: 'Color Palette Refinement',
			duration: '45m',
			date: 'Today',
			status: 'completed'
		}
	]);

	let newLog = $state({ project: '', task: '', duration: '' });

	function addLog() {
		if (!newLog.project || !newLog.duration) return;
		logs = [{ id: v4(), ...newLog, date: 'Today', status: 'completed' }, ...logs];
		newLog = { project: '', task: '', duration: '' };
	}

	onDestroy(() => clearInterval(timer));

	// Derived values for progress ring
	let totalTime = $derived(sessions[sessionType as keyof typeof sessions].time);
	let progress = $derived((timeLeft / totalTime) * 100);
	let dashoffset = $derived(283 * (progress / 100)); // 283 is approx circumference
</script>

<div class="min-h-full bg-gray-50/30 p-8 dark:bg-transparent">
	<header class="mb-10" in:fly={{ y: -20, duration: 600 }}>
		<div
			class="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-indigo-500 uppercase"
		>
			<span class="h-1 w-4 rounded-full bg-indigo-500"></span>
			Efficiency Module
		</div>
		<Title class="text-3xl font-black tracking-tight text-gray-900 lg:text-4xl dark:text-white">
			Time Tracker
		</Title>
		<p class="text-sm font-medium text-gray-500 dark:text-gray-400">
			Manage your focus sessions and log your daily work velocity.
		</p>
	</header>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
		<!-- Pomodoro Section -->
		<div class="order-1 lg:col-span-5">
			<div
				class="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:rounded-[2.5rem] md:p-10 dark:border-gray-800 dark:bg-gray-950"
			>
				<div class="mb-6 flex flex-wrap justify-center gap-2 md:mb-8">
					{#each Object.entries(sessions) as [key, value]}
						<button
							onclick={() => setSession(key)}
							class="rounded-xl px-3 py-1.5 text-[9px] font-black tracking-widest uppercase transition-all md:px-4 md:py-2 md:text-[10px] {sessionType ===
							key
								? value.bg + ' ' + value.color
								: 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}"
						>
							{value.label}
						</button>
					{/each}
				</div>

				<div class="relative flex items-center justify-center">
					<svg class="h-48 w-48 -rotate-90 transform md:h-64 md:w-64">
						<circle
							cx="50%"
							cy="50%"
							r="45%"
							stroke="currentColor"
							stroke-width="6"
							fill="transparent"
							class="text-gray-100 dark:text-gray-800"
						/>
						<circle
							cx="50%"
							cy="50%"
							r="45%"
							stroke="currentColor"
							stroke-width="6"
							fill="transparent"
							stroke-dasharray="283%"
							stroke-dashoffset={(283 * (100 - progress)) / 100 + '%'}
							stroke-linecap="round"
							class="transition-all duration-1000 {sessions[sessionType as keyof typeof sessions]
								.color}"
						/>
					</svg>
					<div class="absolute flex flex-col items-center">
						<span
							class="text-3xl font-black text-gray-900 tabular-nums md:text-5xl dark:text-white"
						>
							{formatTime(timeLeft)}
						</span>
						<span
							class="text-[8px] font-black tracking-widest text-gray-400 uppercase md:text-[10px]"
							>Time Remaining</span
						>
					</div>
				</div>

				<div class="mt-8 flex gap-3 md:mt-10">
					<button
						onclick={toggleTimer}
						class="flex-1 rounded-2xl bg-indigo-600 py-3.5 text-xs font-black text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 md:py-4 md:text-sm dark:shadow-none"
					>
						{isRunning ? 'Pause Session' : 'Start Focus'}
					</button>
					<button
						onclick={resetTimer}
						aria-label="Reset Timer"
						class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-400 transition-all hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Time Logs Section -->
		<div class="order-2 lg:order-2 lg:col-span-7">
			<div class="space-y-6">
				<!-- Quick Add Log -->
				<div
					class="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:rounded-[2.5rem] md:p-8 dark:border-gray-800 dark:bg-gray-950"
				>
					<h3 class="mb-6 text-[11px] font-black tracking-widest text-gray-400 uppercase">
						Log Manual Activity
					</h3>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
						<input
							type="text"
							placeholder="Project"
							bind:value={newLog.project}
							class="w-full rounded-xl border-none bg-gray-50 px-4 py-3 text-sm font-bold ring-1 ring-gray-100 transition-all focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:ring-gray-800"
						/>
						<input
							type="text"
							placeholder="Duration (e.g. 1h 30m)"
							bind:value={newLog.duration}
							class="w-full rounded-xl border-none bg-gray-50 px-4 py-3 text-sm font-bold ring-1 ring-gray-100 transition-all focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:ring-gray-800"
						/>
						<button
							onclick={addLog}
							class="w-full rounded-xl bg-gray-900 px-6 py-3 text-xs font-black tracking-widest text-white uppercase transition-all hover:bg-black active:scale-95 dark:bg-indigo-600 dark:hover:bg-indigo-700"
						>
							Add Log
						</button>
					</div>
				</div>

				<!-- Log Table -->
				<div
					class="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:rounded-[2.5rem] md:p-8 dark:border-gray-800 dark:bg-gray-950"
				>
					<div class="mb-6 flex items-center justify-between">
						<h3 class="text-[11px] font-black tracking-widest text-gray-400 uppercase">
							Recent Logs
						</h3>
						<span
							class="rounded-full bg-indigo-50 px-3 py-1 text-[9px] font-black text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
							>Total Today: 3h</span
						>
					</div>

					<div class="space-y-4">
						{#each logs as log}
							<div
								class="group flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0 dark:border-gray-900"
							>
								<div class="flex items-center gap-4">
									<div
										class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-indigo-500 dark:bg-gray-900/50"
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
												d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<div>
										<p class="text-sm font-black text-gray-900 dark:text-white">{log.project}</p>
										<p class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
											{log.task || 'General Activity'}
										</p>
									</div>
								</div>
								<div class="text-right">
									<p class="text-sm font-black text-indigo-600 dark:text-indigo-400">
										{log.duration}
									</p>
									<p class="text-[10px] font-bold tracking-widest text-gray-300 uppercase">
										{log.date}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
