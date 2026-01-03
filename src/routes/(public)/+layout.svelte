<script lang="ts">
	import '../layout.css';
	import Header from '$lib/components/user/Header.svelte';
	import Footer from '$lib/components/user/Footer.svelte';
	let { children } = $props();
</script>

<div class="app">
	<Header/>
	<main>{@render children()}</main>
	<Footer/>
</div>