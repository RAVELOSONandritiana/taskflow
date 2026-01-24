<script lang="ts">
	let { title = '', subtitle = '', children } = $props();
</script>

<div class="flex space-x-6">
	<div class="flex items-center justify-center rounded-sm bg-gray-200 p-3 h-10 w-10 dark:bg-gray-900">
		{@render children?.()}
	</div>
	<div>
		<h4 class="text-md font-bold text-gray-700 dark:text-zinc-300">
			{title}
		</h4>
		<p class="text-gray-500 text-sm">
			{subtitle}
		</p>
	</div>
</div>
