<script lang="ts">
	import '../layout.css';
	import Header from '$lib/components/user/Header.svelte';
	import Footer from '$lib/components/user/Footer.svelte';
	let { children } = $props();
</script>

<div class="app relative min-h-screen">
	<!-- Background Decorative Elements -->
	<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
		<div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]"></div>
		<div class="absolute top-[40%] -right-[10%] w-[30%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]"></div>
		<div class="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] rounded-full bg-purple-600/5 blur-[120px]"></div>
	</div>

	<Header/>
	<main class="relative">{@render children()}</main>
	<Footer/>
</div>