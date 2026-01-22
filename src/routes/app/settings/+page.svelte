<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';

	let activeTab = 'profile';

	const tabs = [
		{ id: 'profile', label: 'Profile Settings' },
		{ id: 'security', label: 'Security' },
		{ id: 'notifications', label: 'Notifications' },
		{ id: 'appearance', label: 'Appearance' }
	];
</script>

<div class="p-4" class:dark={$theme}>
	<Title>Settings</Title>

	<div class="mt-8 flex space-x-8">
		<!-- Sidebar Tabs -->
		<div class="w-1/4 space-y-2">
			{#each tabs as tab}
				<button
					on:click={() => (activeTab = tab.id)}
					class="w-full rounded-md px-4 py-2 text-left transition-colors {activeTab === tab.id
						? 'bg-indigo-500 text-white shadow-md'
						: 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}"
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<!-- Tab Content -->
		<div class="flex-1 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
			{#if activeTab === 'profile'}
				<section class="space-y-6">
					<h3 class="text-xl font-bold text-gray-800 dark:text-white">Profile Settings</h3>
					<div class="space-y-4">
						<label class="block">
							<span class="text-gray-700 dark:text-gray-300">Display Name</span>
							<input
								type="text"
								class="mt-1 block w-full rounded-md border border-gray-400 bg-gray-100 p-2 outline-none transition-all focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
								placeholder="Alex Tasker"
							/>
						</label>
						<label class="block">
							<span class="text-gray-700 dark:text-gray-300">Public Email</span>
							<input
								type="email"
								class="mt-1 block w-full rounded-md border border-gray-400 bg-gray-100 p-2 outline-none transition-all focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
								placeholder="alex@example.com"
							/>
						</label>
						<label class="block">
							<span class="text-gray-700 dark:text-gray-300">Bio</span>
							<textarea
								class="mt-1 block w-full rounded-md border border-gray-400 bg-gray-100 p-2 outline-none transition-all focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
								rows="3"
							></textarea>
						</label>
					</div>
				</section>
			{:else if activeTab === 'security'}
				<section class="space-y-6">
					<h3 class="text-xl font-bold text-gray-800 dark:text-white">Security</h3>
					<div class="space-y-4">
						<button class="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
							>Change Password</button
						>
						<div class="flex items-center justify-between">
							<span class="text-gray-700 dark:text-gray-300">Two-Factor Authentication</span>
							<button class="text-indigo-500 hover:underline">Enable</button>
						</div>
					</div>
				</section>
			{:else if activeTab === 'notifications'}
				<section class="space-y-6">
					<h3 class="text-xl font-bold text-gray-800 dark:text-white">Notification Preferences</h3>
					<div class="space-y-4">
						{#each ['Email Notifications', 'Push Notifications', 'Project Updates'] as item}
							<label class="flex items-center">
								<input type="checkbox" checked class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
								<span class="ml-2 text-gray-700 dark:text-gray-300">{item}</span>
							</label>
						{/each}
					</div>
				</section>
			{:else if activeTab === 'appearance'}
				<section class="space-y-6">
					<h3 class="text-xl font-bold text-gray-800 dark:text-white">Appearance</h3>
					<div class="flex items-center space-x-4">
						<span class="text-gray-700 dark:text-gray-300">Dark Mode</span>
						<button
							on:click={() => theme.update((v) => !v)}
							aria-label="Toggle dark mode"
							class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 {$theme ? 'bg-indigo-600' : 'bg-gray-200'}"
						>
							<span
								class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out {$theme ? 'translate-x-5' : 'translate-x-0'}"
							></span>
						</button>
					</div>
				</section>
			{/if}

			<div class="mt-8 border-t border-gray-100 pt-6 dark:border-gray-700">
				<button class="rounded-md bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-600"
					>Save Changes</button
				>
			</div>
		</div>
	</div>
</div>
