<script lang="ts">
	let { children, ...props } = $props();
</script>

<button
	{...props}
	class="cursor-pointer rounded-xl bg-indigo-600 px-6 py-2.5 text-white font-semibold shadow-md hover:bg-indigo-500 hover:shadow-lg active:scale-95 transition-all duration-200 {props.class ??
		''}"
>
	{@render children?.()}
</button>
