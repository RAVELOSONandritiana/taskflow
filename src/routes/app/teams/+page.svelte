<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';
	import Avatar from '$lib/images/solo.png';

	let teams = [
		{ id: 1, name: 'Core Architecture', members: 4, active: true },
		{ id: 2, name: 'Frontend Guild', members: 8, active: true },
		{ id: 3, name: 'Product Design', members: 3, active: false }
	];
</script>

<div class="p-4" class:dark={$theme}>
	<div class="flex items-center justify-between">
		<Title>Synchronize with teams.</Title>
		<button class="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600">
			Create Team
		</button>
	</div>

	<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each teams as team}
			<div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
				<div class="flex items-center justify-between">
					<h3 class="text-xl font-bold text-gray-800 dark:text-white">{team.name}</h3>
					<span class="rounded-full px-2 py-1 text-xs font-semibold {team.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}">
						{team.active ? 'Active' : 'Inactive'}
					</span>
				</div>
				<p class="mt-2 text-gray-600 dark:text-gray-400">{team.members} Members</p>
				
				<div class="mt-4 flex -space-x-2">
					{#each Array(team.members).slice(0, 3) as _}
						<img src={Avatar} alt="member" class="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-gray-800" />
					{/each}
					{#if team.members > 3}
						<div class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs font-medium text-gray-600 dark:border-gray-800">
							+{team.members - 3}
						</div>
					{/if}
				</div>
				
				<div class="mt-6 flex space-x-3">
					<button class="flex-1 rounded-md border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
						View Team
					</button>
					<button class="flex-1 rounded-md bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400">
						Manage
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>