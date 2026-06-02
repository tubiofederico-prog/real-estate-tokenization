'use client';
import { PLATFORM_CONFIG } from '@/lib/mockData';

export default function SettingsPage() {
  return <div className="space-y-8"><h1 className="text-3xl font-bold text-primary-900">Configuración</h1><p>Token: {PLATFORM_CONFIG.platformToken.symbol}</p></div>;
}
