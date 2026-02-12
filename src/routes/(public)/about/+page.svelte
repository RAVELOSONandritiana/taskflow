<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/user/Button.svelte';
	import Banner from '$lib/components/user/Banner.svelte';
	import ListCard from '$lib/components/user/about/ListCard.svelte';
	import KeyFeatures from '$lib/components/user/KeyFeatures.svelte';
	import Logo from '$lib/images/file_0000000027bc722fa9a6c62735b1a346.png';

	let mounted = $state(false);
	let visionVisible = $state(false);
	let featuresVisible = $state(false);
	let forwardVisible = $state(false);

	onMount(async () => {
		mounted = true;
		await tick();
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const section = entry.target.getAttribute('data-section');
						if (section === 'vision') visionVisible = true;
						if (section === 'features') featuresVisible = true;
						if (section === 'forward') forwardVisible = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

{#if mounted}
	<div in:fade={{ duration: 800 }}>
		<Banner class="py-12 lg:py-24">
			<div class="mx-auto max-w-4xl space-y-8" in:fly={{ y: 30, duration: 1000, easing: backOut }}>
				<h1 class="text-4xl font-black tracking-tight text-gray-900 md:text-6xl dark:text-white">
					What is <span
						class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400"
						>TaskFlow?</span
					>
				</h1>
				<p class="px-6 text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300">
					TaskFlow is a next-generation project management application designed for the modern era.
					We bridge the gap between powerful functionality and effortless simplicity, helping teams
					stay organized without the overhead.
				</p>
			</div>
		</Banner>

		<section class="space-y-32 py-24">
			<div class="mx-auto max-w-7xl px-6 lg:px-8" data-section="vision">
				{#if visionVisible}
					<div class="grid items-center gap-16 lg:grid-cols-2" in:fade={{ duration: 1000 }}>
						<div class="space-y-6" in:fly={{ x: -50, duration: 1000 }}>
							<h2
								class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
							>
								Who is <span class="text-indigo-600 dark:text-indigo-400">TaskFlow?</span>
							</h2>
							<p class="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
								Built for individuals and small teams who value speed and clarity. Whether you're a
								freelancer managing multiple clients or a startup scaling your operations, TaskFlow
								provides the essential tools you need to stay productive.
							</p>
							<p class="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
								Our mission is to simplify high-stakes project management, making it accessible and
								intuitive for everyone, everywhere.
							</p>
						</div>
						<div in:fly={{ x: 50, duration: 1000 }}>
							<img src={Logo} alt="TaskFlow Vision" class="mx-auto w-full max-w-md rounded-2xl" />
						</div>
					</div>
				{/if}
			</div>

			<div class="mx-auto max-w-7xl space-y-16 px-6 text-center lg:px-8">
				<div class="space-y-4">
					<h2 class="text-3xl font-bold dark:text-white">Our Vision</h2>
					<p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
						We believe in empowering teams through design-driven software that enhances focus and
						creativity.
					</p>
				</div>

				<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
					<!-- Vision Card 1 -->
					<div
						class="rounded-3xl border border-gray-200 bg-white/50 p-8 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 dark:border-white/10 dark:bg-gray-900/50"
						in:fly={{ y: 30, duration: 800, delay: 200 }}
					>
						<div
							class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600"
						>
							<svg
								class="h-10 w-10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line
									x1="3"
									y1="9"
									x2="21"
									y2="9"
								/><line x1="9" y1="21" x2="9" y2="9" />
							</svg>
						</div>
						<h4 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Simplicity</h4>
						<p class="leading-relaxed text-gray-600 dark:text-gray-400">
							We strip away the noise to give you a clean, focused experience that puts your work
							front and center.
						</p>
					</div>
					<!-- Vision Card 2 -->
					<div
						class="rounded-3xl border border-gray-200 bg-white/50 p-8 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 dark:border-white/10 dark:bg-gray-900/50"
						in:fly={{ y: 30, duration: 800, delay: 400 }}
					>
						<div
							class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600"
						>
							<svg
								class="h-10 w-10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
							</svg>
						</div>
						<h4 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Productivity</h4>
						<p class="leading-relaxed text-gray-600 dark:text-gray-400">
							Optimized workflows and real-time updates ensure you spend less time managing and more
							time doing.
						</p>
					</div>
					<!-- Vision Card 3 -->
					<div
						class="rounded-3xl border border-gray-200 bg-white/50 p-8 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 dark:border-white/10 dark:bg-gray-900/50"
						in:fly={{ y: 30, duration: 800, delay: 600 }}
					>
						<div
							class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600"
						>
							<svg
								class="h-10 w-10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path
									d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
								/>
							</svg>
						</div>
						<h4 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Accessibility</h4>
						<p class="leading-relaxed text-gray-600 dark:text-gray-400">
							Universal design and seamless performance across all devices make TaskFlow the perfect
							companion.
						</p>
					</div>
				</div>
			</div>

			<KeyFeatures />
		</section>

		<section
			class="border-y border-gray-200 bg-gray-50/50 py-24 backdrop-blur-sm dark:border-white/5 dark:bg-gray-950/50"
			data-section="features"
		>
			{#if featuresVisible}
				<div class="mx-auto max-w-7xl px-6 lg:px-8" in:fade={{ duration: 1000 }}>
					<div class="mb-16 text-center" in:fly={{ y: 30, duration: 800 }}>
						<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
							What does <span class="text-indigo-600 dark:text-indigo-400">TaskFlow do?</span>
						</h2>
						<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
							Everything you need to streamline your workflow and boost your team's output.
						</p>
					</div>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						<ListCard title="Create and manage projects">
							{#snippet icon()}
								<svg
									class="h-10 w-10"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line
										x1="3"
										y1="9"
										x2="21"
										y2="9"
									/><line x1="9" y1="21" x2="9" y2="9" />
								</svg>
							{/snippet}
							<p>Organize multiple work streams into distinct, trackable entities.</p>
						</ListCard>
						<ListCard title="Add and track tasks">
							{#snippet icon()}
								<svg
									class="h-10 w-10"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polyline points="9 11 12 14 22 4" /><path
										d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
									/>
								</svg>
							{/snippet}
							<p>Break down work into granular pieces and monitor status updates.</p>
						</ListCard>
						<ListCard title="Monitor progress easily">
							{#snippet icon()}
								<svg
									class="h-10 w-10"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<line x1="12" y1="20" x2="12" y2="10" /><line
										x1="18"
										y1="20"
										x2="18"
										y2="4"
									/><line x1="6" y1="20" x2="6" y2="16" />
								</svg>
							{/snippet}
							<p>Get visual indicators and real-time metrics on project health.</p>
						</ListCard>
						<ListCard title="Stay focused on priorities">
							{#snippet icon()}
								<svg
									class="h-10 w-10"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
									/>
								</svg>
							{/snippet}
							<p>Never lose sight of high-impact goals with dedicated priority filters.</p>
						</ListCard>
						<ListCard title="Collaborate with team members">
							{#snippet icon()}
								<svg
									class="h-10 w-10"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle
										cx="9"
										cy="7"
										r="4"
									/><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
								</svg>
							{/snippet}
							<p>Share context and updates effortlessly with your whole team.</p>
						</ListCard>
						<ListCard title="Access from anywhere">
							{#snippet icon()}
								<svg
									class="h-10 w-10"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path
										d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
									/>
								</svg>
							{/snippet}
							<p>Cloud-synced workspace that follows you on every device.</p>
						</ListCard>
					</div>
				</div>
			{/if}
		</section>

		<section class="relative overflow-hidden py-24" data-section="forward">
			{#if forwardVisible}
				<div
					class="mx-auto max-w-4xl space-y-8 px-6 text-center lg:px-8"
					in:fly={{ y: 50, duration: 1000, easing: backOut }}
				>
					<h2 class="text-3xl font-black tracking-tight text-gray-900 sm:text-5xl dark:text-white">
						Looking <span class="text-indigo-600 dark:text-indigo-400">Forward</span>
					</h2>
					<p
						class="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-400"
					>
						TaskFlow is an evolving ecosystem. We are constantly iterating, adding new features, and
						refining existing ones to ensure you have the best possible tool for your success.
					</p>
					<div class="pt-8">
						<Button
							class="px-8 py-4 text-lg shadow-xl shadow-indigo-500/20"
							onclick={() => goto('/contact')}
						>
							Join Our Journey
						</Button>
					</div>
				</div>
			{/if}
		</section>
	</div>
{/if}
