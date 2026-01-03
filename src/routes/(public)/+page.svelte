<script>
	import { goto } from '$app/navigation';
	import { Button as ShadButton } from '$lib/components/ui/button';
	import Statistics from './../../lib/components/user/Statistics.svelte';
	import Button from '$lib/components/user/Button.svelte';
	import Banner from '$lib/components/user/Banner.svelte';
	import Functionality from '$lib/components/user/Functionality.svelte';
	import Logo from '$lib/images/file_0000000027bc722fa9a6c62735b1a346.png';
</script>

<Banner class="md:px-30 gap-y-20 grid lg:grid-cols-2 place-items-start">
	<div class="order-2 mx-auto lg:order-1 lg:text-left">
		<h2 class="max-w-lg mx-auto text-3xl font-extrabold text-gray-900 md:text-5xl dark:text-white">
			Organize your work. <strong class="text-indigo-500"> Move faster.Stay focused. </strong>
		</h2>
		<p class="p-gray mt-4! max-w-sm mx-auto lg:mx-0">
			TaskFlow helps you create projects,manage tasks, and track your project in real time.<br
			/><strong> Free to use. </strong> No credit card required.
		</p>
		<div class="mt-10 space-x-5">
			<Button class="py-3" on:press={() => goto('/app')}>Get Started</Button>
			<Button class="border border-gray-300 bg-white py-3 text-gray-600! hover:bg-gray-200!"
				>Learn More</Button
			>
		</div>
	</div>
	<img src={Logo} alt="logo" class="w-50 md:w-100 order-1 lg:order-2 justify-self-center lg:justify-self-end">
</Banner>

<Statistics />

<Functionality />

<section class="my-32">
	<div class="mx-auto max-w-7xl px-10 md:px-30">
		<div class="text-center">
			<h2 class="text-3xl font-extrabold text-gray-900 sm:text-5xl dark:text-white">
				Ready to <strong class="text-indigo-500">take control</strong> of your projects?
			</h2>
			<p class="mx-auto mt-4 max-w-sm text-gray-500">
				Start using TaskFlow for free and turn ideas into action.
			</p>
			<div class="mx-auto mt-4 flex flex-col space-y-4 md:flex-row max-w-md md:space-x-3">
				<input
					type="email"
					class="w-full rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-600 focus:outline-hidden dark:placeholder:text-slate-300"
					placeholder="email address"
				/>
				<ShadButton
					class="border border-indigo-500 bg-white px-8 py-5 font-bold text-indigo-500! hover:bg-indigo-500 hover:text-white!"
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
