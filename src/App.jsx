import React, { useState, useMemo, useCallback } from 'react';
import { Globe, Filter, Search, Building2, TrendingUp, DollarSign } from 'lucide-react';
import { PizzaChart } from './components/charts/pizza_chart';
import { BarsChart } from './components/charts/bars_chart';
import { SectorChart } from './components/charts/sector_charts';
import { BusinessTable } from './components/charts/business_table';
import { allData, closedCompanies } from './data/dados';
import { StatisticsCard } from './components/statistics_card';
import InsightsSection from './components/insights_section';
import { MultiMarketBusiness } from './components/multi_market_business';
import { RealtimeMarketBoard } from './components/realtime_market_board';
import { useStockFetch } from './hooks/usStockFetch';


const Dashboard = () => {
  const [filtroCapital, setFiltroCapital] = useState('TODOS');
  const [filtroBolsa, setFiltroBolsa] = useState('TODAS');
  const [filtroCliente, setFiltroCliente] = useState('TODOS');
  const [busca, setBusca] = useState('');

  // Fetch stock data
  const { brStocks, usStocks, loading, error, refetch } = useStockFetch();
  const dadosOriginais = allData;
  const empresasNaoAbertas = closedCompanies;

  // Helper function to get unique businesses (normalize multi-exchange duplicates)
  const getUniqueBusinesses = useCallback((data) => {
    const businessMap = new Map();
    
    data.forEach(item => {
      const key = `${item.empresa}-${item.fonte || 'UNKNOWN'}`;
      
      if (!businessMap.has(key)) {
        // First occurrence of this business
        businessMap.set(key, {
          ...item,
          bolsas: [item.bolsa],
          tickers: [item.ticker],
          allListings: [item]
        });
      } else {
        // Additional exchange listing for the same business
        const existing = businessMap.get(key);
        if (item.bolsa && !existing.bolsas.includes(item.bolsa)) {
          existing.bolsas.push(item.bolsa);
        }
        if (item.ticker && !existing.tickers.includes(item.ticker)) {
          existing.tickers.push(item.ticker);
        }
        existing.allListings.push(item);
      }
    });
    
    return Array.from(businessMap.values());
  }, []);

  // Adicionar empresas não abertas aos dados
  const dadosCompletos = useMemo(() => [
    ...dadosOriginais,
    ...empresasNaoAbertas.map(empresa => ({
      empresa,
      capitalAberto: 'NÃO',
      bolsa: '-',
      ticker: '-',
      setor: 'Outros'
    }))
  ], [dadosOriginais, empresasNaoAbertas]);

  // Get unique businesses first (avoiding multi-exchange duplicates)
  const uniqueBusinesses = useMemo(() => {
    return getUniqueBusinesses(dadosCompletos);
  }, [dadosCompletos, getUniqueBusinesses]);





  // Helper function to normalize exchange names to clean, standard names
  const normalizeExchangeName = (exchangeName) => {
    if (!exchangeName || exchangeName === '-') return null;
    
    // Since bolsa names are already normalized at source, this function now mainly
    // provides display names for the UI
    const displayMap = {
      // US Markets
      'NYSE': 'NYSE',
      'NASDAQ': 'NASDAQ',
      
      // Brazilian Market
      'B3': 'B3',
      
      // European Markets
      'EPA': 'Euronext Paris',
      'BIT': 'Borsa Italiana', 
      'FTMIB': 'Borsa Italiana',
      'XETRA': 'XETRA',
      'EURONEXT': 'Euronext Amsterdam',
      'SIX': 'SIX Swiss Exchange',
      
      // Asian Markets
      'TSE': 'Tokyo Stock Exchange',
      'KRX': 'Korea Exchange',
      
      // Other Markets
      'BELEX': 'Belgrade Stock Exchange',
      'TSX': 'Toronto Stock Exchange',
      'ENX': 'Euronext'
    };
    
    return displayMap[exchangeName] || exchangeName;
  };

  // Helper function to check if a business matches exchange filter
  const matchesExchangeFilter = useCallback((business, exchangeFilter) => {
    if (exchangeFilter === 'TODAS') return true;
    
    // For multi-exchange businesses, check if any of their listings match
    if (business.bolsas) {
      return business.bolsas.some(bolsa => {
        const normalizedBolsa = normalizeExchangeName(bolsa);
        return normalizedBolsa === exchangeFilter;
      });
    }
    const normalizedBolsa = normalizeExchangeName(business.bolsa);
    return normalizedBolsa === exchangeFilter;
  }, []);



  // Filter unique businesses
  const uniqueBusinessesFiltered = useMemo(() => {
    return uniqueBusinesses.filter(business => {
      const matchCapital = filtroCapital === 'TODOS' || business.capitalAberto === filtroCapital;
      const matchBolsa = matchesExchangeFilter(business, filtroBolsa);
      const matchCliente = filtroCliente === 'TODOS' || business.fonte === filtroCliente;
      const matchBusca = business.empresa.toLowerCase().includes(busca.toLowerCase());
      return matchCapital && matchBolsa && matchCliente && matchBusca;
    });
  }, [filtroCapital, filtroBolsa, filtroCliente, busca, uniqueBusinesses, matchesExchangeFilter]);

  // Expand filtered unique businesses back to individual listings for display
  const dadosFiltrados = useMemo(() => {
    const expandedListings = [];
    
    uniqueBusinessesFiltered.forEach(business => {
      if (business.allListings) {
        // Multi-exchange business: add all listings that match exchange filter
        business.allListings.forEach(listing => {
          const normalizedExchange = normalizeExchangeName(listing.bolsa);
          const matchBolsa = filtroBolsa === 'TODAS' || normalizedExchange === filtroBolsa;
          if (matchBolsa) {
            expandedListings.push(listing);
          }
        });
      } else {
        // Single listing business
        const normalizedExchange = normalizeExchangeName(business.bolsa);
        const matchBolsa = filtroBolsa === 'TODAS' || normalizedExchange === filtroBolsa;
        if (matchBolsa) {
          expandedListings.push(business);
        }
      }
    });
    
    return expandedListings;
  }, [uniqueBusinessesFiltered, filtroBolsa]);

  // Calcular estatísticas baseadas nos negócios únicos (evitar double-counting)
  const totalEmpresas = uniqueBusinessesFiltered.length;
  const empresasAbertas = uniqueBusinessesFiltered.filter(item => item.capitalAberto === 'SIM').length;
  const empresasFechadas = totalEmpresas - empresasAbertas;
  const percentualAbertas = totalEmpresas > 0 ? ((empresasAbertas / totalEmpresas) * 100).toFixed(1) : '0.0';

  // Dados para gráfico de distribuição de capital - apenas filtrado por cliente
  const dadosCapital = useMemo(() => {
    // Filtrar apenas por cliente, ignorando outros filtros
    const businessesFilteredByClient = uniqueBusinesses.filter(business => {
      const matchCliente = filtroCliente === 'TODOS' || business.fonte === filtroCliente;
      return matchCliente;
    });
    
    const empresasAbertasCapital = businessesFilteredByClient.filter(item => item.capitalAberto === 'SIM').length;
    const empresasFechadasCapital = businessesFilteredByClient.length - empresasAbertasCapital;
    
    return [
      { name: 'Listadas na Bolsa', value: empresasAbertasCapital, color: '#8BC0DE' },
      { name: 'Não Listadas na Bolsa', value: empresasFechadasCapital, color: '#4398CB' }
    ];
  }, [uniqueBusinesses, filtroCliente]);

  // Helper function to create short display names for chart x-axis
  const getShortExchangeName = (exchangeName) => {
    const shortNameMap = {
      'NYSE': 'NYSE',
      'NASDAQ': 'NASDAQ', 
      'B3': 'B3',
      'EPA': 'PAR',
      'BIT': 'MIL',
      'FTMIB': 'MIL',
      'XETRA': 'FRA',
      'EURONEXT': 'AMS',
      'SIX': 'ZUR',
      'TSE': 'TKY',
      'KRX': 'SEO',
      'BELEX': 'BEL',
      'TSX': 'TOR',
      'ENX': 'ENX'
    };
    
    return shortNameMap[exchangeName] || exchangeName;
  };

  // Dados para gráfico de bolsas - apenas filtrado por cliente
  const dadosBolsas = useMemo(() => {
    // Filtrar apenas por cliente, ignorando outros filtros
    const businessesFilteredByClient = uniqueBusinesses.filter(business => {
      const matchCliente = filtroCliente === 'TODOS' || business.fonte === filtroCliente;
      return matchCliente;
    });
    
    const bolsas = {};
    
    businessesFilteredByClient.forEach(business => {
      if (business.capitalAberto === 'SIM') {
        // For multi-exchange businesses, count each exchange they're listed on
        const businessBolsas = business.bolsas || [business.bolsa];
        businessBolsas.forEach(bolsa => {
          const normalizedExchange = normalizeExchangeName(bolsa);
          if (normalizedExchange) {
            const shortName = getShortExchangeName(normalizedExchange);
            bolsas[shortName] = (bolsas[shortName] || 0) + 1;
          }
        });
      }
    });
    
    return Object.entries(bolsas)
      .map(([nome, quantidade]) => ({ nome, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);
  }, [uniqueBusinesses, filtroCliente]);

  // Dados para gráfico de setores (baseado em negócios únicos)
  const dadosSetores = useMemo(() => {
    const setores = {};
    uniqueBusinessesFiltered.forEach(business => {
      if (business.capitalAberto === 'SIM') {
        setores[business.setor] = (setores[business.setor] || 0) + 1;
      }
    });
    return Object.entries(setores)
      .map(([nome, quantidade]) => ({ nome, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);
  }, [uniqueBusinessesFiltered]);



  // Get all available exchanges for the filter dropdown (normalized names)
  const availableExchanges = useMemo(() => {
    const exchanges = new Set();
    
    uniqueBusinesses.forEach(business => {
      if (business.capitalAberto === 'SIM') {
        const businessBolsas = business.bolsas || [business.bolsa];
        businessBolsas.forEach(bolsa => {
          const normalizedExchange = normalizeExchangeName(bolsa);
          if (normalizedExchange) {
            exchanges.add(normalizedExchange);
          }
        });
      }
    });
    
    return Array.from(exchanges).sort();
  }, [uniqueBusinesses]);

  const empresasMultibolsa = useMemo(() => {
    // Filter by client type first
    const clientFilteredBusinesses = uniqueBusinesses.filter(business => {
      const matchCliente = filtroCliente === 'TODOS' || business.fonte === filtroCliente;
      return matchCliente;
    });

    // Find businesses with multiple exchanges
    return clientFilteredBusinesses
      .filter(business => business.allListings && business.allListings.length > 1 && business.capitalAberto === 'SIM')
      .map(business => ({
        empresa: business.empresa,
        setor: business.setor,
        listagens: business.allListings.map(l => ({
          bolsa: l.bolsa,
          ticker: l.ticker
        }))
      }));
  }, [uniqueBusinesses, filtroCliente]);

  return (
    <div className="min-h-screen p-6" style={{backgroundColor: '#C7E0F0'}}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{color: '#000000'}}>Dashboard - Clientes na Bolsa de Valores</h1>
          <p style={{color: '#000000'}}>Análise detalhada do portfólio de clientes e status de capital</p>
        </div>

        {/* Filtros */}
        <div className="backdrop-blur-md rounded-xl p-6 mb-8 border" style={{background: '#4398CB', borderColor: '#4398CB'}}>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-white" />
              <select 
                value={filtroCapital} 
                onChange={(e) => setFiltroCapital(e.target.value)}
                className="text-white rounded-lg px-3 py-2 border" 
                style={{backgroundColor: 'rgba(255,255,255,0.2)', borderColor: '#8BC0DE'}}
              >
                <option value="TODOS">Todos</option>
                <option value="SIM">Listadas na Bolsa</option>
                <option value="NÃO">Não Listadas na Bolsa</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-white" />
              <select 
                value={filtroCliente} 
                onChange={(e) => setFiltroCliente(e.target.value)}
                className="text-white rounded-lg px-3 py-2 border" 
                style={{backgroundColor: 'rgba(255,255,255,0.2)', borderColor: '#8BC0DE'}}
              >
                <option value="TODOS">Todos os Clientes</option>
                <option value="GE">Clientes GE</option>
                <option value="EDU">Clientes EDU</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-white" />
              <select 
                value={filtroBolsa} 
                onChange={(e) => setFiltroBolsa(e.target.value)}
                className="text-white rounded-lg px-3 py-2 border" 
                style={{backgroundColor: 'rgba(255,255,255,0.2)', borderColor: '#8BC0DE'}}
              >
                <option value="TODAS">Todas as Bolsas</option>
                {availableExchanges.map(exchange => (
                  <option key={exchange} value={exchange}>{exchange}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="h-5 w-5 text-white" />
              <input
                type="text"
                placeholder="Buscar empresa..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="text-white placeholder-gray-300 rounded-lg px-3 py-2 border w-full" 
                style={{backgroundColor: 'rgba(255,255,255,0.2)', borderColor: '#8BC0DE'}}
              />
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatisticsCard tittle="Total de Empresas" icon={<Building2 className="h-12 w-12" style={{color: '#FFFFFF'}} />} data={totalEmpresas} />
          <StatisticsCard tittle="Listadas na Bolsa" icon={<TrendingUp className="h-12 w-12" style={{color: '#FFFFFF'}} />} data={empresasAbertas} />
          <StatisticsCard tittle="Não Listadas na Bolsa" icon={<DollarSign className="h-12 w-12" style={{color: '#FFFFFF'}} />} data={empresasFechadas} />
          <StatisticsCard tittle="% Listadas na Bolsa" icon={<Globe className="h-12 w-12" style={{color: '#FFFFFF'}} />} data={percentualAbertas} />
        </div>

        {/* Gráficos */}
        <div className="flex gap-8 mb-8">
          {/* Tabela de Empresas Filtradas */}
          <BusinessTable tittle="Empresas Filtradas" dadosFiltrados={dadosFiltrados} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Pizza - Distribuição de Capital */}
          <PizzaChart 
            tittle="Distribuição por Tipo de Capital" 
            dadosCapital={dadosCapital} 
            filtroCliente={filtroCliente}
          />
          {/* Gráfico de Barras - Bolsas */}
          <BarsChart
            tittle="Empresas por Bolsa de Valores"
            dadosBolsas={dadosBolsas}
            filtroCliente={filtroCliente}
          />
        </div>

        {/* Gráfico de Setores e Tabela */}
        <div className="flex gap-8 mb-8">
          {/* Gráfico de Setores */}
          <SectorChart tittle="Distribuição por Setor (Listadas na Bolsa)" dadosSetores={dadosSetores} />
        </div>

        <div className="flex gap-8 mb-8">
          <MultiMarketBusiness empresasMultibolsa={empresasMultibolsa} />
        </div>

        {/* Real-time Market Board */}
        <div className="mb-8">
          <RealtimeMarketBoard 
            brStocks={brStocks}
            usStocks={usStocks}
            loading={loading}
            error={error}
            refetch={refetch}
            filtroCliente={filtroCliente}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
