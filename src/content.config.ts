import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const detailSection = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  eyebrow: z.string(),
  title: z.string(),
  paragraphs: z.array(z.string()).default([]),
  listTitle: z.string().optional(),
  items: z.array(z.string()).default([]),
  note: z.string().optional(),
});

const plans = defineCollection({
  loader: glob({ base: './src/content/plans', pattern: '**/*.json' }),
  schema: z.object({
    order: z.number().int().positive(),
    level: z.string(),
    name: z.string(),
    title: z.string(),
    modality: z.string(),
    duration: z.string(),
    validity: z.string(),
    price: z.number().positive(),
    featured: z.boolean().default(false),
    description: z.string(),
    scope: z.string(),
    revisions: z.string(),
    support: z.string(),
    introduction: z.array(z.string()).min(1),
    highlights: z.array(z.string()).min(1),
    includes: z.array(z.string()).min(1),
    investmentDescription: z.string(),
    hostingRenewal: z.string(),
    hostingNotes: z.array(z.string()).default([]),
    paymentFinalLabel: z.string(),
    externalServices: z.boolean().default(false),
    timelineInputs: z.array(z.string()).min(1),
    timelineWaitingNote: z.string(),
    detailSections: z.array(detailSection).min(1),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) => z.object({
    order: z.number().int().positive(),
    title: z.string(),
    subtitle: z.string(),
    excerpt: z.string(),
    type: z.string(),
    year: z.number().int().min(2000),
    client: z.string(),
    image: z.union([image(), z.url()]),
    imageAlt: z.string(),
    tech: z.array(z.string()).min(1),
    featured: z.boolean().default(false),
    externalUrl: z.url().optional(),
  }),
});

export const collections = { plans, projects };
