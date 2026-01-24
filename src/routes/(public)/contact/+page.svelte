<script lang="ts">
	import Accordion from '$lib/components/user/Accordion.svelte';
	import Button from '$lib/components/user/Button.svelte';
</script>

<section class="py-24 relative isolate overflow-hidden">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16">
			<div class="space-y-8">
				<h1 class="text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Contact <span class="text-indigo-600 dark:text-indigo-400">Us</span>
				</h1>
				<p class="text-lg leading-8 text-gray-600 dark:text-gray-400">
					We're here to help. Send us a message and our team will get back to you within 24 hours.
				</p>
				<div class="space-y-4">
					<div class="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-white/10">
						<div class="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
						</div>
						<div>
							<div class="font-bold text-gray-900 dark:text-white">Email Us</div>
							<div class="text-gray-500">support@taskflow.com</div>
						</div>
					</div>
					<div class="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-white/10">
						<div class="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
						<div>
							<div class="font-bold text-gray-900 dark:text-white">Visit Us</div>
							<div class="text-gray-500">123 Task St, Solution City</div>
						</div>
					</div>
				</div>
			</div>
			<div class="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl shadow-2xl">
				<form action="#" method="POST" class="space-y-6">
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label for="name" class="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">Name</label>
							<div class="mt-2.5">
								<input type="text" name="name" id="name" autocomplete="name" class="block w-full rounded-xl border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700">
							</div>
						</div>
						<div>
							<label for="email" class="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">Email</label>
							<div class="mt-2.5">
								<input type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-xl border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700">
							</div>
						</div>
					</div>
					<div>
						<label for="message" class="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">Message</label>
						<div class="mt-2.5">
							<textarea name="message" id="message" rows="4" class="block w-full rounded-xl border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"></textarea>
						</div>
					</div>
					<div class="mt-10">
						<Button class="w-full py-4 shadow-lg shadow-indigo-500/25">Send Message</Button>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>

<section class="py-24 bg-gray-50/50 dark:bg-gray-950/50 backdrop-blur-sm">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-12">Frequently Asked Questions</h2>
		<div class="grid gap-4">
			<Accordion title="Is TaskFlow really 100% free?">
				<p class="text-gray-600 dark:text-gray-400">Yes. TaskFlow is completely free to use.</p>
				<ul class="mt-4 space-y-2 text-gray-600 dark:text-gray-400 list-disc ml-6">
					<li class="font-semibold">No subscription</li>
					<li class="font-semibold">No premium plan</li>
					<li class="font-semibold">No hidden fees</li>
				</ul>
				<p class="mt-4 text-gray-600 dark:text-gray-400">All features are available to everyone, with no limitations.</p>
			</Accordion>
			
			<Accordion title="How do I reset my password?">
				<p class="text-gray-600 dark:text-gray-400">You can reset your password in just few steps.</p>
				<ul class="mt-4 space-y-2 text-gray-600 dark:text-gray-400 list-disc ml-6">
					<li class="font-semibold">Click on "Forgot password" on the login page</li>
					<li class="font-semibold">Enter your registered email address</li>
					<li class="font-semibold">Follow the reset link sent to your inbox</li>
				</ul>
			</Accordion>
			
			<Accordion title="Can I use TaskFlow with a team?">
				<p class="text-gray-600 dark:text-gray-400">Yes, TaskFlow fully supports teamwork.</p>
				<ul class="mt-4 space-y-2 text-gray-600 dark:text-gray-400 list-disc ml-6">
					<li class="font-semibold">Create private or shared projects</li>
					<li class="font-semibold">Invite team members via email</li>
					<li class="font-semibold">Assign tasks and track progress together</li>
				</ul>
			</Accordion>
			
			<Accordion title="Is my data safe on TaskFlow?">
				<p class="text-gray-600 dark:text-gray-400">Your data is handled with care and responsibility.</p>
				<ul class="mt-4 space-y-2 text-gray-600 dark:text-gray-400 list-disc ml-6">
					<li class="font-semibold">Secure industry-standard authentication</li>
					<li class="font-semibold">Private projects by default</li>
				</ul>
			</Accordion>
		</div>
	</div>
</section>
