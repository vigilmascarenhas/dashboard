import { useState, useEffect } from 'react';
import { brData, usData } from '../data/dados';
import { fetchBRStocks } from '../service/brapi';
import { fetchUsStocks } from '../service/finnhub';


export const useStockFetch = (autoFetch = true) => {
  const [brStocks, setBrStocks] = useState([]);
  const [usStocks, setUsStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Clean symbols array for Finnhub (expects array, not comma-separated string)
      const symbolsArray = usData.map(stock => {
        // Clean up ticker symbols like "NYSE: CNH" -> "CNH"
        let cleanSymbol = stock.ticker.trim().replace(/^(NYSE:\s*|NASDAQ:\s*)/i, '');
        // Handle symbols with semicolons (like MRK; MRCK34) - take first part
        cleanSymbol = cleanSymbol.split(';')[0].trim();
        return cleanSymbol;
      }).filter(symbol => symbol && symbol.length > 0);

      // Fetch BR stocks first (faster, no rate limiting)
      const brFetch = await fetchBRStocks();
      const brStocks = filterBrStocks(brFetch);
      setBrStocks(brStocks);

      // Fetch US stocks
      if (symbolsArray.length > 0) {
        const usFetch = await fetchUsStocks(symbolsArray);
        
        // Set final results
        setUsStocks(usFetch || []);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchMarketData();
    }
  }, [autoFetch]);

  return {
    brStocks,
    usStocks,
    loading,
    error,
    refetch: fetchMarketData
  };
}

const filterBrStocks = (data) => {

  const brMatch = data.filter(stock => brData.some(company => company.ticker === stock.stock));
      
  // Transform data to ensure proper structure
  const transformedBrStocks = brMatch.map(stock => {
    const close = stock.close || stock.regularMarketPrice || 0;
    const previousClose = stock.previousClose || stock.regularMarketPreviousClose || close;
    
    // Calculate change if not provided
    let change = stock.change;
    let changePercent = stock.changePercent;
    
    if (change === 0 || change === null) {
      change = close - previousClose;
      changePercent = previousClose !== 0 ? ((close / previousClose) - 1) * 100 : 0;
    }
    
    return {
      ...stock,
      close: close,
      change: change,
      changePercent: changePercent,
      previousClose: previousClose
    };
  });

  return transformedBrStocks;
}

