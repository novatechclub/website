<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button';

	import Handshake from 'lucide-svelte/icons/handshake';
	import Megaphone from 'lucide-svelte/icons/megaphone';
	import Users from 'lucide-svelte/icons/users';
	import Brain from 'lucide-svelte/icons/brain';
	import Code from 'lucide-svelte/icons/code';

	const departments = [
		{
			name: m.dep_external_relations(),
			description: m.dep_external_relations_desc(),
			icon: Handshake
		},
		{
			name: m.dep_marketing(),
			description: m.dep_marketing_desc(),
			icon: Megaphone
		},
		{
			name: m.dep_people(),
			description: m.dep_people_desc(),
			icon: Users
		},
		{
			name: m.dep_research(),
			description: m.dep_research_desc(),
			icon: Brain
		},
		{
			name: m.dep_tech(),
			description: m.dep_tech_desc(),
			icon: Code
		}
	];
</script>

<main class="container mx-auto flex-grow px-4 py-8">
	<h1 class="mb-8 text-center text-4xl font-bold">{m.about_title()}</h1>

	<section class="mb-12">
		<p class="mb-8 text-center text-xl">
			{m.about_description()}
		</p>
		<h2 class="mb-4 text-center text-2xl font-semibold">Our Mission</h2>
		<p class="mb-8 text-center text-lg text-black">
			{m.about_mission()}
		</p>
	</section>

	<h2 class="mb-8 text-center text-2xl font-semibold">Club Departments</h2>

	<section class="flex justify-center">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			{#each departments as dept, index}
				{#if index === departments.length - 1}
					<div class="md:col-span-2 flex justify-center">
						<div class="w-full md:w-1/2">
							<Card.Root>
								<Card.Header>
									<Card.Title class="flex items-center">
										<span class="mr-2 h-6 w-6"> <dept.icon /></span>
										{dept.name}</Card.Title
									>
								</Card.Header>
								<Card.Content>
									<p>{dept.description}</p>
								</Card.Content>
							</Card.Root>
						</div>
					</div>
				{:else}
					<Card.Root>
						<Card.Header>
							<Card.Title class="flex items-center">
								<span class="mr-2 h-6 w-6"> <dept.icon /></span>
								{dept.name}</Card.Title
							>
						</Card.Header>
						<Card.Content>
							<p>{dept.description}</p>
						</Card.Content>
					</Card.Root>
				{/if}
			{/each}
		</div>
	</section>

	<section class="my-12">
		<p class="mb-8 text-center text-2xl font-semibold">Supported by:</p>
		<div class="flex w-full justify-center">
			<div class="w-[220px]">
				<a
					href="https://www.hetzner.com/?mtm_campaign=novatechclub_sponsoring&mtm_medium=referral&mtm_content=logo_link"
					target="_blank"
				>
					<img src="/hetzner-logo.jpg" alt="Hetzner Logo" />
				</a>
			</div>
		</div>
	</section>
</main>
