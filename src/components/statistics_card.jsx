import React from 'react';

export const StatisticsCard = ({ tittle, icon, data }) => {
  return <div className="bg-gradient-to-r rounded-xl p-6 text-white" style={{background: '#4398CB', borderColor: '#8BC0DE'}}>
  <div className="flex items-center justify-between">
    <div>
      <p style={{color: '#FFFFFF'}}>{tittle}</p>
      <p className="text-3xl font-bold">{data}</p>
    </div>
    {icon}
  </div>
</div>
};