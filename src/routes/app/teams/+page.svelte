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
		members: number;
		active: boolean;
		messages: Message[];
		memberList: Member[];
	}

	let teams = $state<Team[]>([
		{ 
			id: 1, 
			name: 'Core Architecture', 
			members: 4, 
			active: true,
			messages: [
				{ id: '1', sender: 'Sarah', content: 'Hey team, reviewed the new architecture doc. Looks solid!', time: '10:30 AM', isMe: false },
				{ id: '2', sender: 'Mike', content: 'Thanks Sarah. Any thoughts on the database layer?', time: '10:35 AM', isMe: false }
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
			members: 8, 
			active: true,
			messages: [
				{ id: '1', sender: 'Alex', content: 'Vite 6 migration is almost done.', time: 'Yesterday', isMe: true },
				{ id: '2', sender: 'John', content: 'Awesome, let me know when I can pull.', time: 'Yesterday', isMe: false }
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
	let selectedTeam = $derived(teams.find(t => t.id === selectedTeamId) ?? null);
	let openCreate = $state(false);
	let newTeamName = $state('');

	function createTeam() {
		if (!newTeamName.trim()) return;
		const nextId = Math.max(0, ...teams.map(t => t.id)) + 1;
		teams.push({
			id: nextId,
			name: newTeamName,
			members: 1,
			active: true,
			messages: [],
			memberList: [
				{ name: 'Alex Johnson', role: 'Admin' }
			]
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
	<header class="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
		<Title>Team Spaces</Title>
		<button 
			onclick={() => (openCreate = true)}
			class="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-600 active:scale-95 dark:shadow-none"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
			</svg>
			Create Group
		</button>
	</header>

	<div class="flex flex-1 overflow-hidden">
		<!-- Sidebar: Team List -->
		<aside class="w-[320px] flex-shrink-0 border-r border-gray-100 bg-gray-50/30 overflow-y-auto dark:border-gray-800 dark:bg-gray-950/30">
			<div class="p-4 space-y-2">
				{#each teams as team}
					<button 
						onclick={() => (selectedTeamId = team.id)}
						class="w-full text-left rounded-2xl p-4 transition-all group {selectedTeamId === team.id 
							? 'bg-white shadow-md ring-1 ring-indigo-500/10 dark:bg-gray-800' 
							: 'hover:bg-white/50 dark:hover:bg-gray-800/50'}"
					>
						<div class="flex items-center justify-between gap-3">
							<div class="flex items-center gap-3 min-w-0">
								<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors
									{selectedTeamId === team.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'}">
									<strong class="text-sm font-black">{team.name.charAt(0)}</strong>
								</div>
								<div class="flex flex-col min-w-0">
									<h3 class="truncate text-sm font-bold text-gray-900 dark:text-white">{team.name}</h3>
									<p class="text-[11px] font-medium text-gray-400">{team.members} members</p>
								</div>
							</div>
							
							{#if team.active}
								<div class="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
							{/if}
						</div>
					</button>
				{/each}
			</div>
		</aside>

		<!-- Main Content: Chat View -->
		<main class="flex-1 overflow-hidden relative">
			<TeamChat team={selectedTeam} onAddMember={addMember} />
		</main>
	</div>
</div>

<!-- Create Team Dialog -->
<Dialog bind:open={openCreate} onClose={() => (openCreate = false)}>
	<form 
		onclick={(e) => e.stopPropagation()}
		onsubmit={(e) => { e.preventDefault(); createTeam(); }}
		class="flex w-full max-w-md flex-col space-y-6 rounded-2xl border border-gray-100 bg-white p-8 dark:border-gray-800 dark:bg-gray-950"
	>
		<div class="space-y-2">
			<h2 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">New Discussion Group</h2>
			<p class="text-sm font-medium text-gray-500 italic">Create a space for developpers and projects people to collaborate.</p>
		</div>

		<div class="space-y-4">
			<label class="block">
				<span class="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Group Name</span>
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
	</form>
</Dialog>