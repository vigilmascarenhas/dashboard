const geClients = [
  { cliente: 'MOTIVA', capitalAberto: 'SIM', bolsa: 'B3', ticker: 'MOTV3', observacao: null },
  { cliente: 'Martin Brower', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'AMIL', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Deicmar', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'WK Design Hotel', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Hotel Monte Real', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Bulkcentro Turismo', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: '3M Supermercados', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Armarinhos Fernando', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Ita Carrera', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Modernarte', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Satel', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'SVG', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Unisinos', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Chatuba', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Nova Era (Grupo)', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Igreja Universal do Reino de Deus', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Superprix', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'APCD', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'KODAK', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'KODK', observacao: null },
  { cliente: 'OUTBACK', capitalAberto: 'SIM', bolsa: 'NASDAQ', ticker: 'BLMN', observacao: 'Controladora do Outback' },
  { cliente: 'RAIADROGASIL', capitalAberto: 'SIM', bolsa: 'B3', ticker: 'RADL3', observacao: null },
  { cliente: 'UNIMED', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'FLEURY', capitalAberto: 'SIM', bolsa: 'B3', ticker: 'FLRY3', observacao: null },
  { cliente: 'AEGEA', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'MULTI RIO', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'BTP', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'ARCOS DOURADOS', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'MCD', observacao: 'Atua no B3 tb como MCDC34' },
  { cliente: 'GLOBO', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null },
  { cliente: 'TIM', capitalAberto: 'SIM', bolsa: 'B3', ticker: 'TIMS3', observacao: null },
  { cliente: 'TIM', capitalAberto: 'SIM', bolsa: 'FTMIB', ticker: 'TUT', observacao: null },
  { cliente: 'TIM', capitalAberto: 'SIM', bolsa: 'NYSE', ticker: 'TIMB', observacao: null },
  { cliente: 'TIM', capitalAberto: 'SIM', bolsa: 'ENX', ticker: 'TIM.PA', observacao: null },
  { cliente: 'GRUPO CASAS BAHIA', capitalAberto: 'SIM', bolsa: 'B3', ticker: 'BHIA3', observacao: null }
];

// Filter by public/private companies
const publicGeClients = geClients.filter(client => 
  client.capitalAberto === 'SIM'
);

const privateGeClients = geClients.filter(client => 
  client.capitalAberto === 'NÃO'
);

// Filter by exchange for public companies only
const nyseGeClients = geClients.filter(client => 
  client.bolsa && (
    client.bolsa === 'NYSE' || 
    client.bolsa === 'NASDAQ'
  )
);

const b3GeClients = geClients.filter(client => 
  client.bolsa && client.bolsa === 'B3'
);

// Function to determine sector based on company name
const getSectorForCompany = (companyName) => {
  const name = companyName.toLowerCase();
  
  const sectorMap = {
    'motiva': 'Energia',
    'martin brower': 'Alimentício',
    'amil': 'Saúde',
    'hotel': 'Hotelaria',
    'turismo': 'Turismo',
    'supermercados': 'Varejo',
    'armarinhos': 'Varejo',
    'modernarte': 'Varejo',
    'satel': 'Tecnologia',
    'svg': 'Design',
    'unisinos': 'Educação',
    'chatuba': 'Varejo',
    'nova era': 'Religioso',
    'igreja': 'Religioso',
    'superprix': 'Varejo',
    'apcd': 'Saúde',
    'kodak': 'Tecnologia',
    'outback': 'Alimentício',
    'raiadrogasil': 'Farmacêutico',
    'unimed': 'Saúde',
    'fleury': 'Saúde',
    'aegea': 'Saneamento',
    'multi rio': 'Transporte',
    'btp': 'Outros',
    'arcos dourados': 'Alimentício',
    'globo': 'Mídia',
    'tim': 'Telecomunicações',
    'grupo casas bahia': 'Varejo',
    'casas bahia': 'Varejo'
  };

  for (const [key, sector] of Object.entries(sectorMap)) {
    if (name.includes(key)) {
      return sector;
    }
  }
  
  return 'Outros';
};

// Add sector information to clients
const geClientsWithSector = geClients.map(client => ({
  ...client,
  setor: getSectorForCompany(client.cliente)
}));

// Sector-based filters
const healthcareGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Saúde' || client.setor === 'Farmacêutico'
);

const retailGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Varejo'
);

const hospitalityGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Hotelaria' || client.setor === 'Turismo'
);

const foodServiceGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Alimentício'
);

const technologyGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Tecnologia'
);

const energyGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Energia'
);

const telecomGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Telecomunicações'
);

const mediaGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Mídia'
);

const transportGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Transporte'
);

const utilitiesGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Saneamento'
);

// Business type filters
const servicesGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Saúde' || 
  client.setor === 'Hotelaria' || 
  client.setor === 'Educação' || 
  client.setor === 'Religioso' ||
  client.setor === 'Saneamento' ||
  client.setor === 'Telecomunicações'
);

const commercialGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Varejo' || 
  client.setor === 'Alimentício'
);

// Market cap filters (public companies only)
const largeCapGeClients = publicGeClients.filter(client => 
  ['KODAK', 'OUTBACK', 'RAIADROGASIL', 'MOTIVA', 'FLEURY', 'ARCOS DOURADOS', 'TIM', 'GRUPO CASAS BAHIA'].includes(client.cliente)
);

// Geographic presence filters
const nationalGeClients = geClientsWithSector.filter(client => 
  ['RAIADROGASIL', 'UNIMED', 'AMIL', 'MOTIVA', 'FLEURY', 'TIM', 'GRUPO CASAS BAHIA', 'GLOBO'].includes(client.cliente)
);

const regionalGeClients = geClientsWithSector.filter(client => 
  !['RAIADROGASIL', 'UNIMED', 'AMIL', 'MOTIVA', 'FLEURY', 'TIM', 'GRUPO CASAS BAHIA', 'GLOBO'].includes(client.cliente)
);

// Binary filters similar to capital aberto/fechado
// Domestic vs International (GE clients are mostly domestic)
const domesticGeClients = geClients.filter(client => 
  client.bolsa === null || client.bolsa === 'B3'
);

const internationalGeClients = geClients.filter(client => 
  client.bolsa && (client.bolsa === 'NYSE' || client.bolsa === 'NASDAQ')
);

// Industrial vs Services sectors
const industrialGeClients = geClientsWithSector.filter(client => 
  ['Tecnologia', 'Energia', 'Telecomunicações'].includes(client.setor)
);

const servicesGeClients2 = geClientsWithSector.filter(client => 
  ['Saúde', 'Farmacêutico', 'Hotelaria', 'Turismo', 'Varejo', 
   'Alimentício', 'Educação', 'Religioso', 'Design', 'Mídia', 
   'Transporte', 'Saneamento'].includes(client.setor)
);

// B2B vs B2C companies
const b2bGeClients = geClientsWithSector.filter(client => 
  ['Martin Brower', 'Deicmar', 'Satel', 'SVG', 'APCD'].includes(client.cliente)
);

const b2cGeClients = geClientsWithSector.filter(client => 
  ['3M Supermercados', 'Armarinhos Fernando', 'Modernarte', 'Chatuba', 
   'Superprix', 'OUTBACK', 'RAIADROGASIL', 'WK Design Hotel', 'Hotel Monte Real',
   'FLEURY', 'ARCOS DOURADOS', 'TIM', 'GRUPO CASAS BAHIA', 'GLOBO'].includes(client.cliente)
);

// Chain vs Independent businesses
const chainGeClients = geClientsWithSector.filter(client => 
  ['RAIADROGASIL', 'UNIMED', 'OUTBACK', '3M Supermercados', 
   'Superprix', 'Nova Era (Grupo)', 'Igreja Universal do Reino de Deus',
   'FLEURY', 'ARCOS DOURADOS', 'TIM', 'GRUPO CASAS BAHIA'].includes(client.cliente)
);

const independentGeClients = geClientsWithSector.filter(client => 
  !['RAIADROGASIL', 'UNIMED', 'OUTBACK', '3M Supermercados', 
    'Superprix', 'Nova Era (Grupo)', 'Igreja Universal do Reino de Deus',
    'FLEURY', 'ARCOS DOURADOS', 'TIM', 'GRUPO CASAS BAHIA'].includes(client.cliente)
);

// Traditional vs Modern business models
const traditionalGeClients = geClientsWithSector.filter(client => 
  ['Armarinhos Fernando', 'Modernarte', 'Chatuba', 'Hotel Monte Real', 
   'Igreja Universal do Reino de Deus'].includes(client.cliente)
);

const modernGeClients = geClientsWithSector.filter(client => 
  ['KODAK', 'OUTBACK', 'RAIADROGASIL', 'MOTIVA', 'Satel', 'SVG',
   'FLEURY', 'ARCOS DOURADOS', 'TIM', 'GRUPO CASAS BAHIA', 'GLOBO'].includes(client.cliente)
);

export { 
  geClients,
  geClientsWithSector,
  publicGeClients,
  privateGeClients,
  nyseGeClients, 
  b3GeClients,
  // Sector filters
  healthcareGeClients,
  retailGeClients,
  hospitalityGeClients,
  foodServiceGeClients,
  technologyGeClients,
  energyGeClients,
  telecomGeClients,
  mediaGeClients,
  transportGeClients,
  utilitiesGeClients,
  // Business type filters
  servicesGeClients,
  commercialGeClients,
  // Size filters
  largeCapGeClients,
  // Geographic filters
  nationalGeClients,
  regionalGeClients,
  // Binary filters (like capital aberto/fechado)
  domesticGeClients,
  internationalGeClients,
  industrialGeClients,
  servicesGeClients2,
  b2bGeClients,
  b2cGeClients,
  chainGeClients,
  independentGeClients,
  traditionalGeClients,
  modernGeClients
};
