<script lang="ts">
	export let title = '';
	export let icon: string;
</script>

<div
	class="transform-transition rounded-lg border border-gray-200 bg-white p-4 duration-500 hover:-translate-y-2 hover:shadow-lg hover:bg-gray-50 cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
>
	{#if icon}
		<img src={icon} alt="icon" class="mx-auto w-12 h-12 mb-3" />
	{/if}
	<h4 class="text-gray-800 dark:text-white font-semibold">
		{title}
	</h4>
</div>
