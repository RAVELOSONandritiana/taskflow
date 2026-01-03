<script lang="ts">
	export let title = '';
	export let subtitle = '';
</script>

<div class="flex flex-row border border-gray-300 rounded-sm p-8 space-x-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-md">
	<div class="flex bg-gray-200 p-3 rounded-sm h-10 w-10 items-center justify-center dark:bg-gray-900">
        <slot/>
    </div>
	<div class="space-y-2">
		<h4 class="text-md font-bold text-gray-700 dark:text-zinc-300">
			{title}
		</h4>
		<p class="text-sm text-gray-500">
			{subtitle}
		</p>
	</div>
</div>
