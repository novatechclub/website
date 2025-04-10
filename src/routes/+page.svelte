<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { scrollToAnchor, formatDate } from '$lib/tools';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';

	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Calendar from 'lucide-svelte/icons/calendar';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import MapPin from 'lucide-svelte/icons/map-pin';

	import HeroImage from '$lib/assets/NTC Website Landing Image.png?enhanced';

	let { data } = $props();
</script>

<main class="container mx-auto flex-grow px-4">
	<section class="flex flex-col-reverse items-center justify-between py-20 md:flex-row">
		<div class="mb-8 md:mb-0 md:w-1/2">
			<h1 class="mb-4 text-4xl font-bold md:text-6xl">{m.hero_title()}</h1>
			<p class="mb-6 text-xl">{m.hero_description()}</p>
			<Button size="lg" onclick={() => scrollToAnchor('events')}>
				{m.hero_button()}<ArrowRight class="ml-2" />
			</Button>
		</div>
		<div class="md:w-1/2">
			<enhanced:img src={HeroImage} alt="Tech Club Hero" class="rounded-lg shadow-lg" />
		</div>
	</section>

	{#await data.events}
		<section class="py-16" id="events">
			<h2 class="mb-8 text-center text-3xl font-bold">{m.upcoming_events()}</h2>

			<div class="flex w-full justify-center">
				<LoaderCircle class="animate-spin" />
			</div>
		</section>
	{:then events}
		{#if events.items.length > 0}
			<section class="py-16" id="events">
				<h2 class="mb-8 text-center text-3xl font-bold">{m.upcoming_events()}</h2>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
					{#each events.items as event}
						<Card.Root>
							<Card.Header>
								<Card.Title>{event.title}</Card.Title>
								<Card.Description>
									<Calendar class="mr-2 inline-block h-4 w-4" />
									{formatDate(event.date)}
									|
									{event.time}</Card.Description
								>
							</Card.Header>
							<Card.Content>
								<div class="mt-1 flex items-center">
									<MapPin class="mr-2 h-4 w-4" />
									{event.location}
								</div>
							</Card.Content>
							<Card.Footer>
								<Button variant="outline" href="/events/{event.id}">{m.event_button()}</Button>
							</Card.Footer>
						</Card.Root>
					{/each}
				</div>
				<div class="text-center">
					<Button variant="outline" class="mt-4" href="/events">{m.events_more_button()}</Button>
				</div>
			</section>
		{/if}
	{/await}

	<!-- <section class="my-16 rounded-lg bg-secondary py-20 text-center" id="cta">
		<div class="mx-auto max-w-3xl">
			<h2 class="mb-4 text-3xl font-bold">{m.cta_title()}</h2>
			<p class="mb-8 text-xl">
				{m.cta_description()}
			</p>
			<Button size="lg" href="/contacts">{m.cta_button()}</Button>
		</div>
	</section> -->

	{#await data.projects}
		<section class="py-16">
			<h2 class="mb-8 text-center text-3xl font-bold">{m.our_projects()}</h2>

			<div class="flex w-full justify-center">
				<LoaderCircle class="animate-spin" />
			</div>
		</section>
	{:then projects}
		{#if projects.items.length > 0}
			<section class="py-16">
				<h2 class="mb-8 text-center text-3xl font-bold">{m.our_projects()}</h2>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
					{#each projects.items as project}
						<Card.Root>
							<Card.Header>
								<Card.Title>{project.title}</Card.Title>
								<Card.Description>{m.project_status()}: {project.status}</Card.Description>
							</Card.Header>
							<Card.Content>
								<p>
									{project.description?.length < 350
										? project.description
										: project.description?.slice(0, 350) + '...'}
								</p>
							</Card.Content>
							<Card.Footer>
								<Button variant="outline" href="/projects/{project.id}">{m.project_button()}</Button
								>
							</Card.Footer>
						</Card.Root>
					{/each}
				</div>

				<div class="text-center">
					<Button variant="outline" class="mt-4" href="/projects">{m.projects_more_button()}</Button
					>
				</div>
			</section>
		{/if}
	{/await}

	{#await data.articles}
		<section class="py-16">
			<h2 class="mb-8 text-center text-3xl font-bold">{m.latest_articles()}</h2>

			<div class="flex w-full justify-center">
				<LoaderCircle class="animate-spin" />
			</div>
		</section>
	{:then articles}
		{#if articles.items.length > 0}
			<section class="py-16">
				<h2 class="mb-8 text-center text-3xl font-bold">{m.latest_articles()}</h2>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
					{#each articles.items as article}
						<Card.Root>
							<Card.Header>
								<Card.Title>{article.title}</Card.Title>
							</Card.Header>
							<Card.Content>
								<p class="mb-2 text-sm text-muted-foreground">
									{m.articles_by()}
									{#each article?.expand?.author as author, idx (author.id)}
										{idx === 0 ? '' : ', '}
										{author?.name}
									{/each}
									{m.articles_on()}
									{formatDate(article.date)}
								</p>
								<p>
									{article.abstract?.length < 350
										? article.abstract
										: article.abstract?.slice(0, 350) + '...'}
								</p>
							</Card.Content>
							<Card.Footer>
								<Button variant="outline" href="/articles/{article.id}"
									>{m.articles_button()}</Button
								>
							</Card.Footer>
						</Card.Root>
					{/each}
				</div>

				<div class="text-center">
					<Button variant="outline" class="mt-4" href="/articles">{m.articles_more_button()}</Button
					>
				</div>
			</section>
		{/if}
	{/await}
</main>
