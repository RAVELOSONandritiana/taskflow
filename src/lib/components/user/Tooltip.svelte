<script lang="ts">
	export let text: undefined | string;
</script>

<div class="group flex items-center justify-center relative">
	<slot />
	<span
		class="absolute hidden z-100 rounded-sm bg-black px-2 py-1 text-[10px] top-full text-white group-hover:block after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-transparent after:border-4 after:border-b-black after:content-['']"
	>
		{text}
	</span>
</div>
