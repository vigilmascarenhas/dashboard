import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const BarsChart = ({ tittle, dadosBolsas }) => {
  return <div className="backdrop-blur-md rounded-xl p-6 border border-white/20" style={{background: '#FFFFFF'}}>
  <h3 className="text-xl font-semibold text-black mb-4">{tittle}</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={dadosBolsas}>
      <CartesianGrid strokeDasharray="3 3" stroke="#00000020" />
      <XAxis dataKey="nome" tick={{ fill: 'black', fontSize: 12 }} />
      <YAxis tick={{ fill: 'black' }} />
      <Tooltip 
        contentStyle={{ 
          backgroundColor: 'rgba(0,0,0,0.8)', 
          border: '1px solid rgba(0,0,0,0.2)',
          borderRadius: '8px',
          color: 'black'
        }} 
      />
      <Bar dataKey="quantidade" fill="#4398CB" />
    </BarChart>
  </ResponsiveContainer>
</div>
};