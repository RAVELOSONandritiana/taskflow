<script lang="ts">
	import Logo from '$lib/images/solo.png';
	export let read: boolean;
	let visible = true;
	let moreText = false;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if visible}
	<div
		class="flex cursor-pointer space-x-4 border-b border-gray-200 {read
			? 'bg-white'
			: 'bg-gray-100 hover:bg-white'} px-5 py-2"
		on:click={() => (read = true)}
	>
		<div class="h-16 min-h-16 w-16 min-w-16 overflow-hidden rounded-full">
			<img src={Logo} alt="logo" />
		</div>
		<div>
			<div class="flex items-center justify-between">
				<h4 class="font-bold">title</h4>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					aria-hidden="true"
					data-slot="icon"
					class="w-4 cursor-pointer transition-transform duration-100 hover:w-5 hover:text-red-600"
					on:click={() => (visible = false)}
				>
					<path
						d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"
					/>
				</svg>
			</div>
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<p
				class="text-sm text-gray-500 {moreText ? '' : 'line-clamp-3'}"
				on:click={(e) => (moreText = !moreText)}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi recusandae quos eum id,
				itaque eius mollitia officia dicta, rerum obcaecati placeat, fugiat doloremque. Ut harum
				blanditiis vero distinctio architecto sapiente.
			</p>
		</div>
	</div>
{/if}
