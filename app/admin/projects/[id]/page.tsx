'use client';
import { useParams } from 'next/navigation';
import { projects } from '@/lib/mockData';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projects.find(p => p.id === projectId);

  if (!project) return <div className="text-center py-12">Proyecto no encontrado</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary-900">{project.name}</h1>
      <p className="text-slate-600">{project.location.city}, {project.location.country}</p>
    </div>
  );
}
