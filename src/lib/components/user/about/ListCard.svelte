<script lang="ts">
	export let title = '';
	export let icon: string;
</script>

<div
	class="transform-transition rounded-md border border-gray-400 text-center p-3 duration-500 hover:-translate-y-2 hover:shadow-md hover:bg-gray-100 cursor-pointer dark:hover:bg-transparent"
>
	{#if icon}
		<img src={icon} alt="icon" class="mx-auto w-10 h-10 mb-2" />
	{/if}
	<h4 class="text-gray-800 dark:text-white">
		{title}
	</h4>
</div>
