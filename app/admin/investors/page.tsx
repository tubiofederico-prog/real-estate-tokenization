'use client';
import { investors } from '@/lib/mockData';

export default function InvestorsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-900">Gestión de Inversores</h1>
      <p className="text-slate-600">{investors.length} inversores registrados</p>
    </div>
  );
}
