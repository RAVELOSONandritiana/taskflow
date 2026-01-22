<script lang="ts">
	import Recent from '$lib/components/user/app/Recent.svelte';
	import Status from '$lib/components/user/app/Status.svelte';
	import GlobalState from '$lib/components/user/app/GlobalState.svelte';
	import QuickActions from '$lib/components/user/app/QuickActions.svelte';
	import UpcomingTasks from '$lib/components/user/app/UpcomingTasks.svelte';
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';
</script>

<div class="min-h-full bg-gray-50/50 p-6 dark:bg-transparent" class:dark={$theme}>
	<div class="mb-8">
		<Title>Welcome back, Alex!</Title>
		<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Here's what's happening with your projects today.</p>
	</div>

	<div class="space-y-8">
		<!-- Top Stats Row -->
		<Status />

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
			<!-- Main Column (Tasks) - 8 Cols -->
			<div class="space-y-8 lg:col-span-8">
				<UpcomingTasks />
				
				<!-- Simple Activity Widget -->
				<div class="rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 p-8 text-white shadow-xl shadow-indigo-200 dark:shadow-none">
					<div class="flex items-center gap-4">
						<div class="rounded-xl bg-white/20 p-3 backdrop-blur-md">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						</div>
						<div>
							<h4 class="text-lg font-bold">AI Productivity Insight</h4>
							<p class="text-sm text-indigo-100 opacity-90">
								"You're 15% more productive this week! Keep up the great work with the TaskFlow redesign."
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Sidebar Column (Actions & Stats) - 4 Cols -->
			<div class="space-y-8 lg:col-span-4">
				<section>
					<h3 class="mb-4 text-xs font-black uppercase tracking-widest text-gray-400">Quick Access</h3>
					<QuickActions />
				</section>
				
				<Recent />
				<GlobalState value={82} />
			</div>
		</div>
	</div>
</div>
