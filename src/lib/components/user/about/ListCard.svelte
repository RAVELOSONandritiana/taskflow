<script lang="ts">
	let { title = '', icon, children } = $props();
</script>

<div
	class="transform-transition rounded-3xl border border-gray-200 bg-white/50 p-8 duration-500 hover:-translate-y-2 hover:shadow-2xl hover:bg-white cursor-pointer dark:bg-gray-900/50 dark:border-white/10 dark:hover:bg-gray-900 backdrop-blur-sm"
>
	<div class="flex flex-col items-center text-center space-y-4">
		{#if icon}
			<div class="text-indigo-600 dark:text-indigo-400">
				{@render icon()}
			</div>
		{/if}
		<h4 class="text-gray-900 dark:text-white font-bold text-lg">
			{title}
		</h4>
		{#if children}
			<div class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
				{@render children()}
			</div>
		{/if}
	</div>
</div>
