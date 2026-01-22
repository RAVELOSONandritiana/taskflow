<script lang="ts">
	let { children } = $props();
</script>

<header class="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
    {@render children?.()}
</header>