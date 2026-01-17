<script>
	import { goto } from '$app/navigation';
	import { Button as ShadButton } from '$lib/components/ui/button';
	import Button from '$lib/components/user/Button.svelte';
	import Banner from '$lib/components/user/Banner.svelte';
	import Logo from '$lib/images/file_0000000027bc722fa9a6c62735b1a346.png';
</script>

<Banner class="md:px-30 gap-y-20 grid lg:grid-cols-2 place-items-start">
	<div class="order-2 mx-auto lg:order-1 lg:text-left">
		<h2 class="max-w-lg mx-auto text-3xl font-extrabold text-gray-900 md:text-5xl dark:text-white">
			Organize your work. <strong class="text-indigo-500"> Move faster. Stay focused. </strong>
		</h2>
		<p class="p-gray mt-4! max-w-sm mx-auto lg:mx-0">
			TaskFlow helps you create projects, manage tasks, and track your project in real time.<br
			/><strong> Free to use. </strong> No credit card required.
		</p>
		<div class="mt-10 space-x-5">
			<Button class="py-3" on:press={() => goto('/app')}>Get Started</Button>
			<Button class="border border-gray-300 bg-white py-3 text-gray-600! hover:bg-gray-200!"
				>Learn More</Button
				>
		</div>
	</div>
	<img src={Logo} alt="logo" class="w-50 md:w-100 order-1 lg:order-2 justify-self-center lg:justify-self-end rounded-lg shadow-lg">
</Banner>

<section class="my-32">
	<div class="mx-auto max-w-7xl px-10 md:px-30">
		<div class="text-center">
			<h2 class="text-3xl font-extrabold text-gray-900 sm:text-5xl dark:text-white">
				Why choose <strong class="text-indigo-500">TaskFlow</strong>?
			</h2>
			<p class="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-gray-300">
				TaskFlow is designed to help you manage your projects efficiently and collaboratively.
				Here are some reasons why you should choose us.
			</p>
		</div>
		<div class="mt-16 grid gap-8 md:grid-cols-3">
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
				<div class="flex justify-center">
					<svg class="h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<h3 class="mt-4 text-xl font-bold text-gray-900 dark:text-white">Easy to Use</h3>
				<p class="mt-2 text-gray-500 dark:text-gray-300">
					Our intuitive interface makes it easy for anyone to get started and manage projects effectively.
				</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
				<div class="flex justify-center">
					<svg class="h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
				</div>
				<h3 class="mt-4 text-xl font-bold text-gray-900 dark:text-white">Collaborative</h3>
				<p class="mt-2 text-gray-500 dark:text-gray-300">
					Work seamlessly with your team and share updates in real-time to keep everyone on the same page.
				</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
				<div class="flex justify-center">
					<svg class="h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
					</svg>
				</div>
				<h3 class="mt-4 text-xl font-bold text-gray-900 dark:text-white">Secure</h3>
				<p class="mt-2 text-gray-500 dark:text-gray-300">
					Your data is protected with the latest security measures to ensure privacy and safety.
				</p>
			</div>
		</div>
	</div>
</section>

<section class="my-32">
	<div class="mx-auto max-w-7xl px-10 md:px-30">
		<div class="text-center">
			<h2 class="text-3xl font-extrabold text-gray-900 sm:text-5xl dark:text-white">
				Ready to <strong class="text-indigo-500">take control</strong> of your projects?
			</h2>
			<p class="mx-auto mt-4 max-w-sm text-gray-500 dark:text-gray-300">
				Start using TaskFlow for free and turn ideas into action.
			</p>
			<div class="mx-auto mt-4 flex flex-col space-y-4 md:flex-row max-w-md md:space-x-3">
				<input
					type="email"
					class="w-full rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-600 focus:outline-hidden dark:placeholder:text-slate-300 dark:bg-gray-800 dark:border-gray-700"
					placeholder="email address"
				/>
				<ShadButton
					class="border border-indigo-500 bg-white px-8 py-5 font-bold text-indigo-500! hover:bg-indigo-500 hover:text-white! dark:bg-gray-800 dark:border-gray-700"
				>
					<div class="flex space-x-3">
						Sign Up
						<svg
							class="size-5 shadow-sm rtl:rotate-180"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							></path>
						</svg>
					</div>
				</ShadButton>
			</div>
		</div>
	</div>
</section>

<section class="my-32 bg-gray-50 dark:bg-gray-800 py-16">
	<div class="mx-auto max-w-7xl px-10 md:px-30">
		<div class="text-center">
			<h2 class="text-3xl font-extrabold text-gray-900 sm:text-5xl dark:text-white">
				Key Features
			</h2>
			<p class="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-gray-300">
				Discover the powerful features that make TaskFlow the ultimate project management tool.
			</p>
		</div>
		<div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
				<div class="flex justify-center">
					<svg class="h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
					</svg>
				</div>
				<h3 class="mt-4 text-xl font-bold text-gray-900 dark:text-white">Task Management</h3>
				<p class="mt-2 text-gray-500 dark:text-gray-300">
					Create, assign, and track tasks with ease. Set deadlines, priorities, and dependencies to keep your projects on track.
				</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
				<div class="flex justify-center">
					<svg class="h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
					</svg>
				</div>
				<h3 class="mt-4 text-xl font-bold text-gray-900 dark:text-white">Real-time Collaboration</h3>
				<p class="mt-2 text-gray-500 dark:text-gray-300">
					Collaborate with your team in real-time. Share updates, comments, and files to ensure everyone is aligned.
				</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
				<div class="flex justify-center">
					<svg class="h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
					</svg>
				</div>
				<h3 class="mt-4 text-xl font-bold text-gray-900 dark:text-white">Project Tracking</h3>
				<p class="mt-2 text-gray-500 dark:text-gray-300">
					Monitor the progress of your projects with detailed analytics and reports. Stay informed with real-time updates.
				</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
				<div class="flex justify-center">
					<svg class="h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<h3 class="mt-4 text-xl font-bold text-gray-900 dark:text-white">Time Management</h3>
				<p class="mt-2 text-gray-500 dark:text-gray-300">
					Optimize your time with integrated time tracking and scheduling tools. Never miss a deadline again.
				</p>
			</div>
		</div>
	</div>
</section>

<section class="my-32">
	<div class="mx-auto max-w-7xl px-10 md:px-30">
		<div class="text-center">
			<h2 class="text-3xl font-extrabold text-gray-900 sm:text-5xl dark:text-white">
				What our users say
			</h2>
			<p class="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-gray-300">
				Don't just take our word for it. Here's what our users have to say about TaskFlow.
			</p>
		</div>
		<div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
				<p class="text-gray-500 dark:text-gray-300">
					"TaskFlow has completely transformed the way we manage our projects. It's intuitive, powerful, and has saved us countless hours."
				</p>
				<div class="mt-4 flex items-center">
					<div>
						<p class="font-bold text-gray-900 dark:text-white">John Doe</p>
						<p class="text-sm text-gray-500 dark:text-gray-400">CEO, TechCorp</p>
					</div>
				</div>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
				<p class="text-gray-500 dark:text-gray-300">
					"The collaboration features in TaskFlow are outstanding. Our team is more productive than ever before."
				</p>
				<div class="mt-4 flex items-center">
					<div>
						<p class="font-bold text-gray-900 dark:text-white">Jane Smith</p>
						<p class="text-sm text-gray-500 dark:text-gray-400">Project Manager, Innovate Inc.</p>
					</div>
				</div>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
				<p class="text-gray-500 dark:text-gray-300">
					"TaskFlow's real-time tracking and reporting have given us unprecedented visibility into our projects. Highly recommended!"
				</p>
				<div class="mt-4 flex items-center">
					<div>
						<p class="font-bold text-gray-900 dark:text-white">Michael Johnson</p>
						<p class="text-sm text-gray-500 dark:text-gray-400">CTO, NextGen Solutions</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="my-32 bg-gray-50 dark:bg-gray-800 py-16">
	<div class="mx-auto max-w-7xl px-10 md:px-30">
		<div class="text-center">
			<h2 class="text-3xl font-extrabold text-gray-900 sm:text-5xl dark:text-white">
				Frequently Asked Questions
			</h2>
			<p class="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-gray-300">
				Have questions? We have answers. Here are some of the most common questions about TaskFlow.
			</p>
		</div>
		<div class="mt-16 grid gap-4">
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
				<div class="flex justify-between items-center">
					<h3 class="text-xl font-bold text-gray-900 dark:text-white">How do I get started with TaskFlow?</h3>
					<svg class="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</div>
				<p class="mt-4 text-gray-500 dark:text-gray-300">
					Getting started is easy! Simply sign up for a free account, create your first project, and start adding tasks. Our intuitive interface will guide you through the process.
				</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
				<div class="flex justify-between items-center">
					<h3 class="text-xl font-bold text-gray-900 dark:text-white">Is TaskFlow suitable for large teams?</h3>
					<svg class="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</div>
				<p class="mt-4 text-gray-500 dark:text-gray-300">
					Absolutely! TaskFlow is designed to scale with your team, whether you're a small startup or a large enterprise. Our collaboration features ensure everyone stays on the same page.
				</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
				<div class="flex justify-between items-center">
					<h3 class="text-xl font-bold text-gray-900 dark:text-white">Can I integrate TaskFlow with other tools?</h3>
					<svg class="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</div>
				<p class="mt-4 text-gray-500 dark:text-gray-300">
					Yes, TaskFlow offers integrations with popular tools like Slack, Google Drive, and more. You can connect your favorite apps to streamline your workflow.
				</p>
			</div>
		</div>
	</div>
</section>
