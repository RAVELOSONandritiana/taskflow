<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';
	import Avatar from '$lib/images/solo.png';
	import Dialog from '$lib/components/user/app/Dialog.svelte';
	import TeamChat from '$lib/components/user/app/TeamChat.svelte';
	import { fade, fly } from 'svelte/transition';

	interface Message {
		id: string;
		sender: string;
		content: string;
		time: string;
		isMe: boolean;
	}

	interface Member {
		name: string;
		role: string;
		avatar?: string;
	}

	interface Team {
		id: number;
		name: string;
		description: string;
		members: number;
		active: boolean;
		messages: Message[];
		memberList: Member[];
	}

	let teams = $state<Team[]>([
		{
			id: 1,
			name: 'Core Architecture',
			description: 'Deep dive into system design, patterns, and infrastructure scalability.',
			members: 4,
			active: true,
			messages: [
				{
					id: '1',
					sender: 'Sarah',
					content: 'Hey team, reviewed the new architecture doc. Looks solid!',
					time: '10:30 AM',
					isMe: false
				},
				{
					id: '2',
					sender: 'Mike',
					content: 'Thanks Sarah. Any thoughts on the database layer?',
					time: '10:35 AM',
					isMe: false
				}
			],
			memberList: [
				{ name: 'Sarah Miller', role: 'Architect' },
				{ name: 'Mike Ross', role: 'Backend Lead' },
				{ name: 'Alex Johnson', role: 'Fullstack' },
				{ name: 'David Chen', role: 'DevOps' }
			]
		},
		{
			id: 2,
			name: 'Frontend Guild',
			description: 'Discussing UI components, accessibility, and modern frontend frameworks.',
			members: 8,
			active: true,
			messages: [
				{
					id: '1',
					sender: 'Alex',
					content: 'Vite 6 migration is almost done.',
					time: 'Yesterday',
					isMe: true
				},
				{
					id: '2',
					sender: 'John',
					content: 'Awesome, let me know when I can pull.',
					time: 'Yesterday',
					isMe: false
				}
			],
			memberList: [
				{ name: 'Alex Johnson', role: 'Frontend Lead' },
				{ name: 'John Doe', role: 'Senior dev' },
				{ name: 'Jane Smith', role: 'UI Engineer' }
			]
		},
		{
			id: 3,
			name: 'Product Design',
			description: 'Crafting premium user experiences and refining visual identity.',
			members: 3,
			active: false,
			messages: [],
			memberList: [
				{ name: 'Emilly Stark', role: 'Product Manager' },
				{ name: 'Robert Fox', role: 'Lead Designer' }
			]
		}
	]);

	let selectedTeamId = $state<number | null>(null);
	let selectedTeam = $derived(teams.find((t) => t.id === selectedTeamId) ?? null);
	let openCreate = $state(false);
	let newTeamName = $state('');

	function createTeam() {
		if (!newTeamName.trim()) return;
		const nextId = Math.max(0, ...teams.map((t) => t.id)) + 1;
		teams.push({
			id: nextId,
			name: newTeamName,
			description: 'A new discussion space for the team.',
			members: 1,
			active: true,
			messages: [],
			memberList: [{ name: 'Alex Johnson', role: 'Admin' }]
		});
		newTeamName = '';
		openCreate = false;
		selectedTeamId = nextId;
	}

	function addMember() {
		if (!selectedTeam) return;
		selectedTeam.members++;
		selectedTeam.memberList.push({
			name: `Guest Developer ${selectedTeam.members}`,
			role: 'Contributor'
		});
		selectedTeam.messages.push({
			id: Math.random().toString(36).substr(2, 9),
			sender: 'System',
			content: 'A new member has joined the team!',
			time: 'Just now',
			isMe: false
		});
	}
</script>

<div class="flex h-full flex-col overflow-hidden bg-white dark:bg-transparent">
	<!-- Top Bar -->
	<header
		class="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80"
	>
		<Title>Messaging Hub</Title>
		<button
			onclick={() => (openCreate = true)}
			class="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-600 active:scale-95 dark:shadow-none"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="3"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
			</svg>
			Start Discussion
		</button>
	</header>

	<div class="relative flex flex-1 overflow-hidden">
		<!-- Sidebar: Team List (Desktop only quick-switch) -->
		<aside
			class="hidden w-[300px] flex-shrink-0 overflow-y-auto border-r border-gray-100 bg-gray-50/30 lg:block dark:border-gray-800 dark:bg-gray-950/30"
		>
			<div class="space-y-2 p-4">
				{#each teams as team}
					<button
						onclick={() => (selectedTeamId = team.id)}
						class="group w-full rounded-2xl p-4 text-left transition-all {selectedTeamId === team.id
							? 'bg-white shadow-md ring-1 ring-indigo-500/10 dark:bg-gray-800'
							: 'hover:bg-white/50 dark:hover:bg-gray-800/50'}"
					>
						<div class="flex items-center justify-between gap-3">
							<div class="flex min-w-0 items-center gap-3">
								<div
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors
									{selectedTeamId === team.id
										? 'bg-indigo-600 text-white'
										: 'bg-gray-200 text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:bg-gray-700 dark:text-gray-400'}"
								>
									<strong class="text-sm font-black">{team.name.charAt(0)}</strong>
								</div>
								<div class="flex min-w-0 flex-col">
									<h3 class="truncate text-sm font-bold text-gray-900 dark:text-white">
										{team.name}
									</h3>
									<p class="text-[11px] font-medium text-gray-400">{team.members} members</p>
								</div>
							</div>

							{#if team.active}
								<div
									class="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
								></div>
							{/if}
						</div>
					</button>
				{/each}
			</div>
		</aside>

		<!-- Main Content: Chat View -->
		<main class="relative flex flex-1 flex-col overflow-hidden">
			{#if selectedTeamId}
				<div
					class="flex items-center gap-2 border-b border-gray-50 p-4 lg:hidden dark:border-gray-800"
				>
					<button
						onclick={() => (selectedTeamId = null)}
						class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
						aria-label="Back to discussions"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<span class="text-xs font-black tracking-widest text-gray-400 uppercase"
						>Back to discussions</span
					>
				</div>
				<TeamChat team={selectedTeam} onAddMember={addMember} />
			{:else}
				<div
					class="custom-scrollbar flex-1 overflow-y-auto bg-gray-50/20 p-6 md:p-12 dark:bg-transparent"
					in:fade
				>
					<div class="mb-10 max-w-2xl">
						<h2 class="mb-2 text-2xl font-black tracking-tight text-gray-900 dark:text-white">
							Discussion Groups
						</h2>
						<p class="text-sm font-medium text-gray-400">
							Select a room below to start messaging or creating new ideas with your team.
						</p>
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
						{#each teams as team}
							<button
								onclick={() => (selectedTeamId = team.id)}
								class="group flex flex-col items-start rounded-[2.5rem] border border-gray-100 bg-white p-8 text-left transition-all hover:shadow-xl hover:ring-2 hover:ring-indigo-500/20 dark:border-gray-800 dark:bg-gray-950"
							>
								<div class="mb-6 flex w-full items-center justify-between">
									<div
										class="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-900/30 dark:text-indigo-400"
									>
										<strong class="text-xl font-black">{team.name.charAt(0)}</strong>
									</div>
									{#if team.active}
										<div
											class="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[10px] font-black tracking-widest text-green-600 uppercase dark:bg-green-500/10 dark:text-green-400"
										>
											<span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
											Active
										</div>
									{/if}
								</div>

								<h3
									class="mb-2 text-xl font-black tracking-tight text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white"
								>
									{team.name}
								</h3>
								<p class="mb-8 line-clamp-2 text-xs font-medium text-gray-400">
									{team.description}
								</p>

								<div
									class="mt-auto flex w-full items-center justify-between border-t border-gray-50 pt-6 dark:border-gray-900"
								>
									<div class="flex -space-x-2">
										{#each Array(Math.min(3, team.memberList.length)) as _, i}
											<div
												class="h-7 w-7 rounded-lg border-2 border-white bg-gray-100 dark:border-gray-900 dark:bg-gray-800"
											></div>
										{/each}
										{#if team.members > 3}
											<div
												class="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-white bg-indigo-50 text-[8px] font-black text-indigo-600 dark:border-gray-900 dark:bg-indigo-900/40 dark:text-indigo-400"
											>
												+{team.members - 3}
											</div>
										{/if}
									</div>
									<span class="text-[10px] font-black tracking-widest text-gray-400 uppercase"
										>Join Chat</span
									>
								</div>
							</button>
						{/each}

						<button
							onclick={() => (openCreate = true)}
							class="flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-gray-200 p-8 text-center transition-all hover:border-indigo-500/50 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
						>
							<div
								class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400 dark:bg-gray-900"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2.5"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
								</svg>
							</div>
							<h3 class="text-sm font-black text-gray-900 dark:text-white">Start New Discussion</h3>
							<p class="mt-1 text-xs font-medium text-gray-400">Invite people and create a space</p>
						</button>
					</div>
				</div>
			{/if}
		</main>
	</div>
</div>

<!-- Create Team Dialog -->
<Dialog bind:open={openCreate} onClose={() => (openCreate = false)}>
	<form
		onsubmit={(e) => {
			e.preventDefault();
			createTeam();
		}}
		class="flex w-full max-w-md flex-col space-y-6 rounded-2xl border border-gray-100 bg-white p-8 dark:border-gray-800 dark:bg-gray-950"
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div onclick={(e) => e.stopPropagation()} class="flex flex-col space-y-6">
			<div class="space-y-2">
				<h2 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
					New Discussion Group
				</h2>
				<p class="text-sm font-medium text-gray-500 italic">
					Create a space for developpers and projects people to collaborate.
				</p>
			</div>

			<div class="space-y-4">
				<label class="block">
					<span class="mb-2 block text-xs font-bold tracking-wider text-gray-400 uppercase"
						>Group Name</span
					>
					<input
						type="text"
						bind:value={newTeamName}
						placeholder="e.g. Backend Wizards, Beta Testers..."
						class="w-full rounded-xl border-none bg-gray-100 px-4 py-3 text-sm ring-1 ring-gray-200 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-gray-700"
						required
					/>
				</label>
			</div>

			<div class="flex justify-end gap-3 pt-2">
				<button
					type="button"
					onclick={() => (openCreate = false)}
					class="rounded-xl px-4 py-2 text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white"
				>
					Cancel
				</button>
				<button
					type="submit"
					class="rounded-xl bg-indigo-500 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-600 active:scale-95 dark:shadow-none"
				>
					Create Group
				</button>
			</div>
		</div>
	</form>
</Dialog>
