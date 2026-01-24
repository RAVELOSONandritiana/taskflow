<script lang="ts">
	let { children, ...props } = $props();
</script>

<section>
	<div class="mx-auto mt-2 mb-8 max-w-7xl py-4 sm:py-8 lg:py-8">
		<div {...props} class="text-center {props.class ?? ''}">
			{@render children?.()}
		</div>
	</div>
</section>
