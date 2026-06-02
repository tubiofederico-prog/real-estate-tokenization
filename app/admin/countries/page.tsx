'use client';
import { PLATFORM_CONFIG } from '@/lib/mockData';

export default function CountriesPage() {
  return <div className="space-y-8"><h1 className="text-3xl font-bold text-primary-900">Países</h1><p>{PLATFORM_CONFIG.countries.length} países</p></div>;
}
