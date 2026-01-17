<script lang="ts">
	import { currentTrack, isPlayAudio, urlAudio } from '$lib/store/track.store';
	const { title, url, grid = true } = $props();
	let play = $state(false);
	// svelte-ignore state_referenced_locally
	if ($urlAudio == url && $isPlayAudio == true) {
		play = true;
	}
	$effect(() => {
		if ($urlAudio != url) {
			play = false;
		}
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if grid == false}
	<tr class="hover:bg-gray-100">
		<td class="w-20 py-2 pl-4 text-sm">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" class="w-10 text-red-600">
				<path
					style="fill:currentColor;fill-opacity:1;stroke:none"
					d="m 11,3 0,1 0,3 0,1 0,4 0,2.640625 C 10.450691,14.229206 9.7385673,14.001104 9,14 7.3431458,14 6,15.119288 6,16.5 6,17.880712 7.3431458,19 9,19 c 1.656854,0 3,-1.119288 3,-2.5 L 12,12 12,8.0957031 c 1.473938,0.2519592 3.180894,1.3814645 4,2.1485529 L 16,9.5 16,9 16,8.84375 16,5.5 16,4.84375 C 14.788541,3.8472864 12.971189,3 11,3 Z m 1,1.0957031 c 1.132773,0.1936395 2.194743,0.6800469 3,1.2460938 l 0,2.8046875 C 14.137786,7.634143 13.107988,7.23782 12,7.0800781 Z M 9,15 c 1.104569,0 2,0.671573 2,1.5 C 11,17.328427 10.104569,18 9,18 7.8954305,18 7,17.328427 7,16.5 7,15.671573 7.8954305,15 9,15 Z"
					class="ColorScheme-Text"
				/>
			</svg>
		</td>
		<td class="max-w-xs truncate pl-4 text-sm text-gray-900"
			>{title.split('-').slice(1).join(' ')}</td
		>
		<td class="pl-4">
			<div class="flex items-center">
				<!-- svelte-ignore event_directive_deprecated -->
				<button
					class="cursor-pointer border-none bg-transparent hover:shadow-lg"
					on:click={() => {
						play = !play;
						if ($isPlayAudio == true && $urlAudio == url && play == false) {
							currentTrack.update((v) => {
								return { ...v!, isPlay: false };
							});
						} else if ($isPlayAudio == false && $urlAudio == url && play == true) {
							currentTrack.update((v) => {
								return { ...v!, isPlay: true };
							});
						}
						if ($urlAudio != url) {
							currentTrack.set({
								url: url,
								isPlay: true
							});
						}
					}}
				>
					{#if play == false}
						<!-- triangle -->
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
							<path d="M 3 2 L 3 14 L 14 8 L 4.1015625 2.5996094 L 3 2 z" />
						</svg>
					{:else}
						<div class="relative flex items-center justify-center">
							<div class="absolute animate-spin rounded-full border-t-2 border-blue-400 p-4"></div>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
								<path
									d="M 2 2 L 2 14 L 6 14 L 6 2 L 2 2 z M 10 2 L 10 14 L 14 14 L 14 2 L 10 2 z"
								/>
							</svg>
						</div>
					{/if}
				</button>
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button class="cursor-pointer border-none bg-transparent">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
						data-slot="icon"
						width="16"
						height="16"
						class="ml-4 hover:bg-transparent hover:text-red-500"
					>
						<path
							d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z"
						/>
						<path
							fill-rule="evenodd"
							d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</td>
	</tr>
{:else}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore event_directive_deprecated -->
	<div
		class="flex cursor-pointer flex-col items-center justify-center rounded-md py-2 text-center hover:bg-gray-100 {$urlAudio ==
		url
			? 'bg-gray-200'
			: ''}"
		on:click={() => {
			play = !play;
			if ($isPlayAudio == true && $urlAudio == url && play == false) {
				currentTrack.update((v) => {
					return { ...v!, isPlay: false };
				});
			} else if ($isPlayAudio == false && $urlAudio == url && play == true) {
				currentTrack.update((v) => {
					return { ...v!, isPlay: true };
				});
			}
			if ($urlAudio != url) {
				currentTrack.set({
					url: url,
					isPlay: true
				});
			}
		}}
	>
		<div class="relative flex items-center justify-center">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" class="w-10 text-red-600">
				<path
					style="fill:currentColor;fill-opacity:1;stroke:none"
					d="m 11,3 0,1 0,3 0,1 0,4 0,2.640625 C 10.450691,14.229206 9.7385673,14.001104 9,14 7.3431458,14 6,15.119288 6,16.5 6,17.880712 7.3431458,19 9,19 c 1.656854,0 3,-1.119288 3,-2.5 L 12,12 12,8.0957031 c 1.473938,0.2519592 3.180894,1.3814645 4,2.1485529 L 16,9.5 16,9 16,8.84375 16,5.5 16,4.84375 C 14.788541,3.8472864 12.971189,3 11,3 Z m 1,1.0957031 c 1.132773,0.1936395 2.194743,0.6800469 3,1.2460938 l 0,2.8046875 C 14.137786,7.634143 13.107988,7.23782 12,7.0800781 Z M 9,15 c 1.104569,0 2,0.671573 2,1.5 C 11,17.328427 10.104569,18 9,18 7.8954305,18 7,17.328427 7,16.5 7,15.671573 7.8954305,15 9,15 Z"
					class="ColorScheme-Text"
				/>
			</svg>
		</div>
		<div class="line-clamp-2 max-w-25">
			<p class="text-[10px]">{title.split('-').slice(1).join(' ')}</p>
		</div>
	</div>
{/if}
