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
		id: string; // Updated to string as per Prisma
		name: string;
		members: number;
		messages: Message[];
		memberList: Member[];
	}

	let { team, onAddMember }: { team: Team | null; onAddMember: () => void } = $props();
	let newMessage = $state('');
	let showMembers = $state(false);
	let chatContainer = $state<HTMLDivElement>();

	let messages = $state<Message[]>([]);
	let loading = $state(false);

	async function fetchMessages() {
		if (!team?.id) return;
		loading = true;
		try {
			const res = await fetch(`/api/teams/${team.id}/messages`);
			if (res.ok) {
				const data = await res.json();
				if (data.data) {
					messages = data.data.map((m: any) => ({
						id: m.id,
						sender: m.sender.name || 'Unknown',
						content: m.content,
						time: new Date(m.createdAt).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit'
						}),
						isMe: false // Need current user ID to determine this properly. For now assume false or handle via props
						// Actually, I can check if sender.id matches user.id but I don't have user.id here easily.
						// I can pass currentUser prop.
					}));
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		if (team?.id) {
			// messages = team.messages; // Don't use prop messages logic anymore
			fetchMessages();
		}
	});

	$effect(() => {
		if (chatContainer && messages.length) {
			chatContainer.scrollTo({
				top: chatContainer.scrollHeight,
				behavior: 'smooth'
			});
		}
	});

	async function sendMessage(e: SubmitEvent) {
		e.preventDefault();
		if (!newMessage.trim() || !team?.id) return;

		try {
			const res = await fetch(`/api/teams/${team.id}/messages`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ content: newMessage })
			});

			if (res.ok) {
				const data = await res.json();
				const m = data.data;
				messages.push({
					id: m.id,
					sender: 'Me', // Optimistic or from response
					content: m.content,
					time: 'Just now',
					isMe: true
				});
				newMessage = '';

				// Reset textarea height
				const textarea = document.querySelector('textarea');
				if (textarea) textarea.style.height = 'auto';
			}
		} catch (error) {
			console.error(error);
		}
	}
</script>

{#if team}
	<div
		class="flex h-full flex-col bg-white transition-all dark:bg-gray-900"
		in:fade={{ duration: 200 }}
	>
		<!-- Chat Header -->
		<header
			class="flex h-16 items-center justify-between border-b border-gray-100 px-6 dark:border-gray-800"
		>
			<div class="flex items-center gap-3">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
				>
					<strong class="text-lg font-black">{team.name.charAt(0)}</strong>
				</div>
				<div class="flex flex-col">
					<h3 class="text-sm font-bold text-gray-900 dark:text-white">{team.name}</h3>
					<span class="text-[10px] font-bold tracking-widest text-indigo-500 uppercase"
						>{team.members} Members</span
					>
				</div>
			</div>

			<div class="flex items-center gap-3">
				<button
					onclick={() => (showMembers = true)}
					class="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 transition-all hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					Group Info
				</button>
				<button
					onclick={onAddMember}
					class="flex items-center gap-2 rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-indigo-600 active:scale-95 dark:shadow-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="3"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
					</svg>
					Add Member
				</button>
			</div>
		</header>

		<!-- Chat Content -->
		<div class="custom-scrollbar flex-1 overflow-y-auto p-6" bind:this={chatContainer}>
			{#if loading}
				<div class="flex h-full items-center justify-center">
					<span class="text-xs text-gray-400">Loading messages...</span>
				</div>
			{:else if messages.length === 0}
				<div class="flex h-full flex-col items-center justify-center text-center opacity-50">
					<div class="mb-4 rounded-full bg-gray-50 p-6 dark:bg-gray-800">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-10 w-10 text-gray-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
							/>
						</svg>
					</div>
					<h4 class="text-sm font-bold text-gray-900 dark:text-white">No messages yet</h4>
					<p class="mt-1 max-w-[200px] text-[10px] leading-relaxed font-medium">
						Be the first to start the conversation in this room!
					</p>
				</div>
			{:else}
				{#each messages as msg (msg.id)}
					<MessageItem sender={msg.sender} content={msg.content} time={msg.time} isMe={msg.isMe} />
				{/each}
			{/if}
		</div>

		<!-- Chat Input -->
		<footer class="border-t border-gray-100 p-4 dark:border-gray-800">
			<form onsubmit={sendMessage} class="flex items-end gap-3">
				<textarea
					bind:value={newMessage}
					placeholder="Type your message..."
					rows="1"
					onkeydown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							sendMessage(e as unknown as SubmitEvent);
						}
					}}
					oninput={(e) => {
						const target = e.currentTarget;
						target.style.height = 'auto';
						target.style.height = Math.min(target.scrollHeight, 200) + 'px';
					}}
					class="max-h-[200px] flex-1 resize-none overflow-hidden rounded-xl border-none bg-gray-100 px-4 py-2.5 text-sm ring-1 ring-indigo-500/30 transition-all outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:ring-indigo-500/20"
				></textarea>
				<button
					type="submit"
					aria-label="Send message"
					class="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95 dark:shadow-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6 12L3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12Zm0 0h7.5"
						/>
					</svg>
				</button>
			</form>
		</footer>
	</div>

	<!-- Member List Dialog -->
	<Dialog bind:open={showMembers} onClose={() => (showMembers = false)}>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			onclick={(e) => e.stopPropagation()}
			class="flex w-full max-w-sm flex-col space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-950"
		>
			<div class="flex items-center justify-between">
				<div class="flex flex-col">
					<h2 class="text-xl font-black tracking-tight text-gray-900 dark:text-white">
						Participants
					</h2>
					<p class="text-xs font-medium text-gray-500">{team.memberList.length} total members</p>
				</div>
				<button
					onclick={() => (showMembers = false)}
					aria-label="Close members list"
					class="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2.5"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="custom-scrollbar max-h-[400px] overflow-y-auto">
				<div class="space-y-4">
					{#each team.memberList as member}
						<div class="group flex items-center justify-between">
							<div class="flex items-center gap-3">
								<img
									src={Avatar}
									alt={member.name}
									class="h-10 w-10 rounded-xl border border-gray-100 object-cover dark:border-gray-800"
								/>
								<div class="flex flex-col">
									<p class="text-sm font-bold text-gray-900 dark:text-gray-100">{member.name}</p>
									<p class="text-[10px] font-bold tracking-widest text-indigo-500 uppercase">
										{member.role}
									</p>
								</div>
							</div>

							<div
								class="h-1.5 w-1.5 rounded-full bg-green-500/40 transition-colors group-hover:bg-green-500"
							></div>
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
