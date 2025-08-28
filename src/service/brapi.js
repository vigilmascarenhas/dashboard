const BRAPI_API_KEY = import.meta.env.VITE_BRAPI_API_KEY;

export const fetchBRStocks = async () => {
  const response = await fetch("https://brapi.dev/api/quote/list", {
    headers: {
      "Authorization": `Bearer ${BRAPI_API_KEY}`
    }
  });

  const json = await response.json();
  const stocks = json.stocks;

  return stocks;
};