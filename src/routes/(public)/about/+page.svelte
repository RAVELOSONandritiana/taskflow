<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/user/Button.svelte';
	import Banner from '$lib/components/user/Banner.svelte';
	import ListCard from '$lib/components/user/about/ListCard.svelte';
	import KeyFeatures from '$lib/components/user/KeyFeatures.svelte';
	import Logo from '$lib/images/file_0000000027bc722fa9a6c62735b1a346.png';
	import Simplicity from '$lib/images/simplicity.svg';
	import Productivity from '$lib/images/productivity.svg';
	import Accessibility from '$lib/images/accessibility.svg';
	import Collaboration from '$lib/images/github.svg';
	import Progress from '$lib/images/simplicity.svg';
	import Priorities from '$lib/images/productivity.svg';
</script>

<Banner class="py-12 lg:py-24">
	<div class="max-w-4xl mx-auto space-y-8">
		<h1 class="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white">
			What is <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">TaskFlow?</span>
		</h1>
		<p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed px-6">
			TaskFlow is a next-generation project management application designed for the modern era. 
			We bridge the gap between powerful functionality and effortless simplicity, helping teams 
			stay organized without the overhead.
		</p>
	</div>
</Banner>

<section class="py-24 space-y-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16 items-center">
			<div class="space-y-6">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
					Who is <span class="text-indigo-600 dark:text-indigo-400">TaskFlow?</span>
				</h2>
				<p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
					Built for individuals and small teams who value speed and clarity. Whether you're a freelancer 
					managing multiple clients or a startup scaling your operations, TaskFlow provides the 
					essential tools you need to stay productive.
				</p>
				<p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
					Our mission is to simplify high-stakes project management, making it accessible and 
					intuitive for everyone, everywhere.
				</p>
			</div>
			<div>
				<img src={Logo} alt="TaskFlow Vision" class="rounded-2xl w-full max-w-md mx-auto">
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8 text-center space-y-16">
		<div class="space-y-4">
			<h2 class="text-3xl font-bold dark:text-white">Our Vision</h2>
			<p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
				We believe in empowering teams through design-driven software that enhances focus and creativity.
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Vision Card 1 -->
			<div class="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300">
				<div class="h-16 w-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-6 text-indigo-600">
					<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
					</svg>
				</div>
				<h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Simplicity</h4>
				<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
					We strip away the noise to give you a clean, focused experience that puts your work front and center.
				</p>
			</div>
			<!-- Vision Card 2 -->
			<div class="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300">
				<div class="h-16 w-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-6 text-purple-600">
					<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
					</svg>
				</div>
				<h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Productivity</h4>
				<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
					Optimized workflows and real-time updates ensure you spend less time managing and more time doing.
				</p>
			</div>
			<!-- Vision Card 3 -->
			<div class="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300">
				<div class="h-16 w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-6 text-blue-600">
					<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
					</svg>
				</div>
				<h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Accessibility</h4>
				<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
					Universal design and seamless performance across all devices make TaskFlow the perfect companion.
				</p>
			</div>
		</div>
	</div>

	<KeyFeatures />
</section>

<section class="py-24 bg-gray-50/50 dark:bg-gray-950/50 backdrop-blur-sm border-y border-gray-200 dark:border-white/5">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
				What does <span class="text-indigo-600 dark:text-indigo-400">TaskFlow do?</span>
			</h2>
			<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
				Everything you need to streamline your workflow and boost your team's output.
			</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<ListCard title="Create and manage projects">
				{#snippet icon()}
					<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
					</svg>
				{/snippet}
				<p>Organize multiple work streams into distinct, trackable entities.</p>
			</ListCard>
			<ListCard title="Add and track tasks" >
				{#snippet icon()}
					<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
					</svg>
				{/snippet}
				<p>Break down work into granular pieces and monitor status updates.</p>
			</ListCard>
			<ListCard title="Monitor progress easily" >
				{#snippet icon()}
					<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
					</svg>
				{/snippet}
				<p>Get visual indicators and real-time metrics on project health.</p>
			</ListCard>
			<ListCard title="Stay focused on priorities" >
				{#snippet icon()}
					<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
					</svg>
				{/snippet}
				<p>Never lose sight of high-impact goals with dedicated priority filters.</p>
			</ListCard>
			<ListCard title="Collaborate with team members" >
				{#snippet icon()}
					<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
					</svg>
				{/snippet}
				<p>Share context and updates effortlessly with your whole team.</p>
			</ListCard>
			<ListCard title="Access from anywhere" >
				{#snippet icon()}
					<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
					</svg>
				{/snippet}
				<p>Cloud-synced workspace that follows you on every device.</p>
			</ListCard>
		</div>
	</div>
</section>

<section class="py-24 relative overflow-hidden">
	<div class="mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-8">
		<h2 class="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
			Looking <span class="text-indigo-600 dark:text-indigo-400">Forward</span>
		</h2>
		<p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
			TaskFlow is an evolving ecosystem. We are constantly iterating, adding new features, 
			and refining existing ones to ensure you have the best possible tool for your success.
		</p>
		<div class="pt-8">
			<Button class="px-8 py-4 text-lg shadow-xl shadow-indigo-500/20" onclick={() => goto('/contact')}>
				Join Our Journey
			</Button>
		</div>
	</div>
</section>
