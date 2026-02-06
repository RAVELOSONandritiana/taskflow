<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';
	import Title from '$lib/components/user/app/Title.svelte';
	import SplineChart from '$lib/components/user/app/SplineChart.svelte';

	let timeRange = $state('Last 30 Days');
	const ranges = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Year to Date'];

	const projectHealth = [
		{ name: 'Core Engine', health: 92, status: 'Stable', color: 'text-green-500' },
		{ name: 'Frontend Expansion', health: 78, status: 'At Risk', color: 'text-orange-500' },
		{ name: 'API Infrastructure', health: 45, status: 'Critical', color: 'text-red-500' },
		{ name: 'Mobile Prototypes', health: 100, status: 'Perfect', color: 'text-indigo-500' }
	];

	const keyMetrics = [
		{ label: 'Avg. Velocity', value: '42.5', unit: 'tasks/week', change: '+12%', trend: 'up' },
		{ label: 'Time Efficiency', value: '88', unit: '%', change: '+5%', trend: 'up' },
		{ label: 'Bug Resolution', value: '1.2', unit: 'days', change: '-0.3d', trend: 'down' }
	];
</script>

<div class="min-h-full bg-gray-50/30 p-8 dark:bg-transparent">
	<header
		class="mb-8 flex flex-col justify-between gap-6 lg:mb-12 lg:flex-row lg:items-end"
		in:fly={{ y: -20, duration: 600 }}
	>
		<div class="space-y-1">
			<div
				class="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-indigo-500 uppercase"
			>
				<span class="h-1 w-4 rounded-full bg-indigo-500"></span>
				Data Insights
			</div>
			<Title class="text-2xl font-black tracking-tight text-gray-900 lg:text-4xl dark:text-white">
				Advanced Analytics
			</Title>
			<p class="text-sm font-medium text-gray-500 dark:text-gray-400">
				Data-driven performance metrics and project visibility.
			</p>
		</div>

		<div
			class="no-scrollbar flex gap-1 overflow-x-auto rounded-2xl bg-white p-1 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800"
		>
			{#each ranges as range}
				<button
					onclick={() => (timeRange = range)}
					class="rounded-xl px-4 py-2.5 text-[9px] font-black tracking-widest whitespace-nowrap uppercase transition-all {timeRange ===
					range
						? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none'
						: 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}"
				>
					{range}
				</button>
			{/each}
		</div>
	</header>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
		<!-- Summary Cards -->
		{#each keyMetrics as metric, i}
			<div
				class="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:p-8 lg:col-span-4 dark:border-gray-800 dark:bg-gray-950"
				in:scale={{ delay: i * 100, duration: 400 }}
			>
				<p class="mb-2 text-[9px] font-black tracking-widest text-gray-400 uppercase">
					{metric.label}
				</p>
				<div class="flex items-baseline gap-2">
					<span class="text-3xl font-black text-gray-900 md:text-4xl dark:text-white"
						>{metric.value}</span
					>
					<span class="text-[10px] font-bold text-gray-400">{metric.unit}</span>
				</div>
				<div class="mt-4 flex items-center gap-2">
					<span
						class="rounded-full {metric.trend === 'up'
							? 'bg-green-50 text-green-600 dark:bg-green-500/10'
							: 'bg-red-50 text-red-600 dark:bg-red-500/10'} px-2 py-0.5 text-[9px] font-black"
					>
						{metric.change}
					</span>
					<span class="text-[9px] font-bold tracking-widest text-gray-400 uppercase"
						>Since last month</span
					>
				</div>
			</div>
		{/each}

		<!-- Main Velocity Chart -->
		<div
			class="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:rounded-[3rem] md:p-10 lg:col-span-8 dark:border-gray-800 dark:bg-gray-950"
			in:fade
		>
			<div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h3 class="text-lg font-black text-gray-900 md:text-xl dark:text-white">
						Velocity Trend
					</h3>
					<p class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
						Task Completion vs Capacity
					</p>
				</div>
				<div class="flex items-center gap-4 md:gap-6">
					<div class="flex items-center gap-2">
						<div class="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
						<span class="text-[9px] font-bold text-gray-400 uppercase">Velocity</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="h-1.5 w-1.5 rounded-full bg-gray-200"></div>
						<span class="text-[9px] font-bold text-gray-400 uppercase">Projection</span>
					</div>
				</div>
			</div>

			<div class="h-48 h-full w-full md:h-64">
				<SplineChart
					data={[30, 45, 35, 60, 55, 80, 75, 90]}
					color="#6366f1"
					height={240}
					animated={true}
				/>
			</div>
		</div>

		<!-- Project Health List -->
		<div
			class="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:rounded-[3rem] md:p-10 lg:col-span-4 dark:border-gray-800 dark:bg-gray-950"
			in:fade
		>
			<h3 class="mb-8 text-lg font-black text-gray-900 md:text-xl dark:text-white">
				System Health
			</h3>
			<div class="space-y-6 md:space-y-8">
				{#each projectHealth as project}
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<span class="text-sm font-black text-gray-900 dark:text-white">{project.name}</span>
							<span class="text-[9px] font-black tracking-widest uppercase {project.color}"
								>{project.status}</span
							>
						</div>
						<div class="h-1.5 w-full overflow-hidden rounded-full bg-gray-50 dark:bg-gray-900">
							<div
								class="h-full rounded-full transition-all duration-1000 {project.health > 80
									? 'bg-green-500'
									: project.health > 50
										? 'bg-orange-500'
										: 'bg-red-500'}"
								style="width: {project.health}%"
							></div>
						</div>
						<div class="flex justify-between">
							<span class="text-[8px] font-bold tracking-widest text-gray-400 uppercase"
								>Current Index</span
							>
							<span class="text-[9px] font-black text-gray-900 dark:text-white"
								>{project.health}/100</span
							>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
