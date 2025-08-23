import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Building2, TrendingUp, Globe, DollarSign, Filter, Search } from 'lucide-react';

const Dashboard = () => {
  const [filtroCapital, setFiltroCapital] = useState('TODOS');
  const [filtroBolsa, setFiltroBolsa] = useState('TODAS');
  const [busca, setBusca] = useState('');

  // Dados processados da planilha
  const dadosOriginais = [
    { empresa: 'CINBAL', capitalAberto: 'NÃO', bolsa: '-', ticker: '-', setor: 'Industrial' },
    { empresa: 'DAICAST', capitalAberto: 'NÃO', bolsa: '-', ticker: '-', setor: 'Industrial' },
    { empresa: 'AMÉRICA EMBALAGENS', capitalAberto: 'NÃO', bolsa: '-', ticker: '-', setor: 'Embalagens' },
    { empresa: 'IBG', capitalAberto: 'NÃO', bolsa: '-', ticker: '-', setor: 'Industrial' },
    { empresa: 'METALFAST', capitalAberto: 'NÃO', bolsa: '-', ticker: '-', setor: 'Metalúrgica' },
    { empresa: 'SEW', capitalAberto: 'NÃO', bolsa: '-', ticker: '-', setor: 'Industrial' },
    { empresa: 'SOMMAPLAST', capitalAberto: 'NÃO', bolsa: '-', ticker: '-', setor: 'Plásticos' },
    { empresa: 'FRIGOL', capitalAberto: 'NÃO', bolsa: '-', ticker: '-', setor: 'Alimentício' },
    { empresa: 'NOURYON', capitalAberto: 'NÃO', bolsa: '-', ticker: '-', setor: 'Químico' },
    { empresa: 'BAXTER', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'BAX', setor: 'Farmacêutico' },
    { empresa: 'FORD', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'F', setor: 'Automotivo' },
    { empresa: 'FITESA', capitalAberto: 'SIM', bolsa: 'B3', ticker: 'FIT3', setor: 'Têxtil' },
    { empresa: 'MAHLE', capitalAberto: 'SIM', bolsa: 'B3', ticker: 'LEVE3', setor: 'Automotivo' },
    { empresa: 'METALAC', capitalAberto: 'SIM', bolsa: 'BELEX', ticker: 'MTLC', setor: 'Metalúrgica' },
    { empresa: 'ENGIE', capitalAberto: 'SIM', bolsa: 'B3', ticker: 'EGIE3', setor: 'Energia' },
    { empresa: 'BAKER HUGHES', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'BKR', setor: 'Petróleo & Gas' },
    { empresa: 'CROWN', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'CCK', setor: 'Embalagens' },
    { empresa: 'KOITO', capitalAberto: 'SIM', bolsa: 'TSE', ticker: '7276', setor: 'Automotivo' },
    { empresa: 'ASAHI GLASS', capitalAberto: 'SIM', bolsa: 'TSE', ticker: '5201', setor: 'Industrial' },
    { empresa: 'CJ', capitalAberto: 'SIM', bolsa: 'KRX', ticker: '001040', setor: 'Alimentício' },
    { empresa: 'CNH INDUSTRIAL', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'CNH', setor: 'Maquinário' },
    { empresa: 'FAURECIA', capitalAberto: 'SIM', bolsa: 'EPA', ticker: 'FRVIA', setor: 'Automotivo' },
    { empresa: 'GE HEALTHCARE', capitalAberto: 'SIM', bolsa: 'NASDAQ', ticker: 'GEHC', setor: 'Saúde' },
    { empresa: 'GROUPE SEB', capitalAberto: 'SIM', bolsa: 'EPA', ticker: 'SK', setor: 'Eletrodomésticos' },
    { empresa: 'GE VERNOVA', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'GEV', setor: 'Energia' },
    { empresa: 'IVECO', capitalAberto: 'SIM', bolsa: 'BIT', ticker: 'IVG', setor: 'Automotivo' },
    { empresa: 'LEGRAND', capitalAberto: 'SIM', bolsa: 'EPA', ticker: 'LR', setor: 'Elétrico' },
    { empresa: 'YAMAHA', capitalAberto: 'SIM', bolsa: 'TSE', ticker: '7951', setor: 'Industrial' },
    { empresa: 'AKZO NOBEL', capitalAberto: 'SIM', bolsa: 'EURONEXT', ticker: 'AKZA', setor: 'Químico' },
    { empresa: 'BRIDGESTONE', capitalAberto: 'SIM', bolsa: 'TSE', ticker: '5108', setor: 'Pneus' },
    { empresa: 'COLGATE', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'CL', setor: 'Higiene' },
    { empresa: 'FRESENIUS', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'FMS', setor: 'Saúde' },
    { empresa: 'PANASONIC', capitalAberto: 'SIM', bolsa: 'TSE', ticker: '6752', setor: 'Eletrônico' },
    { empresa: 'PPG', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'PPG', setor: 'Químico' },
    { empresa: 'TOYOTA', capitalAberto: 'SIM', bolsa: 'TSE', ticker: '7203', setor: 'Automotivo' },
    { empresa: 'TUPPERWARE', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'TUP', setor: 'Utensílios' },
    { empresa: 'TUPY', capitalAberto: 'SIM', bolsa: 'B3', ticker: 'TUPY3', setor: 'Metalúrgica' },
    { empresa: 'CCL', capitalAberto: 'SIM', bolsa: 'TSX', ticker: 'CCL-B.TO', setor: 'Embalagens' },
    { empresa: 'FRAPORT', capitalAberto: 'SIM', bolsa: 'XETRA', ticker: 'FRA', setor: 'Aeroportuário' },
    { empresa: 'NOVARTIS', capitalAberto: 'SIM', bolsa: 'SIX', ticker: 'NOVN', setor: 'Farmacêutico' },
    { empresa: 'SANDOZ', capitalAberto: 'SIM', bolsa: 'SIX', ticker: 'SDZ', setor: 'Farmacêutico' },
    { empresa: 'TDK', capitalAberto: 'SIM', bolsa: 'TSE', ticker: '6762', setor: 'Eletrônico' },
    { empresa: 'DAF', capitalAberto: 'SIM', bolsa: 'NASDAQ', ticker: 'PCAR', setor: 'Automotivo' },
    { empresa: 'DENSO', capitalAberto: 'SIM', bolsa: 'TSE', ticker: '6902', setor: 'Automotivo' },
    { empresa: 'MERCK', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'MRK', setor: 'Farmacêutico' },
    { empresa: 'OMPI', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'STVN', setor: 'Farmacêutico' },
    { empresa: 'THYSSENKRUPP', capitalAberto: 'SIM', bolsa: 'XETRA', ticker: 'TKA', setor: 'Siderúrgica' },
    { empresa: 'BREMBO', capitalAberto: 'SIM', bolsa: 'BIT', ticker: 'BRE', setor: 'Automotivo' },
    { empresa: 'WABTEC', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'WAB', setor: 'Ferroviário' }
  ];

  // Adicionar empresas que não são de capital aberto
  const empresasNaoAbertas = [
    'BEPLAST', 'BOGE', 'DUROLINE', 'DICKOW', 'DE MILLUS', 'CARIFLEX', 
    'ELEKEIROZ', 'ELGIN', 'FERTILIZANTES TOCANTINS', 'GSA GAMA', 
    'MACCAFERRI', 'MINERAÇÃO HORICAL', 'PAMPLONA', 'SL DO BRASIL',
    'FILTROS FRAM', 'FAGRON', 'THERMANSOL', 'PROLEC', 'SODECIA',
    'SUDATI', 'STIHL', 'KANJIKO', 'CROMEX', 'FESTO', 'MARELLI',
    'PLASTEK', 'SOLENIS', 'TIGRE', 'TKE', 'TMD', 'ADS', 'AEROPORTO SALVADOR',
    'AGRITECH', 'CPE', 'DIGIPIX', 'DRYLOCK', 'FFS', 'FUPRESA',
    'HOSPITAL MOINHOS', 'INVISTA', 'KROMBERG SCHUBERT', 'MA AUTOMOTIVE',
    'MALHARIA BERLAN', 'NEOLAB', 'RFR', 'SUGGAR', 'VIPAL', 'VIRACOPOS',
    'AQUAFAST', 'COPELMI', 'DAMAPEL', 'GALVANIZAÇÃO JOSITA', 'JCB',
    'MAUSA', 'SAARGUMMI', 'ZANDEI', 'BEM ESTAR', 'BOM PLAST', 'LIBBS',
    'MANN HUMMEL', 'MG TIRES', 'MIIKA NACIONAL', 'PURATOS', 'REGALI',
    'SANTA CLARA', 'SEOYON', 'WELLOUR'
  ];

  // Adicionar empresas não abertas aos dados
  const dadosCompletos = [
    ...dadosOriginais,
    ...empresasNaoAbertas.map(empresa => ({
      empresa,
      capitalAberto: 'NÃO',
      bolsa: '-',
      ticker: '-',
      setor: 'Outros'
    }))
  ];

  // Filtrar dados
  const dadosFiltrados = useMemo(() => {
    return dadosCompletos.filter(item => {
      const matchCapital = filtroCapital === 'TODOS' || item.capitalAberto === filtroCapital;
      const matchBolsa = filtroBolsa === 'TODAS' || item.bolsa === filtroBolsa;
      const matchBusca = item.empresa.toLowerCase().includes(busca.toLowerCase());
      return matchCapital && matchBolsa && matchBusca;
    });
  }, [filtroCapital, filtroBolsa, busca]);

  // Calcular estatísticas
  const totalEmpresas = dadosCompletos.length;
  const empresasAbertas = dadosCompletos.filter(item => item.capitalAberto === 'SIM').length;
  const empresasFechadas = totalEmpresas - empresasAbertas;
  const percentualAbertas = ((empresasAbertas / totalEmpresas) * 100).toFixed(1);

  // Dados para gráfico de distribuição de capital
  const dadosCapital = [
    { name: 'Capital Aberto', value: empresasAbertas, color: '#10B981' },
    { name: 'Capital Fechado', value: empresasFechadas, color: '#EF4444' }
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
  }, []);

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
  }, []);

  // Cores para os gráficos
  const cores = ['#8B5CF6', '#06B6D4', '#F59E0B', '#EF4444', '#10B981', '#F97316', '#EC4899', '#6366F1'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard - Clientes na Bolsa de Valores</h1>
          <p className="text-gray-300">Análise detalhada do portfólio de clientes e status de capital</p>
        </div>

        {/* Filtros */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-white" />
              <select 
                value={filtroCapital} 
                onChange={(e) => setFiltroCapital(e.target.value)}
                className="bg-white/20 text-white rounded-lg px-3 py-2 border border-white/30"
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
                className="bg-white/20 text-white rounded-lg px-3 py-2 border border-white/30"
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
                className="bg-white/20 text-white placeholder-gray-300 rounded-lg px-3 py-2 border border-white/30 w-full"
              />
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total de Empresas</p>
                <p className="text-3xl font-bold">{totalEmpresas}</p>
              </div>
              <Building2 className="h-12 w-12 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Capital Aberto</p>
                <p className="text-3xl font-bold">{empresasAbertas}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Capital Fechado</p>
                <p className="text-3xl font-bold">{empresasFechadas}</p>
              </div>
              <DollarSign className="h-12 w-12 text-red-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">% Capital Aberto</p>
                <p className="text-3xl font-bold">{percentualAbertas}%</p>
              </div>
              <Globe className="h-12 w-12 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Pizza - Distribuição de Capital */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Distribuição por Tipo de Capital</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosCapital}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dadosCapital.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Barras - Bolsas */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Empresas por Bolsa de Valores</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosBolsas}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="nome" tick={{ fill: 'white', fontSize: 12 }} />
                <YAxis tick={{ fill: 'white' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Bar dataKey="quantidade" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Setores e Tabela */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfico de Setores */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Distribuição por Setor (Capital Aberto)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosSetores}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis 
                  dataKey="nome" 
                  tick={{ fill: 'white', fontSize: 10 }} 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: 'white' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Bar dataKey="quantidade" fill="#06B6D4" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tabela de Empresas Filtradas */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              Empresas Filtradas ({dadosFiltrados.length})
            </h3>
            <div className="max-h-80 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-2 text-white">Empresa</th>
                    <th className="text-left p-2 text-white">Capital</th>
                    <th className="text-left p-2 text-white">Bolsa</th>
                    <th className="text-left p-2 text-white">Ticker</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosFiltrados.slice(0, 20).map((item, index) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-2 text-white">{item.empresa}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.capitalAberto === 'SIM' 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          {item.capitalAberto}
                        </span>
                      </td>
                      <td className="p-2 text-gray-300">{item.bolsa}</td>
                      <td className="p-2 text-gray-300">{item.ticker}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {dadosFiltrados.length > 20 && (
                <p className="text-center text-gray-400 mt-4">
                  ... e mais {dadosFiltrados.length - 20} empresas
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Insights Principais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
              <h4 className="text-blue-300 font-semibold mb-2">Diversificação Geográfica</h4>
              <p className="text-white text-sm">
                Carteira bem diversificada com presença em {dadosBolsas.length} bolsas diferentes, 
                incluindo NYSE, TSE, B3 e outras bolsas internacionais.
              </p>
            </div>
            <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
              <h4 className="text-green-300 font-semibold mb-2">Potencial de Crescimento</h4>
              <p className="text-white text-sm">
                {empresasFechadas} empresas ainda não são de capital aberto, 
                representando oportunidades de acompanhar futuras aberturas de capital.
              </p>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-500/30">
              <h4 className="text-purple-300 font-semibold mb-2">Setor Automotivo</h4>
              <p className="text-white text-sm">
                Forte presença no setor automotivo com empresas como Ford, Toyota, 
                Mahle e outras, indicando especialização neste segmento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
