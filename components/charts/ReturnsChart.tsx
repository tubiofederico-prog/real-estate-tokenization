'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Ene', returns: 5100 },
  { month: 'Feb', returns: 6200 },
  { month: 'Mar', returns: 5800 },
  { month: 'Abr', returns: 7500 },
  { month: 'May', returns: 8900 },
  { month: 'Jun', returns: 9200 },
];

export const ReturnsChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-primary-900 mb-4">Rentabilidad por Mes</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
            }}
          />
          <Legend />
          <Bar dataKey="returns" fill="#10b981" name="Rentabilidad (USD)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
