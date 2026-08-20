import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export async function getProjects(): Promise<Project[]> {
  return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const projects = await getProjects();
  const featuredProjects = projects.filter(({ data }) => data.featured);
  return (featuredProjects.length > 0 ? featuredProjects : projects).slice(0, limit);
}
