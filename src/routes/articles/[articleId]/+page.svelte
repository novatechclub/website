<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { formatDate } from '$lib/tools';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import * as Drawer from '$lib/components/ui/drawer/index.js';

	import Calendar from 'lucide-svelte/icons/calendar';
	import Clock from 'lucide-svelte/icons/clock';
	import HoverAuthor from './HoverAuthor.svelte';

	let { data } = $props();

	const article = data.article;
</script>

<svelte:head>
	<title>{article?.title}</title>
	<meta name="author" content={article?.expand?.author?.name} />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<article class="mx-auto max-w-3xl">
		<header class="mb-8">
			<h1 class="mb-4 text-4xl font-bold">{article?.title}</h1>
			<div class="mb-4 flex items-center justify-between">
				<HoverAuthor member={article.expand?.author} />

				<div class="flex items-center text-sm text-muted-foreground">
					<Calendar class="mr-1 h-4 w-4" />
					<span class="mr-4">{formatDate(article?.date)}</span>
					<Clock class="mr-1 h-4 w-4" />
					<span>{Math.round(article?.text.split(' ').length / 200)}</span>
				</div>
			</div>
			{#if article?.tags}
				<div class="mb-4 flex flex-wrap gap-2">
					{#each article.tags.split(';') as tag}
						<Badge variant="secondary">{tag}</Badge>
					{/each}
				</div>
			{/if}
		</header>

		<div class="prose prose-slate mb-8 max-w-none lg:prose-lg">
			<blockquote class="mt-6 border-l-2 pl-6 italic">
				{article?.abstract}
			</blockquote>

			{@html article?.text}
		</div>

		{#if article?.sources}
			<Drawer.Root>
				<Drawer.Trigger class={buttonVariants({ variant: 'outline' })}
					>{m.article_sources()}</Drawer.Trigger
				>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title>{m.article_sources()}</Drawer.Title>

						<ul class="mb-6 ml-6 list-disc [&>li]:mt-2">
							{#each article?.sources?.split(';') as source}
								<li>
									<a href={source} target="_blank" rel="noreferrer noopener">{source}</a>
								</li>
							{/each}
						</ul>
					</Drawer.Header>
					<Drawer.Footer>
						<Drawer.Close class={buttonVariants({ variant: 'outline' })}>{m.close()}</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		{/if}

		<Separator class="my-8" />
	</article>

	<footer>
		<div class="flex items-center justify-between">
			<Button variant="outline" href="/articles">{m.article_back()}</Button>
		</div>
	</footer>
</div>
