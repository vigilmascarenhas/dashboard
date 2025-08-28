import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Wifi, WifiOff, MapPin, Play, Pause } from 'lucide-react';
import { useStockFetch } from '../hooks/usStockFetch';
import { brData, usData } from '../data/dados';

export const RealtimeMarketBoard = () => {
  const { brStocks, usStocks, loading, error } = useStockFetch();

  const [lastUpdate, setLastUpdate] = useState(new Date());



  // Update timestamp when data changes
  useEffect(() => {
    setLastUpdate(new Date());
  }, [brStocks, usStocks]);

  // Filter B3 businesses and get matching stocks
  const b3Businesses = brData;
  const b3Tickers = b3Businesses.map(business => business.ticker);
  const allShowStocks = brStocks.filter(stock => b3Tickers.includes(stock.stock));

  // Filter US businesses and get matching stocks (Finnhub format)
  const usBusinesses = usData;
  const cleanedUsTickers = usBusinesses.map(business => {
    // Clean ticker the same way as in the hook
    let cleanSymbol = business.ticker.trim().replace(/^(NYSE:\s*|NASDAQ:\s*)/i, '');
    cleanSymbol = cleanSymbol.split(';')[0].trim();
    return cleanSymbol;
  });
  const usShowStocks = usStocks ? usStocks.filter(stock => cleanedUsTickers.includes(stock.ticker)) : [];
  

  // Loading state
  if (loading) {
    return (
      <div className="backdrop-blur-md rounded-xl p-6 border border-white/20 w-full" style={{background: '#FFFFFF'}}>
        <div className="flex items-center gap-3">
          <Activity className="h-5 w-5 text-blue-500 animate-spin" />
          <h3 className="text-xl font-semibold text-black">
            Carregando dados B3 ()...
          </h3>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="backdrop-blur-md rounded-xl p-6 border border-red-200 w-full" style={{background: '#FFFFFF'}}>
        <div className="flex items-center gap-3">
          <WifiOff className="h-5 w-5 text-red-500" />
          <h3 className="text-xl font-semibold text-red-600">
            Erro ao carregar dados B3: {error}
          </h3>
        </div>
      </div>
    );
  }

  // Helper functions for formatting
  const formatPrice = (price) => {
    if (!price || isNaN(price)) return 'R$ --';
    return `R$ ${Number(price).toFixed(2)}`;
  };

  const formatChange = (change, changePercent) => {
    if (change === undefined || change === null || changePercent === undefined || changePercent === null || isNaN(change) || isNaN(changePercent)) return '--';
    const sign = change >= 0 ? '+' : '';
    return `${sign}R$ ${Number(change).toFixed(2)} (${sign}${Number(changePercent).toFixed(2)}%)`;
  };

  const getChangeColor = (change) => {
    if (change === undefined) return 'text-gray-500';
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change) => {
    if (change === undefined) return <Activity className="h-4 w-4" />;
    return change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  // Helper function for US market formatting
  const formatUSPrice = (price) => {
    if (!price || isNaN(price)) return '$ --';
    return `$ ${Number(price).toFixed(2)}`;
  };

  return (
    <>  
    {/* Success state */}
    {allShowStocks.length > 0 && (
      <div className="backdrop-blur-md rounded-xl p-6 border" style={{background: '#FFFFFF', borderColor: '#4398CB'}}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6" style={{color: '#4398CB'}} />
            <h2 className="text-2xl font-bold text-black">B3</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Live ({allShowStocks.length})</span>
            </div>
            <div className="text-xs text-gray-500">
              Última atualização: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allShowStocks.map(stock => {
            // Find corresponding business info from B3 data
            const market = 'B3';
            const businessInfo = b3Businesses.find(business => business.ticker === stock.stock);
            
            return (
              <div 
                key={stock.stock} 
                className="p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: '#F8FAFC',
                  borderColor: stock.change >= 0 ? '#10B981' : stock.change < 0 ? '#EF4444' : '#E5E7EB'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-bold text-lg text-black">{stock.stock}</span>
                    {businessInfo && (
                      <div className="text-xs text-gray-600 mt-1">
                        {businessInfo.empresa}
                      </div>
                    )}
                  </div>
                  {stock.change !== undefined && (
                    <div className={getChangeColor(stock.change)}>
                      {getChangeIcon(stock.change)}
                    </div>
                  )}
                </div>
                
                <div className="text-2xl font-bold text-black mb-1">
                  {formatPrice(stock.close)}
                </div>
                
                <div className={`text-sm font-medium ${getChangeColor(stock.change)}`}>
                  {formatChange(stock.change, stock.changePercent)}
                </div>
                
                <div className="text-xs font-medium text-blue-500 mb-1">
                  {market}
                </div>
                
                <div className="text-xs text-gray-600 mt-2 space-y-1">
                  {businessInfo && (
                    <div className="flex justify-between">
                      <span>Setor:</span>
                      <span className="text-blue-600">{businessInfo.setor}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}

    {/* US Market Success state */}
    {usShowStocks.length > 0 && (
      <div className="backdrop-blur-md rounded-xl p-6 border mt-6" style={{background: '#FFFFFF', borderColor: '#059669'}}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6" style={{color: '#059669'}} />
            <h2 className="text-2xl font-bold text-black">NYSE/NASDAQ</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Live ({usShowStocks.length})</span>
            </div>
            <div className="text-xs text-gray-500">
              Última atualização: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {usShowStocks.map(stock => {
            // Find corresponding business info from US data (match cleaned ticker)
            const businessInfo = usBusinesses.find(business => {
              let cleanSymbol = business.ticker.trim().replace(/^(NYSE:\s*|NASDAQ:\s*)/i, '');
              cleanSymbol = cleanSymbol.split(';')[0].trim();
              return cleanSymbol === stock.ticker;
            });
            const change = stock.change || 0;
            const changePercent = stock.changePercent || 0;
            
            return (
              <div 
                key={stock.ticker} 
                className="p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: '#F8FAFC',
                  borderColor: change >= 0 ? '#10B981' : change < 0 ? '#EF4444' : '#E5E7EB'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-bold text-lg text-black">{stock.ticker}</span>
                    {businessInfo && (
                      <div className="text-xs text-gray-600 mt-1">
                        {businessInfo.empresa}
                      </div>
                    )}
                  </div>
                  <div className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-black mb-1">
                  {formatUSPrice(stock.current)}
                </div>
                
                <div className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {change >= 0 ? '+' : ''}${Number(change).toFixed(2)} ({change >= 0 ? '+' : ''}{Number(changePercent).toFixed(2)}%)
                </div>
                
                <div className="text-xs font-medium text-emerald-600 mb-1">
                  {businessInfo?.bolsa?.includes('NASDAQ') ? 'NASDAQ' : 'NYSE'}
                </div>
                
                <div className="text-xs text-gray-600 mt-2 space-y-1">
                  {businessInfo && (
                    <div className="flex justify-between">
                      <span>Setor:</span>
                      <span className="text-emerald-600">{businessInfo.setor}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tempo Real:</span>
                    <span className="text-green-600">✓</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}

    {/* No stocks found */}
    {!loading && !error && allShowStocks.length === 0 && usShowStocks.length === 0 && (
      <div className="backdrop-blur-md rounded-xl p-6 border border-yellow-200 w-full" style={{background: '#FFFFFF'}}>
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-yellow-500" />
          <div>
            <h3 className="text-xl font-semibold text-yellow-600">
              Nenhuma empresa encontrada
            </h3>
            <div className="text-sm text-gray-600 mt-2">
              <div>B3 Tickers: {b3Tickers.join(', ')}</div>
              <div className="mt-1">US Tickers: {cleanedUsTickers.join(', ')}</div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};
