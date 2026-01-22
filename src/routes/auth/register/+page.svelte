<script lang="ts">
	import InputPassword from './../../../lib/components/user/InputPassword.svelte';
	import Button from '$lib/components/user/Button.svelte';
	import git from '$lib/images/github-register.svg';
	import svelte from '$lib/images/svelte-register.svg';
	import bglogin from '$lib/images/1342060.jpeg';
</script>

<section class="flex h-screen w-screen items-center justify-center">
	<div class="mx-10 md:mx-40">
		<div
			class="flex h-fit items-center justify-center overflow-hidden rounded-md border border-gray-300 md:grid md:grid-cols-1 md:place-items-center lg:grid-cols-2"
		>
			<div class="hidden h-full w-full lg:block">
				<img src={bglogin} alt="background signup page" class="h-full w-full object-cover" loading="lazy"/>
			</div>
			<div class="space-y-4 self-start px-10 py-4 text-center">
				<div class="space-y-2">
					<h2 class="text-3xl font-bold">Sign Up</h2>
					<p class="text-xs text-gray-500">Welcome! Please enter your details</p>
				</div>
				<div class="space-y-2">
					<div class="flex flex-col items-start space-y-2">
						<label for="email" class=" text-sm font-bold text-gray-700"> Email </label>
						<input
							placeholder="test@gmail.com"
							type="text"
							class="w-full rounded-md border border-gray-400 bg-gray-100 px-4 py-2 outline-none transition-all focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
							id="email"
						/>
					</div>
					<div class="flex flex-col items-start space-y-2">
						<label for="password" class=" text-sm font-bold text-gray-700"> Password </label>
						<InputPassword placeholder="········" />
					</div>
				</div>
				<Button class="w-full rounded-sm">Sign Up</Button>
				<div class="grid grid-cols-3 place-items-center gap-2">
					<hr class="w-full" />
					<p class="text-sm text-gray-500">Or Sign Up with</p>
					<hr class="w-full" />
				</div>

				<div class="grid grid-cols-2 gap-4">
					<button
						class="flex w-full justify-center space-x-4 rounded-md border border-gray-300 px-5 py-2 hover:cursor-pointer hover:bg-gray-100"
					>
						<img src={git} alt="" class="h-5" />
						<p>Github</p>
					</button>
					<button
						class="flex w-full justify-center space-x-4 rounded-md border border-gray-300 px-5 py-2 hover:cursor-pointer hover:bg-gray-100"
					>
						<img src={svelte} alt="" class="h-5" />
						<p>Svelte</p>
					</button>
				</div>
				<div class="flex items-center justify-center space-x-1">
					<p class="text-sm text-gray-500">I have account?</p>
					<a href="/auth/login" class="float-left text-sm font-bold text-indigo-600">Log In</a>
				</div>
			</div>
		</div>
	</div>
</section>
