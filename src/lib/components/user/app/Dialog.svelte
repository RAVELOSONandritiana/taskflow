<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';
	export let open = false;
	export let onClose: () => void;
	$: if (browser) {
		document.body.style.overflow = open ? 'hidden' : '';
	}
	onDestroy(() => {
		if (browser) {
			document.body.style.overflow = '';
		}
	});
</script>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="fixed inset-0 flex items-center justify-center bg-black/50 z-100" on:click={onClose}>
		<slot />
	</div>
{/if}
