<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';

	let searchQuery = $state('');

	const files = [
		{ name: 'Project Specs', type: 'folder', items: '12 files', size: '-', date: 'Jan 15, 2024' },
		{ name: 'Design Assets', type: 'folder', items: '234 files', size: '-', date: 'Jan 12, 2024' },
		{ name: 'Meeting Notes', type: 'folder', items: '45 files', size: '-', date: 'Jan 10, 2024' },
		{ name: 'Q4 Report.pdf', type: 'pdf', size: '2.4 MB', date: 'Jan 20, 2024' },
		{ name: 'Budget_2024.xlsx', type: 'excel', size: '1.2 MB', date: 'Jan 18, 2024' },
		{ name: 'Hero_Image.png', type: 'image', size: '4.8 MB', date: 'Yesterday' },
		{ name: 'Client_Contract.docx', type: 'doc', size: '542 KB', date: '2 days ago' },
		{ name: 'Site_Backup.zip', type: 'zip', size: '125 MB', date: 'Last week' }
	];

	let filteredFiles = $derived(
		files.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
	);
</script>

<div class="flex h-full flex-col bg-white p-6 dark:bg-transparent">
	<div class="mb-8 flex items-center justify-between">
		<Title>Files & Documents</Title>
		<div class="flex items-center gap-4">
			<div class="relative">
				<input
					type="text"
					placeholder="Search files..."
					bind:value={searchQuery}
					class="w-64 rounded-xl border-none bg-gray-100 px-4 py-2.5 pl-10 text-sm font-medium ring-1 ring-transparent transition-all focus:ring-indigo-500 dark:bg-gray-900 dark:text-white"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>

			<button
				class="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-600 active:scale-95 dark:shadow-none"
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
						d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
					/>
				</svg>
				Upload
			</button>
		</div>
	</div>

	<!-- Storage Summary -->
	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
		<div
			class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50"
		>
			<div
				class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
					/>
				</svg>
			</div>
			<p class="text-sm font-medium text-gray-500">Documents</p>
			<h3 class="text-2xl font-black text-gray-900 dark:text-white">12.5 GB</h3>
			<div class="mt-2 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
				<div class="h-full w-[65%] rounded-full bg-indigo-500"></div>
			</div>
		</div>

		<div
			class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50"
		>
			<div
				class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 dark:bg-orange-900/20"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			</div>
			<p class="text-sm font-medium text-gray-500">Images</p>
			<h3 class="text-2xl font-black text-gray-900 dark:text-white">8.4 GB</h3>
			<div class="mt-2 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
				<div class="h-full w-[45%] rounded-full bg-orange-500"></div>
			</div>
		</div>

		<div
			class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50"
		>
			<div
				class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-500 dark:bg-green-900/20"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
					/>
				</svg>
			</div>
			<p class="text-sm font-medium text-gray-500">Media</p>
			<h3 class="text-2xl font-black text-gray-900 dark:text-white">4.2 GB</h3>
			<div class="mt-2 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
				<div class="h-full w-[20%] rounded-full bg-green-500"></div>
			</div>
		</div>

		<div
			class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50"
		>
			<div
				class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-500 dark:bg-purple-900/20"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
					/>
				</svg>
			</div>
			<p class="text-sm font-medium text-gray-500">Archives</p>
			<h3 class="text-2xl font-black text-gray-900 dark:text-white">2.1 GB</h3>
			<div class="mt-2 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
				<div class="h-full w-[10%] rounded-full bg-purple-500"></div>
			</div>
		</div>
	</div>

	<!-- File Grid -->
	<h3 class="mb-4 text-sm font-bold tracking-wider text-gray-400 uppercase">Recent Files</h3>
	<div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
		{#each filteredFiles as file}
			<div
				class="group relative flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-6 transition-all hover:border-indigo-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700"
				role="button"
				tabindex="0"
			>
				<div
					class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110
					{file.type === 'folder'
						? 'bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20'
						: file.type === 'pdf'
							? 'bg-red-50 text-red-500 dark:bg-red-900/20'
							: file.type === 'image'
								? 'bg-purple-50 text-purple-500 dark:bg-purple-900/20'
								: file.type === 'zip'
									? 'bg-yellow-50 text-yellow-500 dark:bg-yellow-900/20'
									: 'bg-blue-50 text-blue-500 dark:bg-blue-900/20'}"
				>
					{#if file.type === 'folder'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-8 w-8"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
							/>
						</svg>
					{:else if file.type === 'image'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-8 w-8"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-8 w-8"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					{/if}
				</div>

				<h4
					class="mb-1 w-full truncate text-center text-sm font-bold text-gray-900 dark:text-white"
					title={file.name}
				>
					{file.name}
				</h4>

				<p class="text-[10px] font-medium tracking-wider text-gray-400 uppercase">
					{file.type === 'folder' ? file.items : file.size}
				</p>

				<div class="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
					<button
						class="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
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
								d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
							/>
						</svg>
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
