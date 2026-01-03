<script lang="ts">
	import Dialog from './app/Dialog.svelte';

	let {
		open = $bindable()
	}: {
		open: boolean;
	} = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<Dialog {open} onClose={() => (open = false)}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore slot_element_deprecated -->
	<!-- svelte-ignore event_directive_deprecated -->
	<section class="absolute right-0 h-screen w-100 bg-white" on:click|stopPropagation>
		<slot />
	</section>
</Dialog>
