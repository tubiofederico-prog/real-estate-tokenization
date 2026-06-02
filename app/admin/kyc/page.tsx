'use client';
import { investors } from '@/lib/mockData';

export default function KYCPage() {
  const pending = investors.filter(i => i.kycStatus === 'pending').length;
  return <div className="space-y-8"><h1 className="text-3xl font-bold text-primary-900">KYC/Compliance</h1><p>{pending} usuarios pendientes</p></div>;
}
