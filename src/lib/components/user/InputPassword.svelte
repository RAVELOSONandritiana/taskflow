<script lang="ts">
	export let id = 'password';
	let type: 'password' | 'text' = 'password';

	function toggleType() {
		type = type == 'password' ? 'text' : 'password';
	}
</script>

<div class="relative w-full">
	<input
		{type}
		{...$$restProps}
		class="w-full rounded-sm border border-gray-300 py-1 pr-15 pl-2 hover:bg-gray-100 focus:border-none focus:ring-2 focus:ring-indigo-600 focus:outline-none {$$restProps.class ??
			''}"
		{id}
	/>
	{#if type == 'password'}
		<svg
			on:click={() => toggleType()}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
			data-slot="icon"
			class="absolute inset-y-0 right-3 flex h-full cursor-pointer items-center justify-center text-gray-500"
			width="20"
			height="20"
		>
			<path
				fill-rule="evenodd"
				d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
				clip-rule="evenodd"
			/>
		</svg>
	{:else if type == 'text'}
		<svg
			on:click={() => toggleType()}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
			data-slot="icon"
			class="absolute inset-y-0 right-3 flex h-full cursor-pointer items-center justify-center text-gray-500"
			width="20"
			height="20"
		>
			<path
				d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z"
			/>
		</svg>
	{/if}
</div>
