<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import HoverMember from '$lib/ui/HoverMember.svelte';
	import { formatDate } from '$lib/tools';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { Progress } from '$lib/components/ui/progress';
	import { Separator } from '$lib/components/ui/separator';

	import Calendar from 'lucide-svelte/icons/calendar';
	import GitBranch from 'lucide-svelte/icons/git-branch';

	let { data } = $props();

	const project = data.project;
</script>

<svelte:head>
	<title>{project?.title}</title>
</svelte:head>

<div class="container mx-auto p-8">
	<h1 class="mb-8 text-3xl font-bold">{project?.title}</h1>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
		<div class="md:col-span-2">
			<Card.Root class="mb-8">
				<Card.Header>
					<Card.Title>{m.project_overview()}</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="mb-4">{project?.description}</p>
					<div class="mb-4 flex items-center justify-between">
						<Badge variant={project?.status === 'Completed' ? 'default' : 'secondary'}
							>{project?.status}</Badge
						>
						<span class="text-sm text-muted-foreground"
							>{m.project_progress()}: {project?.progress}%</span
						>
					</div>
					<Progress value={project?.progress} class="w-full" />
					<div class="mt-4 flex justify-between text-sm text-muted-foreground">
						<span>{m.project_start()}: {formatDate(project?.start)}</span>
						<span>{m.project_end()}: {formatDate(project?.end)}</span>
					</div>
				</Card.Content>
			</Card.Root>

			{#if project.milestones}
				<Card.Root class="mb-8">
					<Card.Header>
						<Card.Title>{m.project_milestones()}</Card.Title>
					</Card.Header>
					<Card.Content>
						<ul class="space-y-4">
							{#each project?.milestones as milestone}
								<li class="flex items-center">
									<div
										class={`mr-3 h-4 w-4 rounded-full ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}
									></div>
									<span class={milestone.completed ? 'text-muted-foreground line-through' : ''}
										>{milestone.title} - {milestone.date}</span
									>
								</li>
							{/each}
						</ul>
					</Card.Content>
				</Card.Root>
			{/if}

			{#if project.updates}
				<Card.Root>
					<Card.Header>
						<Card.Title>{m.project_updates()}</Card.Title>
					</Card.Header>
					<Card.Content>
						<ul class="space-y-4">
							{#each project?.updates as update}
								<li>
									<div class="text-sm text-muted-foreground">{update.date}</div>
									<div>{update.message}</div>
								</li>
							{/each}
						</ul>
					</Card.Content>
				</Card.Root>
			{/if}
		</div>

		<div>
			<Card.Root class="mb-8">
				<Card.Header>
					<Card.Title>{m.project_team_members()}</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="flex flex-wrap gap-4">
						{#each project?.expand?.team as member}
							<HoverMember {member} />
						{/each}
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="mb-8">
				<Card.Header>
					<Card.Title>{m.project_tech()}</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="flex flex-wrap gap-2">
						{#each project?.tech.split(';') as tech}
							<Badge variant="outline">{tech}</Badge>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>{m.project_qa()}</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-4">
					<Button class="w-full" href={project?.repo} target="_blank">
						<GitBranch class="mr-2 h-4 w-4" />
						{m.project_qa_repo()}
					</Button>

					<Button class="w-full" variant="outline" href="/contacts">
						<Calendar class="mr-2 h-4 w-4" />
						{m.project_qa_contact()}
					</Button>
				</Card.Content>
			</Card.Root>
		</div>
	</div>

	<Separator class="my-8" />

	<footer>
		<div class="flex items-center justify-between">
			<Button variant="outline" href="/projects">{m.project_back()}</Button>
		</div>
	</footer>
</div>
