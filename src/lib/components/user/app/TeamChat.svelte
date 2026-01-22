<script lang="ts">
	import MessageItem from './MessageItem.svelte';
	import Avatar from '$lib/images/solo.png';
	import Dialog from './Dialog.svelte';
	import { fade, fly } from 'svelte/transition';

	interface Message {
		id: string;
		sender: string;
		content: string;
		time: string;
		isMe: boolean;
	}

	interface Member {
		name: string;
		role: string;
		avatar?: string;
	}

	interface Team {
		id: number;
		name: string;
		members: number;
		messages: Message[];
		memberList: Member[];
	}

	let { team, onAddMember }: { team: Team | null, onAddMember: () => void } = $props();
	let newMessage = $state('');
	let showMembers = $state(false);

	function sendMessage(e: SubmitEvent) {
		e.preventDefault();
		if (!newMessage.trim() || !team) return;
		
		const msg: Message = {
			id: Math.random().toString(36).substr(2, 9),
			sender: 'Alex',
			content: newMessage,
			time: 'Just now',
			isMe: true
		};
		
		team.messages.push(msg);
		newMessage = '';
		
		// Simulate response
		setTimeout(() => {
			if (!team) return;
			team.messages.push({
				id: Math.random().toString(36).substr(2, 9),
				sender: 'Developer Assistant',
				content: 'Received! Let me look into that part of the code.',
				time: 'Just now',
				isMe: false
			});
		}, 1500);
	}
</script>

{#if team}
	<div class="flex h-full flex-col bg-white transition-all dark:bg-gray-900" in:fade={{ duration: 200 }}>
		<!-- Chat Header -->
		<header class="flex h-16 items-center justify-between border-b border-gray-100 px-6 dark:border-gray-800">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
					<strong class="text-lg font-black">{team.name.charAt(0)}</strong>
				</div>
				<div class="flex flex-col">
					<h3 class="text-sm font-bold text-gray-900 dark:text-white">{team.name}</h3>
					<span class="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{team.members} Participants</span>
				</div>
			</div>
			
			<div class="flex items-center gap-3">
				<button 
					onclick={() => (showMembers = true)}
					class="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 transition-all hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
					</svg>
					View Members
				</button>
				<button 
					onclick={onAddMember}
					class="flex items-center gap-2 rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-indigo-600 active:scale-95 dark:shadow-none"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
					</svg>
					Add Member
				</button>
			</div>
		</header>

		<!-- Chat Content -->
		<div class="flex-1 overflow-y-auto p-6 custom-scrollbar">
			{#each team.messages as msg (msg.id)}
				<MessageItem 
					sender={msg.sender} 
					content={msg.content} 
					time={msg.time} 
					isMe={msg.isMe} 
				/>
			{/each}
		</div>

		<!-- Chat Input -->
		<footer class="border-t border-gray-100 p-4 dark:border-gray-800">
			<form onsubmit={sendMessage} class="flex gap-3">
				<input 
					type="text" 
					bind:value={newMessage}
					placeholder="Type your message..."
					class="flex-1 rounded-xl border-none bg-gray-100 px-4 py-2.5 text-sm ring-1 ring-gray-200 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-gray-700"
				/>
				<button 
					type="submit"
					class="flex h-[40px] w-[40px] items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95 dark:shadow-none"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12Zm0 0h7.5" />
					</svg>
				</button>
			</form>
		</footer>
	</div>
	
	<!-- Member List Dialog -->
	<Dialog bind:open={showMembers} onClose={() => (showMembers = false)}>
		<div 
			onclick={(e) => e.stopPropagation()}
			class="flex w-full max-w-sm flex-col space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
		>
			<div class="flex items-center justify-between">
				<div class="flex flex-col">
					<h2 class="text-xl font-black tracking-tight text-gray-900 dark:text-white">Participants</h2>
					<p class="text-xs font-medium text-gray-500">{team.memberList.length} total members</p>
				</div>
				<button 
					onclick={() => (showMembers = false)}
					class="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="max-h-[400px] overflow-y-auto custom-scrollbar">
				<div class="space-y-4">
					{#each team.memberList as member}
						<div class="flex items-center justify-between group">
							<div class="flex items-center gap-3">
								<img src={Avatar} alt={member.name} class="h-10 w-10 rounded-xl border border-gray-100 object-cover dark:border-gray-800" />
								<div class="flex flex-col">
									<p class="text-sm font-bold text-gray-900 dark:text-gray-100">{member.name}</p>
									<p class="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{member.role}</p>
								</div>
							</div>
							
							<div class="h-1.5 w-1.5 rounded-full bg-green-500/40 group-hover:bg-green-500 transition-colors"></div>
						</div>
					{/each}
				</div>
			</div>
			
			<button 
				onclick={onAddMember}
				class="w-full rounded-xl bg-gray-50 py-3 text-xs font-bold text-gray-600 transition-all hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
			>
				Invite Someone Else
			</button>
		</div>
	</Dialog>
{:else}
	<div class="flex h-full flex-col items-center justify-center bg-gray-50/20 text-center dark:bg-gray-950/20">
		<div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
			</svg>
		</div>
		<h4 class="text-xl font-bold text-gray-900 dark:text-white">Select a Team Room</h4>
		<p class="mt-2 max-w-xs text-sm font-medium text-gray-500">Pick a discussion group from the sidebar to start collaborating with your team.</p>
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
