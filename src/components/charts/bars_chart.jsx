import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const BarsChart = ({ tittle, dadosBolsas, filtroCliente }) => {
  const getClientText = (cliente) => {
    switch(cliente) {
      case 'EDU': return 'EDU';
      case 'GE': return 'GE';
      case 'TODOS': return 'Both (EDU & GE)';
      default: return 'Both (EDU & GE)';
    }
  };

  return <div className="backdrop-blur-md rounded-xl p-6 border border-white/20" style={{background: '#FFFFFF'}}>
  <h3 className="text-xl font-semibold text-black mb-4">{tittle}</h3>
  <div className="text-center mb-3">
    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
      {getClientText(filtroCliente)}
    </span>
  </div>
  <ResponsiveContainer width="100%" height={350}>
    <BarChart data={dadosBolsas}>
      <CartesianGrid strokeDasharray="3 3" stroke="#00000020" />
      <XAxis 
        dataKey="nome" 
        tick={{ fill: 'black', fontSize: 9 }} 
        angle={-45}
        textAnchor="end"
        height={100}
        interval={0}
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