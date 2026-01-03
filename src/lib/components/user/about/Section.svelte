<script lang="ts">
	export let title = '';
</script>

<section {...$$restProps} class="max-x-7xl {$$restProps.class ?? ''}">
	<div class="px-10">
		<h2 class="text-2xl font-bold">
			{title}
		</h2>
		<div class="mt-5">
			<slot />
		</div>
	</div>
</section>
