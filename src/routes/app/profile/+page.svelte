<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';
	import Avatar from '$lib/images/solo.png';

	let user = {
		name: 'Alex Tasker',
		email: 'alex@example.com',
		role: 'Lead Project Manager',
		bio: 'Building scalable teams and systems. Focused on developer productivity and user-centric design. Open source contributor since 2020.',
		joined: 'January 2024',
		verified: true,
		reputation: 98,
		likes: 1243,
		followers: 856,
		projects: 42,
		skills: ['Product Mgmt', 'Svelte', 'Typescript', 'Team Leadership', 'UI/UX Design'],
		badges: [
			{ name: 'Top Contributor', color: 'indigo' },
			{ name: 'Bug Hunter', color: 'red' },
			{ name: 'Mentor', color: 'green' }
		]
	};

	let activeTab = $state('activity');
</script>

<div class="h-full overflow-y-auto p-6" class:dark={$theme}>
	<div class="mb-8 flex items-end justify-between">
		<Title>UserProfile</Title>
		<div class="flex items-center gap-2">
			<span
				class="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400"
			>
				Online
			</span>
			<button
				class="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
			>
				Edit Profile
			</button>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
		<!-- Left Column: Main Info -->
		<div class="space-y-6 lg:col-span-1">
			<!-- Profile Card -->
			<div
				class="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-lg dark:border-gray-800 dark:bg-gray-900"
			>
				<div
					class="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-indigo-500 to-purple-600"
				></div>

				<div class="relative mt-12 inline-block">
					<img
						src={Avatar}
						alt="Profile"
						class="h-32 w-32 rounded-3xl border-4 border-white bg-white object-cover shadow-xl dark:border-gray-900 dark:bg-gray-900"
					/>
					{#if user.verified}
						<div
							class="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white ring-4 ring-white dark:ring-gray-900"
							title="Verified User"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					{/if}
				</div>

				<h2 class="mt-4 text-2xl font-black tracking-tight text-gray-900 dark:text-white">
					{user.name}
				</h2>
				<p class="font-medium text-indigo-500">{user.role}</p>

				<div
					class="mt-6 flex justify-center gap-6 border-t border-gray-100 pt-6 dark:border-gray-800"
				>
					<div class="text-center">
						<div class="text-lg font-black text-gray-900 dark:text-white">{user.followers}</div>
						<div class="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
							Followers
						</div>
					</div>
					<div class="text-center">
						<div class="text-lg font-black text-gray-900 dark:text-white">{user.projects}</div>
						<div class="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Projects</div>
					</div>
					<div class="text-center">
						<div class="text-lg font-black text-gray-900 dark:text-white">{user.reputation}</div>
						<div class="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
							Reputation
						</div>
					</div>
				</div>

				<div class="mt-6 flex gap-3">
					<button
						class="flex-1 rounded-xl bg-indigo-600 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
					>
						Follow
					</button>
					<button
						class="flex-1 rounded-xl bg-gray-100 py-2 text-sm font-bold text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
					>
						Message
					</button>
				</div>
			</div>

			<!-- Skills & Badges -->
			<div
				class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
			>
				<h3 class="mb-4 text-sm font-bold tracking-wider text-gray-400 uppercase">
					Skills & Expertise
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each user.skills as skill}
						<span
							class="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
						>
							{skill}
						</span>
					{/each}
				</div>

				<h3 class="mt-8 mb-4 text-sm font-bold tracking-wider text-gray-400 uppercase">Badges</h3>
				<div class="flex gap-3">
					{#each user.badges as badge}
						<div
							class="flex h-10 w-10 items-center justify-center rounded-xl bg-{badge.color}-100 text-{badge.color}-600 dark:bg-{badge.color}-900/30 dark:text-{badge.color}-400"
							title={badge.name}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{#if badge.color === 'indigo'}
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
									/>
								{:else if badge.color === 'red'}
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								{:else}
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								{/if}
							</svg>
						</div>
					{/each}
					<div
						class="flex h-10 w-10 items-center justify-center rounded-xl border border-dashed border-gray-300 text-gray-400 dark:border-gray-700"
					>
						<span class="text-xs font-bold">+2</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column: Content -->
		<div class="space-y-6 lg:col-span-2">
			<!-- Stats Row -->
			<div class="grid grid-cols-3 gap-4">
				<div class="rounded-3xl bg-indigo-50 p-6 dark:bg-indigo-900/10">
					<div class="mb-2 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
						<span class="text-xs font-bold tracking-wider uppercase">Total Likes</span>
					</div>
					<div class="text-3xl font-black text-indigo-900 dark:text-white">{user.likes}</div>
				</div>

				<div class="rounded-3xl bg-orange-50 p-6 dark:bg-orange-900/10">
					<div class="mb-2 flex items-center gap-2 text-orange-600 dark:text-orange-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
						<span class="text-xs font-bold tracking-wider uppercase">Reach</span>
					</div>
					<div class="text-3xl font-black text-orange-900 dark:text-white">12.5k</div>
				</div>

				<div class="rounded-3xl bg-blue-50 p-6 dark:bg-blue-900/10">
					<div class="mb-2 flex items-center gap-2 text-blue-600 dark:text-blue-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span class="text-xs font-bold tracking-wider uppercase">Tasks</span>
					</div>
					<div class="text-3xl font-black text-blue-900 dark:text-white">94%</div>
				</div>
			</div>

			<!-- About -->
			<div
				class="rounded-3xl border border-gray-100 bg-white p-8 dark:border-gray-800 dark:bg-gray-900"
			>
				<h3 class="mb-4 text-lg font-bold text-gray-900 dark:text-white">About</h3>
				<p class="leading-relaxed text-gray-600 dark:text-gray-300">
					{user.bio}
				</p>
				<div class="mt-6 flex items-center gap-6 text-sm text-gray-500">
					<div class="flex items-center gap-2">
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
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						San Francisco, CA
					</div>
					<div class="flex items-center gap-2">
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
								d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
							/>
						</svg>
						<a href="https://example.com" class="text-indigo-500 hover:underline">alextasker.dev</a>
					</div>
					<div class="flex items-center gap-2">
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
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						Joined {user.joined}
					</div>
				</div>
			</div>

			<!-- Activity Tabs -->
			<div class="space-y-4">
				<div class="flex items-center gap-4 border-b border-gray-100 pb-2 dark:border-gray-800">
					{#each ['Activity', 'Projects', 'Teams'] as tab}
						<button
							onclick={() => (activeTab = tab.toLowerCase())}
							class="px-2 py-1 text-sm font-bold transition-colors
                            {activeTab === tab.toLowerCase()
								? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
								: 'text-gray-400 hover:text-gray-600'}"
						>
							{tab}
						</button>
					{/each}
				</div>

				<div class="space-y-4">
					<!-- Activity Item -->
					<div
						class="group flex items-start gap-4 rounded-2xl bg-white p-4 transition-all hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
					>
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								/>
							</svg>
						</div>
						<div class="flex-1">
							<p class="text-sm font-medium text-gray-900 dark:text-white">
								<span class="font-bold">Created a new project</span> "TaskFlow Mobile App"
							</p>
							<p class="text-xs text-gray-400">2 hours ago</p>
						</div>
					</div>

					<!-- Activity Item -->
					<div
						class="group flex items-start gap-4 rounded-2xl bg-white p-4 transition-all hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
					>
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<div class="flex-1">
							<p class="text-sm font-medium text-gray-900 dark:text-white">
								<span class="font-bold">Completed task</span> "Design System Implementation"
							</p>
							<p class="text-xs text-gray-400">Yesterday</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
