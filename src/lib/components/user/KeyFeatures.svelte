<script lang="ts">
	import FeaturesElement from './FeaturesElement.svelte';
</script>

<section class="mx-auto max-w-7xl">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:space-x-4 px-10 md:px-20">
		<div>
			<h2 class="text-2xl font-bold">Why TaskFlow?</h2>
			<p class="mt-2 text-gray-500">
				Simple and intuitive interface. Designed for students, freelancers, and small teams, works
				on all devices.
			</p>
		</div>
		<div class="space-y-4">
			<FeaturesElement
				title="Smart Task Management"
				subtitle="Create, organize, and prioritize tasks effortlessly."
			>
				<svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
				</svg>
			</FeaturesElement>
			<FeaturesElement
				title="Real-Time Collaboration"
				subtitle="Work together with your team and stay in sync."
			>
				<svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
				</svg>
			</FeaturesElement>
			<FeaturesElement
				title="Progress Tracking"
				subtitle="Visualize completed tasks and project advancement."
			>
				<svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
				</svg>
			</FeaturesElement>
			<FeaturesElement
				title="Projects Insights"
				subtitle="Understand your productivity with clear statistics."
			>
				<svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
				</svg>
			</FeaturesElement>
			<FeaturesElement
				title="Secure Data"
				subtitle="Your projects are safe with modern security standards."
			>
				<svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
				</svg>
			</FeaturesElement>
		</div>
	</div>
</section>
