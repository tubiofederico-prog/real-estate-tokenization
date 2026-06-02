'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { MetricCard } from '@/components/common/MetricCard';
import { Badge } from '@/components/common/Badge';
import { Input } from '@/components/common/Input';
import { ArrowLeft, CheckCircle, AlertCircle, FileText, CreditCard, DollarSign, CheckCheck } from 'lucide-react';
import { projects } from '@/lib/mockData';
import { formatCurrency, formatDate, formatPercentage } from '@/lib/utils';

type StepType = 1 | 2 | 3 | 4 | 5;

export default function InvestmentWizardPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const project = projects.find((p) => p.id === projectId);

  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('bank_transfer');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 mb-4">Proyecto no encontrado</p>
        <Button variant="primary" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </Button>
      </div>
    );
  }

  const investmentValue = parseFloat(investmentAmount) || 0;
  const tokensToReceive = investmentValue / project.pricePerToken;
  const availableAmount = project.totalAmount - project.raisedAmount;
  const isValidAmount = investmentValue >= project.minInvestment && investmentValue <= availableAmount;

  const handleNext = () => {
    if (currentStep === 2 && !isValidAmount) {
      return;
    }
    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as StepType);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as StepType);
    }
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      router.push('/investor/portfolio');
    }, 3000);
  };

  const steps = [
    { number: 1, label: 'Revisión', icon: <FileText className="w-5 h-5" /> },
    { number: 2, label: 'Monto', icon: <DollarSign className="w-5 h-5" /> },
    { number: 3, label: 'Pago', icon: <CreditCard className="w-5 h-5" /> },
    { number: 4, label: 'Documentos', icon: <FileText className="w-5 h-5" /> },
    { number: 5, label: 'Confirmación', icon: <CheckCheck className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Invertir en {project.name}</h1>
          <p className="text-slate-600 mt-1">Paso {currentStep} de 5</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentStep(step.number as StepType)}
                className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${
                  currentStep >= step.number
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {currentStep > step.number ? <CheckCircle className="w-6 h-6" /> : step.number}
              </button>
              <div className="ml-3">
                <p className="text-xs font-medium text-slate-600">Paso {step.number}</p>
                <p className="text-sm font-semibold text-primary-900">{step.label}</p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 rounded-full ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-emerald-900 mb-1">¡Inversión Completada!</h3>
              <p className="text-sm text-emerald-800">Tu inversión ha sido registrada correctamente. Serás redirigido en breve.</p>
            </div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        {/* Step 1: Project Review */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Revisión del Proyecto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border border-slate-200 p-6">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-bold text-primary-900 mb-2">{project.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{project.description}</p>
                  <div className="flex gap-2">
                    <Badge status={project.status} />
                    <Badge status={project.riskLevel} />
                  </div>
                </div>
                <div className="space-y-4">
                  <MetricCard
                    label="Ubicación"
                    value={`${project.location.city}, ${project.location.country}`}
                  />
                  <MetricCard
                    label="Tipo de Proyecto"
                    value={project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                  />
                  <MetricCard
                    label="Progreso"
                    value={`${project.progress}%`}
                  />
                  <MetricCard
                    label="Retorno Estimado"
                    value={`${project.estimatedReturn.min}% - ${project.estimatedReturn.max}%`}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
              <div>
                <p className="text-xs text-slate-600 mb-1">Monto Total</p>
                <p className="font-bold text-primary-900">{formatCurrency(project.totalAmount, 'USD')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Levantado</p>
                <p className="font-bold text-emerald-700">{formatCurrency(project.raisedAmount, 'USD')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Disponible</p>
                <p className="font-bold text-cyan-700">{formatCurrency(availableAmount, 'USD')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Duración</p>
                <p className="font-bold text-primary-900">{project.durationMonths} meses</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Investment Amount */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Selecciona el Monto a Invertir</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      Monto a Invertir (USD)
                    </label>
                    <Input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="Ingresa el monto"
                      min={project.minInvestment}
                      max={availableAmount}
                    />
                    <p className="text-xs text-slate-600 mt-2">
                      Mínimo: {formatCurrency(project.minInvestment, 'USD')} | Máximo: {formatCurrency(availableAmount, 'USD')}
                    </p>
                  </div>

                  {investmentAmount && !isValidAmount && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                      <div className="text-sm text-yellow-800">
                        {investmentValue < project.minInvestment
                          ? `El monto mínimo es ${formatCurrency(project.minInvestment, 'USD')}`
                          : `El monto máximo disponible es ${formatCurrency(availableAmount, 'USD')}`}
                      </div>
                    </div>
                  )}

                  {isValidAmount && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-emerald-900">Resumen de Inversión</p>
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Monto a Invertir:</span>
                          <span className="font-semibold text-primary-900">{formatCurrency(investmentValue, 'USD')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Tokens a Recibir:</span>
                          <span className="font-semibold text-cyan-700">{tokensToReceive.toFixed(0)} tokens</span>
                        </div>
                        <div className="flex justify-between border-t border-emerald-200 pt-2">
                          <span className="text-slate-600">Precio por Token:</span>
                          <span className="font-semibold text-primary-900">{formatCurrency(project.pricePerToken, 'USD')}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                  <h3 className="font-bold text-primary-900">Opciones Rápidas</h3>
                  {[10000, 25000, 50000, 100000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        if (amount <= availableAmount) setInvestmentAmount(amount.toString());
                      }}
                      disabled={amount > availableAmount}
                      className="w-full p-3 border border-slate-200 rounded-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                      <p className="font-semibold text-primary-900">{formatCurrency(amount, 'USD')}</p>
                      <p className="text-xs text-slate-600">{(amount / project.pricePerToken).toFixed(0)} tokens</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment Method */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Selecciona Método de Pago</h2>
              <div className="space-y-3">
                {[
                  {
                    id: 'bank_transfer',
                    name: 'Transferencia Bancaria',
                    description: 'Transferencia directa a cuenta de la plataforma',
                    icon: '🏦',
                  },
                  {
                    id: 'credit_card',
                    name: 'Tarjeta de Crédito/Débito',
                    description: 'Visa, Mastercard, American Express',
                    icon: '💳',
                  },
                  {
                    id: 'crypto',
                    name: 'Criptomonedas',
                    description: 'Bitcoin, Ethereum, USDC',
                    icon: '₿',
                  },
                  {
                    id: 'wallet',
                    name: 'Wallet de Plataforma',
                    description: 'Fondos disponibles en tu wallet',
                    icon: '👛',
                  },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                      paymentMethod === method.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <p className="font-semibold text-primary-900">{method.name}</p>
                        <p className="text-sm text-slate-600">{method.description}</p>
                      </div>
                      {paymentMethod === method.id && (
                        <CheckCircle className="w-6 h-6 text-primary-600 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Documents */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Documentos Requeridos</h2>
              <div className="space-y-3">
                {[
                  { name: 'Acuerdo de Inversión', required: true, status: 'completed' },
                  { name: 'Prospecto del Proyecto', required: true, status: 'completed' },
                  { name: 'Declaración de Riesgos', required: true, status: 'pending' },
                  { name: 'Términos y Condiciones', required: true, status: 'pending' },
                ].map((doc, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold text-primary-900">{doc.name}</p>
                      <p className="text-xs text-slate-600">{doc.required ? 'Requerido' : 'Opcional'}</p>
                    </div>
                    {doc.status === 'completed' ? (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Aceptado</span>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm">
                        Revisar
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-5 h-5 mt-1 rounded border-2 border-slate-300 accent-primary-600"
                  />
                  <span className="text-sm text-slate-600">
                    Declaro que he leído y aceptado todos los documentos requeridos y entiendo los riesgos de inversión asociados.
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Confirma Tu Inversión</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-600 mb-1">Proyecto</p>
                    <p className="font-bold text-primary-900">{project.name}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-600 mb-1">Ubicación</p>
                    <p className="font-bold text-primary-900">
                      {project.location.city}, {project.location.country}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-600 mb-1">Duración</p>
                    <p className="font-bold text-primary-900">{project.durationMonths} meses</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-600 mb-1">Retorno Estimado</p>
                    <p className="font-bold text-primary-900">
                      {project.estimatedReturn.min}% - {project.estimatedReturn.max}%
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6">
                    <p className="text-sm font-medium text-primary-600 mb-2">MONTO A INVERTIR</p>
                    <p className="text-4xl font-bold text-primary-900">{formatCurrency(investmentValue, 'USD')}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-cyan-50 rounded-lg p-4">
                      <p className="text-xs text-slate-600 mb-1">Tokens</p>
                      <p className="text-2xl font-bold text-cyan-700">{tokensToReceive.toFixed(0)}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <p className="text-xs text-slate-600 mb-1">Precio/Token</p>
                      <p className="text-lg font-bold text-emerald-700">${project.pricePerToken}</p>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-yellow-800">
                      <p className="font-semibold mb-1">Revisión Final</p>
                      <p>Verifica todos los datos antes de confirmar la inversión.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          ← Anterior
        </Button>

        <div className="flex gap-3">
          {currentStep === 5 ? (
            <>
              <Button
                variant="outline"
                onClick={handleBack}
              >
                Modificar
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                disabled={!acceptedTerms}
              >
                <CheckCheck className="w-5 h-5 mr-2" />
                Confirmar Inversión
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={currentStep === 2 && !isValidAmount}
            >
              Siguiente →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
