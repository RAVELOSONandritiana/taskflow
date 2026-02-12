<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';
	import Notification from '$lib/components/user/app/Notification.svelte';

	let { data } = $props();
	let notifications = $state(data.notifications);

	$effect(() => {
		notifications = data.notifications;
	});

	// Mock handle read for now as the component binds to read
	// Real implementation would watch for changes and call API
	// Or Notification component emits event
</script>

<div class="p-4" class:dark={$theme}>
	<Title>Notifications</Title>
	<div class="mt-8 max-w-4xl space-y-4">
		{#each notifications as notif}
			<Notification bind:read={notif.read} />
		{/each}
	</div>
</div>
