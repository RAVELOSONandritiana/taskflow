<script lang="ts">
	import Recent from '$lib/components/user/app/Recent.svelte';
	import Status from '$lib/components/user/app/Status.svelte';
	import QuickActions from '$lib/components/user/app/QuickActions.svelte';
	import UpcomingTasks from '$lib/components/user/app/UpcomingTasks.svelte';
	import SplineChart from '$lib/components/user/app/SplineChart.svelte';
	import ActivityStream from '$lib/components/user/app/ActivityStream.svelte';
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';
	import { fade, fly, scale } from 'svelte/transition';

	// Dynamic Greeting Logic
	const now = new Date();
	const hour = now.getHours();
	let greeting = $state('');
	let subtext = $state('');

	if (hour < 12) {
		greeting = 'Good Morning';
		subtext = 'Ready for a productive day?';
	} else if (hour < 18) {
		greeting = 'Good Afternoon';
		subtext = "You're in the flow! Let's stay focused.";
	} else {
		greeting = 'Good Evening';
		subtext = 'Wrapping up? Here’s your daily summary.';
	}
</script>

<div class="min-h-full bg-gray-50/30 p-8 pt-8 dark:bg-transparent" class:dark={$theme}>
	<!-- Compact Integrated Header -->
	<header class="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end" in:fly={{ y: -20, duration: 600 }}>
		<div class="space-y-1">
			<div class="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-500">
				<span class="h-1 w-4 rounded-full bg-indigo-500"></span>
				Workspace
			</div>
			<Title class="text-3xl font-black tracking-tight text-gray-900 dark:text-white lg:text-4xl">
				{greeting}, Alex!
			</Title>
			<p class="text-sm font-medium text-gray-500 dark:text-gray-400">
				{subtext}
			</p>
		</div>

		<div class="lg:max-w-xl xl:max-w-2xl" in:fade={{ delay: 200 }}>
			<Status compact={true} />
		</div>
	</header>

	<!-- Main 2-Column Grid -->
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
		
		<!-- Left: Primary Content Column (8 Units) -->
		<div class="lg:col-span-8 flex flex-col gap-4">
			<div in:fly={{ x: -20, delay: 300, duration: 600 }}>
				<UpcomingTasks limit={3} compact={true} />
			</div>
			
			<!-- AI Widget -->
			<div 
				in:fly={{ y: 20, delay: 400, duration: 600 }}
				class="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-indigo-600 to-blue-700 p-10 text-white shadow-2xl shadow-indigo-100/50 dark:border-indigo-500/20 dark:shadow-none"
			>
				<div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
					
					<!-- AI Activity Stream -->
					<div class="mb-8" in:fade={{ delay: 700 }}>
						<ActivityStream />
					</div>

					<!-- AI Spline Chart (Directly below tasks visual flow) -->
					<div class="mb-8" in:fade={{ delay: 850 }}>
						<div class="mb-4 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-indigo-100/60">
							<span>Productivity Velocity</span>
							<span class="rounded-full bg-white/10 px-2.5 py-1 text-white ring-1 ring-white/20">+18% Peak</span>
						</div>
						<SplineChart 
							data={[35, 50, 42, 68, 62, 85, 80, 95]} 
							color="#ffffff" 
							height={120} 
						/>
					</div>

					<!-- AI Intelligence Text -->
					<div class="relative flex flex-col items-start gap-8 md:flex-row md:items-center">
						<div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.5rem] bg-white/10 ring-1 ring-white/30 backdrop-blur-xl">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						</div>
						
						<div class="space-y-2">
							<div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">
								<span>AI Intelligence</span>
								<div class="h-1.5 w-1.5 rounded-full bg-indigo-300"></div>
							</div>
							<h4 class="text-2xl font-black tracking-tight">Focus Peak Detected</h4>
							<p class="text-lg font-medium leading-relaxed text-indigo-50/90 italic">
								"Your momentum is high! Finishing the <span class="text-white font-black underline decoration-indigo-300 underline-offset-4">API Integration</span> today could boost velocity by 12%."
							</p>
						</div>
					</div>
				</div>
			</div>

		<!-- Right: Sidebar Column (4 Units) -->
		<div class="space-y-8 lg:col-span-4">
			<section in:fly={{ x: 20, delay: 500, duration: 600 }}>
				<header class="mb-5 flex items-center justify-between px-2">
					<h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Quick Portal</h3>
					<div class="h-px flex-1 mx-4 bg-gray-100 dark:bg-gray-800"></div>
				</header>
				<QuickActions />
			 </section>
			
			<div in:fade={{ delay: 600, duration: 600 }}>
				<Recent limit={4} />
			</div>
		</div>

	</div>
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>
