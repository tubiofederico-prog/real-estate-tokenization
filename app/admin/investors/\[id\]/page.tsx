'use client';
import { useParams } from 'next/navigation';
import { investors } from '@/lib/mockData';

export default function InvestorDetailPage() {
  const params = useParams();
  const investorId = params.id as string;
  const investor = investors.find(i => i.id === investorId);

  if (!investor) return <div className="text-center py-12">Inversor no encontrado</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-900">{investor.name}</h1>
      <p className="text-slate-600">{investor.email} - {investor.country}</p>
    </div>
  );
}
