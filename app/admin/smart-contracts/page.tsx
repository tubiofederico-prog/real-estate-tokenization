'use client';
import { smartContracts } from '@/lib/mockData';

export default function SmartContractsPage() {
  return <div className="space-y-8"><h1 className="text-3xl font-bold text-primary-900">Smart Contracts</h1><p>{smartContracts.length} contratos</p></div>;
}
