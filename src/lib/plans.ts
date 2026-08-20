import { getCollection, type CollectionEntry } from 'astro:content';

export type Plan = CollectionEntry<'plans'>;

export async function getPlans(): Promise<Plan[]> {
  return (await getCollection('plans')).sort((a, b) => a.data.order - b.data.order);
}

export function formatUsd(amount: number): string {
  return `USD ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount)}`;
}

export function getPlanInquiryUrl(name: string, price: number): string {
  const message = `Hola Micrudev, me interesa el plan ${name} de ${formatUsd(price)}. Quisiera conocer los siguientes pasos.`;
  return `https://wa.me/593998081684?text=${encodeURIComponent(message)}`;
}
