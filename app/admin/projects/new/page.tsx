'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { ArrowLeft, Upload } from 'lucide-react';

export default function CreateProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: {
      city: '',
      country: 'Argentina',
      address: '',
    },
    type: 'building',
    totalAmount: 0,
    minInvestment: 100,
    estimatedReturn: { min: 10, max: 15 },
    durationMonths: 36,
    riskLevel: 'medium',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }));
  };

  const handleReturnChange = (field: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      estimatedReturn: { ...prev.estimatedReturn, [field]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would go here
    console.log('Project created:', formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Crear Nuevo Proyecto</h1>
          <p className="text-slate-600 mt-1">Completa todos los campos para crear un nuevo proyecto inmobiliario</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary-900 mb-4">Información Básica</h2>
              <div className="space-y-4">
                <Input
                  label="Nombre del Proyecto"
                  placeholder="ej. Valle Norte Mendoza"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-2 block">Descripción</label>
                  <textarea
                    placeholder="Describe detalladamente el proyecto..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-2.5 border-2 rounded-lg border-slate-300 focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                    rows={5}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary-900 mb-4">Ubicación</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Ciudad"
                    placeholder="ej. Mendoza"
                    value={formData.location.city}
                    onChange={(e) => handleLocationChange('city', e.target.value)}
                    required
                  />
                  <div>
                    <label className="text-sm font-medium text-primary-900 mb-2 block">País</label>
                    <select
                      value={formData.location.country}
                      onChange={(e) => handleLocationChange('country', e.target.value)}
                      className="w-full px-4 py-2.5 border-2 rounded-lg border-slate-300 focus:outline-none focus:border-primary-600"
                    >
                      <option>Argentina</option>
                      <option>Chile</option>
                      <option>Uruguay</option>
                      <option>Paraguay</option>
                    </select>
                  </div>
                </div>
                <Input
                  label="Dirección"
                  placeholder="ej. Route 40 Norte"
                  value={formData.location.address}
                  onChange={(e) => handleLocationChange('address', e.target.value)}
                />
              </div>
            </div>

            {/* Project Type and Details */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary-900 mb-4">Detalles del Proyecto</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-primary-900 mb-2 block">Tipo de Proyecto</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-4 py-2.5 border-2 rounded-lg border-slate-300 focus:outline-none focus:border-primary-600"
                  >
                    <option value="loteo">Loteo</option>
                    <option value="building">Edificio</option>
                    <option value="rental">Renta</option>
                    <option value="development">Desarrollo</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Nivel de Riesgo"
                    as="select"
                    value={formData.riskLevel}
                    onChange={(e) => handleInputChange('riskLevel', e.target.value)}
                  />
                  <Input
                    label="Duración (meses)"
                    type="number"
                    min="1"
                    value={formData.durationMonths}
                    onChange={(e) => handleInputChange('durationMonths', parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary-900 mb-4">Información Financiera</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Monto Total (USD)"
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.totalAmount}
                    onChange={(e) => handleInputChange('totalAmount', parseFloat(e.target.value))}
                    required
                  />
                  <Input
                    label="Inversión Mínima (USD)"
                    type="number"
                    min="0"
                    value={formData.minInvestment}
                    onChange={(e) => handleInputChange('minInvestment', parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Retorno Mínimo (%)"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.estimatedReturn.min}
                    onChange={(e) => handleReturnChange('min', parseFloat(e.target.value))}
                    required
                  />
                  <Input
                    label="Retorno Máximo (%)"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.estimatedReturn.max}
                    onChange={(e) => handleReturnChange('max', parseFloat(e.target.value))}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary-900 mb-4">Imágenes y Documentos</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">Arrastra imágenes aquí</p>
                  <p className="text-xs text-slate-500 mt-1">o selecciona archivos</p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">Arrastra documentos aquí</p>
                  <p className="text-xs text-slate-500 mt-1">PDF, Word, etc.</p>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Summary */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-6">
              <h3 className="font-bold text-primary-900 mb-4">Resumen</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600 mb-1">Nombre</p>
                  <p className="font-semibold text-primary-900">{formData.name || 'Sin especificar'}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Ubicación</p>
                  <p className="font-semibold text-primary-900">
                    {formData.location.city}, {formData.location.country}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Monto Total</p>
                  <p className="font-semibold text-primary-900">
                    ${formData.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Retorno Esperado</p>
                  <p className="font-semibold text-primary-900">
                    {formData.estimatedReturn.min}% - {formData.estimatedReturn.max}%
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-slate-600 mb-1">Duración</p>
                  <p className="font-semibold text-primary-900">{formData.durationMonths} meses</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button type="submit" variant="secondary" className="w-full">
                Crear Proyecto
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
