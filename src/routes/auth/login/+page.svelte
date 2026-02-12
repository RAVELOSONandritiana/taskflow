<script lang="ts">
	import InputPassword from './../../../lib/components/user/InputPassword.svelte';
	import Button from '$lib/components/user/Button.svelte';
	import git from '$lib/images/github-login.svg';
	import svelte from '$lib/images/svelte-login.svg';
	import bglogin from '$lib/images/1355112.jpeg';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let loading = false;
	let error = '';

	async function handleLogin() {
		loading = true;
		error = '';

		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			const data = await res.json();

			if (data.success) {
				goto('/app/project'); // Redirect to dashboard
			} else {
				error = data.error || 'Login failed';
			}
		} catch (e) {
			error = 'An error occurred. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<section class="flex h-screen w-screen items-center justify-center">
	<div class="mx-10 md:mx-40">
		<div
			class="flex h-fit items-center justify-center overflow-hidden rounded-md border border-gray-300 md:grid md:grid-cols-1 md:place-items-center lg:grid-cols-2"
		>
			<div class="hidden h-full w-full lg:block">
				<img
					src={bglogin}
					alt="background login page"
					class="h-full w-full object-cover"
					loading="lazy"
				/>
			</div>
			<div class="space-y-4 self-start px-10 py-4 text-center">
				<div class="space-y-2">
					<h2 class="text-3xl font-bold">Log In</h2>
					<p class="text-xs text-gray-500">Welcome back! Please enter your details</p>
				</div>

				{#if error}
					<div class="rounded bg-red-100 p-2 text-sm text-red-600">
						{error}
					</div>
				{/if}

				<form on:submit|preventDefault={handleLogin} class="space-y-4">
					<div class="flex flex-col items-start space-y-2">
						<label for="email" class=" text-sm font-bold text-gray-700"> Email </label>
						<input
							bind:value={email}
							placeholder="test@gmail.com"
							type="email"
							class="w-full rounded-md border border-gray-400 bg-gray-100 px-4 py-2 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
							id="email"
							required
						/>
					</div>
					<div class="flex flex-col items-start space-y-2">
						<label for="password" class=" text-sm font-bold text-gray-700"> Password </label>
						<InputPassword bind:value={password} placeholder="········" required />
					</div>
					<div class="clearfix w-full">
						<a href="/auth/login" class="float-start text-sm font-bold text-indigo-600"
							>forgot password?</a
						>
					</div>
					<Button type="submit" class="w-full rounded-sm" disabled={loading}>
						{loading ? 'Logging in...' : 'Log In'}
					</Button>
				</form>

				<div class="grid grid-cols-3 place-items-center gap-2">
					<hr class="w-full" />
					<p class="text-sm text-gray-500">Or continue with</p>
					<hr class="w-full" />
				</div>

				<div class="grid grid-cols-2 gap-4">
					<button
						type="button"
						class="flex w-full justify-center space-x-4 rounded-md border border-gray-300 px-5 py-2 hover:cursor-pointer hover:bg-gray-100"
					>
						<img src={git} alt="" class="h-5" />
						<p>Github</p>
					</button>
					<button
						type="button"
						class="flex w-full justify-center space-x-4 rounded-md border border-gray-300 px-5 py-2 hover:cursor-pointer hover:bg-gray-100"
					>
						<img src={svelte} alt="" class="h-5" />
						<p>Svelte</p>
					</button>
				</div>
				<div class="mt-10 flex items-center justify-center space-x-1">
					<p class="text-sm text-gray-500">Don't have account?</p>
					<a href="/auth/register" class="float-left text-sm font-bold text-indigo-600">Sign up</a>
				</div>
			</div>
		</div>
	</div>
</section>
