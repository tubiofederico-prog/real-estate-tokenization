'use client';
import { Button } from '@/components/common/Button';
import { MetricCard } from '@/components/common/MetricCard';
import {
  Globe,
  Building2,
  Users,
  TrendingUp,
  Lock,
  Zap,
  CheckCircle,
  Shield,
  Code2,
  Database,
  Wallet,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { dashboardMetrics, projects, investors, portfolios } from '@/lib/mockData';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function EcosystemPage() {
  const totalCapital = dashboardMetrics.totalCapitalTokenized;
  const activeProjects = dashboardMetrics.activeProjects;
  const registeredInvestors = dashboardMetrics.registeredInvestors;
  const averageReturn = dashboardMetrics.averageReturn;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-primary-900">Plataforma de Tokenización Inmobiliaria</h1>
        <p className="text-lg text-slate-600 mt-4">
          La revolución en inversión inmobiliaria. Acceso democrático a activos reales con tecnología blockchain.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Capital Tokenizado"
          value={formatCurrency(totalCapital, 'USD')}
          trend="up"
          trendValue="+24% YoY"
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          label="Proyectos Activos"
          value={activeProjects}
          trendValue="en ejecución"
          icon={<Building2 className="w-6 h-6" />}
        />
        <MetricCard
          label="Inversores Registrados"
          value={formatNumber(registeredInvestors)}
          trendValue="en la plataforma"
          icon={<Users className="w-6 h-6" />}
        />
        <MetricCard
          label="Retorno Promedio"
          value={`${averageReturn}%`}
          trendValue="anual"
          icon={<BarChart3 className="w-6 h-6" />}
          valueColor="text-emerald-600"
        />
      </div>

      {/* How It Works */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary-900">Cómo Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: 1,
              title: 'Explorar Proyectos',
              description: 'Navega nuestro catálogo de proyectos inmobiliarios verificados y auditados',
              icon: <Globe className="w-8 h-8" />,
            },
            {
              step: 2,
              title: 'Inversión Fraccionada',
              description: 'Compra tokens que representan fracciones del proyecto',
              icon: <Wallet className="w-8 h-8" />,
            },
            {
              step: 3,
              title: 'Generación de Rentabilidad',
              description: 'Recibe dividendos mensuales o trimestrales automáticamente',
              icon: <TrendingUp className="w-8 h-8" />,
            },
            {
              step: 4,
              title: 'Monitoreo Transparente',
              description: 'Accede a reportes en tiempo real de tu inversión',
              icon: <BarChart3 className="w-8 h-8" />,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-700 font-bold mb-4 mx-auto">
                {item.step}
              </div>
              <h3 className="font-bold text-primary-900 text-center mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="bg-gradient-to-r from-primary-50 via-cyan-50 to-blue-50 rounded-xl border border-primary-200 p-8">
        <h2 className="text-2xl font-bold text-primary-900 mb-8">Crecimiento de la Plataforma</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-sm text-slate-600 font-medium mb-2">Capital Gestionado</p>
            <div className="flex items-baseline gap-2 mb-4">
              <p className="text-3xl font-bold text-primary-900">{formatCurrency(totalCapital, 'USD')}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold">
              <TrendingUp className="w-4 h-4" />
              +24% en los últimos 12 meses
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-600 font-medium mb-2">Transacciones Completadas</p>
            <div className="flex items-baseline gap-2 mb-4">
              <p className="text-3xl font-bold text-primary-900">{formatCurrency(dashboardMetrics.transactionVolume, 'USD')}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold">
              <CheckCircle className="w-4 h-4" />
              Todas verificadas y registradas
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-600 font-medium mb-2">Tokens Emitidos</p>
            <div className="flex items-baseline gap-2 mb-4">
              <p className="text-3xl font-bold text-primary-900">{formatNumber(dashboardMetrics.tokensEmitted)}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold">
              <Zap className="w-4 h-4" />
              Activos en circulación
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary-900">Tecnología Subyacente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Smart Contracts',
              description: 'Contratos inteligentes en Ethereum/Polygon para automatización de pagos',
              icon: <Code2 className="w-8 h-8 text-blue-600" />,
            },
            {
              title: 'Blockchain',
              description: 'Tecnología descentralizada para transparencia total e inmutabilidad de registros',
              icon: <Database className="w-8 h-8 text-purple-600" />,
            },
            {
              title: 'Tokenización',
              description: 'Tokens ERC-20 representan propiedad fraccional de bienes raíces',
              icon: <Wallet className="w-8 h-8 text-emerald-600" />,
            },
            {
              title: 'API Segura',
              description: 'Integración segura con sistemas bancarios y de custodia de activos',
              icon: <Lock className="w-8 h-8 text-red-600" />,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-bold text-primary-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl border border-emerald-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-primary-900 mb-6">Seguridad y Cumplimiento</h2>
            <div className="space-y-4">
              {[
                'Verificación KYC/AML completa para todos los usuarios',
                'Auditoría externa de smart contracts regularmente',
                'Almacenamiento de activos en custodia regulada',
                'Seguro de activos digitales y físicos',
                'Cumplimiento con regulaciones locales e internacionales',
                'Encriptación de datos de extremo a extremo',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white rounded-lg border border-emerald-100 p-6">
              <Shield className="w-10 h-10 text-emerald-600 mb-3" />
              <h3 className="font-bold text-primary-900 mb-2">ISO 27001</h3>
              <p className="text-sm text-slate-600">Certificación de seguridad de información</p>
            </div>
            <div className="bg-white rounded-lg border border-emerald-100 p-6">
              <Lock className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="font-bold text-primary-900 mb-2">SOC 2 Tipo II</h3>
              <p className="text-sm text-slate-600">Cumplimiento de controles de seguridad</p>
            </div>
            <div className="bg-white rounded-lg border border-emerald-100 p-6">
              <CheckCircle className="w-10 h-10 text-cyan-600 mb-3" />
              <h3 className="font-bold text-primary-900 mb-2">RGPD Compliant</h3>
              <p className="text-sm text-slate-600">Protección de datos de usuarios</p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Advantages */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary-900">Ventajas de Invertir</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary-900 mb-2">Acceso Global</h3>
                <p className="text-sm text-slate-600">
                  Invierte en propiedades inmobiliarias en Argentina y Chile desde cualquier parte del mundo.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary-900 mb-2">Rentabilidad Consistente</h3>
                <p className="text-sm text-slate-600">
                  Retornos entre 8% y 20% anuales según el tipo de proyecto y riesgo asumido.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary-900 mb-2">Inversión Fraccionada</h3>
                <p className="text-sm text-slate-600">
                  Invierte desde $100 USD. No necesitas capital mínimo para acceder a propiedades premium.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary-900 mb-2">Activos Reales</h3>
                <p className="text-sm text-slate-600">
                  Cada token está respaldado por propiedad inmobiliaria verificada y asegurada.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary-900 mb-2">Transparencia Total</h3>
                <p className="text-sm text-slate-600">
                  Monitorea tu inversión en tiempo real con reportes detallados y auditorías públicas.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary-900 mb-2">Comunidad Activa</h3>
                <p className="text-sm text-slate-600">
                  Únete a miles de inversores que confían en nuestra plataforma y comparte experiencias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-xl p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Nuestra Visión</h2>
          <p className="text-lg mb-6 text-primary-100">
            Democratizar el acceso a inversiones inmobiliarias de alto rendimiento mediante la tecnología blockchain.
            Creemos que todos deberían tener la oportunidad de construir riqueza a través de activos reales, sin barreras
            de capital o geografía.
          </p>
          <Button variant="primary" className="bg-white text-primary-900 hover:bg-slate-100 flex items-center gap-2">
            Comenzar a Invertir
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary-900 mb-6">Preguntas Frecuentes</h2>
        {[
          {
            q: '¿Es seguro invertir en la plataforma?',
            a: 'Sí. Todos los proyectos son auditados, verificados y respaldados por activos reales. Contamos con certificaciones de seguridad internacional y cumplimiento regulatorio.',
          },
          {
            q: '¿Puedo retirar mi dinero en cualquier momento?',
            a: 'Puedes vender tus tokens en nuestro mercado secundario. El tiempo de liquidación depende de la demanda del mercado y del proyecto específico.',
          },
          {
            q: '¿Cuál es la inversión mínima?',
            a: 'La inversión mínima varía por proyecto, pero generalmente es entre $100-$1,000 USD. Algunos proyectos premium pueden tener mínimos más altos.',
          },
          {
            q: '¿Cuándo recibo mis ganancias?',
            a: 'Los dividendos se distribuyen mensual o trimestralmente dependiendo del proyecto. Se depositan automáticamente en tu wallet.',
          },
        ].map((item, idx) => (
          <details
            key={idx}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 group cursor-pointer"
          >
            <summary className="flex items-center justify-between font-bold text-primary-900">
              {item.q}
              <span className="transform group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-slate-600 mt-4">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
