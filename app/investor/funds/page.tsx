'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FundCard } from '@/components/common/FundCard';
import { Input } from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Search, Filter } from 'lucide-react';
import { funds, projects } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

export default function FundsMarketplace() {
  const router = useRouter();
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFunds = funds.filter((f) => {
    const matchesRisk = riskFilter === 'all' || f.riskLevel === riskFilter;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const getFundCompositionDetails = (fund: typeof funds[0]) => {
    return fund.composition.map((comp) => {
      const project = projects.find((p) => p.id === comp.projectId);
      return {
        name: project?.name || 'Unknown',
        percentage: comp.percentage,
      };
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-900">Fondos Disponibles</h1>
        <p className="text-slate-600 mt-2">Invierte en fondos diversificados con múltiples proyectos inmobiliarios</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex gap-4 items-end flex-wrap">
            <div className="flex-1 min-w-xs">
              <Input
                placeholder="Buscar fondos por nombre..."
                icon={<Search className="w-5 h-5" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-600 mr-2">Nivel de Riesgo:</span>
              <div className="flex gap-2">
                {['all', 'low', 'medium', 'high'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setRiskFilter(level)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      riskFilter === level
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {level === 'all' ? 'Todos' : level === 'low' ? 'Bajo' : level === 'medium' ? 'Medio' : 'Alto'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-200 p-4">
          <p className="text-sm text-slate-600 font-medium mb-1">Total de Fondos</p>
          <p className="text-2xl font-bold text-primary-900">{funds.length}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-lg border border-emerald-200 p-4">
          <p className="text-sm text-slate-600 font-medium mb-1">Capital Total Recaudado</p>
          <p className="text-2xl font-bold text-emerald-700">
            {formatCurrency(funds.reduce((sum, f) => sum + f.capitalRaised, 0), 'USD')}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 p-4">
          <p className="text-sm text-slate-600 font-medium mb-1">Inversores Totales</p>
          <p className="text-2xl font-bold text-blue-700">{funds.reduce((sum, f) => sum + f.investorsCount, 0)}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-4">
          <p className="text-sm text-slate-600 font-medium mb-1">Rentabilidad Promedio</p>
          <p className="text-2xl font-bold text-purple-700">
            {(
              funds.reduce((sum, f) => sum + (f.estimatedReturn.min + f.estimatedReturn.max) / 2, 0) / funds.length
            ).toFixed(1)}
            %
          </p>
        </div>
      </div>

      {/* Funds Grid */}
      {filteredFunds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFunds.map((fund) => (
            <FundCard
              key={fund.id}
              fund={fund}
              onInvest={() => router.push(`/investor/invest/${fund.id}`)}
              onViewDetails={() => {
                // Could expand to show detailed fund modal
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-slate-600 mb-2">No se encontraron fondos</p>
          <p className="text-sm text-slate-500 mb-6">Intenta ajustar los filtros de búsqueda</p>
          <Button variant="outline" onClick={() => { setSearchQuery(''); setRiskFilter('all'); }}>
            Limpiar filtros
          </Button>
        </div>
      )}

      {/* Fund Information Section */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 p-8">
        <h2 className="text-2xl font-bold text-primary-900 mb-6">Cómo funcionan los fondos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500 text-white font-bold mb-4">
              1
            </div>
            <h3 className="font-bold text-primary-900 mb-2">Selecciona un Fondo</h3>
            <p className="text-sm text-slate-600">
              Elige entre nuestros fondos diversificados según tu perfil de riesgo y objetivos.
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white font-bold mb-4">
              2
            </div>
            <h3 className="font-bold text-primary-900 mb-2">Invierte Fondos</h3>
            <p className="text-sm text-slate-600">
              Realiza tu inversión directamente desde tu wallet. Se distribuye automáticamente según la composición.
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 text-white font-bold mb-4">
              3
            </div>
            <h3 className="font-bold text-primary-900 mb-2">Recibe Ganancias</h3>
            <p className="text-sm text-slate-600">
              Los dividendos se distribuyen automáticamente. Monitorea tu rentabilidad en tiempo real.
            </p>
          </div>
        </div>
      </div>

      {/* Risk Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
            <h3 className="font-bold text-primary-900">Riesgo Bajo</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Fondos con activos estables, rentabilidades entre 8-12% anual. Ideales para inversores conservadores.
          </p>
          <div className="space-y-2 text-xs text-slate-600">
            <p>✓ Propiedades de renta establecidas</p>
            <p>✓ Ubicaciones premium</p>
            <p>✓ Flujo de caja regular</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <h3 className="font-bold text-primary-900">Riesgo Medio</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Fondos balanceados con crecimiento, rentabilidades entre 12-16% anual. Para inversores moderados.
          </p>
          <div className="space-y-2 text-xs text-slate-600">
            <p>✓ Mix de proyectos</p>
            <p>✓ Crecimiento potencial</p>
            <p>✓ Diversificación equilibrada</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <h3 className="font-bold text-primary-900">Riesgo Alto</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Fondos dinámicos con alto potencial, rentabilidades entre 16-20% anual. Para inversores agresivos.
          </p>
          <div className="space-y-2 text-xs text-slate-600">
            <p>✓ Proyectos emergentes</p>
            <p>✓ Mayor potencial de crecimiento</p>
            <p>✓ Mercados con oportunidades</p>
          </div>
        </div>
      </div>
    </div>
  );
}
