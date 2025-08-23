import React from 'react';

const InsightsSection = ({ insights }) => {
  // Cycle through different background colors and border colors for variety
  const cardStyles = [
    { backgroundColor: 'rgba(6, 110, 187, 0.2)', borderColor: '#006EBB' },
    { backgroundColor: 'rgba(139, 192, 222, 0.2)', borderColor: '#8BC0DE' },
    { backgroundColor: 'rgba(30, 53, 193, 0.2)', borderColor: '#1E35C1' }
  ];

  return (
    <div className="mt-8 backdrop-blur-md rounded-xl p-6 border" style={{backgroundColor: 'rgba(255,255,255,0.3)', borderColor: '#8BC0DE'}}>
      <h3 className="text-xl font-semibold mb-4" style={{color: '#000000'}}>Insights Principais</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => {
          const cardStyle = cardStyles[index % cardStyles.length];
          return (
            <div 
              key={index} 
              className="rounded-lg p-4" 
              style={{
                backgroundColor: cardStyle.backgroundColor, 
                border: `1px solid ${cardStyle.borderColor}`
              }}
            >
              <h4 className="font-semibold mb-2" style={{color: '#1E35C1'}}>
                {insight.insightTittle}
              </h4>
              <p className="text-sm" style={{color: '#006EB6'}}>
                {insight.InsightText}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsSection;
