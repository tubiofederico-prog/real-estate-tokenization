'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { MetricCard } from '@/components/common/MetricCard';
import { Table } from '@/components/common/Table';
import { ArrowLeft, Download, Mail, MapPin, Calendar, FileText } from 'lucide-react';
import { investors, portfolios, transactions } from '@/lib/mockData';
import { formatCurrency, formatDate, formatDateLong, getAvatarColor, getInitials } from '@/lib/utils';

export default function InvestorDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const investor = investors.find((i) => i.id === params.id);
  const investorPortfolios = portfolios.filter((p) => p.investorId === params.id);
  const investorTransactions = transactions.filter((t) => t.investorId === params.id);

  if (!investor) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Atrás
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-slate-600">Inversor no encontrado</p>
        </div>
      </div>
    );
  }

  const portfolioValue = investorPortfolios.reduce((sum, p) => sum + p.currentValue, 0);
  const totalGains = portfolioValue - investor.totalInvested;
  const gainPercentage = (totalGains / investor.totalInvested) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full ${getAvatarColor(0)} flex items-center justify-center text-white text-xl font-bold`}>
              {getInitials(investor.name)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary-900">{investor.name}</h1>
              <p className="text-slate-600 mt-1">{investor.email}</p>
            </div>
          </div>
        </div>
        <Button variant="secondary">
          <Download className="w-5 h-5 mr-2" />
          Exportar Datos
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Capital Invertido"
          value={formatCurrency(investor.totalInvested, 'USD')}
          valueColor="text-primary-900"
        />
        <MetricCard
          label="Valor Actual"
          value={formatCurrency(portfolioValue, 'USD')}
          trend={gainPercentage > 0 ? 'up' : 'down'}
          trendValue={`${gainPercentage > 0 ? '+' : ''}${gainPercentage.toFixed(1)}%`}
        />
        <MetricCard
          label="Ganancias"
          value={formatCurrency(totalGains, 'USD')}
          valueColor={totalGains > 0 ? 'text-emerald-700' : 'text-red-700'}
        />
        <MetricCard
          label="Tokens Poseídos"
          value={investor.tokensHeld.toLocaleString()}
          valueColor="text-cyan-700"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Portfolio */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-4">Cartera de Inversiones</h2>
            <div className="overflow-x-auto">
              <Table
                columns={[
                  {
                    key: 'projectId',
                    label: 'Proyecto',
                    render: (value: string) => <span className="font-medium">{value}</span>,
                  },
                  {
                    key: 'tokensHeld',
                    label: 'Tokens',
                    align: 'center',
                    render: (value: number) => <span className="font-medium">{value.toLocaleString()}</span>,
                  },
                  {
                    key: 'investmentAmount',
                    label: 'Invertido',
                    align: 'right',
                    render: (value: number) => formatCurrency(value, 'USD'),
                  },
                  {
                    key: 'currentValue',
                    label: 'Valor Actual',
                    align: 'right',
                    render: (value: number) => formatCurrency(value, 'USD'),
                  },
                  {
                    key: 'estimatedReturn',
                    label: 'Retorno',
                    align: 'right',
                    render: (value: number) => (
                      <span className="text-emerald-700 font-medium">{value.toFixed(1)}%</span>
                    ),
                  },
                ]}
                data={investorPortfolios}
                rowKey="projectId"
              />
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-4">Historial de Transacciones</h2>
            <div className="overflow-x-auto">
              <Table
                columns={[
                  {
                    key: 'date',
                    label: 'Fecha',
                    render: (value: string) => formatDate(value),
                  },
                  {
                    key: 'type',
                    label: 'Tipo',
                    render: (value: string) => (
                      <span className="capitalize px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                        {value}
                      </span>
                    ),
                  },
                  {
                    key: 'description',
                    label: 'Descripción',
                  },
                  {
                    key: 'amount',
                    label: 'Monto',
                    align: 'right',
                    render: (value: number) => formatCurrency(value, 'USD'),
                  },
                  {
                    key: 'status',
                    label: 'Estado',
                    render: (value: string) => <Badge status={value} />,
                  },
                ]}
                data={investorTransactions}
                rowKey="id"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4">
          {/* Profile Information */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-primary-900 mb-4">Información Personal</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-600">Email</p>
                  <p className="font-medium text-primary-900">{investor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-600">País</p>
                  <p className="font-medium text-primary-900">{investor.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-600">Miembro desde</p>
                  <p className="font-medium text-primary-900">{formatDateLong(investor.joinedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-primary-900 mb-4">Estado</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-600 mb-2">Estado de Cuenta</p>
                <Badge status={investor.status} />
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-2">KYC Verificación</p>
                <Badge status={investor.kycStatus} />
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-2">Perfil de Riesgo</p>
                <span className="inline-block px-3 py-1.5 rounded-lg border text-sm font-medium bg-slate-50 border-slate-200 text-slate-700">
                  {investor.riskProfile?.charAt(0).toUpperCase()}{investor.riskProfile?.slice(1) || 'N/A'}
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-2">Última Actividad</p>
                <p className="font-medium text-primary-900">{formatDate(investor.lastActivity)}</p>
              </div>
            </div>
          </div>

          {/* KYC Documents */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-primary-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documentos KYC
            </h3>
            <div className="space-y-2">
              {investor.kycStatus === 'verified' ? (
                <div className="text-sm">
                  <div className="flex items-center gap-2 py-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-700">Identidad verificada</span>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-700">Domicilio comprobado</span>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-700">Fondos verificados</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm">
                  <div className="flex items-center gap-2 py-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-slate-700">Pendiente: Identidad</span>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-slate-700">Pendiente: Domicilio</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button variant="secondary" className="w-full">
              Aprobar KYC
            </Button>
            <Button variant="outline" className="w-full">
              Contactar
            </Button>
            <Button variant="danger" className="w-full">
              Desactivar Cuenta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
