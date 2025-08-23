import React from 'react';
import { Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

export const SectorChart = ({tittle, dadosSetores }) => {
  return <div className="backdrop-blur-md rounded-xl p-6 border border-white/20 w-full" style={{background: '#FFFFFF'}}>
  <h3 className="text-xl font-semibold text-black mb-4">{tittle}</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={dadosSetores}>
      <CartesianGrid strokeDasharray="3 3" stroke="#00000020" />
      <XAxis 
        dataKey="nome" 
        tick={{ fill: 'black', fontSize: 10 }} 
        angle={-45}
        textAnchor="end"
        height={80}
      />
      <YAxis tick={{ fill: 'black' }} />
      <Tooltip 
        contentStyle={{ 
          backgroundColor: 'rgba(0,0,0,0.8)', 
          border: '1px solid rgba(0,0,0,0.2)',
          borderRadius: '8px',
          color: 'white'
        }} 
      />
      <Bar dataKey="quantidade" fill="#4398CB" />
    </BarChart>
  </ResponsiveContainer>
</div>
};