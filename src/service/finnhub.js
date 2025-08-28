const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

export const fetchUsStocks = async (symbols) => {
  const result = await Promise.all(symbols.map(async (symbol) => {
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
    const data = await response.json();
    return {
      ticker: symbol,
      current: data.c,
      change: data.d,
      changePercent: data.dp,
    };
  }));

  return result;
};