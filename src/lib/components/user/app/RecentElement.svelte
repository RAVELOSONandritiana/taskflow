<script lang="ts">
	export let title;
	export let value;
    export let color = 'bg-indigo-400';
</script>

<div class="flex flex-col">
	<div class="flex flex-row items-center justify-between">
		<p class="font-medium text-gray-700 dark:text-gray-300">{title}</p>
		<p class="font-medium text-gray-700 dark:text-gray-300">{value}%</p>
	</div>
	<div role="progressbar" aria-valuemin="0" aria-valuemax="100">
		<div class="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
			<div class="h-full rounded-full {color}" style="width: {value}%"></div>
		</div>
	</div>
</div>
