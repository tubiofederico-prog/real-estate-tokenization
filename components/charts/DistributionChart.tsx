'use client';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Valle Norte', value: 23 },
  { name: 'Torre Andes', value: 31 },
  { name: 'Renta Urbana', value: 19 },
  { name: 'Distrito Capital', value: 17 },
  { name: 'Otros', value: 10 },
];

const COLORS = ['#10b981', '#06b6d4', '#06b6d4', '#f59e0b', '#94a3b8'];

export const DistributionChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-primary-900 mb-4">Distribución de Cartera</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
