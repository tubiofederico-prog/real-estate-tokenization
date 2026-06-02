'use client';
import { dashboardMetrics } from '@/lib/mockData';

export default function MetricsPage() {
  return <div className="space-y-8"><h1 className="text-3xl font-bold text-primary-900">Métricas</h1><p>${dashboardMetrics.totalCapitalTokenized.toLocaleString()}</p></div>;
}
