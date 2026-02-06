<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';

	let searchQuery = $state('');
	let viewMode = $state<'grid' | 'list'>('grid');
	let selectedFile = $state<any>(null);

	const files = [
		{
			id: 1,
			name: 'Project Specs',
			type: 'folder',
			items: '12 files',
			size: '-',
			date: 'Jan 15, 2024',
			owner: 'Alex Tasker'
		},
		{
			id: 2,
			name: 'Design Assets',
			type: 'folder',
			items: '234 files',
			size: '-',
			date: 'Jan 12, 2024',
			owner: 'Sarah Miller'
		},
		{
			id: 3,
			name: 'Meeting Notes',
			type: 'folder',
			items: '45 files',
			size: '-',
			date: 'Jan 10, 2024',
			owner: 'Alex Tasker'
		},
		{
			id: 4,
			name: 'Q4 Report.pdf',
			type: 'pdf',
			size: '2.4 MB',
			date: 'Jan 20, 2024',
			owner: 'Finance Team'
		},
		{
			id: 5,
			name: 'Budget_2024.xlsx',
			type: 'excel',
			size: '1.2 MB',
			date: 'Jan 18, 2024',
			owner: 'Alex Tasker'
		},
		{
			id: 6,
			name: 'Hero_Image.png',
			type: 'image',
			size: '4.8 MB',
			date: 'Yesterday',
			owner: 'Design Team'
		},
		{
			id: 7,
			name: 'Client_Contract.docx',
			type: 'doc',
			size: '542 KB',
			date: '2 days ago',
			owner: 'Legal'
		},
		{
			id: 8,
			name: 'Site_Backup.zip',
			type: 'zip',
			size: '125 MB',
			date: 'Last week',
			owner: 'DevOps'
		}
	];

	let filteredFiles = $derived(
		files.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	function selectFile(file: any) {
		selectedFile = file;
	}

	function toggleView(mode: 'grid' | 'list') {
		viewMode = mode;
	}
</script>

<div class="flex h-full flex-col overflow-hidden bg-white p-6 dark:bg-transparent">
	<!-- Header Toolbar -->
	<div
		class="mb-6 flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800"
	>
		<div class="space-y-1">
			<div class="flex items-center gap-2 text-xs font-bold text-gray-400">
				<span class="cursor-pointer hover:text-indigo-500">Home</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3 w-3"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5l7 7-7 7"
					/></svg
				>
				<span class="cursor-pointer text-gray-900 hover:text-indigo-500 dark:text-white"
					>Documents</span
				>
			</div>
			<Title>Files</Title>
		</div>

		<div class="flex items-center gap-3">
			<!-- View Toggle -->
			<div class="flex rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
				<button
					onclick={() => toggleView('grid')}
					class="rounded-lg p-2 transition-all {viewMode === 'grid'
						? 'bg-white text-indigo-600 shadow-sm dark:bg-gray-700 dark:text-white'
						: 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}"
					title="Grid View"
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
							d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
						/>
					</svg>
				</button>
				<button
					onclick={() => toggleView('list')}
					class="rounded-lg p-2 transition-all {viewMode === 'list'
						? 'bg-white text-indigo-600 shadow-sm dark:bg-gray-700 dark:text-white'
						: 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}"
					title="List View"
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
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>

			<div class="relative">
				<input
					type="text"
					placeholder="Search..."
					bind:value={searchQuery}
					class="w-full rounded-xl border-none bg-gray-100 px-4 py-2.5 pl-10 text-sm font-medium ring-1 ring-transparent transition-all focus:ring-indigo-500 sm:w-64 dark:bg-gray-900 dark:text-white"
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
				class="hidden items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-600 active:scale-95 sm:flex dark:shadow-none"
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
						d="M12 4v16m8-8H4"
					/>
				</svg>
				New
			</button>
		</div>
	</div>

	<div class="flex flex-1 gap-6 overflow-hidden">
		<!-- File Area -->
		<div class="flex-1 overflow-y-auto pr-2">
			{#if viewMode === 'grid'}
				<div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
					{#each filteredFiles as file}
						<div
							class="group relative flex cursor-pointer flex-col items-center justify-center rounded-3xl border p-6 transition-all hover:shadow-lg dark:bg-gray-900/50
                            {selectedFile?.id === file.id
								? 'border-indigo-500 bg-indigo-50/30 dark:border-indigo-500/50 dark:bg-indigo-900/20'
								: 'border-gray-100 bg-white hover:border-indigo-200 dark:border-gray-800 dark:hover:border-gray-700'}"
							onclick={() => selectFile(file)}
							onkeydown={(e) => e.key === 'Enter' && selectFile(file)}
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
						</div>
					{/each}
				</div>
			{:else}
				<!-- List View -->
				<div
					class="relative overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900"
				>
					<table class="w-full text-left text-sm">
						<thead
							class="bg-gray-50 text-xs text-gray-500 uppercase dark:bg-gray-800 dark:text-gray-400"
						>
							<tr>
								<th class="px-6 py-4 font-bold tracking-wider">Name</th>
								<th class="px-6 py-4 font-bold tracking-wider">Size</th>
								<th class="px-6 py-4 font-bold tracking-wider">Type</th>
								<th class="px-6 py-4 font-bold tracking-wider">Date Modified</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-100 dark:divide-gray-800">
							{#each filteredFiles as file}
								<tr
									class="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 {selectedFile?.id ===
									file.id
										? 'bg-indigo-50/50 dark:bg-indigo-900/10'
										: ''}"
									onclick={() => selectFile(file)}
								>
									<td class="px-6 py-4 font-bold text-gray-900 dark:text-white">
										<div class="flex items-center gap-3">
											<div
												class="flex h-8 w-8 items-center justify-center rounded-lg
                                                {file.type === 'folder'
													? 'bg-indigo-100 text-indigo-600'
													: 'bg-gray-100 text-gray-500 dark:bg-gray-800'}"
											>
												{#if file.type === 'folder'}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-4 w-4"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														><path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
														/></svg
													>
												{:else}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-4 w-4"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														><path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
														/></svg
													>
												{/if}
											</div>
											{file.name}
										</div>
									</td>
									<td class="px-6 py-4 text-gray-500">{file.size}</td>
									<td class="px-6 py-4 text-gray-500 capitalize">{file.type}</td>
									<td class="px-6 py-4 text-gray-500">{file.date}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>

		<!-- Details Sidebar -->
		{#if selectedFile}
			<aside
				class="hidden w-80 shrink-0 flex-col overflow-y-auto rounded-3xl border border-gray-100 bg-white p-6 shadow-xl lg:flex dark:border-gray-800 dark:bg-gray-900"
			>
				<div class="mb-6 flex justify-center">
					<div
						class="flex h-32 w-32 items-center justify-center rounded-3xl text-6xl shadow-inner
                        {selectedFile.type === 'folder'
							? 'bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20'
							: 'bg-gray-50 text-gray-400 dark:bg-gray-800'}"
					>
						{#if selectedFile.type === 'folder'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-16 w-16"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
								/></svg
							>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-16 w-16"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/></svg
							>
						{/if}
					</div>
				</div>

				<h3 class="mb-1 text-center text-lg font-black break-words text-gray-900 dark:text-white">
					{selectedFile.name}
				</h3>
				<p class="mb-8 text-center text-sm font-medium tracking-wider text-gray-500 uppercase">
					{selectedFile.type}
				</p>

				<div class="space-y-6">
					<div>
						<h4 class="mb-2 text-xs font-bold tracking-wider text-gray-400 uppercase">
							Information
						</h4>
						<div class="space-y-3 text-sm">
							<div class="flex justify-between">
								<span class="text-gray-500">Size</span>
								<span class="font-medium text-gray-900 dark:text-white">{selectedFile.size}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-500">Modified</span>
								<span class="font-medium text-gray-900 dark:text-white">{selectedFile.date}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-500">Owner</span>
								<span class="font-medium text-gray-900 dark:text-white">{selectedFile.owner}</span>
							</div>
						</div>
					</div>

					<div class="border-t border-gray-100 pt-6 dark:border-gray-800">
						<h4 class="mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase">Actions</h4>
						<div class="grid grid-cols-2 gap-3">
							<button
								class="flex items-center justify-center gap-2 rounded-xl bg-indigo-50 py-2.5 text-sm font-bold text-indigo-600 transition-colors hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400"
							>
								Open
							</button>
							<button
								class="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
							>
								Share
							</button>
							<button
								class="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-red-100 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/10"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</aside>
		{/if}
	</div>
</div>
