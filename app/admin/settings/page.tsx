'use client';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Save, Settings, Shield, DollarSign, Bell, Users } from 'lucide-react';
import { PLATFORM_CONFIG } from '@/lib/mockData';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    platformToken: { ...PLATFORM_CONFIG.platformToken },
    fees: { ...PLATFORM_CONFIG.fees },
    minInvestment: 100,
    maxInvestment: 1000000,
    kycRequired: true,
    emailNotifications: true,
    maintenanceMode: false,
    maxProjects: 100,
    supportEmail: 'support@retoken.com',
    telegramChannel: '@retokenofficial',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: any, parent?: string) => {
    if (parent) {
      setSettings((prev: any) => ({
        ...prev,
        [parent]: { ...prev[parent], [field]: value },
      }));
    } else {
      setSettings((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    // Show success message
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-900">Configuración de la Plataforma</h1>
        <p className="text-slate-600 mt-2">Gestiona los parámetros globales del sistema</p>
      </div>

      {/* Platform Token Settings */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6" />
          Token de Plataforma
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Nombre del Token"
            value={settings.platformToken.name}
            onChange={(e) =>
              handleInputChange('name', e.target.value, 'platformToken')
            }
          />
          <Input
            label="Símbolo"
            value={settings.platformToken.symbol}
            maxLength={5}
            onChange={(e) =>
              handleInputChange('symbol', e.target.value, 'platformToken')
            }
          />
          <Input
            label="Paridad USD"
            type="number"
            step="0.01"
            value={settings.platformToken.parityUSD}
            onChange={(e) =>
              handleInputChange('parityUSD', parseFloat(e.target.value), 'platformToken')
            }
          />
        </div>
      </div>

      {/* Fees Settings */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6" />
          Estructura de Honorarios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Comisión de Inversión (%)"
            type="number"
            step="0.1"
            value={settings.fees.investmentFee}
            onChange={(e) =>
              handleInputChange('investmentFee', parseFloat(e.target.value), 'fees')
            }
          />
          <Input
            label="Comisión de Retiro (%)"
            type="number"
            step="0.1"
            value={settings.fees.withdrawalFee}
            onChange={(e) =>
              handleInputChange('withdrawalFee', parseFloat(e.target.value), 'fees')
            }
          />
          <Input
            label="Comisión de Conversión de Token (%)"
            type="number"
            step="0.1"
            value={settings.fees.tokenConversionFee}
            onChange={(e) =>
              handleInputChange('tokenConversionFee', parseFloat(e.target.value), 'fees')
            }
          />
        </div>
      </div>

      {/* Investment Limits */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Límites de Inversión
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Inversión Mínima (USD)"
            type="number"
            step="10"
            value={settings.minInvestment}
            onChange={(e) => handleInputChange('minInvestment', parseFloat(e.target.value))}
          />
          <Input
            label="Inversión Máxima (USD)"
            type="number"
            step="100"
            value={settings.maxInvestment}
            onChange={(e) => handleInputChange('maxInvestment', parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* Compliance Settings */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Cumplimiento y Seguridad
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="font-semibold text-primary-900">Requerir KYC para Inversiones</p>
              <p className="text-sm text-slate-600 mt-1">Los inversores deben completar verificación antes de invertir</p>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.kycRequired}
                onChange={(e) => handleInputChange('kycRequired', e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="font-semibold text-primary-900">Modo de Mantenimiento</p>
              <p className="text-sm text-slate-600 mt-1">Desactiva la plataforma para actualizaciones</p>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
          <Bell className="w-6 h-6" />
          Notificaciones
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="font-semibold text-primary-900">Notificaciones por Email</p>
              <p className="text-sm text-slate-600 mt-1">Enviar alertas a inversores por email</p>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Contact Settings */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
          <Users className="w-6 h-6" />
          Información de Contacto
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email de Soporte"
            type="email"
            value={settings.supportEmail}
            onChange={(e) => handleInputChange('supportEmail', e.target.value)}
          />
          <Input
            label="Canal de Telegram"
            value={settings.telegramChannel}
            onChange={(e) => handleInputChange('telegramChannel', e.target.value)}
          />
        </div>
      </div>

      {/* System Limits */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Límites del Sistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Máximo de Proyectos Activos"
            type="number"
            min="1"
            value={settings.maxProjects}
            onChange={(e) => handleInputChange('maxProjects', parseInt(e.target.value))}
          />
          <div className="flex items-end">
            <Button variant="outline" className="w-full">
              Ver Estadísticas del Sistema
            </Button>
          </div>
        </div>
      </div>

      {/* API Configuration */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Configuración de API
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm font-medium text-slate-600 mb-2">Red Blockchain</p>
            <p className="font-semibold text-primary-900">Ethereum Mainnet</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm font-medium text-slate-600 mb-2">Versión API</p>
            <p className="font-semibold text-primary-900">v2.1.0</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm font-medium text-slate-600 mb-2">Base de Datos</p>
            <p className="font-semibold text-primary-900">PostgreSQL 15.2</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <Button
          variant="secondary"
          size="lg"
          onClick={handleSave}
          isLoading={isSaving}
        >
          <Save className="w-5 h-5 mr-2" />
          Guardar Configuración
        </Button>
        <Button variant="outline" size="lg">
          Descartar Cambios
        </Button>
      </div>

      {/* Last Updated */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
        <p className="text-blue-900">
          <strong>Última actualización:</strong> 2 de junio de 2026 a las 14:35 UTC
        </p>
        <p className="text-blue-700 mt-1">Realizado por: Admin System</p>
      </div>
    </div>
  );
}
