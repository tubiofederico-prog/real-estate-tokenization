'use client';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Table } from '@/components/common/Table';
import { Badge } from '@/components/common/Badge';
import { Edit2, Trash2, Plus, Save, X, CheckCircle } from 'lucide-react';
import { PLATFORM_CONFIG } from '@/lib/mockData';

export default function CountriesPage() {
  const [countries, setCountries] = useState(PLATFORM_CONFIG.countries);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newCountry, setNewCountry] = useState({ code: '', name: '', active: true });

  const activeCount = countries.filter((c) => c.active).length;

  const handleToggle = (code: string) => {
    setCountries(countries.map((c) => (c.code === code ? { ...c, active: !c.active } : c)));
  };

  const handleAddCountry = () => {
    if (newCountry.code && newCountry.name) {
      setCountries([...countries, newCountry]);
      setNewCountry({ code: '', name: '', active: true });
      setIsAdding(false);
    }
  };

  const handleDelete = (code: string) => {
    setCountries(countries.filter((c) => c.code !== code));
  };

  const columns: any[] = [
    {
      key: 'code',
      label: 'Código',
      render: (value: string) => (
        <span className="font-mono font-bold text-primary-900">{value}</span>
      ),
    },
    {
      key: 'name',
      label: 'País',
      render: (value: string) => <span className="font-semibold text-primary-900">{value}</span>,
    },
    {
      key: 'active',
      label: 'Estado',
      render: (value: boolean, row: any) => (
        <Badge status={value ? 'active' : 'blocked'} />
      ),
    },
    {
      key: 'code',
      label: 'Acciones',
      align: 'center' as const,
      render: (value: string, row: any) => (
        <div className="flex items-center gap-2 justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleToggle(value)}
          >
            {row.active ? (
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            ) : (
              <X className="w-4 h-4 text-red-600" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(value)}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Configuración de Países</h1>
          <p className="text-slate-600 mt-2">
            {activeCount} activos de {countries.length} disponibles
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Agregar País
        </Button>
      </div>

      {/* Active Countries Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <p className="text-sm text-slate-600 mb-2">Países Activos</p>
          <p className="text-3xl font-bold text-emerald-700">{activeCount}</p>
          <p className="text-xs text-slate-500 mt-2">
            {((activeCount / countries.length) * 100).toFixed(0)}% del total
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <p className="text-sm text-slate-600 mb-2">Países Inactivos</p>
          <p className="text-3xl font-bold text-yellow-700">
            {countries.length - activeCount}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            {(((countries.length - activeCount) / countries.length) * 100).toFixed(0)}% del total
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <p className="text-sm text-slate-600 mb-2">Total de Países</p>
          <p className="text-3xl font-bold text-primary-900">{countries.length}</p>
          <p className="text-xs text-slate-500 mt-2">Configurados en plataforma</p>
        </div>
      </div>

      {/* Add Country Form */}
      {isAdding && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-primary-900 mb-4">Agregar Nuevo País</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Código de País"
              placeholder="ej. AR, CL, UY"
              value={newCountry.code}
              onChange={(e) =>
                setNewCountry({ ...newCountry, code: e.target.value.toUpperCase() })
              }
              maxLength={2}
            />
            <Input
              label="Nombre del País"
              placeholder="ej. Argentina"
              value={newCountry.name}
              onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
            />
            <div>
              <label className="text-sm font-medium text-primary-900 mb-2 block">Estado</label>
              <select
                value={newCountry.active ? 'active' : 'inactive'}
                onChange={(e) =>
                  setNewCountry({ ...newCountry, active: e.target.value === 'active' })
                }
                className="w-full px-4 py-2.5 border-2 rounded-lg border-slate-300 focus:outline-none focus:border-primary-600"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="secondary" onClick={handleAddCountry}>
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Countries Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table columns={columns} data={countries} rowKey="code" />
      </div>

      {/* Country Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-primary-900 mb-4">Países Activos</h3>
          <div className="space-y-2">
            {countries
              .filter((c) => c.active)
              .map((country) => (
                <div
                  key={country.code}
                  className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-primary-900">{country.name}</p>
                    <p className="text-xs text-slate-600">{country.code}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-primary-900 mb-4">Países Inactivos</h3>
          <div className="space-y-2">
            {countries
              .filter((c) => !c.active)
              .map((country) => (
                <div
                  key={country.code}
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-slate-700">{country.name}</p>
                    <p className="text-xs text-slate-500">{country.code}</p>
                  </div>
                  <X className="w-5 h-5 text-slate-400" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
