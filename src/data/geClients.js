const geClients = [
  { cliente: 'MOTIVA', capitalAberto: 'SIM', bolsa: 'BOLSA DE SP (B3)', ticker: 'MOTV3', observacao: null },
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
  { cliente: 'KODAK', capitalAberto: 'SIM', bolsa: 'BOLSA DE NY (NYSE)', ticker: 'KODK', observacao: null },
  { cliente: 'OUTBACK', capitalAberto: 'SIM', bolsa: 'Bolsa NASDAQ USA', ticker: 'BLMN', observacao: null },
  { cliente: 'RAIADROGASIL', capitalAberto: 'SIM', bolsa: 'BOLSA DE SP (B3)', ticker: 'RADL3', observacao: null },
  { cliente: 'UNIMED', capitalAberto: 'NÃO', bolsa: null, ticker: null, observacao: null }
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
    client.bolsa.includes('BOLSA DE NY (NYSE)') || 
    client.bolsa.includes('NASDAQ')
  )
);

const b3GeClients = geClients.filter(client => 
  client.bolsa && client.bolsa.includes('BOLSA DE SP (B3)')
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
    'unimed': 'Saúde'
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

// Business type filters
const servicesGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Saúde' || 
  client.setor === 'Hotelaria' || 
  client.setor === 'Educação' || 
  client.setor === 'Religioso'
);

const commercialGeClients = geClientsWithSector.filter(client => 
  client.setor === 'Varejo' || 
  client.setor === 'Alimentício'
);

// Market cap filters (public companies only)
const largeCapGeClients = publicGeClients.filter(client => 
  ['KODAK', 'OUTBACK', 'RAIADROGASIL', 'MOTIVA'].includes(client.cliente)
);

// Geographic presence filters
const nationalGeClients = geClientsWithSector.filter(client => 
  ['RAIADROGASIL', 'UNIMED', 'AMIL', 'MOTIVA'].includes(client.cliente)
);

const regionalGeClients = geClientsWithSector.filter(client => 
  !['RAIADROGASIL', 'UNIMED', 'AMIL', 'MOTIVA'].includes(client.cliente)
);

// Binary filters similar to capital aberto/fechado
// Domestic vs International (GE clients are mostly domestic)
const domesticGeClients = geClients.filter(client => 
  client.bolsa === null || client.bolsa.includes('BOLSA DE SP (B3)')
);

const internationalGeClients = geClients.filter(client => 
  client.bolsa && (client.bolsa.includes('NYSE') || client.bolsa.includes('NASDAQ'))
);

// Industrial vs Services sectors
const industrialGeClients = geClientsWithSector.filter(client => 
  ['Tecnologia', 'Energia'].includes(client.setor)
);

const servicesGeClients2 = geClientsWithSector.filter(client => 
  ['Saúde', 'Farmacêutico', 'Hotelaria', 'Turismo', 'Varejo', 
   'Alimentício', 'Educação', 'Religioso', 'Design'].includes(client.setor)
);

// B2B vs B2C companies
const b2bGeClients = geClientsWithSector.filter(client => 
  ['Martin Brower', 'Deicmar', 'Satel', 'SVG', 'APCD'].includes(client.cliente)
);

const b2cGeClients = geClientsWithSector.filter(client => 
  ['3M Supermercados', 'Armarinhos Fernando', 'Modernarte', 'Chatuba', 
   'Superprix', 'OUTBACK', 'RAIADROGASIL', 'WK Design Hotel', 'Hotel Monte Real'].includes(client.cliente)
);

// Chain vs Independent businesses
const chainGeClients = geClientsWithSector.filter(client => 
  ['RAIADROGASIL', 'UNIMED', 'OUTBACK', '3M Supermercados', 
   'Superprix', 'Nova Era (Grupo)', 'Igreja Universal do Reino de Deus'].includes(client.cliente)
);

const independentGeClients = geClientsWithSector.filter(client => 
  !['RAIADROGASIL', 'UNIMED', 'OUTBACK', '3M Supermercados', 
    'Superprix', 'Nova Era (Grupo)', 'Igreja Universal do Reino de Deus'].includes(client.cliente)
);

// Traditional vs Modern business models
const traditionalGeClients = geClientsWithSector.filter(client => 
  ['Armarinhos Fernando', 'Modernarte', 'Chatuba', 'Hotel Monte Real', 
   'Igreja Universal do Reino de Deus'].includes(client.cliente)
);

const modernGeClients = geClientsWithSector.filter(client => 
  ['KODAK', 'OUTBACK', 'RAIADROGASIL', 'MOTIVA', 'Satel', 'SVG'].includes(client.cliente)
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
