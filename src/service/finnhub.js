const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

// Rate limiting: Finnhub free tier allows 60 requests per minute
const REQUESTS_PER_MINUTE = 50; // Leave some buffer
const DELAY_BETWEEN_REQUESTS = 1000 / REQUESTS_PER_MINUTE; // ms between requests

// Utility function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Retry logic for failed requests
const fetchWithRetry = async (url, maxRetries = 3, retryDelay = 2000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      
      if (response.status === 429) {
        // Rate limited - wait longer before retry
        if (attempt < maxRetries) {
          await delay(retryDelay * attempt);
          continue;
        }
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      await delay(retryDelay);
    }
  }
};

// Rate-limited fetch function
const fetchStockQuote = async (symbol) => {
  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`;
    const data = await fetchWithRetry(url);
    
    return {
      ticker: symbol,
      current: data.c,
      change: data.d,
      changePercent: data.dp,
      success: true
    };
  } catch (error) {
    return {
      ticker: symbol,
      current: 0,
      change: 0,
      changePercent: 0,
      success: false,
      error: error.message
    };
  }
};

export const fetchUsStocks = async (symbols, onProgress) => {
  const results = [];
  
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    
    // Fetch stock quote
    const result = await fetchStockQuote(symbol);
    results.push(result);
    
    // Report progress if callback provided
    if (onProgress) {
      onProgress({
        current: i + 1,
        total: symbols.length,
        symbol,
        success: result.success
      });
    }
    
    // Add delay between requests (except for the last one)
    if (i < symbols.length - 1) {
      await delay(DELAY_BETWEEN_REQUESTS);
    }
  }

  const successCount = results.filter(r => r.success).length;
  
  return results.filter(result => result.success); // Return only successful results
};