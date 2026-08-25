import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

export type Project = CollectionEntry<'projects'>;
export type ProjectImage = string | ImageMetadata;

export function getProjectImageSrc(image: ProjectImage): string {
  return typeof image === 'string' ? image : image.src;
}

export async function getProjects(): Promise<Project[]> {
  return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const projects = await getProjects();
  const featuredProjects = projects.filter(({ data }) => data.featured);
  return (featuredProjects.length > 0 ? featuredProjects : projects).slice(0, limit);
}
