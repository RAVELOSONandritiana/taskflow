<script>
	import { onMount, tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { Button as ShadButton } from '$lib/components/ui/button';
	import Button from '$lib/components/user/Button.svelte';
	import Banner from '$lib/components/user/Banner.svelte';
	import Logo from '$lib/images/file_0000000027bc722fa9a6c62735b1a346.png';

	let mounted = $state(false);
	let featuresVisible = $state(false);
	let powerVisible = $state(false);
	let testimonialsVisible = $state(false);
	let faqVisible = $state(false);
	let ctaVisible = $state(false);

	onMount(async () => {
		mounted = true;
		await tick();
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const section = entry.target.getAttribute('data-section');
						if (section === 'features') featuresVisible = true;
						if (section === 'power') powerVisible = true;
						if (section === 'testimonials') testimonialsVisible = true;
						if (section === 'faq') faqVisible = true;
						if (section === 'cta') ctaVisible = true;
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
		<Banner class="grid place-items-center gap-y-12 py-2 md:px-20 lg:grid-cols-2 lg:py-6">
			<div
				class="order-2 space-y-6 text-center lg:order-1 lg:text-left"
				in:fly={{ y: 50, duration: 1000, delay: 200, easing: backOut }}
			>
				<div
					class="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400"
				>
					<span class="relative flex h-2 w-2">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"
						></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
					</span>
					New: Team Collaboration Features
				</div>
				<h1
					class="text-3xl leading-[1.1] font-black tracking-tight text-gray-900 md:text-5xl dark:text-white"
				>
					Organize your work. <br />
					<span
						class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400"
					>
						Move faster. Stay focused.
					</span>
				</h1>
				<p
					class="mx-auto max-w-xl text-base leading-relaxed text-gray-600 md:text-lg lg:mx-0 dark:text-gray-300"
				>
					TaskFlow helps you create projects, manage tasks, and track your progress in real time.
					<span class="font-semibold text-indigo-600 dark:text-indigo-400">Free to use.</span> No credit
					card required.
				</p>
				<div
					class="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row lg:justify-start"
				>
					<Button
						class="px-8 py-3 text-lg shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40"
						onclick={() => goto('/app')}
					>
						Get Started Free
					</Button>
					<Button
						class="border border-gray-200 bg-white/50 px-8 py-3 text-lg text-gray-700 backdrop-blur-sm transition-all hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-200 dark:hover:bg-gray-800"
						onclick={() => goto('/features')}
					>
						Learn More
					</Button>
				</div>
			</div>
			<div
				class="order-1 lg:order-2"
				in:fly={{ x: 50, duration: 1000, delay: 400, easing: backOut }}
			>
				<img
					src={Logo}
					alt="TaskFlow Dashboard"
					class="w-full max-w-lg transform rounded-2xl transition-transform duration-500 hover:-translate-y-2"
				/>
			</div>
		</Banner>

		<section class="relative overflow-hidden py-24" data-section="features">
			{#if featuresVisible}
				<div class="mx-auto max-w-7xl px-6 lg:px-8" in:fade={{ duration: 1000 }}>
					<div class="mb-16 text-center" in:fly={{ y: 30, duration: 800 }}>
						<h2 class="text-base leading-7 font-semibold text-indigo-600 dark:text-indigo-400">
							Everything you need
						</h2>
						<p
							class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
						>
							Why Choose <span class="text-indigo-600 dark:text-indigo-400">TaskFlow</span>?
						</p>
						<p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
							TaskFlow is designed to help you manage your projects efficiently and collaboratively
							with a focus on simplicity and speed.
						</p>
					</div>

					<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
						<!-- Feature 1 -->
						<div
							class="group relative rounded-3xl border border-gray-200 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-gray-900/50"
							in:fly={{ y: 30, duration: 800, delay: 200 }}
						>
							<div
								class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 transition-transform group-hover:scale-110"
							>
								<svg
									class="h-6 w-6 text-indigo-600 dark:text-indigo-400"
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
							<h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Easy to Use</h3>
							<p class="leading-relaxed text-gray-600 dark:text-gray-400">
								Our intuitive interface makes it easy for anyone to get started and manage projects
								effectively from day one.
							</p>
						</div>
						<!-- Feature 2 -->
						<div
							class="group relative rounded-3xl border border-gray-200 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-gray-900/50"
							in:fly={{ y: 30, duration: 800, delay: 400 }}
						>
							<div
								class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 transition-transform group-hover:scale-110"
							>
								<svg
									class="h-6 w-6 text-purple-600 dark:text-purple-400"
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
							</div>
							<h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Collaborative</h3>
							<p class="leading-relaxed text-gray-600 dark:text-gray-400">
								Work seamlessly with your team and share updates in real-time to keep everyone
								aligned and moving forward.
							</p>
						</div>
						<!-- Feature 3 -->
						<div
							class="group relative rounded-3xl border border-gray-200 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-gray-900/50"
							in:fly={{ y: 30, duration: 800, delay: 600 }}
						>
							<div
								class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 transition-transform group-hover:scale-110"
							>
								<svg
									class="h-6 w-6 text-blue-600 dark:text-blue-400"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
								</svg>
							</div>
							<h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Secure</h3>
							<p class="leading-relaxed text-gray-600 dark:text-gray-400">
								Your data is protected with enterprise-grade security measure to ensure your privacy
								and safety.
							</p>
						</div>
					</div>
				</div>
			{/if}
		</section>

		<section
			class="border-y border-gray-200 bg-gray-50/50 py-24 backdrop-blur-sm dark:border-white/5 dark:bg-gray-950/50"
			data-section="power"
		>
			{#if powerVisible}
				<div class="mx-auto max-w-7xl px-6 lg:px-8" in:fade={{ duration: 1000 }}>
					<div class="grid items-center gap-16 lg:grid-cols-2">
						<div in:fly={{ x: -50, duration: 1000 }}>
							<h2
								class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
							>
								Powerful Features for <br />
								<span class="text-indigo-600 dark:text-indigo-400">Modern Teams</span>
							</h2>
							<p class="mt-6 text-lg text-gray-600 dark:text-gray-400">
								Everything you need to manage your projects from start to finish. Our toolset is
								designed for high-performance teams.
							</p>
							<dl class="mt-10 space-y-8">
								<div class="relative pl-12">
									<dt
										class="flex items-center gap-3 text-lg font-bold text-gray-900 dark:text-white"
									>
										<div
											class="absolute top-1 left-0 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600"
										>
											<svg
												class="h-5 w-5 text-white"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<polyline points="20 6 9 17 4 12" />
											</svg>
										</div>
										Task Management
									</dt>
									<dd class="mt-2 text-gray-600 dark:text-gray-400">
										Create, assign, and track tasks with nested sub-tasks and priority levels.
									</dd>
								</div>
								<div class="relative pl-12">
									<dt
										class="flex items-center gap-3 text-lg font-bold text-gray-900 dark:text-white"
									>
										<div
											class="absolute top-1 left-0 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600"
										>
											<svg
												class="h-5 w-5 text-white"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
											</svg>
										</div>
										Time Tracking
									</dt>
									<dd class="mt-2 text-gray-600 dark:text-gray-400">
										Track time spent on tasks and generate detailed productivity reports.
									</dd>
								</div>
							</dl>
						</div>
						<div class="grid grid-cols-2 gap-4" in:fly={{ x: 50, duration: 1000 }}>
							<div class="space-y-4">
								<div
									class="flex aspect-square flex-col items-center justify-center rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-6 text-center"
								>
									<div class="mb-2 text-4xl font-black text-indigo-600">99%</div>
									<div class="text-sm font-medium text-gray-600 dark:text-gray-400">
										Uptime Reliability
									</div>
								</div>
								<div
									class="flex aspect-[4/3] flex-col items-center justify-center rounded-3xl border border-purple-500/20 bg-purple-500/10 p-6 text-center"
								>
									<div class="mb-2 text-4xl font-black text-purple-600">Real-time</div>
									<div class="text-sm font-medium text-gray-600 dark:text-gray-400">
										Sync & Updates
									</div>
								</div>
							</div>
							<div class="space-y-4 pt-8">
								<div
									class="flex aspect-[4/3] flex-col items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10 p-6 text-center"
								>
									<div class="mb-2 text-4xl font-black text-blue-600">24/7</div>
									<div class="text-sm font-medium text-gray-600 dark:text-gray-400">
										Expert Support
									</div>
								</div>
								<div
									class="flex aspect-square flex-col items-center justify-center rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-6 text-center"
								>
									<div class="mb-2 text-4xl font-black text-indigo-600">10k+</div>
									<div class="text-sm font-medium text-gray-600 dark:text-gray-400">
										Active Users
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</section>

		<section class="relative overflow-hidden py-24" data-section="testimonials">
			{#if testimonialsVisible}
				<div class="mx-auto max-w-7xl px-6 lg:px-8" in:fade={{ duration: 1000 }}>
					<div class="mb-16 text-center" in:fly={{ y: 30, duration: 800 }}>
						<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
							Trusted by <span class="text-indigo-600 dark:text-indigo-400">Industry Leaders</span>
						</h2>
						<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
							Don't just take our word for it. Here's what our users have to say about TaskFlow.
						</p>
					</div>
					<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
						<!-- Testimonial 1 -->
						<div
							class="relative rounded-3xl border border-gray-200 bg-white/50 p-8 backdrop-blur-sm dark:border-white/10 dark:bg-gray-900/50"
							in:fly={{ y: 30, duration: 800, delay: 200 }}
						>
							<div class="mb-6 text-indigo-500 italic">
								"TaskFlow has completely transformed the way we manage our projects. It's intuitive,
								powerful, and has saved us countless hours."
							</div>
							<div class="flex items-center gap-4">
								<div
									class="h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"
								></div>
								<div>
									<div class="font-bold text-gray-900 dark:text-white">John Doe</div>
									<div class="text-sm text-gray-500">CEO, TechCorp</div>
								</div>
							</div>
						</div>
						<!-- Testimonial 2 -->
						<div
							class="relative rounded-3xl border border-gray-200 bg-white/50 p-8 backdrop-blur-sm dark:border-white/10 dark:bg-gray-900/50"
							in:fly={{ y: 30, duration: 800, delay: 400 }}
						>
							<div class="mb-6 text-indigo-500 italic">
								"The collaboration features in TaskFlow are outstanding. Our team is more productive
								than ever before."
							</div>
							<div class="flex items-center gap-4">
								<div
									class="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500"
								></div>
								<div>
									<div class="font-bold text-gray-900 dark:text-white">Jane Smith</div>
									<div class="text-sm text-gray-500">Project Manager, Innovate Inc.</div>
								</div>
							</div>
						</div>
						<!-- Testimonial 3 -->
						<div
							class="relative rounded-3xl border border-gray-200 bg-white/50 p-8 backdrop-blur-sm dark:border-white/10 dark:bg-gray-900/50"
							in:fly={{ y: 30, duration: 800, delay: 600 }}
						>
							<div class="mb-6 text-indigo-500 italic">
								"TaskFlow's real-time tracking and reporting have given us unprecedented visibility
								into our projects. Highly recommended!"
							</div>
							<div class="flex items-center gap-4">
								<div
									class="h-12 w-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500"
								></div>
								<div>
									<div class="font-bold text-gray-900 dark:text-white">Michael Johnson</div>
									<div class="text-sm text-gray-500">CTO, NextGen Solutions</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</section>

		<section
			class="border-y border-gray-200 bg-gray-50/50 py-24 backdrop-blur-sm dark:border-white/5 dark:bg-gray-950/50"
			data-section="faq"
		>
			{#if faqVisible}
				<div class="mx-auto max-w-4xl px-6 lg:px-8" in:fade={{ duration: 1000 }}>
					<div class="mb-16 text-center" in:fly={{ y: 30, duration: 800 }}>
						<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
							Frequently Asked Questions
						</h2>
						<p class="mt-4 text-gray-600 dark:text-gray-400">
							Everything you need to know about TaskFlow and how it works.
						</p>
					</div>
					<div class="space-y-4">
						<details
							class="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 dark:border-white/10 dark:bg-gray-900/50"
							in:fly={{ y: 20, duration: 600, delay: 200 }}
						>
							<summary
								class="flex cursor-pointer list-none items-center justify-between p-6 font-bold text-gray-900 dark:text-white"
							>
								How do I get started with TaskFlow?
								<span class="transition-transform duration-300 group-open:rotate-180">
									<svg
										class="h-5 w-5 text-indigo-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</span>
							</summary>
							<div class="px-6 pb-6 leading-relaxed text-gray-600 dark:text-gray-400">
								Getting started is easy! Simply sign up for a free account, create your first
								project, and start adding tasks. Our intuitive interface will guide you through the
								process step-by-step.
							</div>
						</details>
						<details
							class="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 dark:border-white/10 dark:bg-gray-900/50"
							in:fly={{ y: 20, duration: 600, delay: 300 }}
						>
							<summary
								class="flex cursor-pointer list-none items-center justify-between p-6 font-bold text-gray-900 dark:text-white"
							>
								Is TaskFlow suitable for large teams?
								<span class="transition-transform duration-300 group-open:rotate-180">
									<svg
										class="h-5 w-5 text-indigo-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</span>
							</summary>
							<div class="px-6 pb-6 leading-relaxed text-gray-600 dark:text-gray-400">
								Absolutely! TaskFlow is designed to scale with your team, whether you're a small
								startup or a large enterprise. Our collaboration features ensure everyone stays on
								the same page regardless of team size.
							</div>
						</details>
						<details
							class="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 dark:border-white/10 dark:bg-gray-900/50"
							in:fly={{ y: 20, duration: 600, delay: 400 }}
						>
							<summary
								class="flex cursor-pointer list-none items-center justify-between p-6 font-bold text-gray-900 dark:text-white"
							>
								Can I integrate TaskFlow with other tools?
								<span class="transition-transform duration-300 group-open:rotate-180">
									<svg
										class="h-5 w-5 text-indigo-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</span>
							</summary>
							<div class="px-6 pb-6 leading-relaxed text-gray-600 dark:text-gray-400">
								Yes, TaskFlow offers integrations with popular tools like Slack, Google Drive, and
								more. We are constantly adding new integrations to help streamline your workflow.
							</div>
						</details>
					</div>
				</div>
			{/if}
		</section>

		<section class="py-24" data-section="cta">
			{#if ctaVisible}
				<div class="mx-auto max-w-7xl px-6 lg:px-8" in:fade={{ duration: 1000 }}>
					<div
						class="relative isolate overflow-hidden rounded-3xl bg-gray-900 px-6 py-24 shadow-2xl sm:px-24 xl:py-32"
						in:fly={{ y: 50, duration: 1000, easing: backOut }}
					>
						<h2
							class="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
						>
							Ready to <span
								class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
								>take control</span
							> of your projects?
						</h2>
						<p class="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
							Start using TaskFlow for free and turn your ideas into organized action today.
						</p>
						<form class="mx-auto mt-10 flex max-w-md gap-x-4">
							<label for="email-address" class="sr-only">Email address</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autocomplete="email"
								required
								class="min-w-0 flex-auto rounded-xl border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-white/10 ring-inset focus:ring-2 focus:ring-white focus:ring-inset sm:text-sm sm:leading-6"
								placeholder="Enter your email"
							/>
							<ShadButton
								type="submit"
								class="flex-none rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
							>
								Get Started
							</ShadButton>
						</form>
						<svg
							viewBox="0 0 1024 1024"
							class="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
							aria-hidden="true"
						>
							<circle
								cx="512"
								cy="512"
								r="512"
								fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
								fill-opacity="0.7"
							/>
							<defs>
								<radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
									<stop stop-color="#7775D6" />
									<stop offset="1" stop-color="#E935C1" />
								</radialGradient>
							</defs>
						</svg>
					</div>
				</div>
			{/if}
		</section>
	</div>
{/if}
