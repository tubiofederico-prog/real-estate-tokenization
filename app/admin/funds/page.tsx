'use client';
import { funds } from '@/lib/mockData';

export default function FundsPage() {
  return <div className="space-y-8"><h1 className="text-3xl font-bold text-primary-900">Fondos</h1><p>{funds.length} fondos</p></div>;
}
