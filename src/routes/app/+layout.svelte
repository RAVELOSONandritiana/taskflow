<script lang="ts">
	import {
		urlAudio,
		isPlayAudio,
		currentTrack,
		timeMusic,
		titleStore
	} from '$lib/store/track.store';
	import { theme } from '$lib/store/theme.store';
	import Sidemenu from '$lib/components/user/app/Sidemenu.svelte';
	import '../layout.css';
	import { fly } from 'svelte/transition';
	let { children } = $props();
	let currentAudio: HTMLAudioElement | null = null;
	function toogleCurrentTrack() {
		if (currentTrack) {
			$currentTrack!.isPlay = !$currentTrack?.isPlay;
		}
	}

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
		{@render children()}
	</Sidemenu>
</div>

{#if $currentTrack?.url != null}
	<div
		class="fixed right-6 bottom-6 z-50 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/90"
		transition:fly={{ y: 50, duration: 400 }}
	>
		<div class="flex items-center gap-4">
			<div
				class="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-indigo-500 text-white shadow-lg"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-full w-full p-3 opacity-50"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
					/></svg
				>
				{#if $currentTrack?.isPlay}
					<!-- Simple soundwave animation -->
					<div
						class="absolute inset-0 flex items-center justify-center gap-1 bg-indigo-600/20 backdrop-blur-[1px]"
					>
						<div class="sound-bar animate-sound h-4 w-1" style="animation-delay: 0s"></div>
						<div class="sound-bar animate-sound h-6 w-1" style="animation-delay: 0.2s"></div>
						<div class="sound-bar animate-sound h-5 w-1" style="animation-delay: 0.1s"></div>
						<div class="sound-bar animate-sound h-3 w-1" style="animation-delay: 0.3s"></div>
					</div>
				{/if}
			</div>

			<div class="min-w-0 flex-1">
				<h4
					class="truncate text-sm font-black tracking-tight text-gray-900 dark:text-white"
					title={$currentTrack?.url}
				>
					{currentTrack ? $titleStore : ''}
				</h4>
				<p class="text-[10px] font-bold tracking-wider text-indigo-500 uppercase">Various Artist</p>

				<div class="mt-2 flex items-center gap-4">
					<button aria-label="Previous" class="text-gray-400 hover:text-indigo-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="currentColor"
							viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6L18 6v12z" /></svg
						>
					</button>
					<!-- svelte-ignore event_directive_deprecated -->
					<button
						on:click={toogleCurrentTrack}
						aria-label={$currentTrack?.isPlay ? 'Pause' : 'Play'}
						class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
					>
						{#if $currentTrack?.isPlay}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								fill="currentColor"
								viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg
							>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="ml-0.5 h-4 w-4"
								fill="currentColor"
								viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg
							>
						{/if}
					</button>
					<button aria-label="Next" class="text-gray-400 hover:text-indigo-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="currentColor"
							viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6zM16 6v12h2V6z" /></svg
						>
					</button>
				</div>
			</div>

			<!-- svelte-ignore event_directive_deprecated -->
			<button
				on:click={() => {
					currentTrack.set(null);
				}}
				aria-label="Close Player"
				class="p-1 text-gray-300 hover:text-red-500"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/></svg
				>
			</button>
		</div>

		<div class="mt-4 h-1 w-full rounded-full bg-gray-100 dark:bg-gray-800">
			<div class="h-full w-1/3 rounded-full bg-indigo-500"></div>
		</div>
	</div>
{/if}

<style>
	.sound-bar {
		background: white;
		border-radius: 2px;
	}

	@keyframes sound {
		0%,
		100% {
			height: 4px;
		}
		50% {
			height: 16px;
		}
	}

	.animate-sound {
		animation: sound 0.5s ease-in-out infinite;
	}
</style>
