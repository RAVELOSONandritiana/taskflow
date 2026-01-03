<script lang="ts">
	export let title;
	export let value;
    export let color = 'text-gray-700';
</script>

<div class="shadow-md p-4 border rounded-md transition-transform duration-300 cursor-pointer hover:-translate-y-3">
	<div class="flex items-center justify-between">
        <h2 class="text-2xl font-extrabold {color}">
            {value}
        </h2>
    </div>
	<p class="text-gray-700">{title}</p>
</div>
