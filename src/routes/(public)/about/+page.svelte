<script lang="ts">
	import Banner from '$lib/components/user/Banner.svelte';
	import ListCard from '$lib/components/user/about/ListCard.svelte';
	import Section from '$lib/components/user/about/Section.svelte';
	import KeyFeatures from '$lib/components/user/KeyFeatures.svelte';
	import Logo from '$lib/images/file_0000000027bc722fa9a6c62735b1a346.png';
</script>

<Banner>
	<h2 class="mx-auto text-3xl font-extrabold sm:text-5xl">
		What is <strong class="text-indigo-500">TaskFlow?</strong>
	</h2>
	<p class="p-gray mx-10 md:mx-auto max-w-sm">
		TaskFlow is a simple and modern project and task management application designed to help users
		stay organized and productive.
	</p>
</Banner>

<section class="space-y-10 md:mt-50 md:space-y-40">
	<div class="grid grid-cols-1 md:grid-cols-2 md:px-20">
		<Section title="Who is Taskflow?" class="justify-self-start md:justify-self-end">
			<p class="max-w-md text-gray-500">
				TaskFlow is built for individuals and small teams who want a simple way to manage projects
				and daily tasks withour unecessary complexity.
			</p>
		</Section>
		<img src={Logo} alt="logo TaskFlow" class="hidden h-50 justify-self-center md:block" />
	</div>
	<div class="mx-10 space-y-10 md:mx-30 md:text-center">
		<h4 class="text-2xl font-bold dark:text-white">Our Vison</h4>
		<p class="max-w-md text-gray-500 md:mx-auto">
			TaskFlow is built for individuals and small teams who want a simple way to manage projects and
			daily tasks withour unecessary complexity.
		</p>
		<div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
			<div
				class="space-y-4 rounded-md border border-gray-500 px-4 py-6 shadow-md transition-transform duration-300 hover:-translate-y-2"
			>
				<img src={Logo} alt="icone" class="mx-auto w-20" />
				<h4 class="text-center text-xl font-bold text-indigo-500 dark:text-white">Our Vison</h4>
				<p class="mx-auto max-w-sm text-gray-500 text-center">
					TaskFlow is built for individuals and small teams.
				</p>
			</div>
			<div
				class="space-y-4 rounded-md border border-gray-500 px-4 py-6 shadow-md transition-transform duration-300 hover:-translate-y-2"
			>
				<img src={Logo} alt="icone" class="mx-auto w-20" />
				<h4 class="text-center text-xl font-extrabold text-indigo-500 dark:text-white">
					Our Vison
				</h4>
				<p class="mx-auto max-w-sm text-gray-500 text-center">
					TaskFlow is built for individuals and small teams.
				</p>
			</div>
			<div
				class="space-y-4 rounded-md border border-gray-500 px-4 py-6 shadow-md transition-transform duration-300 hover:-translate-y-2"
			>
				<img src={Logo} alt="icone" class="mx-auto w-20" />
				<h4 class="text-center text-xl font-extrabold text-indigo-500 dark:text-white">
					Our Vison
				</h4>
				<p class="mx-auto max-w-sm text-gray-500 text-center">
					TaskFlow is built for individuals and small teams.
				</p>
			</div>
		</div>
	</div>

	<KeyFeatures />
</section>

<div class="mx-auto grid grid-cols-1 md:px-20">
	<Section title="What does TaskFlow do?" class="mt-30 text-center">
		<p class="text-gray-500">TaskFlow allow users to:</p>
		<div class="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
			<ListCard title="Create and manage projects" />
			<ListCard title="Add and track tasks" />
			<ListCard title="Monitor progress easily" />
			<ListCard title="Stay focused on priorities" />
		</div>
	</Section>
	<div></div>
</div>

<section class="my-32">
	<div class="mx-auto max-w-7xl px-10 md:px-20">
		<div class="text-center">
			<h2 class="text-3xl font-extrabold text-gray-900 sm:text-5xl dark:text-white">
				Looking <strong class="text-indigo-500">Forward</strong>
			</h2>
			<p class="mx-auto mt-4 max-w-sm text-gray-500">
				TaskFlow is an evolving project, with continuous improvements planned to enhance
				productivity and usability.
			</p>
		</div>
	</div>
</section>
