<script lang="ts">
	import Banner from '$lib/components/user/Banner.svelte';
	import ListCard from '$lib/components/user/about/ListCard.svelte';
	import Section from '$lib/components/user/about/Section.svelte';
	import KeyFeatures from '$lib/components/user/KeyFeatures.svelte';
	import Logo from '$lib/images/file_0000000027bc722fa9a6c62735b1a346.png';
	import Simplicity from '$lib/images/simplicity.svg';
	import Productivity from '$lib/images/productivity.svg';
	import Accessibility from '$lib/images/accessibility.svg';
	import Collaboration from '$lib/images/github.svg';
	import Progress from '$lib/images/simplicity.svg';
	import Priorities from '$lib/images/productivity.svg';
</script>

<Banner>
	<h2 class="mx-auto text-3xl font-extrabold sm:text-5xl dark:text-white">
		What is <strong class="text-indigo-500">TaskFlow?</strong>
	</h2>
	<p class="p-gray mx-10 md:mx-auto max-w-2xl dark:text-gray-300">
		TaskFlow is a simple and modern project and task management application designed to help users
		stay organized and productive. Whether you're a freelancer, a startup, or a small business,
		TaskFlow provides the tools you need to manage projects and daily tasks without unnecessary complexity.
	</p>
</Banner>

<section class="space-y-10 md:mt-50 md:space-y-40">
	<div class="grid grid-cols-1 md:grid-cols-2 md:px-20">
		<Section title="Who is Taskflow?" class="justify-self-start md:justify-self-end">
			<p class="max-w-md text-gray-500 dark:text-gray-300">
				TaskFlow is built for individuals and small teams who want a simple way to manage projects
				and daily tasks without unnecessary complexity. Whether you're a freelancer, a startup, or a small business,
				TaskFlow provides the tools you need to stay organized and productive. Our mission is to simplify
				project management and make it accessible to everyone.
			</p>
		</Section>
		<img src={Logo} alt="logo TaskFlow" class="hidden h-50 justify-self-center md:block rounded-lg shadow-lg" />
	</div>
	<div class="mx-10 space-y-10 md:mx-30 md:text-center">
		<h4 class="text-2xl font-bold dark:text-white">Our Vision</h4>
		<p class="max-w-md text-gray-500 md:mx-auto">
			At TaskFlow, our vision is to empower individuals and teams to achieve their goals efficiently.
			We believe in simplicity, productivity, and accessibility for all users.
		</p>
		<div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
			<div
				class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 dark:bg-gray-800 dark:border-gray-700"
			>
				<img src={Simplicity} alt="icone" class="mx-auto w-20" />
				<h4 class="text-center text-xl font-bold text-indigo-500 dark:text-white">Simplicity</h4>
				<p class="mx-auto max-w-sm text-gray-500 text-center dark:text-gray-300">
					We focus on providing a clean and intuitive interface for managing tasks and projects.
				</p>
			</div>
			<div
				class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 dark:bg-gray-800 dark:border-gray-700"
			>
				<img src={Productivity} alt="icone" class="mx-auto w-20" />
				<h4 class="text-center text-xl font-extrabold text-indigo-500 dark:text-white">
					Productivity
				</h4>
				<p class="mx-auto max-w-sm text-gray-500 text-center dark:text-gray-300">
					TaskFlow helps you stay focused on what matters most, boosting your productivity.
				</p>
			</div>
			<div
				class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 dark:bg-gray-800 dark:border-gray-700"
			>
				<img src={Accessibility} alt="icone" class="mx-auto w-20" />
				<h4 class="text-center text-xl font-extrabold text-indigo-500 dark:text-white">
					Accessibility
				</h4>
				<p class="mx-auto max-w-sm text-gray-500 text-center dark:text-gray-300">
					Our tools are designed to be accessible to everyone, regardless of technical expertise.
				</p>
			</div>
		</div>
	</div>

	<KeyFeatures />
</section>

<div class="mx-auto grid grid-cols-1 md:px-20">
	<Section title="What does TaskFlow do?" class="mt-30 text-center">
		<p class="text-gray-500 dark:text-gray-300">TaskFlow allows users to:</p>
		<div class="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
			<ListCard title="Create and manage projects" icon={Collaboration} />
			<ListCard title="Add and track tasks" icon={Progress} />
			<ListCard title="Monitor progress easily" icon={Progress} />
			<ListCard title="Stay focused on priorities" icon={Priorities} />
			<ListCard title="Collaborate with team members" icon={Collaboration} />
			<ListCard title="Access projects from anywhere" icon={Accessibility} />
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
			<p class="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-gray-300">
				TaskFlow is an evolving project, with continuous improvements planned to enhance
				productivity and usability. We are committed to delivering new features and updates
				to meet the growing needs of our users.
			</p>
		</div>
	</div>
</section>
