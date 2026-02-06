<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { v4 } from 'uuid';

	interface Risk {
		id: string;
		title: string;
		probability: number; // 1-5
		impact: number; // 1-5
	}

	let risks = $state<Risk[]>([
		{ id: v4(), title: 'Budget Overrun', probability: 2, impact: 4 },
		{ id: v4(), title: 'Resource Shortage', probability: 4, impact: 3 },
		{ id: v4(), title: 'Scope Creep', probability: 3, impact: 5 },
		{ id: v4(), title: 'Security Breach', probability: 1, impact: 5 }
	]);

	let showAddRisk = $state(false);
	let newRisk = $state({
		title: '',
		probability: 3,
		impact: 3
	});

	function addRisk() {
		if (!newRisk.title.trim()) return;
		risks.push({
			id: v4(),
			...newRisk
		});
		newRisk = { title: '', probability: 3, impact: 3 };
		showAddRisk = false;
	}

	function removeRisk(id: string) {
		risks = risks.filter((r) => r.id !== id);
	}

	function getRiskColor(risk: Risk) {
		const score = risk.probability * risk.impact;
		if (score >= 15) return 'bg-red-500 text-white';
		if (score >= 8) return 'bg-orange-500 text-white';
		return 'bg-green-500 text-white';
	}

	const labels = ['Very Low', 'Low', 'Medium', 'High', 'Critical'];
</script>

<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
	<!-- Risk List -->
	<div
		class="flex flex-col rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950"
	>
		<div class="mb-8 flex items-center justify-between">
			<div>
				<h3 class="text-xl font-black tracking-tight text-gray-900 uppercase dark:text-white">
					Risk Registry
				</h3>
				<p class="mt-1 text-xs font-bold tracking-widest text-indigo-500 uppercase">
					Identified Project Risks
				</p>
			</div>
			<button
				onclick={() => (showAddRisk = true)}
				aria-label="Add new risk"
				class="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-90 dark:shadow-none"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="3"
					><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m6-6H6" /></svg
				>
			</button>
		</div>

		<div class="custom-scrollbar flex-1 space-y-3 overflow-auto pr-2">
			{#each risks as risk (risk.id)}
				<div
					class="group flex items-center justify-between rounded-2xl border border-gray-50 bg-gray-50/30 p-4 transition-all hover:bg-white hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/40 dark:hover:bg-gray-900"
					in:fade
				>
					<div class="flex items-center gap-4">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black {getRiskColor(
								risk
							)}"
						>
							{risk.probability * risk.impact}
						</div>
						<div>
							<h4 class="text-sm font-black text-gray-900 dark:text-white">{risk.title}</h4>
							<p class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
								P: {labels[risk.probability - 1]} • I: {labels[risk.impact - 1]}
							</p>
						</div>
					</div>
					<button
						onclick={() => removeRisk(risk.id)}
						aria-label="Remove risk"
						class="text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2.5"
							><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg
						>
					</button>
				</div>
			{/each}

			{#if risks.length === 0}
				<div
					class="flex h-48 flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-gray-100 opacity-40 dark:border-gray-800"
				>
					<p class="text-[10px] font-black tracking-widest text-gray-400 uppercase">
						No risks identified yet
					</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- Visual Matrix -->
	<div
		class="flex flex-col rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950"
	>
		<h3 class="mb-4 text-sm font-black tracking-widest text-gray-400 uppercase">
			Risk Distribution Matrix
		</h3>

		<div class="relative mt-4 flex flex-1 flex-col">
			<!-- Y-Axis Label -->
			<div class="absolute top-1/2 -left-10 -translate-y-1/2 -rotate-90">
				<span class="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase"
					>Probability</span
				>
			</div>

			<!-- Matrix Body -->
			<div
				class="grid flex-1 grid-cols-5 grid-rows-5 gap-1 border-b-2 border-l-2 border-gray-100 dark:border-gray-800"
			>
				{#each Array(25) as _, i}
					{@const x = (i % 5) + 1}
					{@const y = 5 - Math.floor(i / 5)}
					<div
						class="relative flex items-center justify-center rounded-lg bg-gray-50/50 dark:bg-gray-900/20"
					>
						<!-- Risk Dots in this cell -->
						<div class="flex flex-wrap justify-center gap-1 p-1">
							{#each risks.filter((r) => r.impact === x && r.probability === y) as risk}
								<div
									class="h-2.5 w-2.5 rounded-full {getRiskColor(risk)} animate-pulse shadow-sm"
									title={risk.title}
								></div>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<!-- X-Axis Label -->
			<div class="mt-4 text-center">
				<span class="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">Impact</span>
			</div>
		</div>

		<!-- Legend -->
		<div class="mt-8 flex items-center justify-center gap-6">
			<div class="flex items-center gap-2">
				<div class="h-3 w-3 rounded-full bg-green-500"></div>
				<span class="text-[9px] font-black tracking-widest text-gray-400 uppercase">Low</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="h-3 w-3 rounded-full bg-orange-500"></div>
				<span class="text-[9px] font-black tracking-widest text-gray-400 uppercase">Medium</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="h-3 w-3 rounded-full bg-red-500"></div>
				<span class="text-[9px] font-black tracking-widest text-gray-400 uppercase">Critical</span>
			</div>
		</div>
	</div>
</div>

<!-- Add Risk Modal -->
{#if showAddRisk}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm"
		transition:fade
		role="button"
		tabindex="0"
		onclick={() => (showAddRisk = false)}
		onkeydown={(e) => e.key === 'Escape' && (showAddRisk = false)}
	>
		<div
			class="w-full max-w-sm rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
			transition:fly={{ y: 20 }}
			role="dialog"
			aria-labelledby="risk-modal-title"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<h4 id="risk-modal-title" class="mb-2 text-2xl font-black text-gray-900 dark:text-white">
				Identify New Risk
			</h4>
			<p class="mb-8 text-xs font-bold tracking-widest text-indigo-500 uppercase">
				Assessment & Mitigation
			</p>

			<div class="space-y-6">
				<label class="block">
					<span class="mb-2 block text-[10px] font-black tracking-widest text-gray-400 uppercase"
						>Risk Title</span
					>
					<input
						type="text"
						bind:value={newRisk.title}
						placeholder="e.g. Critical Data Loss"
						class="w-full rounded-2xl border-none bg-gray-100 px-5 py-3.5 text-sm font-bold ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:ring-gray-800"
					/>
				</label>

				<div class="space-y-4">
					<label class="block">
						<div class="mb-2 flex justify-between">
							<span class="text-[10px] font-black tracking-widest text-gray-400 uppercase"
								>Probability</span
							>
							<span class="text-[10px] font-black text-indigo-500"
								>{labels[newRisk.probability - 1]}</span
							>
						</div>
						<input
							type="range"
							min="1"
							max="5"
							bind:value={newRisk.probability}
							class="w-full accent-indigo-600"
						/>
					</label>

					<label class="block">
						<div class="mb-2 flex justify-between">
							<span class="text-[10px] font-black tracking-widest text-gray-400 uppercase"
								>Impact</span
							>
							<span class="text-[10px] font-black text-indigo-500"
								>{labels[newRisk.impact - 1]}</span
							>
						</div>
						<input
							type="range"
							min="1"
							max="5"
							bind:value={newRisk.impact}
							class="w-full accent-indigo-600"
						/>
					</label>
				</div>
			</div>

			<div class="mt-10 flex flex-col gap-3">
				<button
					onclick={addRisk}
					class="w-full rounded-2xl bg-gray-900 py-4 text-sm font-black text-white shadow-xl hover:bg-black active:scale-95 dark:bg-indigo-600 dark:hover:bg-indigo-700"
				>
					Log Risk
				</button>
				<button
					onclick={() => (showAddRisk = false)}
					class="w-full rounded-2xl bg-gray-50 py-3 text-xs font-bold text-gray-500 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #e2e8f0;
		border-radius: 10px;
	}
	:global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
		background: #1e293b;
	}
</style>
