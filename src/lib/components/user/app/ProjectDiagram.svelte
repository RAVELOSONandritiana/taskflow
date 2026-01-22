<script lang="ts">
	import { v4 } from 'uuid';
	import { fade, fly } from 'svelte/transition';
	import Dialog from './Dialog.svelte';

	interface Node {
		id: string;
		x: number;
		y: number;
		label: string;
		type: 'action' | 'condition' | 'start' | 'end';
	}

	interface Connection {
		id: string;
		fromId: string;
		toId: string;
	}

	let nodes = $state<Node[]>([
		{ id: v4(), x: 100, y: 150, label: 'Start Project', type: 'start' },
		{ id: v4(), x: 300, y: 150, label: 'Design Phase', type: 'action' },
		{ id: v4(), x: 500, y: 150, label: 'Success?', type: 'condition' },
		{ id: v4(), x: 700, y: 150, label: 'Launch', type: 'end' }
	]);

	let connections = $state<Connection[]>([]);

	// Initialize some connections
	$effect.pre(() => {
		if (connections.length === 0 && nodes.length >= 4) {
			connections.push({ id: v4(), fromId: nodes[0].id, toId: nodes[1].id });
			connections.push({ id: v4(), fromId: nodes[1].id, toId: nodes[2].id });
			connections.push({ id: v4(), fromId: nodes[2].id, toId: nodes[3].id });
		}
	});

	let draggingNodeId = $state<string | null>(null);
	let connectingFromId = $state<string | null>(null);
	let openAddNode = $state(false);
	let selectedElement = $state<{ type: 'node' | 'connection'; id: string } | null>(null);
	
	let pointerPos = $state({ x: 0, y: 0 });
	let hoveredNodeId = $state<string | null>(null);

	let newNodeData = $state({
		label: '',
		type: 'action' as Node['type']
	});

	function onPointerDown(e: PointerEvent, id: string) {
		e.stopPropagation();
		draggingNodeId = id;
		selectedElement = { type: 'node', id };
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
	}

	function startConnecting(e: PointerEvent, id: string) {
		e.stopPropagation();
		connectingFromId = id;
		pointerPos = { x: e.clientX, y: e.clientY };
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		pointerPos = { 
			x: e.clientX - rect.left, 
			y: e.clientY - rect.top 
		};

		if (draggingNodeId) {
			const node = nodes.find((n) => n.id === draggingNodeId);
			if (node) {
				node.x = e.clientX - rect.left - 70;
				node.y = e.clientY - rect.top - 35;
			}
		}

		if (connectingFromId) {
			// Find node under pointer
			const elements = document.elementsFromPoint(e.clientX, e.clientY);
			const nodeElement = elements.find(el => el.hasAttribute('data-node-id'));
			hoveredNodeId = nodeElement ? nodeElement.getAttribute('data-node-id') : null;
		}
	}

	function onPointerUp(e: PointerEvent) {
		if (connectingFromId && hoveredNodeId && connectingFromId !== hoveredNodeId) {
			// Create connection
			const exists = connections.find(
				(c) => (c.fromId === connectingFromId && c.toId === hoveredNodeId) || 
					   (c.fromId === hoveredNodeId && c.toId === connectingFromId)
			);
			if (!exists) {
				connections.push({ id: v4(), fromId: connectingFromId, toId: hoveredNodeId! });
			}
		}
		draggingNodeId = null;
		connectingFromId = null;
		hoveredNodeId = null;
	}

	function addNode() {
		if (!newNodeData.label.trim()) return;
		nodes.push({
			id: v4(),
			x: 100,
			y: 100,
			label: newNodeData.label,
			type: newNodeData.type
		});
		newNodeData = { label: '', type: 'action' };
		openAddNode = false;
	}

	function deleteSelected() {
		if (!selectedElement) return;
		if (selectedElement.type === 'node') {
			const id = selectedElement.id;
			nodes = nodes.filter((n) => n.id !== id);
			connections = connections.filter((c) => c.fromId !== id && c.toId !== id);
		} else {
			connections = connections.filter((c) => c.id !== selectedElement!.id);
		}
		selectedElement = null;
	}

	function getPath(from: Node, to: Node) {
		const startX = from.x + 70;
		const startY = from.y + 35;
		const endX = to.x + 70;
		const endY = to.y + 35;
		
		const cp1x = startX + (endX - startX) / 2;
		const cp2x = startX + (endX - startX) / 2;
		
		return `M ${startX} ${startY} C ${cp1x} ${startY}, ${cp2x} ${endY}, ${endX} ${endY}`;
	}

	function getGhostPath(from: Node, pointer: { x: number, y: number }) {
		const startX = from.x + 70;
		const startY = from.y + 35;
		const endX = pointer.x;
		const endY = pointer.y;
		
		const cp1x = startX + (endX - startX) / 2;
		const cp2x = startX + (endX - startX) / 2;
		
		return `M ${startX} ${startY} C ${cp1x} ${startY}, ${cp2x} ${endY}, ${endX} ${endY}`;
	}
</script>

<div class="relative h-full w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-inner dark:border-gray-800 dark:bg-gray-950">
	<!-- Workspace Controls -->
	<div class="absolute left-6 top-6 z-20 space-y-1">
		<h3 class="text-sm font-black uppercase tracking-widest text-gray-400">Diagram Builder</h3>
		<p class="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
			{#if connectingFromId}
				<span class="animate-pulse">Drag to target node to link...</span>
			{:else}
				Drag node to move • Drag handle (○) to link • Click to select
			{/if}
		</p>
	</div>

	<!-- Floating Toolbar -->
	<div class="absolute right-6 top-6 z-20 flex flex-col gap-2" onclick={(e) => e.stopPropagation()}>
		<button 
			onclick={() => openAddNode = true}
			class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</button>
		
		{#if selectedElement}
			<button 
				onclick={deleteSelected}
				in:fly={{ y: 10, duration: 200 }}
				class="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 shadow-xl transition-all hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg>
			</button>
		{/if}
	</div>

	<!-- Main Canvas -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div 
		class="h-full w-full touch-none"
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onclick={() => selectedElement = null}
	>
		<svg class="h-full w-full">
			<defs>
				<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
					<circle cx="2" cy="2" r="1" fill="currentColor" class="text-gray-200 dark:text-gray-800" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid)" />

			<!-- Connections -->
			{#each connections as conn (conn.id)}
				{@const from = nodes.find(n => n.id === conn.fromId)}
				{@const to = nodes.find(n => n.id === conn.toId)}
				{#if from && to}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<path 
						d={getPath(from, to)} 
						fill="none" 
						stroke="currentColor" 
						stroke-width={selectedElement?.id === conn.id ? "4" : "2.5"} 
						onclick={(e) => { e.stopPropagation(); selectedElement = { type: 'connection', id: conn.id }; }}
						class="cursor-pointer transition-all {selectedElement?.id === conn.id ? 'text-indigo-500' : 'text-indigo-200 hover:text-indigo-400 dark:text-indigo-900/50 dark:hover:text-indigo-700'}"
					/>
				{/if}
			{/each}

			<!-- Ghost Connection Line -->
			{#if connectingFromId}
				{@const from = nodes.find(n => n.id === connectingFromId)}
				{#if from}
					<path 
						d={getGhostPath(from, pointerPos)} 
						fill="none" 
						stroke="currentColor" 
						stroke-width="2.5" 
						stroke-dasharray="8,8"
						class="text-indigo-500 animate-[dash_10s_linear_infinite]"
					/>
				{/if}
			{/if}
		</svg>

		{#each nodes as node (node.id)}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div 
				onpointerdown={(e) => onPointerDown(e, node.id)}
				onclick={(e) => e.stopPropagation()}
				data-node-id={node.id}
				class="absolute flex flex-col items-center justify-center select-none rounded-2xl border-2 p-5 transition-all
				{selectedElement?.id === node.id ? 'border-indigo-500 shadow-xl scale-105' : 'border-transparent shadow-sm hover:shadow-md'}
				{hoveredNodeId === node.id && connectingFromId !== node.id ? 'ring-4 ring-indigo-500/30' : ''}
				{node.type === 'start' ? 'bg-green-50/80 dark:bg-green-900/10' : node.type === 'end' ? 'bg-red-50/80 dark:bg-red-900/10' : node.type === 'condition' ? 'bg-orange-50/80 dark:bg-orange-900/10' : 'bg-white/80 dark:bg-gray-800/80'} backdrop-blur-md"
				style="left: {node.x}px; top: {node.y}px; width: 140px; height: 70px;"
			>
				<div class="flex items-center gap-2">
					<div class="h-2 w-2 rounded-full {node.type === 'start' ? 'bg-green-500' : node.type === 'end' ? 'bg-red-500' : node.type === 'condition' ? 'bg-orange-500' : 'bg-indigo-500'}"></div>
					<span class="text-[9px] font-black uppercase tracking-widest text-gray-400">{node.type}</span>
				</div>
				<p class="truncate text-xs font-black text-gray-900 dark:text-gray-100">{node.label}</p>
				
				<!-- Connection Handle (Only visible on selection) -->
				{#if selectedElement?.id === node.id}
					<button 
						onpointerdown={(e) => startConnecting(e, node.id)}
						class="absolute -right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg ring-4 ring-white transition-transform hover:scale-125 dark:ring-gray-950"
						title="Drag to connect"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>
				{/if}

				{#if connectingFromId === node.id}
					<div class="absolute -inset-2 animate-pulse rounded-2xl border-2 border-indigo-500"></div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<!-- Add Node Dialog -->
<Dialog bind:open={openAddNode} onClose={() => openAddNode = false}>
	<form 
		onclick={(e) => e.stopPropagation()}
		onsubmit={(e) => { e.preventDefault(); addNode(); }}
		class="flex w-full max-w-sm flex-col space-y-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
	>
		<div class="space-y-2">
			<h2 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">New Diagram Element</h2>
			<p class="text-xs font-medium text-gray-500 italic">Select a type and give your step a label.</p>
		</div>

		<div class="space-y-4">
			<label class="block">
				<span class="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">Step Label</span>
				<input 
					type="text" 
					bind:value={newNodeData.label}
					placeholder="e.g. Data Processing, API Call..."
					required
					class="w-full rounded-2xl border-none bg-gray-100 px-4 py-3 text-sm font-bold ring-1 ring-gray-200 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-gray-700"
				/>
			</label>

			<div class="space-y-3">
				<span class="block text-[11px] font-black uppercase tracking-widest text-gray-400">Element Type</span>
				<div class="grid grid-cols-2 gap-3">
					{#each ['start', 'action', 'condition', 'end'] as type}
						<button
							type="button"
							onclick={() => newNodeData.type = type as any}
							class="rounded-xl border-2 py-2.5 text-[10px] font-black uppercase tracking-wider transition-all
							{newNodeData.type === type 
								? 'border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20' 
								: 'border-transparent bg-gray-50 text-gray-400 hover:bg-gray-100 dark:bg-gray-900'}"
						>
							{type}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-2.5 pt-2">
			<button type="submit" class="w-full rounded-2xl bg-indigo-600 py-3.5 text-sm font-black text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700 dark:shadow-none transition-all active:scale-95">
				Place on Canvas
			</button>
			<button type="button" onclick={() => openAddNode = false} class="w-full rounded-2xl bg-gray-50 py-3 text-sm font-bold text-gray-500 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800">
				Cancel
			</button>
		</div>
	</form>
</Dialog>

<style>
	:global(body) {
		overscroll-behavior: none;
	}
	@keyframes dash {
		to {
			stroke-dashoffset: -100;
		}
	}
</style>
