import React from 'react';
import { Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

export const BusinessTable = ({ tittle, dadosFiltrados }) => {
  return <div className="backdrop-blur-md rounded-xl p-6 border border-white/20 w-full" style={{background: '#FFFFFF'}}>
  <h3 className="text-xl font-semibold text-black mb-4">
    {tittle} ({dadosFiltrados.length})
  </h3>
  <div className="max-h-80 overflow-y-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-black/20">
          <th className="text-left p-2 text-black">Empresa</th>
          <th className="text-left p-2 text-black">Capital</th>
          <th className="text-left p-2 text-black">Bolsa</th>
          <th className="text-left p-2 text-black">Ticker</th>
        </tr>
      </thead>
      <tbody>
        {dadosFiltrados.map((item, index) => (
          <tr key={index} className="border-b border-black/10 hover:bg-black/5">
            <td className="p-2 text-black">{item.empresa}</td>
            <td className="p-2">
              <span className={`px-2 py-1 rounded text-xs w-12 inline-block text-center ${
                item.capitalAberto === 'SIM' 
                  ? 'bg-green-500/20 text-green-500' 
                  : 'bg-red-500/20 text-red-500'
              }`}>
                {item.capitalAberto}
              </span>
            </td>
            <td className="p-2 text-black">{item.bolsa}</td>
            <td className="p-2 text-black">{item.ticker}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
};