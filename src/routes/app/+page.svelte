<script lang="ts">
	import Recent from '$lib/components/user/app/Recent.svelte';
	import Status from '$lib/components/user/app/Status.svelte';
	import GlobalState from '$lib/components/user/app/GlobalState.svelte';
	import Title from '$lib/components/user/app/Title.svelte';
</script>

<Title>Welcome to TaskFlow, Alex!</Title>
<section class="mt-4 flex flex-row space-x-4">
	<div class="flex-1">
		<Status />
	</div>
	<div class="w-1/4">
		<Recent />
		<GlobalState value={80} />
	</div>
</section>
