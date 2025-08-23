import React from 'react';
import { Building2 } from 'lucide-react';

export const StatisticsCard = ({ tittle, data }) => {
  return <div className="bg-gradient-to-r rounded-xl p-6 text-white" style={{background: '#4398CB'}}>
  <div className="flex items-center justify-between">
    <div>
      <p style={{color: '#FFFFFF'}}>{tittle}</p>
      <p className="text-3xl font-bold">{data}</p>
    </div>
    <Building2 className="h-12 w-12" style={{color: '#FFFFFF'}} />
  </div>
</div>
};