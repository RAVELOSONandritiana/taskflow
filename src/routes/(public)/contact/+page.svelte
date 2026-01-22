<script lang="ts">
	import Accordion from '$lib/components/user/Accordion.svelte';
	import Button from '$lib/components/user/Button.svelte';
</script>

<section>
	<div class="mx-10 md:mx-30 max-w-7xl space-y-10 py-8 text-center md:py-16">
		<h4 class="text-3xl font-bold md:text-5xl dark:text-white">Contact Us</h4>
		<p class="mx-auto max-w-sm text-gray-400 dark:text-gray-300">
			We're here to help. Send us a message and we'll get back to you quickly.
		</p>
		<div class="mx-auto mt-10 max-w-md space-y-10">
			<div class="grid grid-cols-1 gap-4 text-left lg:grid-cols-2">
				<label for="name">
					<h4 class="font-medium text-gray-700 dark:text-white">Name</h4>
					<input
						type="text"
						id="name"
						class="mt-2 w-full rounded-md border border-gray-400 bg-gray-100 px-4 py-2 text-sm text-gray-700 outline-none transition-all focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
						placeholder="your name"
					/>
				</label>
				<label for="email">
					<h4 class="font-medium text-gray-700 dark:text-white">Email</h4>
					<input
						type="email"
						id="email"
						class="mt-2 w-full rounded-md border border-gray-400 bg-gray-100 px-4 py-2 text-sm text-gray-700 outline-none transition-all focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
						placeholder="email address"
					/>
				</label>
			</div>
			<div>
				<textarea
					name="message"
					id="message"
					class="w-full rounded-md border border-gray-400 bg-gray-100 p-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
					rows="4"
					placeholder="message"
				></textarea>
			</div>
			<div class="float-end">
				<Button>Send</Button>
			</div>
		</div>
	</div>
	<div class="mt-20 space-y-5 px-10 md:px-30 md:mt-30">
		<h5 class="text-2xl font-bold">Frequently Asked Questions</h5>
		<div>
			<Accordion title="Is TaskFlow really 100% free?">
				<p class="text-gray-400">Yes. TaskFlow is completely free to use.</p>
				<ul class="mx-10 list-disc text-gray-400">
					<li class="font-bold">No subscription</li>
					<li class="font-bold">No premium plan</li>
					<li class="font-bold">No hidden fees</li>
				</ul>
				<p class="text-gray-400">All features are available to everyone, with no limitations.</p>
			</Accordion>
			<Accordion title="How do i reset my password?">
				<p class="text-gray-400">You can reset your password in just few steps.</p>
				<ul class="mx-10 list-disc text-gray-400">
					<li class="font-bold">Clock on "Forgot password" on the login page</li>
					<li class="font-bold">Enter your registered email address</li>
					<li class="font-bold">Follow the reset link sent to your inbox</li>
				</ul>
				<Accordion title="Didn't receive the email?">
					<p class="text-gray-400">Check your spam folder or try again after a few minutes.</p>
				</Accordion>
			</Accordion>
			<Accordion title="Can I use TaskFlow with a team?">
				<p class="text-gray-400">Yes, TaskFlow fully supports teamwork.</p>
				<ul class="mx-10 list-disc text-gray-400">
					<li class="font-bold">Create projects</li>
					<li class="font-bold">Invite team memebers</li>
					<li class="font-bold">Assign tasks</li>
					<li class="font-bold">Track progress together</li>
				</ul>
				<Accordion title="Is there a limit to team memebers?">
					<p class="text-gray-400">No. You can collaborate with as many people as you want.</p>
				</Accordion>
			</Accordion>
			<Accordion title="Is my data safe on TaskFlow?">
				<p class="text-gray-400">Your data is handled with care and responsibilty.</p>
				<ul class="mx-10 list-disc text-gray-400">
					<li class="font-bold">Secure authentication</li>
					<li class="font-bold">Private projects by default</li>
				</ul>
				<Accordion title="Can other see my projects?">
					<p class="text-gray-400">No. Only you and the people you invite can access your projects.</p>
				</Accordion>
			</Accordion>
		</div>
	</div>
</section>
