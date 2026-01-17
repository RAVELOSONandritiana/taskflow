<script lang="ts">
	export let title;
	export let value;
    export let color = 'text-gray-700';
</script>

<div class="shadow-md p-4 border rounded-md transition-transform duration-300 cursor-pointer hover:-translate-y-3 dark:bg-gray-800 dark:border-gray-700">
	<div class="flex items-center justify-between">
        <h2 class="text-2xl font-extrabold {color} dark:text-white">
            {value}
        </h2>
    </div>
	<p class="text-gray-700 dark:text-gray-300">{title}</p>
</div>
