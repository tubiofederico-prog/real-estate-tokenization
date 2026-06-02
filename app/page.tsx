'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { ProjectCard } from '@/components/common/ProjectCard';
import { TrendingUp, Building2, Zap, ArrowRight } from 'lucide-react';
import { dashboardMetrics, projects } from '@/lib/mockData';
import { formatCompact } from '@/lib/utils';

export default function LandingPage() {
  const router = useRouter();
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-primary-700 text-white p-2 rounded-lg font-bold text-lg">RE</div>
              <h1 className="text-2xl font-bold text-primary-900">RE Bank</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="md" onClick={() => router.push('/investor/dashboard')}>
                Portal Inversor
              </Button>
              <Button variant="primary" size="md" onClick={() => router.push('/admin/dashboard')}>
                Panel Admin
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-5xl font-bold mb-6">Banco Inmobiliario Digital</h2>
            <p className="text-xl text-slate-100 mb-8">
              Democratiza la inversión inmobiliaria. Invierte desde USD 100 en proyectos
              tokenizados, fondos inmobiliarios y activos alternativos de alto retorno.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="lg" onClick={() => router.push('/investor/dashboard')}>
                Comenzar a Invertir <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => router.push('/investor/projects')}>
                Ver Proyectos
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-slate-200 text-sm font-medium mb-2">Capital Tokenizado</p>
              <p className="text-3xl font-bold text-white">
                {formatCompact(dashboardMetrics.totalCapitalTokenized)}
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-slate-200 text-sm font-medium mb-2">Proyectos Activos</p>
              <p className="text-3xl font-bold text-white">{dashboardMetrics.activeProjects}</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-slate-200 text-sm font-medium mb-2">Inversores</p>
              <p className="text-3xl font-bold text-white">
                {formatCompact(dashboardMetrics.registeredInvestors)}
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-slate-200 text-sm font-medium mb-2">Rentabilidad Promedio</p>
              <p className="text-3xl font-bold text-emerald-400">
                {dashboardMetrics.averageReturn.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-primary-900 mb-12 text-center">Por Qué RE Bank</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-slate-200 rounded-xl hover:shadow-lg transition-shadow">
              <Building2 className="w-12 h-12 text-emerald-600 mb-4" />
              <h4 className="text-xl font-bold text-primary-900 mb-2">Proyectos Verificados</h4>
              <p className="text-slate-800">
                Todos nuestros proyectos inmobiliarios pasan auditoría legal y técnica rigurosa.
              </p>
            </div>
            <div className="p-8 border border-slate-200 rounded-xl hover:shadow-lg transition-shadow">
              <Zap className="w-12 h-12 text-cyan-600 mb-4" />
              <h4 className="text-xl font-bold text-primary-900 mb-2">Tokenización Segura</h4>
              <p className="text-slate-800">
                Tokens respaldados por activos reales con smart contracts auditados.
              </p>
            </div>
            <div className="p-8 border border-slate-200 rounded-xl hover:shadow-lg transition-shadow">
              <TrendingUp className="w-12 h-12 text-gold-500 mb-4" />
              <h4 className="text-xl font-bold text-primary-900 mb-2">Rentabilidad Competitiva</h4>
              <p className="text-slate-800">
                Retornos de 8-20% anual según el proyecto y perfil de riesgo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-primary-900">Proyectos Destacados</h3>
            <Button
              variant="outline"
              onClick={() => router.push('/investor/projects')}
            >
              Ver Todos
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={() => router.push(`/investor/projects/${project.id}`)}
                onInvest={() => router.push(`/investor/invest/${project.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Comienza tu Inversión Hoy</h3>
          <p className="text-xl text-slate-200 mb-8">
            Únete a miles de inversores que ya están diversificando en real estate tokenizado.
          </p>
          <Button variant="secondary" size="lg" onClick={() => router.push('/investor/dashboard')}>
            Crear Cuenta y Invertir
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-950 text-slate-500 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">RE Bank</h4>
              <p className="text-sm">Plataforma de tokenización inmobiliaria.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Portal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="/investor/dashboard" className="hover:text-white">Dashboard</a></li>
                <li><a href="/investor/projects" className="hover:text-white">Proyectos</a></li>
                <li><a href="/investor/funds" className="hover:text-white">Fondos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Admin</h4>
              <ul className="text-sm space-y-2">
                <li><a href="/admin/dashboard" className="hover:text-white">Dashboard</a></li>
                <li><a href="/admin/projects" className="hover:text-white">Proyectos</a></li>
                <li><a href="/admin/investors" className="hover:text-white">Inversores</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Términos</a></li>
                <li><a href="#" className="hover:text-white">Privacidad</a></li>
                <li><a href="#" className="hover:text-white">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm">
            <p>&copy; 2026 RE Bank. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
