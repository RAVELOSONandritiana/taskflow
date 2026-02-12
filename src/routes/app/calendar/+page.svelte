<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import Dialog from '$lib/components/user/app/Dialog.svelte';
	import { theme } from '$lib/store/theme.store';
	import { fade } from 'svelte/transition';

	let { data } = $props();
	// svelte-ignore state_referenced_locally
	let dbEvents = $state(data.meetings);

	$effect(() => {
		dbEvents = data.meetings;
	});

	let currentDate = new Date();
	let currentMonth = $state(currentDate.getMonth());
	let currentYear = $state(currentDate.getFullYear());
	let showAddModal = $state(false);

	let newEvent = $state({
		title: '',
		date: '',
		time: '',
		type: 'meeting'
	});

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
		return dbEvents.filter(
			(e) => e.date === day && e.month === currentMonth && e.year === currentYear
		);
	}

	async function addEvent() {
		if (!newEvent.title || !newEvent.date || !newEvent.time) return;

		const startDateTime = new Date(`${newEvent.date}T${newEvent.time}`);
		const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // Default 1 hour

		try {
			const res = await fetch('/api/meetings', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title: newEvent.title,
					startTime: startDateTime.toISOString(),
					endTime: endDateTime.toISOString(),
					description: newEvent.type
				})
			});

			if (res.ok) {
				location.reload();
			}
		} catch (e) {
			console.error(e);
		}
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
				onclick={() => (showAddModal = true)}
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
								class="truncate rounded bg-blue-100 px-1 py-0.5 text-[8px] leading-tight font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
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

<!-- Add Event Dialog -->
<Dialog bind:open={showAddModal} onClose={() => (showAddModal = false)}>
	<form
		onsubmit={(e) => {
			e.preventDefault();
			addEvent();
		}}
		class="flex w-full max-w-sm flex-col space-y-6 rounded-2xl border border-gray-100 bg-white p-8 dark:border-gray-800 dark:bg-gray-950"
	>
		<div class="space-y-2">
			<h2 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">New Event</h2>
		</div>

		<div class="space-y-4">
			<label class="block">
				<span class="mb-2 block text-xs font-bold tracking-wider text-gray-400 uppercase"
					>Title</span
				>
				<input
					type="text"
					bind:value={newEvent.title}
					class="w-full rounded-xl border-none bg-gray-100 px-4 py-3 text-sm ring-1 ring-gray-200 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-gray-700"
					required
				/>
			</label>
			<label class="block">
				<span class="mb-2 block text-xs font-bold tracking-wider text-gray-400 uppercase">Date</span
				>
				<input
					type="date"
					bind:value={newEvent.date}
					class="w-full rounded-xl border-none bg-gray-100 px-4 py-3 text-sm ring-1 ring-gray-200 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-gray-700"
					required
				/>
			</label>
			<label class="block">
				<span class="mb-2 block text-xs font-bold tracking-wider text-gray-400 uppercase">Time</span
				>
				<input
					type="time"
					bind:value={newEvent.time}
					class="w-full rounded-xl border-none bg-gray-100 px-4 py-3 text-sm ring-1 ring-gray-200 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-gray-700"
					required
				/>
			</label>
		</div>

		<div class="flex justify-end gap-3 pt-2">
			<button
				type="button"
				onclick={() => (showAddModal = false)}
				class="rounded-xl px-4 py-2 text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white"
			>
				Cancel
			</button>
			<button
				type="submit"
				class="rounded-xl bg-indigo-500 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-600 active:scale-95 dark:shadow-none"
			>
				Add Event
			</button>
		</div>
	</form>
</Dialog>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
