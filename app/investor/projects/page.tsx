'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectCard } from '@/components/common/ProjectCard';
import { Input } from '@/components/common/Input';
import { Search } from 'lucide-react';
import { projects } from '@/lib/mockData';

export default function ProjectsMarketplace() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-900">Marketplace de Proyectos</h1>
        <p className="text-slate-600 mt-2">{projects.length} proyectos inmobiliarios disponibles</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <Input placeholder="Buscar por nombre o ubicación..." icon={<Search className="w-5 h-5" />} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onViewDetails={() => router.push(`/investor/projects/${project.id}`)}
            onInvest={() => router.push(`/investor/invest/${project.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
