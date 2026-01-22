<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';
	import Notification from '$lib/components/user/app/Notification.svelte';

	let notifications = [
		{ id: 1, title: 'New Project Assigned', read: false },
		{ id: 2, title: 'Team Meeting Reminder', read: true },
		{ id: 3, title: 'Music Playlist Updated', read: false },
		{ id: 4, title: 'New Team Member Joined', read: true }
	];
</script>

<div class="p-4" class:dark={$theme}>
	<Title>Notifications</Title>
	<div class="mt-8 max-w-4xl space-y-4">
		{#each notifications as notif}
			<Notification bind:read={notif.read} />
		{/each}
	</div>
</div>
