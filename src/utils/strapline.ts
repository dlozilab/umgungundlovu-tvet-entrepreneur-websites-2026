import type { Service } from "../types/site";

export function buildStrapline(services: Service[]): string {
    return services 
    .map((s) => (s.name || '').trim())
    .filter(Boolean)
    .join(' \u00b7')
}