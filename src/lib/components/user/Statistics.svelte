<script lang="ts">
	function randomNumber(min = 1, max = 10000) {
		return Math.random() * (max - min) + min;
	}

	function transformPipe(value: number) {
		if (value < 1000) {
			return Math.floor(value).toFixed(0);
		}
		if (value >= 1000 && value < 1000000) {
			return Math.trunc(value / 1000) + 'K+';
		}
		if (value >= 1000000 && value <= 1000000000) {
			return Math.trunc(value / 1000000) + 'M+';
		}
	}
	let randomList = [];
	let label = ['Projects', 'Success project', 'Users', 'Apk'];
	let colors = ['', 'text-green-500', 'text-indigo-500', 'text-red-400'];
	for (let i = 0; i < 4; i++) {
		randomList.push({ name: label[i], value: transformPipe(randomNumber()), color: colors[i] });
	}
</script>

<section class="body-font text-gray-600">
	<div class="container mx-auto mb-10 px-10 md:mb-20 md:px-30">
		<div class="mb-20 flex w-full flex-col text-center">
			<h1 class="title-font text-1xl mb-4 font-bold text-gray-900 sm:text-3xl dark:text-white">
				Trusted by users to manage their daily work
			</h1>
		</div>
		<div class="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
			{#each randomList as l}
				<div class="flex flex-col items-center justify-center gap-4">
					<h4 class="text-5xl font-extrabold {l.color}">{l.value}</h4>
					<h6 class="text-gray-500 dark:text-white">{l.name}</h6>
				</div>
			{/each}
		</div>
	</div>
</section>
