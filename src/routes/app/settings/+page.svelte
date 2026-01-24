<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';
	import Avatar from '$lib/images/solo.png';

	let activeTab = $state('general');

	const tabs = [
		{
			id: 'general',
			label: 'General',
			icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
		},
		{
			id: 'account',
			label: 'Account',
			icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
		},
		{
			id: 'notifications',
			label: 'Notifications',
			icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
		},
		{
			id: 'appearance',
			label: 'Appearance',
			icon: 'M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z'
		}
	];
</script>

<div class="h-full overflow-y-auto bg-gray-50/30 p-6 dark:bg-transparent">
	<div class="mb-8">
		<Title>Settings</Title>
		<p class="mt-1 text-sm text-gray-500">
			Manage your profile, preferences, and workspace settings.
		</p>
	</div>

	<div class="flex flex-col gap-8 lg:flex-row">
		<!-- Sidebar Navigation -->
		<aside class="w-full shrink-0 lg:w-64">
			<nav class="space-y-1">
				{#each tabs as tab}
					<button
						onclick={() => (activeTab = tab.id)}
						class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all
						{activeTab === tab.id
							? 'bg-white text-indigo-600 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:text-indigo-400 dark:ring-gray-700'
							: 'text-gray-500 hover:bg-white hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'}"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={tab.icon} />
						</svg>
						{tab.label}
					</button>
				{/each}
			</nav>
		</aside>

		<!-- Content Area -->
		<div class="flex-1 space-y-6">
			{#if activeTab === 'general'}
				<div
					class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
				>
					<h3 class="mb-6 text-lg font-bold text-gray-900 dark:text-white">Public Profile</h3>

					<div class="mb-8 flex flex-col items-center gap-6 sm:flex-row">
						<img
							src={Avatar}
							alt="Avatar"
							class="h-24 w-24 rounded-full object-cover ring-4 ring-gray-50 dark:ring-gray-800"
						/>
						<div class="flex flex-col gap-2">
							<div class="flex gap-2">
								<button
									class="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-600 transition-colors hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400"
								>
									Change Avatar
								</button>
								<button
									class="rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
								>
									Remove
								</button>
							</div>
							<p class="text-xs font-medium text-gray-400">Recommended: 400x400px JPG or PNG</p>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="space-y-2">
							<label class="text-xs font-bold tracking-wider text-gray-500 uppercase"
								>Display Name</label
							>
							<input
								type="text"
								value="Alex Tasker"
								class="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
							/>
						</div>
						<div class="space-y-2">
							<label class="text-xs font-bold tracking-wider text-gray-500 uppercase"
								>Title / Role</label
							>
							<input
								type="text"
								value="Lead Project Manager"
								class="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
							/>
						</div>
						<div class="space-y-2 md:col-span-2">
							<label class="text-xs font-bold tracking-wider text-gray-500 uppercase">Bio</label>
							<textarea
								rows="3"
								class="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
								>Passionate about productivity and building great teams.</textarea
							>
						</div>
					</div>
				</div>

				<div
					class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
				>
					<h3 class="mb-6 text-lg font-bold text-gray-900 dark:text-white">Personal Information</h3>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="space-y-2">
							<label class="text-xs font-bold tracking-wider text-gray-500 uppercase"
								>Email Address</label
							>
							<input
								type="email"
								value="alex@example.com"
								class="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
							/>
						</div>
						<div class="space-y-2">
							<label class="text-xs font-bold tracking-wider text-gray-500 uppercase">Phone</label>
							<input
								type="tel"
								value="+1 (555) 000-0000"
								class="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
							/>
						</div>
					</div>
				</div>
			{:else if activeTab === 'account'}
				<div
					class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
				>
					<h3 class="mb-6 text-lg font-bold text-gray-900 dark:text-white">Password & Security</h3>
					<div class="max-w-md space-y-4">
						<button
							class="flex w-full items-center justify-between rounded-xl border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
						>
							<div class="text-left">
								<p class="font-bold text-gray-900 dark:text-white">Change Password</p>
								<p class="text-xs text-gray-500">Last changed 3 months ago</p>
							</div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-gray-400"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>

						<div
							class="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-700"
						>
							<div>
								<p class="font-bold text-gray-900 dark:text-white">Two-Factor Authentication</p>
								<p class="text-xs text-gray-500">Add an extra layer of security</p>
							</div>
							<div
								class="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-200 transition-colors dark:bg-gray-700"
							>
								<span
									class="h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform"
								></span>
							</div>
						</div>
					</div>
				</div>

				<!-- Danger Zone -->
				<div
					class="rounded-3xl border border-red-100 bg-red-50/30 p-8 dark:border-red-900/30 dark:bg-red-900/10"
				>
					<h3 class="mb-2 text-lg font-bold text-red-600 dark:text-red-400">Danger Zone</h3>
					<p class="mb-6 text-sm text-gray-600 dark:text-gray-400">
						Once you delete your account, there is no going back. Please be certain.
					</p>
					<button
						class="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-700 active:scale-95 dark:shadow-none"
					>
						Delete Account
					</button>
				</div>
			{:else if activeTab === 'notifications'}
				<div
					class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
				>
					<h3 class="mb-6 text-lg font-bold text-gray-900 dark:text-white">Email Notifications</h3>
					<div class="space-y-4">
						{#each ['New tasks assigned to me', 'Project status updates', 'Mentions in comments', 'Daily summary'] as item}
							<label class="flex cursor-pointer items-center justify-between">
								<span class="font-medium text-gray-700 dark:text-gray-300">{item}</span>
								<input
									type="checkbox"
									checked
									class="h-5 w-5 rounded border-gray-300 bg-gray-100 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800"
								/>
							</label>
						{/each}
					</div>
				</div>

				<div
					class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
				>
					<h3 class="mb-6 text-lg font-bold text-gray-900 dark:text-white">Push Notifications</h3>
					<div class="space-y-4">
						{#each ['Direct messages', 'Urgent alerts'] as item}
							<label class="flex cursor-pointer items-center justify-between">
								<span class="font-medium text-gray-700 dark:text-gray-300">{item}</span>
								<input
									type="checkbox"
									checked
									class="h-5 w-5 rounded border-gray-300 bg-gray-100 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800"
								/>
							</label>
						{/each}
					</div>
				</div>
			{:else if activeTab === 'appearance'}
				<div
					class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
				>
					<h3 class="mb-6 text-lg font-bold text-gray-900 dark:text-white">Theme Preferences</h3>

					<div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
						<button
							onclick={() => theme.set(false)}
							class="group relative rounded-2xl border-2 p-2 transition-all {$theme === false
								? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
								: 'border-gray-100 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700'}"
						>
							<div
								class="mb-2 aspect-video w-full rounded-xl border border-gray-200 bg-gray-100"
							></div>
							<p
								class="text-center text-sm font-bold {$theme === false
									? 'text-indigo-600'
									: 'text-gray-500'}"
							>
								Light
							</p>
						</button>

						<button
							onclick={() => theme.set(true)}
							class="group relative rounded-2xl border-2 p-2 transition-all {$theme === true
								? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
								: 'border-gray-100 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700'}"
						>
							<div
								class="mb-2 aspect-video w-full rounded-xl border border-gray-700 bg-gray-900"
							></div>
							<p
								class="text-center text-sm font-bold {$theme === true
									? 'text-indigo-600'
									: 'text-gray-500'}"
							>
								Dark
							</p>
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
