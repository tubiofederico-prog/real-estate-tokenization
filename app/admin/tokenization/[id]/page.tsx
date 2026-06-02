'use client';
import { useParams } from 'next/navigation';
import { tokens, projects } from '@/lib/mockData';

export default function TokenDetailPage() {
  const params = useParams();
  const tokenId = params.id as string;
  const token = tokens.find(t => t.id === tokenId);
  const project = token ? projects.find(p => p.id === token.projectId) : null;

  if (!token || !project) return <div className="text-center py-12">Token no encontrado</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-900">{token.name}</h1>
      <p className="text-slate-600">Proyecto: {project.name}</p>
      <p>Símbolo: <strong>{token.symbol}</strong></p>
    </div>
  );
}
