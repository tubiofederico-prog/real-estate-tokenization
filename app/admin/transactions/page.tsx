'use client';
import { transactions } from '@/lib/mockData';

export default function TransactionsPage() {
  return <div className="space-y-8"><h1 className="text-3xl font-bold text-primary-900">Transacciones</h1><p>{transactions.length} transacciones</p></div>;
}
