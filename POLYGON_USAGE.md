# Polygon API Integration Usage Guide

This guide demonstrates how to use the Polygon API integration to fetch all available tickers and match them with your US market clients.

## Overview

The integration consists of three main functions:

1. `fetchPolygonStocks(nextUrl)` - Fetches a single page of ticker data
2. `fetchAllPolygonStocks()` - Fetches all pages using pagination
3. `findUsMarketTickers(usMarketClients)` - Finds matches between Polygon tickers and your US market clients

## Key Features

- **Complete Pagination Support**: Automatically handles the `next_url` property to fetch all available data
- **Intelligent Ticker Matching**: Cleans ticker symbols (removes NYSE:, NASDAQ: prefixes) for better matching
- **Comprehensive Results**: Returns detailed information about matches, misses, and API performance
- **Error Handling**: Robust error handling with safety limits (max 100 pages)

## Basic Usage

### Using the Hook

```jsx
import { useStockFetch } from '../hooks/usStockFetch';

function MyComponent() {
  const { usStocks, loading, error, matchResults, refetch } = useStockFetch();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Found {usStocks.length} matching tickers</h2>
      {usStocks.map(match => (
        <div key={match.matchedTicker}>
          <strong>{match.client.cliente}</strong> - {match.matchedTicker}
          <br />
          {match.polygonData.name}
        </div>
      ))}
    </div>
  );
}
```

### Direct API Usage

```javascript
import { findUsMarketTickers } from './service/polygon';
import { usMarket } from './data/usMarket';

async function fetchData() {
  try {
    const results = await findUsMarketTickers(usMarket);
    
    console.log('Results Summary:', {
      totalMatches: results.matches.length,
      notFound: results.notFound.length,
      totalPolygonTickers: results.totalPolygonTickers,
      pagesProcessed: results.pagesProcessed
    });
    
    // Process matches
    results.matches.forEach(match => {
      console.log(`${match.client.cliente}: ${match.matchedTicker}`);
    });
    
    // Handle not found tickers
    results.notFound.forEach(item => {
      console.log(`Not found: ${item.cleanTicker} (${item.originalClient.cliente})`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Data Structure

### Match Result Object

```javascript
{
  matches: [
    {
      client: {
        cliente: 'FORD',
        bolsa: 'BOLSA DE NY (NYSE)',
        ticker: 'F',
        source: 'EDU'
      },
      polygonData: {
        ticker: 'F',
        name: 'Ford Motor Company',
        market: 'stocks',
        locale: 'us',
        currency_name: 'usd',
        active: true,
        // ... other Polygon API fields
      },
      matchedTicker: 'F'
    }
  ],
  notFound: [
    {
      originalClient: { /* client data */ },
      cleanTicker: 'XYZ',
      originalTicker: 'NYSE: XYZ'
    }
  ],
  totalPolygonTickers: 50000,
  pagesProcessed: 15,
  totalUsMarketClients: 25
}
```

### US Market Client Structure

The integration works with client objects that have this structure:

```javascript
{
  cliente: 'COMPANY_NAME',
  bolsa: 'NYSE' | 'NASDAQ' | 'BOLSA DE NY (NYSE)' | 'NASDAQ',
  ticker: 'TICK' | 'NYSE: TICK' | 'NASDAQ: TICK',
  source: 'EDU' | 'GE'
}
```

## Component Usage

You can use the pre-built `UsMarketTickers` component:

```jsx
import { UsMarketTickers } from './components/UsMarketTickers';

function App() {
  return (
    <div>
      <UsMarketTickers />
    </div>
  );
}
```

## Environment Setup

Make sure you have your Polygon API key configured:

```bash
# .env
VITE_POLYGON_API_KEY=your_polygon_api_key_here
```

## Performance Notes

- The integration fetches all available tickers (typically 50,000+)
- Each API call fetches up to 1,000 tickers per page
- Pagination continues until all data is retrieved
- Safety limit of 100 pages prevents infinite loops
- Full fetch typically takes 10-30 seconds depending on API response time

## Troubleshooting

### Common Issues

1. **API Key Issues**: Ensure your `VITE_POLYGON_API_KEY` is set correctly
2. **Rate Limiting**: The integration respects Polygon's rate limits
3. **No Matches Found**: Check that ticker symbols in your data match Polygon's format
4. **Memory Issues**: For very large datasets, consider implementing data streaming

### Debugging

Enable console logging to see detailed information:

```javascript
// The integration automatically logs:
// - Page fetch progress
// - Total tickers collected
// - Match results
// - Error details
```

## API Reference

### Functions

- `fetchPolygonStocks(nextUrl)` - Fetch single page
- `fetchAllPolygonStocks()` - Fetch all pages with pagination
- `findUsMarketTickers(usMarketClients)` - Find matches with client data

### Hook

- `useStockFetch()` - React hook with loading states and error handling

The integration is designed to handle the complete Polygon API pagination automatically, making it easy to work with all available ticker data while finding matches with your specific US market clients.
