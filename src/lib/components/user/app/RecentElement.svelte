<script lang="ts">
	export let title;
	export let value;
    export let color = 'bg-indigo-400';
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between">
		<span class="text-sm font-bold text-gray-900 dark:text-gray-100">{title}</span>
		<span class="text-[11px] font-black tracking-tighter text-gray-400">{value}%</span>
	</div>
	<div role="progressbar" aria-valuemin="0" aria-valuemax="100" class="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
		<div 
			class="h-full rounded-full {color} transition-all duration-1000 ease-out shadow-sm" 
			style="width: {value}%"
		></div>
	</div>
</div>
