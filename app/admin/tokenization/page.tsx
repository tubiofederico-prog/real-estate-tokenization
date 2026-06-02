'use client';
import { tokens } from '@/lib/mockData';

export default function TokenizationPage() {
  return <div className="space-y-8"><h1 className="text-3xl font-bold text-primary-900">Gestión de Tokenización</h1><p>{tokens.length} tokens activos</p></div>;
}
