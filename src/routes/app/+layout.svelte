<script lang="ts">
	import {
		urlAudio,
		isPlayAudio,
		currentTrack,
		timeMusic,
	} from '$lib/store/track.store';
	import { theme } from '$lib/store/theme.store';
	import Sidemenu from '$lib/components/user/app/Sidemenu.svelte';
	import '../layout.css';
	let { children } = $props();
	let currentAudio: HTMLAudioElement | null = null;
	$effect(() => {
		if ($urlAudio) {
			if (currentAudio != null) {
				currentAudio.pause();
				currentAudio = null;
			}
			currentAudio = new Audio($urlAudio);
			currentAudio.play();
			currentAudio.addEventListener('timeupdate', () => {
				timeMusic.set(currentAudio!.currentTime);
			});

			currentAudio.onended = (e) => {
				currentAudio?.pause();
				currentTrack.update((v) => {
					return { ...v!, isPlay: false };
				});
				e.preventDefault();
			};
		}
	});

	$effect(() => {
		if ($isPlayAudio == false) {
			currentAudio?.pause();
		} else {
			currentAudio?.play();
		}
	});
</script>

<div class="app" class:dark={$theme}>
	<Sidemenu>
		<main>{@render children()}</main>
	</Sidemenu>
</div>
