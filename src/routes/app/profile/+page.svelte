<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';
	import Avatar from '$lib/images/solo.png';

	let user = {
		name: 'Alex Tasker',
		email: 'alex@example.com',
		role: 'Lead Project Manager',
		bio: 'Passionate about productivity and building great teams. Coffee enthusiast.',
		joined: 'January 2024'
	};
</script>

<div class="p-4" class:dark={$theme}>
	<Title>Profile</Title>

	<div class="mt-8 max-w-4xl rounded-lg bg-white p-8 shadow-sm dark:bg-gray-800">
		<div class="flex items-start space-x-8">
			<div class="relative">
				<img src={Avatar} alt="Profile" class="h-32 w-32 rounded-full border-4 border-indigo-100 object-cover dark:border-indigo-900" />
				<button aria-label="Change avatar" class="absolute bottom-0 right-0 rounded-full bg-indigo-500 p-2 text-white shadow-lg hover:bg-indigo-600">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</button>
			</div>
			
			<div class="flex-1 space-y-4">
				<div>
					<h2 class="text-3xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
					<p class="text-indigo-500 font-medium">{user.role}</p>
				</div>
				
				<div class="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 dark:border-gray-700">
					<div>
						<span class="text-sm text-gray-500 dark:text-gray-400">Email Address</span>
						<p class="text-gray-800 dark:text-gray-200">{user.email}</p>
					</div>
					<div>
						<span class="text-sm text-gray-500 dark:text-gray-400">Joined Date</span>
						<p class="text-gray-800 dark:text-gray-200">{user.joined}</p>
					</div>
				</div>
				
				<div>
					<span class="text-sm text-gray-500 dark:text-gray-400">Bio</span>
					<p class="mt-1 text-gray-700 dark:text-gray-300">
						{user.bio}
					</p>
				</div>
				
				<div class="mt-6 flex space-x-4">
					<button class="rounded-md bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-600">Edit Profile</button>
					<button class="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Public View</button>
				</div>
			</div>
		</div>
	</div>
</div>
