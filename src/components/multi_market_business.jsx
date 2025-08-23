import React from 'react';

export const MultiMarketBusiness = ({ empresasMultibolsa }) => {
  return <div className="backdrop-blur-md rounded-xl p-6 border border-white/20 w-full" style={{background: '#FFFFFF'}}>
  <h3 className="text-xl font-semibold text-black mb-4">
    Empresas em Múltiplas Bolsas ({empresasMultibolsa.length})
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {empresasMultibolsa.map((empresa) => (
              <div key={empresa.empresa} className="rounded-lg p-4 border" style={{background: '#4398CB', borderColor: '#8BC0DE'}}>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="text-white font-semibold">{empresa.empresa}</h4>
            <p className="text-white/70 text-sm">{empresa.setor}</p>
          </div>
          <span className="text-xs px-2 py-1 rounded text-white" style={{backgroundColor: '#8BC0DE'}}>
            {empresa.listagens.length} Bolsas
          </span>
        </div>
        <div className="space-y-2">
          {empresa.listagens.map((listagem, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <span className="text-white">{listagem.bolsa}</span>
              <span className="font-mono" style={{color: '#8BC0DE'}}>{listagem.ticker}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
};