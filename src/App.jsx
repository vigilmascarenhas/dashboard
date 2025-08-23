import React, { useState, useMemo } from 'react';
import { Globe, Filter, Search, Building2, TrendingUp, DollarSign } from 'lucide-react';
import { PizzaChart } from './components/charts/pizza_chart';
import { BarsChart } from './components/charts/bars_chart';
import { SectorChart } from './components/charts/sector_charts';
import { BusinessTable } from './components/charts/business_table';
import { allData, closedCompanies } from './data/dados';
import { StatisticsCard } from './components/statistics_card';
import InsightsSection from './components/insights_section';
import { MultiMarketBusiness } from './components/multi_market_business';

const Dashboard = () => {
  const [filtroCapital, setFiltroCapital] = useState('TODOS');
  const [filtroBolsa, setFiltroBolsa] = useState('TODAS');
  const [busca, setBusca] = useState('');

  const dadosOriginais = allData;
  const empresasNaoAbertas = closedCompanies;

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
  ], []);

  // Filtrar dados
  const dadosFiltrados = useMemo(() => {
    return dadosCompletos.filter(item => {
      const matchCapital = filtroCapital === 'TODOS' || item.capitalAberto === filtroCapital;
      const matchBolsa = filtroBolsa === 'TODAS' || item.bolsa === filtroBolsa;
      const matchBusca = item.empresa.toLowerCase().includes(busca.toLowerCase());
      return matchCapital && matchBolsa && matchBusca;
    });
  }, [filtroCapital, filtroBolsa, busca, dadosCompletos]);

  // Calcular estatísticas
  const totalEmpresas = dadosCompletos.length;
  const empresasAbertas = dadosCompletos.filter(item => item.capitalAberto === 'SIM').length;
  const empresasFechadas = totalEmpresas - empresasAbertas;
  const percentualAbertas = ((empresasAbertas / totalEmpresas) * 100).toFixed(1);

  // Dados para gráfico de distribuição de capital
  const dadosCapital = [
    { name: 'Capital Aberto', value: empresasAbertas, color: '#8BC0DE' },
    { name: 'Capital Fechado', value: empresasFechadas, color: '#4398CB' }
  ];

  // Dados para gráfico de bolsas
  const dadosBolsas = useMemo(() => {
    const bolsas = {};
    dadosCompletos.forEach(item => {
      if (item.capitalAberto === 'SIM' && item.bolsa !== '-') {
        const bolsa = item.bolsa;
        bolsas[bolsa] = (bolsas[bolsa] || 0) + 1;
      }
    });
    return Object.entries(bolsas)
      .map(([nome, quantidade]) => ({ nome, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);
  }, [dadosCompletos]);

  // Dados para gráfico de setores
  const dadosSetores = useMemo(() => {
    const setores = {};
    dadosCompletos.forEach(item => {
      if (item.capitalAberto === 'SIM') {
        setores[item.setor] = (setores[item.setor] || 0) + 1;
      }
    });
    return Object.entries(setores)
      .map(([nome, quantidade]) => ({ nome, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);
  }, [dadosCompletos]);

  // Dados para insights
  const insights = [
    {
      insightTittle: 'Diversificação Geográfica',
      InsightText: `Carteira bem diversificada com presença em ${dadosBolsas.length} bolsas diferentes, incluindo NYSE, TSE, B3 e outras bolsas internacionais.`
    },
    {
      insightTittle: 'Potencial de Crescimento',
      InsightText: `${empresasFechadas} empresas ainda não são de capital aberto, representando oportunidades de acompanhar futuras aberturas de capital.`
    },
    {
      insightTittle: 'Setor Automotivo',
      InsightText: 'Forte presença no setor automotivo com empresas como Ford, Toyota, Mahle e outras, indicando especialização neste segmento.'
    }
  ];

  const empresasMultibolsa = useMemo(() => {
    const empresasCount = dadosOriginais.reduce((acc, item) => {
      if (item.capitalAberto === 'SIM') {
        acc[item.empresa] = (acc[item.empresa] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(empresasCount)
      .filter(([_, count]) => count > 1)
      .map(([empresa]) => {
        const listagens = dadosOriginais.filter(item => item.empresa === empresa);
        return {
          empresa,
          setor: listagens[0].setor,
          listagens: listagens.map(l => ({
            bolsa: l.bolsa,
            ticker: l.ticker
          }))
        };
      });
  }, [dadosOriginais]);

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
                <option value="SIM">Capital Aberto</option>
                <option value="NÃO">Capital Fechado</option>
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
                {dadosBolsas.map(bolsa => (
                  <option key={bolsa.nome} value={bolsa.nome}>{bolsa.nome}</option>
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
          <StatisticsCard tittle="Capital Aberto" icon={<TrendingUp className="h-12 w-12" style={{color: '#FFFFFF'}} />} data={empresasAbertas} />
          <StatisticsCard tittle="Capital Fechado" icon={<DollarSign className="h-12 w-12" style={{color: '#FFFFFF'}} />} data={empresasFechadas} />
          <StatisticsCard tittle="Capital Aberto" icon={<Globe className="h-12 w-12" style={{color: '#FFFFFF'}} />} data={percentualAbertas} />
        </div>

        {/* Gráficos */}
        <div className="flex gap-8 mb-8">
          {/* Tabela de Empresas Filtradas */}
          <BusinessTable tittle="Empresas Filtradas" dadosFiltrados={dadosFiltrados} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Pizza - Distribuição de Capital */}
          <PizzaChart tittle="Distribuição por Tipo de Capital" dadosCapital={dadosCapital} />
          {/* Gráfico de Barras - Bolsas */}
          <BarsChart
            tittle="Empresas por Bolsa de Valores"
            dadosBolsas={dadosBolsas}
          />
        </div>

        {/* Gráfico de Setores e Tabela */}
        <div className="flex gap-8 mb-8">
          {/* Gráfico de Setores */}
          <SectorChart tittle="Distribuição por Setor (Capital Aberto)" dadosSetores={dadosSetores} />
        </div>

        <div className="flex gap-8 mb-8">
          <MultiMarketBusiness empresasMultibolsa={empresasMultibolsa} />
        </div>

        {/* Insights */}
        <InsightsSection insights={insights} />
      </div>
    </div>
  );
};

export default Dashboard;
