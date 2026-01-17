<script lang="ts">
	import Title from '$lib/components/user/app/Title.svelte';
	import { theme } from '$lib/store/theme.store';
</script>

<section class:dark={$theme}>
	<Title>Synchronize with teams.</Title>
</section>