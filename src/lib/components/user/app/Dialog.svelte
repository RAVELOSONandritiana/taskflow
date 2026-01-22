<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';
	
	let { open = $bindable(false), onClose, children }: { open?: boolean, onClose: () => void, children?: any } = $props();

	$effect(() => {
		if (browser) {
			document.body.style.overflow = open ? 'hidden' : '';
		}
	});

	onDestroy(() => {
		if (browser) {
			document.body.style.overflow = '';
		}
	});
</script>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="fixed inset-0 flex items-center justify-center bg-black/50 z-[100]" onclick={onClose}>
		{@render children?.()}
	</div>
{/if}
