<script>
	import { goto } from '$app/navigation';
	import { Button as ShadButton } from '$lib/components/ui/button';
	import Button from '$lib/components/user/Button.svelte';
	import Banner from '$lib/components/user/Banner.svelte';
	import Logo from '$lib/images/file_0000000027bc722fa9a6c62735b1a346.png';
</script>

<Banner class="md:px-20 gap-y-12 grid lg:grid-cols-2 place-items-center py-2 lg:py-6">
	<div class="order-2 lg:order-1 text-center lg:text-left space-y-6">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-2">
			<span class="relative flex h-2 w-2">
				<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
				<span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
			</span>
			New: Team Collaboration Features
		</div>
		<h1 class="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1]">
			Organize your work. <br/>
			<span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
				Move faster. Stay focused.
			</span>
		</h1>
		<p class="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
			TaskFlow helps you create projects, manage tasks, and track your progress in real time. 
			<span class="font-semibold text-indigo-600 dark:text-indigo-400">Free to use.</span> No credit card required.
		</p>
		<div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
			<Button class="px-8 py-3 text-lg shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300" onclick={() => goto('/app')}>
				Get Started Free
			</Button>
			<Button class="px-8 py-3 text-lg border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
				Learn More
			</Button>
		</div>
	</div>
	<div class="order-1 lg:order-2">
		<img src={Logo} alt="TaskFlow Dashboard" class="w-full max-w-lg rounded-2xl transform hover:-translate-y-2 transition-transform duration-500">
	</div>
</Banner>

<section class="py-24 relative overflow-hidden">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Everything you need</h2>
			<p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
				Why Choose <span class="text-indigo-600 dark:text-indigo-400">TaskFlow</span>?
			</p>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
				TaskFlow is designed to help you manage your projects efficiently and collaboratively with a focus on simplicity and speed.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Feature 1 -->
			<div class="group relative p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2">
				<div class="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
					<svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
					</svg>
				</div>
				<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Easy to Use</h3>
				<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
					Our intuitive interface makes it easy for anyone to get started and manage projects effectively from day one.
				</p>
			</div>
			<!-- Feature 2 -->
			<div class="group relative p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2">
				<div class="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
					<svg class="h-6 w-6 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
					</svg>
				</div>
				<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Collaborative</h3>
				<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
					Work seamlessly with your team and share updates in real-time to keep everyone aligned and moving forward.
				</p>
			</div>
			<!-- Feature 3 -->
			<div class="group relative p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2">
				<div class="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
					<svg class="h-6 w-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
					</svg>
				</div>
				<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure</h3>
				<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
					Your data is protected with enterprise-grade security measure to ensure your privacy and safety.
				</p>
			</div>
		</div>
	</div>
</section>

<section class="py-24 bg-gray-50/50 dark:bg-gray-950/50 backdrop-blur-sm border-y border-gray-200 dark:border-white/5">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16 items-center">
			<div>
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
					Powerful Features for <br/>
					<span class="text-indigo-600 dark:text-indigo-400">Modern Teams</span>
				</h2>
				<p class="mt-6 text-lg text-gray-600 dark:text-gray-400">
					Everything you need to manage your projects from start to finish. Our toolset is designed for high-performance teams.
				</p>
				<dl class="mt-10 space-y-8">
					<div class="relative pl-12">
						<dt class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
							<div class="absolute left-0 top-1 h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
								<svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="20 6 9 17 4 12"/>
								</svg>
							</div>
							Task Management
						</dt>
						<dd class="mt-2 text-gray-600 dark:text-gray-400">Create, assign, and track tasks with nested sub-tasks and priority levels.</dd>
					</div>
					<div class="relative pl-12">
						<dt class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
							<div class="absolute left-0 top-1 h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
								<svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
								</svg>
							</div>
							Time Tracking
						</dt>
						<dd class="mt-2 text-gray-600 dark:text-gray-400">Track time spent on tasks and generate detailed productivity reports.</dd>
					</div>
				</dl>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-4">
					<div class="aspect-square rounded-3xl bg-indigo-500/10 flex flex-col items-center justify-center p-6 text-center border border-indigo-500/20">
						<div class="text-4xl font-black text-indigo-600 mb-2">99%</div>
						<div class="text-sm font-medium text-gray-600 dark:text-gray-400">Uptime Reliability</div>
					</div>
					<div class="aspect-[4/3] rounded-3xl bg-purple-500/10 flex flex-col items-center justify-center p-6 text-center border border-purple-500/20">
						<div class="text-4xl font-black text-purple-600 mb-2">Real-time</div>
						<div class="text-sm font-medium text-gray-600 dark:text-gray-400">Sync & Updates</div>
					</div>
				</div>
				<div class="space-y-4 pt-8">
					<div class="aspect-[4/3] rounded-3xl bg-blue-500/10 flex flex-col items-center justify-center p-6 text-center border border-blue-500/20">
						<div class="text-4xl font-black text-blue-600 mb-2">24/7</div>
						<div class="text-sm font-medium text-gray-600 dark:text-gray-400">Expert Support</div>
					</div>
					<div class="aspect-square rounded-3xl bg-indigo-500/10 flex flex-col items-center justify-center p-6 text-center border border-indigo-500/20">
						<div class="text-4xl font-black text-indigo-600 mb-2">10k+</div>
						<div class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="py-24 relative overflow-hidden">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
				Trusted by <span class="text-indigo-600 dark:text-indigo-400">Industry Leaders</span>
			</h2>
			<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
				Don't just take our word for it. Here's what our users have to say about TaskFlow.
			</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Testimonial 1 -->
			<div class="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm relative">
				<div class="text-indigo-500 mb-6 italic">
					"TaskFlow has completely transformed the way we manage our projects. It's intuitive, powerful, and has saved us countless hours."
				</div>
				<div class="flex items-center gap-4">
					<div class="h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
					<div>
						<div class="font-bold text-gray-900 dark:text-white">John Doe</div>
						<div class="text-sm text-gray-500">CEO, TechCorp</div>
					</div>
				</div>
			</div>
			<!-- Testimonial 2 -->
			<div class="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm relative">
				<div class="text-indigo-500 mb-6 italic">
					"The collaboration features in TaskFlow are outstanding. Our team is more productive than ever before."
				</div>
				<div class="flex items-center gap-4">
					<div class="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500"></div>
					<div>
						<div class="font-bold text-gray-900 dark:text-white">Jane Smith</div>
						<div class="text-sm text-gray-500">Project Manager, Innovate Inc.</div>
					</div>
				</div>
			</div>
			<!-- Testimonial 3 -->
			<div class="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm relative">
				<div class="text-indigo-500 mb-6 italic">
					"TaskFlow's real-time tracking and reporting have given us unprecedented visibility into our projects. Highly recommended!"
				</div>
				<div class="flex items-center gap-4">
					<div class="h-12 w-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500"></div>
					<div>
						<div class="font-bold text-gray-900 dark:text-white">Michael Johnson</div>
						<div class="text-sm text-gray-500">CTO, NextGen Solutions</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="py-24 bg-gray-50/50 dark:bg-gray-950/50 backdrop-blur-sm border-y border-gray-200 dark:border-white/5">
	<div class="mx-auto max-w-4xl px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Frequently Asked Questions</h2>
			<p class="mt-4 text-gray-600 dark:text-gray-400">Everything you need to know about TaskFlow and how it works.</p>
		</div>
		<div class="space-y-4">
			<details class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900/50 overflow-hidden transition-all duration-300">
				<summary class="flex justify-between items-center p-6 cursor-pointer font-bold text-gray-900 dark:text-white list-none">
					How do I get started with TaskFlow?
					<span class="transition-transform duration-300 group-open:rotate-180">
						<svg class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</span>
				</summary>
				<div class="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
					Getting started is easy! Simply sign up for a free account, create your first project, and start adding tasks. Our intuitive interface will guide you through the process step-by-step.
				</div>
			</details>
			<details class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900/50 overflow-hidden transition-all duration-300">
				<summary class="flex justify-between items-center p-6 cursor-pointer font-bold text-gray-900 dark:text-white list-none">
					Is TaskFlow suitable for large teams?
					<span class="transition-transform duration-300 group-open:rotate-180">
						<svg class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</span>
				</summary>
				<div class="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
					Absolutely! TaskFlow is designed to scale with your team, whether you're a small startup or a large enterprise. Our collaboration features ensure everyone stays on the same page regardless of team size.
				</div>
			</details>
			<details class="group rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900/50 overflow-hidden transition-all duration-300">
				<summary class="flex justify-between items-center p-6 cursor-pointer font-bold text-gray-900 dark:text-white list-none">
					Can I integrate TaskFlow with other tools?
					<span class="transition-transform duration-300 group-open:rotate-180">
						<svg class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</span>
				</summary>
				<div class="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
					Yes, TaskFlow offers integrations with popular tools like Slack, Google Drive, and more. We are constantly adding new integrations to help streamline your workflow.
				</div>
			</details>
		</div>
	</div>
</section>

<section class="py-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl rounded-3xl sm:px-24 xl:py-32">
			<h2 class="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
				Ready to <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">take control</span> of your projects?
			</h2>
			<p class="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
				Start using TaskFlow for free and turn your ideas into organized action today.
			</p>
			<form class="mx-auto mt-10 flex max-w-md gap-x-4">
				<label for="email-address" class="sr-only">Email address</label>
				<input id="email-address" name="email" type="email" autocomplete="email" required class="min-w-0 flex-auto rounded-xl border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6" placeholder="Enter your email">
				<ShadButton type="submit" class="flex-none rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
					Get Started
				</ShadButton>
			</form>
			<svg viewBox="0 0 1024 1024" class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
				<circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
				<defs>
					<radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
						<stop stop-color="#7775D6" />
						<stop offset="1" stop-color="#E935C1" />
					</radialGradient>
				</defs>
			</svg>
		</div>
	</div>
</section>
