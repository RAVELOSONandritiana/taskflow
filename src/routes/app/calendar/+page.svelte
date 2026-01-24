<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';

	let currentDate = new Date();
	let currentMonth = $state(currentDate.getMonth());
	let currentYear = $state(currentDate.getFullYear());

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	let daysInMonth = $derived(new Date(currentYear, currentMonth + 1, 0).getDate());
	let firstDayOfMonth = $derived(new Date(currentYear, currentMonth, 1).getDay());

	// Mock events
	const events = [
		{ date: 5, title: 'Team Meeting', type: 'meeting', time: '10:00 AM' },
		{ date: 12, title: 'Project Deadline', type: 'deadline', time: '5:00 PM' },
		{ date: 15, title: 'Client Call', type: 'call', time: '2:00 PM' },
		{ date: 24, title: 'Design Review', type: 'review', time: '11:00 AM' },
		{ date: 28, title: 'Sprint Planning', type: 'planning', time: '09:00 AM' }
	];

	function prevMonth() {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
	}

	function nextMonth() {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
	}

	function getEventsForDay(day: number) {
		return events.filter((e) => e.date === day);
	}
</script>

<div class="flex h-full flex-col overflow-auto bg-white p-3 dark:bg-transparent">
	<div class="mb-2 flex shrink-0 items-center justify-between">
		<Title>Calendar</Title>

		<div class="flex items-center gap-2">
			<button
				onclick={prevMonth}
				class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<h2 class="w-32 text-center text-sm font-bold text-gray-900 select-none dark:text-white">
				{monthNames[currentMonth]}
				{currentYear}
			</h2>

			<button
				onclick={nextMonth}
				class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>

			<button
				class="ml-2 rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-indigo-600 active:scale-95"
			>
				+ Add
			</button>
		</div>
	</div>

	<div
		class="flex min-h-0 flex-1 flex-col rounded-2xl border border-gray-100 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900/50"
	>
		<!-- Days Header -->
		<div class="mb-1 grid shrink-0 grid-cols-7">
			{#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
				<div class="text-center text-[10px] font-bold tracking-wider text-gray-400 uppercase">
					{day}
				</div>
			{/each}
		</div>

		<!-- Calendar Grid -->
		<div class="grid min-h-0 flex-1 grid-cols-7 grid-rows-5 gap-1">
			{#each Array(firstDayOfMonth) as _}
				<div class="rounded-lg bg-gray-50/50 dark:bg-gray-800/30"></div>
			{/each}

			{#each Array(daysInMonth) as _, i}
				{@const day = i + 1}
				{@const dayEvents = getEventsForDay(day)}
				{@const isToday =
					day === currentDate.getDate() &&
					currentMonth === currentDate.getMonth() &&
					currentYear === currentDate.getFullYear()}

				<div
					class="group relative flex flex-col overflow-hidden rounded-lg border p-1 transition-all
					{isToday
						? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20'
						: 'border-gray-100 bg-white hover:border-indigo-200 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700'}"
				>
					<span
						class="text-[10px] leading-none font-bold {isToday
							? 'text-indigo-600'
							: 'text-gray-500 dark:text-gray-400'}"
					>
						{day}
					</span>

					<div class="no-scrollbar mt-0.5 flex-1 space-y-0.5 overflow-y-auto">
						{#each dayEvents as event}
							<div
								class="truncate rounded px-1 py-0.5 text-[8px] leading-tight font-bold
								{event.type === 'meeting' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : ''}
								{event.type === 'deadline' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : ''}
								{event.type === 'call'
									? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
									: ''}
								{event.type === 'review'
									? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
									: ''}
								{event.type === 'planning'
									? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
									: ''}"
								title="{event.time} - {event.title}"
							>
								{event.title}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
