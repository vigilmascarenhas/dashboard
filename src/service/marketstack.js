const MARKETSTACK_API_KEY = import.meta.env.VITE_MARKETSTACK_API_KEY;
const BASE_URL = 'http://api.marketstack.com/v2/eod';

/**
 * Fetch ticker list from Marketstack API
 * @param {Object} options - Configuration options
 * @param {number} options.limit - Number of tickers per request (max 1000)
 * @param {number} options.offset - Offset for pagination
 * @returns {Promise<Object>} Ticker list response with pagination
 */
export const fetchUsStocks = async (symbols) => {
  try {
    if (!MARKETSTACK_API_KEY) {
      throw new Error('Marketstack API key not found. Please add VITE_MARKETSTACK_API_KEY to your .env file');
    }

    // Clean up symbols - remove exchange prefixes and fix formatting
    const cleanSymbols = symbols
      .split(',')
      .map(symbol => {
        // Remove exchange prefixes like "NYSE: " or "NASDAQ: "
        let cleanSymbol = symbol.trim().replace(/^(NYSE:\s*|NASDAQ:\s*)/i, '');
        // Handle symbols with semicolons (like MRK; MRCK34) - take first part
        cleanSymbol = cleanSymbol.split(';')[0].trim();
        return cleanSymbol;
      })
      .filter(symbol => symbol && symbol.length > 0) // Remove empty symbols
      .join(',');

    console.log('Original symbols:', symbols);
    console.log('Cleaned symbols:', cleanSymbols);

    // Request only the latest data with limit=1 per symbol to avoid duplicates
    const response = await fetch(`${BASE_URL}?access_key=${MARKETSTACK_API_KEY}&symbols=${cleanSymbols}&limit=100&sort=DESC`);

    const data = await response.json();
    
    // Log the response to verify we're getting only requested symbols
    console.log('Marketstack API response:', data);
    
    return data.data;
  } catch (error) {
    console.error('Error fetching ticker list from Marketstack:', error);
    throw error;
  }
};