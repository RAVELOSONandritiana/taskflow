<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';
	import Title from '$lib/components/user/app/Title.svelte';
	import { v4 } from 'uuid';

	let activeMeeting = $state<any>(null);
	let showScheduler = $state(false);

	let meetings = $state([
		{
			id: v4(),
			title: 'Product Sync: Q1 Objectives',
			time: 'Today, 14:30',
			duration: '45m',
			attendees: 5,
			type: 'Strategic',
			description: 'Reviewing the progress of the core modules and alignment for Q1.',
			agenda: [
				{ id: 1, text: 'Review Gantt charts milestone', done: true },
				{ id: 2, text: 'Discuss new feature requests', done: false },
				{ id: 3, text: 'Budget allocation for API upgrades', done: false }
			]
		},
		{
			id: v4(),
			title: 'Design Critique: New Icons',
			time: 'Tomorrow, 10:00',
			duration: '60m',
			attendees: 3,
			type: 'Creative',
			description: 'Iterating on the premium icon set for the sidemenu expansion.',
			agenda: [
				{ id: 1, text: 'Finalize SVG colors', done: false },
				{ id: 2, text: 'Review glassmorphism effects', done: false }
			]
		}
	]);

	function selectMeeting(meeting: any) {
		activeMeeting = { ...meeting };
	}

	function toggleAgendaItem(id: number) {
		if (activeMeeting) {
			activeMeeting.agenda = activeMeeting.agenda.map((item: any) =>
				item.id === id ? { ...item, done: !item.done } : item
			);

			// Sync back to main list (mock)
			const idx = meetings.findIndex((m) => m.id === activeMeeting.id);
			if (idx !== -1) meetings[idx] = activeMeeting;
		}
	}
</script>

<div class="min-h-full bg-gray-50/30 p-8 dark:bg-transparent">
	<header
		class="mb-8 flex flex-col justify-between gap-6 lg:mb-10 lg:flex-row lg:items-end"
		in:fly={{ y: -20, duration: 600 }}
	>
		<div class="space-y-1">
			<div
				class="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-indigo-500 uppercase"
			>
				<span class="h-1 w-4 rounded-full bg-indigo-500"></span>
				Synchronized Sessions
			</div>
			<Title class="text-2xl font-black tracking-tight text-gray-900 lg:text-4xl dark:text-white">
				Meeting Hub
			</Title>
			<p class="text-sm font-medium text-gray-500 dark:text-gray-400">
				Schedule syncs, manage agendas, and capture action items.
			</p>
		</div>

		<button
			onclick={() => (showScheduler = true)}
			class="rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-black text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
		>
			Schedule Sync
		</button>
	</header>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
		<!-- Meetings List -->
		<div class="space-y-4 lg:col-span-5" in:fade>
			<h3 class="px-2 text-[11px] font-black tracking-widest text-gray-400 uppercase">
				Upcoming Syncs
			</h3>
			{#each meetings as meeting (meeting.id)}
				<button
					onclick={() => selectMeeting(meeting)}
					class="flex w-full flex-col items-start rounded-[2rem] border border-gray-100 bg-white p-6 text-left transition-all hover:shadow-lg md:rounded-[2.5rem] md:p-8 dark:border-gray-800 dark:bg-gray-950 {activeMeeting?.id ===
					meeting.id
						? 'ring-2 ring-indigo-500'
						: ''}"
				>
					<div class="mb-5 flex w-full items-center justify-between">
						<span
							class="rounded-full bg-indigo-50 px-3 py-1 text-[9px] font-black tracking-widest text-indigo-500 uppercase dark:bg-indigo-500/10 dark:text-indigo-400"
						>
							{meeting.type}
						</span>
						<span class="text-[10px] font-black text-gray-900 dark:text-white">{meeting.time}</span>
					</div>
					<h4 class="mb-2 text-xl font-black tracking-tight text-gray-900 dark:text-white">
						{meeting.title}
					</h4>
					<div class="flex items-center gap-3">
						<div class="flex -space-x-2">
							{#each Array(3) as _}
								<div
									class="h-6 w-6 rounded-full border-2 border-white bg-gray-200 dark:border-gray-900"
								></div>
							{/each}
						</div>
						<span class="text-[10px] font-bold text-gray-400 uppercase"
							>+{meeting.attendees - 3} others</span
						>
					</div>
				</button>
			{/each}
		</div>

		<div class="lg:col-span-7">
			{#if activeMeeting}
				<div
					class="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:rounded-[3rem] md:p-12 dark:border-gray-800 dark:bg-gray-950"
					in:fade
				>
					<div class="mb-10 space-y-4">
						<div class="flex items-center justify-between">
							<span class="text-[11px] font-black tracking-[0.2em] text-indigo-500 uppercase"
								>{activeMeeting.type} Sync</span
							>
							<div class="flex items-center gap-4 text-gray-400">
								<div class="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
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
									<span class="text-xs font-bold">{activeMeeting.duration}</span>
								</div>
								<button class="transition-colors hover:text-red-500" aria-label="Delete meeting">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
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
								</button>
							</div>
						</div>
						<Title class="text-3xl font-black">{activeMeeting.title}</Title>
						<p class="text-sm leading-relaxed font-medium text-gray-500 dark:text-gray-400">
							{activeMeeting.description}
						</p>
					</div>

					<div class="space-y-6">
						<h5 class="text-[11px] font-black tracking-widest text-gray-400 uppercase">
							Agenda & Action Items
						</h5>
						<div class="space-y-3">
							{#each activeMeeting.agenda as item}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<div
									onclick={() => toggleAgendaItem(item.id)}
									class="flex cursor-pointer items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-all hover:bg-gray-100 dark:bg-gray-900"
								>
									<div
										class="flex h-6 w-6 items-center justify-center rounded-lg border-2 {item.done
											? 'border-indigo-600 bg-indigo-600'
											: 'border-gray-200'}"
									>
										{#if item.done}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-4 w-4 text-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="4"
											>
												<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
											</svg>
										{/if}
									</div>
									<span
										class="text-sm font-bold {item.done
											? 'text-gray-400 line-through'
											: 'text-gray-900 dark:text-white'}">{item.text}</span
									>
								</div>
							{/each}
						</div>

						<button
							class="flex items-center gap-2 text-[10px] font-black tracking-widest text-indigo-500 uppercase hover:text-indigo-600"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2.5"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
							</svg>
							Add Topic
						</button>
					</div>

					<div class="mt-12 flex gap-4">
						<button
							class="flex-1 rounded-2xl bg-gray-900 py-4 text-sm font-black text-white transition-all hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-700"
							>Join Virtual Room</button
						>
						<button
							class="rounded-2xl border border-gray-100 bg-white px-8 py-4 text-sm font-bold shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
							>Edit Details</button
						>
					</div>
				</div>
			{:else}
				<div
					class="flex h-full flex-col items-center justify-center rounded-[3rem] border border-dashed border-gray-200 p-12 text-center dark:border-gray-800"
					in:fade
				>
					<div class="mb-6 rounded-full bg-gray-50 p-6 dark:bg-gray-900">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-12 w-12 text-gray-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h4 class="text-xl font-black text-gray-900 dark:text-white">No Meeting Selected</h4>
					<p class="mt-2 max-w-xs text-sm font-medium text-gray-400">
						Select an upcoming sync from the sidebar to view details, agenda, and action items.
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
