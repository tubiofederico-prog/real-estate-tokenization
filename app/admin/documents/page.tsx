'use client';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { MetricCard } from '@/components/common/MetricCard';
import { Table } from '@/components/common/Table';
import { Upload, Download, FileText, Eye, Trash2, Lock, Share2, Plus } from 'lucide-react';
import { projects } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';

export default function DocumentsPage() {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  // Mock document data
  const documents = [
    {
      id: 'doc-001',
      projectId: 'proj-001',
      name: 'Prospecto de Inversión',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-08-15',
      uploadedBy: 'Admin System',
      status: 'active',
      category: 'legal',
      accessLevel: 'public',
    },
    {
      id: 'doc-002',
      projectId: 'proj-001',
      name: 'Estados Financieros Q3 2024',
      type: 'pdf',
      size: '1.8 MB',
      uploadDate: '2024-11-20',
      uploadedBy: 'Finance Team',
      status: 'active',
      category: 'financial',
      accessLevel: 'investor',
    },
    {
      id: 'doc-003',
      projectId: 'proj-002',
      name: 'Contrato de Construcción',
      type: 'docx',
      size: '3.1 MB',
      uploadDate: '2024-09-10',
      uploadedBy: 'Legal Team',
      status: 'active',
      category: 'legal',
      accessLevel: 'restricted',
    },
    {
      id: 'doc-004',
      projectId: 'proj-003',
      name: 'Certificado de Avalúo',
      type: 'pdf',
      size: '1.2 MB',
      uploadDate: '2024-06-01',
      uploadedBy: 'Valuation Team',
      status: 'active',
      category: 'technical',
      accessLevel: 'investor',
    },
    {
      id: 'doc-005',
      projectId: 'proj-004',
      name: 'Reporte de Sostenibilidad',
      type: 'pdf',
      size: '2.9 MB',
      uploadDate: '2025-02-15',
      uploadedBy: 'ESG Team',
      status: 'active',
      category: 'compliance',
      accessLevel: 'public',
    },
    {
      id: 'doc-006',
      projectId: 'proj-005',
      name: 'Políticas de Cumplimiento KYC',
      type: 'pdf',
      size: '1.5 MB',
      uploadDate: '2024-01-20',
      uploadedBy: 'Compliance',
      status: 'active',
      category: 'compliance',
      accessLevel: 'restricted',
    },
    {
      id: 'doc-007',
      projectId: 'proj-006',
      name: 'Auditoría Externa 2024',
      type: 'pdf',
      size: '4.2 MB',
      uploadDate: '2025-03-01',
      uploadedBy: 'External Auditor',
      status: 'active',
      category: 'financial',
      accessLevel: 'restricted',
    },
  ];

  const categories = ['legal', 'financial', 'technical', 'compliance'];
  const accessLevels = ['public', 'investor', 'restricted'];

  const categoryColors: Record<string, string> = {
    legal: 'bg-blue-100 text-blue-700',
    financial: 'bg-emerald-100 text-emerald-700',
    technical: 'bg-cyan-100 text-cyan-700',
    compliance: 'bg-yellow-100 text-yellow-700',
  };

  const accessColors: Record<string, string> = {
    public: 'bg-slate-100 text-slate-700',
    investor: 'bg-purple-100 text-purple-700',
    restricted: 'bg-red-100 text-red-700',
  };

  const columns: any[] = [
    {
      key: 'name',
      label: 'Documento',
      render: (value: string, row: any) => (
        <div>
          <p className="font-semibold text-primary-900 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {value}
          </p>
          <p className="text-xs text-slate-600 mt-1">{row.type.toUpperCase()} • {row.size}</p>
        </div>
      ),
    },
    {
      key: 'projectId',
      label: 'Proyecto',
      render: (value: string) => {
        const proj = projects.find((p) => p.id === value);
        return <span className="text-sm">{proj?.name}</span>;
      },
    },
    {
      key: 'category',
      label: 'Categoría',
      render: (value: string) => (
        <span className={`capitalize px-2 py-1 rounded text-xs font-medium ${categoryColors[value] || 'bg-slate-100'}`}>
          {value}
        </span>
      ),
    },
    {
      key: 'accessLevel',
      label: 'Acceso',
      render: (value: string) => (
        <span className={`capitalize px-2 py-1 rounded text-xs font-medium ${accessColors[value] || 'bg-slate-100'}`}>
          {value === 'public' ? 'Público' : value === 'investor' ? 'Inversores' : 'Restringido'}
        </span>
      ),
    },
    {
      key: 'uploadDate',
      label: 'Cargado',
      render: (value: string) => formatDate(value),
    },
    {
      key: 'uploadedBy',
      label: 'Responsable',
      render: (value: string) => <span className="text-sm">{value}</span>,
    },
    {
      key: 'id',
      label: 'Acciones',
      align: 'center' as const,
      render: (value: string, row: any) => (
        <div className="flex items-center gap-1 justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedDocument(row)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const publicDocs = documents.filter((d) => d.accessLevel === 'public').length;
  const investorDocs = documents.filter((d) => d.accessLevel === 'investor').length;
  const restrictedDocs = documents.filter((d) => d.accessLevel === 'restricted').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Gestión Documental</h1>
          <p className="text-slate-600 mt-2">{documents.length} documentos en el sistema</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Cargar Documento
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Documentos Totales"
          value={documents.length}
          valueColor="text-primary-900"
          icon={<FileText className="w-6 h-6 text-primary-600" />}
        />
        <MetricCard
          label="Acceso Público"
          value={publicDocs}
          valueColor="text-slate-700"
        />
        <MetricCard
          label="Para Inversores"
          value={investorDocs}
          valueColor="text-purple-700"
        />
        <MetricCard
          label="Restringidos"
          value={restrictedDocs}
          valueColor="text-red-700"
          icon={<Lock className="w-6 h-6 text-red-600" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <Table columns={columns} data={documents} rowKey="id" />
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {selectedDocument ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-6 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-primary-900 text-lg flex-1 mr-2">{selectedDocument.name}</h3>
                <FileText className="w-6 h-6 text-slate-400" />
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Proyecto</p>
                  <p className="font-semibold text-primary-900 text-sm">
                    {projects.find((p) => p.id === selectedDocument.projectId)?.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 mb-1">Categoría</p>
                  <span className={`capitalize px-2 py-1 rounded text-xs font-medium ${categoryColors[selectedDocument.category]}`}>
                    {selectedDocument.category}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-slate-600 mb-1">Nivel de Acceso</p>
                  <span className={`capitalize px-2 py-1 rounded text-xs font-medium ${accessColors[selectedDocument.accessLevel]}`}>
                    {selectedDocument.accessLevel === 'public' ? 'Público' : selectedDocument.accessLevel === 'investor' ? 'Inversores' : 'Restringido'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Tamaño</p>
                    <p className="font-semibold text-primary-900">{selectedDocument.size}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Tipo</p>
                    <p className="font-semibold text-primary-900 uppercase">{selectedDocument.type}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-600 mb-1">Cargado</p>
                  <p className="font-semibold text-primary-900">{formatDate(selectedDocument.uploadDate)}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 mb-1">Por</p>
                  <p className="font-semibold text-primary-900">{selectedDocument.uploadedBy}</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-2">
                <Button variant="secondary" className="w-full" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Editar Acceso
                </Button>
                <Button variant="danger" className="w-full" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-sm text-slate-500 hover:text-slate-700 w-full py-2"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Selecciona un documento para ver detalles</p>
            </div>
          )}
        </div>
      </div>

      {/* Document Categories Summary */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-primary-900 mb-4">Documentos por Categoría</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const count = documents.filter((d) => d.category === cat).length;
            return (
              <div key={cat} className="p-4 border border-slate-200 rounded-lg">
                <p className="font-semibold text-primary-900 capitalize mb-1">{cat}</p>
                <p className="text-2xl font-bold text-primary-700">{count}</p>
                <div className="mt-3 space-y-1 text-xs">
                  {documents
                    .filter((d) => d.category === cat)
                    .slice(0, 2)
                    .map((d) => (
                      <p key={d.id} className="text-slate-600 truncate">{d.name}</p>
                    ))}
                  {documents.filter((d) => d.category === cat).length > 2 && (
                    <p className="text-slate-500">
                      +{documents.filter((d) => d.category === cat).length - 2} más
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-gradient-to-br from-primary-50 to-cyan-50 rounded-xl border-2 border-dashed border-primary-300 p-8 text-center">
        <Upload className="w-12 h-12 text-primary-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-primary-900 mb-1">Cargar Nuevos Documentos</h3>
        <p className="text-slate-600 text-sm mb-4">Arrastra documentos aquí o haz clic para seleccionar</p>
        <Button variant="secondary" size="sm">
          Seleccionar Archivo
        </Button>
        <p className="text-xs text-slate-500 mt-4">
          Formatos soportados: PDF, Word, Excel • Tamaño máximo: 50 MB
        </p>
      </div>
    </div>
  );
}
