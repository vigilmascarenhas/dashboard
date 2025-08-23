import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export const PizzaChart = ({ tittle, dadosCapital }) => {
  return <div className="backdrop-blur-md rounded-xl p-6 border border-white/20" style={{background: '#FFFFFF'}}>
  <h3 className="text-xl font-semibold text-black mb-4">{tittle}</h3>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={dadosCapital}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {dadosCapital.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>
};