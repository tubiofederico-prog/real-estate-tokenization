import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  onRowClick?: (row: any) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (column: string) => void;
  selectable?: boolean;
  selectedRows?: Set<string>;
  onSelectRow?: (rowKey: string) => void;
  onSelectAll?: (selected: boolean) => void;
  rowKey?: string;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  onRowClick,
  sortBy,
  sortOrder = 'asc',
  onSort,
  selectable = false,
  selectedRows = new Set(),
  onSelectRow,
  onSelectAll,
  rowKey = 'id',
}) => {
  const handleSelectAll = (checked: boolean) => {
    onSelectAll?.(checked);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {selectable && (
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 font-semibold text-slate-700 ${
                  column.width ? `w-${column.width}` : ''
                } ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}`}
                style={column.width ? { width: column.width } : {}}
              >
                <div className="flex items-center gap-2">
                  <span>{column.label}</span>
                  {column.sortable && onSort && (
                    <button
                      onClick={() => onSort(column.key)}
                      className="p-1 hover:bg-slate-200 rounded transition-colors"
                    >
                      {sortBy === column.key ? (
                        sortOrder === 'asc' ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-slate-500">
                No hay datos
              </td>
            </tr>
          ) : (
            data.map((row, idx) => {
              const rowId = row[rowKey]?.toString() || idx.toString();
              const isSelected = selectedRows.has(rowId);

              return (
                <tr
                  key={rowId}
                  className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  } ${isSelected ? 'bg-primary-50' : ''}`}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectRow?.(rowId)}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={`${rowId}-${column.key}`}
                      className={`px-4 py-3 text-primary-900 ${
                        column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
