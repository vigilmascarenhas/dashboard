const eduClients = [
  { cliente: 'BAXTER', bolsa: 'BOLSA DE NY (NYSE)', ticker: 'BAX', observacao: null },
  { cliente: 'FORD', bolsa: 'BOLSA DE NY (NYSE)', ticker: 'F', observacao: null },
  { cliente: 'FITESA', bolsa: 'BOLSA DE SP (B3)', ticker: 'FIT3', observacao: null },
  { cliente: 'MAHLE', bolsa: 'BOLSA DE SP (B3)', ticker: 'LEVE3', observacao: null },
  { cliente: 'METALAC', bolsa: 'BOLSA DE BELGRADO (BELEX)', ticker: 'MTLC', observacao: null },
  { cliente: 'ROP - ENGIE', bolsa: 'BOLSA DE SP (B3)', ticker: 'EGIE3', observacao: null },
  { cliente: 'BAKER HUGHES', bolsa: 'BOLSA DE NY (NYSE)', ticker: 'BKR', observacao: 'BHGE (GE Company)' },
  { cliente: 'CROWN', bolsa: 'BOLSA DE NY (NYSE)', ticker: 'CCK', observacao: 'Crown Holdings' },
  { cliente: 'Koito Manufacturing Co Ltd (NAL DO BRASIL)', bolsa: 'BOLSA DE TÓQUIO (TSE)', ticker: '7276', observacao: null },
  { cliente: 'Asahi Glass Co (AGC)', bolsa: 'BOLSA DE TÓQUIO (TSE)', ticker: '5201', observacao: null },
  { cliente: 'CJ', bolsa: 'BOLSA DA COREIA DO SUL (KRX)', ticker: 'KRX: 001040', observacao: null },
  { cliente: 'CNH Industrial', bolsa: 'BOLSA DE NY (NYSE)', ticker: 'NYSE: CNH', observacao: null },
  { cliente: 'Faurecia', bolsa: 'BOLSA DE PARIS (EPA)', ticker: 'EPA: FRVIA', observacao: null },
  { cliente: 'GE HealthCare', bolsa: 'BOLSA DE NY (NASDAQ)', ticker: 'NASDAQ: GEHC', observacao: null },
  { cliente: 'Groupe SEB', bolsa: 'BOLSA DE PARIS (EPA)', ticker: 'EPA: SK', observacao: null },
  { cliente: 'GE Vernova', bolsa: 'BOLSA DE NY (NYSE)', ticker: 'NYSE: GEV', observacao: null },
  { cliente: 'Iveco', bolsa: 'BOLSA DE MILÃO (BIT)', ticker: 'BIT: IVG', observacao: null },
  { cliente: 'Legrand', bolsa: 'BOLSA DE PARIS (EPA)', ticker: 'EPA: LR', observacao: null },
  { cliente: 'Yamaha', bolsa: 'BOLSA DE TÓQUIO (TSE)', ticker: 'TYO: 7951', observacao: null },
  { cliente: 'AKZO NOBEL', bolsa: 'Euronext Amsterdam', ticker: 'AKZA', observacao: null },
  { cliente: 'BRIDGESTONE', bolsa: 'BOLSA DE TÓQUIO (TSE)', ticker: '5108', observacao: null },
  { cliente: 'COLGATE', bolsa: 'BOLSA DE SP (B3)', ticker: 'COLG34', observacao: null },
  { cliente: 'COLGATE', bolsa: 'BOLSA DE NY (NYSE)', ticker: 'CL', observacao: null },
  { cliente: 'FRESENIUS', bolsa: 'BOLSA DE NY (NYSE)', ticker: 'FMS', observacao: null },
  { cliente: 'FRESENIUS', bolsa: 'XETRA (Frankfurt)', ticker: 'FRE', observacao: null },
  { cliente: 'FRESENIUS', bolsa: 'XETRA (Frankfurt)', ticker: 'FME', observacao: null },
  { cliente: 'PANASONIC', bolsa: 'BOLSA DE TÓQUIO (TSE)', ticker: '6752', observacao: null },
  { cliente: 'PPG', bolsa: 'BOLSA DE NY (NYSE)', ticker: 'PPG', observacao: null },
  { cliente: 'TOYOTA', bolsa: 'BOLSA DE NY (NYSE)', ticker: 'TM', observacao: null },
  { cliente: 'TOYOTA', bolsa: 'BOLSA DE TÓQUIO (TSE)', ticker: '7203', observacao: null },
  { cliente: 'TUPPERWARE', bolsa: 'BOLSA DE NY (NYSE)', ticker: 'TUP', observacao: null },
  { cliente: 'TUPY', bolsa: 'BOLSA DE SP (B3)', ticker: 'TUPY3', observacao: null },
  { cliente: 'CCL', bolsa: 'TORONTO STOCK EXCHANGE (TSX)', ticker: 'CCL-B.TO', observacao: null },
  { cliente: 'FRAPORT', bolsa: 'Bolsa de Frankfurt (Xetra)', ticker: 'FRA ou FRAG', observacao: null },
  { cliente: 'NOVARTIS', bolsa: 'Bolsa de Valores de Zurique (SIX); B3 (Brasil, via BDR)', ticker: 'N1VS34', observacao: null },
  { cliente: 'SANDOZ', bolsa: 'Bolsa de Valores de Zurique (SIX Swiss Exchange SIX)', ticker: 'SDZ', observacao: null },
  { cliente: 'TDK', bolsa: 'Bolsa de Valores de Tóquio (Tokyo Stock Exchange) e Mercado OCT dos EUA', ticker: 'TTDKY', observacao: null },
  { cliente: 'DAF', bolsa: 'Bolsa NASDAQ USA', ticker: 'PCAR', observacao: 'Paccar (Subsidiária da DAF)' },
  { cliente: 'DENSO', bolsa: 'Tokyo Stock Exchange', ticker: '6902', observacao: 'Denso Corporation' },
  { cliente: 'MERCK', bolsa: 'Bolsa de NY (NYSE), B3', ticker: 'MRK; MRCK34', observacao: 'Merck & Co., Inc.' },
  { cliente: 'OMPI', bolsa: 'Bolsa de NY (NYSE)', ticker: 'STVN', observacao: 'Stevanato Group' },
  { cliente: 'THYSSENKRUPP', bolsa: 'Frankfurt Stock Exchange', ticker: 'TKA', observacao: 'ThyssenKrupp AG' },
  { cliente: 'BREMBO', bolsa: 'Bolsa de Valores de Milão', ticker: 'BRE', observacao: 'Brembo S.p.A (matriz)' },
  { cliente: 'WABTEC', bolsa: 'Bolsa de Valores de NY (NYSE)', ticker: 'WAB', observacao: null }
];

// Filter by exchange for easier access
const nyseClients = eduClients.filter(client => 
  client.bolsa.includes('BOLSA DE NY (NYSE)') || 
  client.bolsa.includes('NASDAQ')
);

const b3Clients = eduClients.filter(client => 
  client.bolsa.includes('BOLSA DE SP (B3)')
);

const tokyoClients = eduClients.filter(client => 
  client.bolsa.includes('TÓQUIO') || 
  client.bolsa.includes('Tokyo')
);

const europeanClients = eduClients.filter(client => 
  client.bolsa.includes('PARIS') || 
  client.bolsa.includes('Frankfurt') || 
  client.bolsa.includes('Milão') || 
  client.bolsa.includes('Amsterdam') || 
  client.bolsa.includes('Zurique')
);

// Function to determine sector based on company name
const getSectorForCompany = (companyName) => {
  const name = companyName.toLowerCase();
  
  const sectorMap = {
    'baxter': 'Farmacêutico',
    'ford': 'Automotivo',
    'fitesa': 'Têxtil',
    'mahle': 'Automotivo',
    'metalac': 'Metalúrgica',
    'engie': 'Energia',
    'baker hughes': 'Petróleo & Gas',
    'crown': 'Embalagens',
    'koito': 'Automotivo',
    'asahi glass': 'Industrial',
    'cj': 'Alimentício',
    'cnh industrial': 'Maquinário',
    'faurecia': 'Automotivo',
    'ge healthcare': 'Saúde',
    'groupe seb': 'Eletrodomésticos',
    'ge vernova': 'Energia',
    'iveco': 'Automotivo',
    'legrand': 'Elétrico',
    'yamaha': 'Industrial',
    'akzo nobel': 'Químico',
    'bridgestone': 'Pneus',
    'colgate': 'Higiene',
    'fresenius': 'Saúde',
    'panasonic': 'Eletrônico',
    'ppg': 'Químico',
    'toyota': 'Automotivo',
    'tupperware': 'Utensílios',
    'tupy': 'Metalúrgica',
    'ccl': 'Embalagens',
    'fraport': 'Aeroportuário',
    'sandoz': 'Farmacêutico',
    'tdk': 'Eletrônico',
    'daf': 'Automotivo',
    'denso': 'Automotivo',
    'merck': 'Farmacêutico',
    'novartis': 'Farmacêutico',
    'ompi': 'Farmacêutico',
    'thyssenkrupp': 'Siderúrgica',
    'brembo': 'Automotivo',
    'wabtec': 'Ferroviário'
  };

  for (const [key, sector] of Object.entries(sectorMap)) {
    if (name.includes(key)) {
      return sector;
    }
  }
  
  return 'Outros';
};

// Add sector information to clients
const eduClientsWithSector = eduClients.map(client => ({
  ...client,
  setor: getSectorForCompany(client.cliente)
}));

// Sector-based filters
const automotiveClients = eduClientsWithSector.filter(client => 
  client.setor === 'Automotivo'
);

const pharmaceuticalClients = eduClientsWithSector.filter(client => 
  client.setor === 'Farmacêutico'
);

const healthcareClients = eduClientsWithSector.filter(client => 
  client.setor === 'Saúde'
);

const energyClients = eduClientsWithSector.filter(client => 
  client.setor === 'Energia'
);

const chemicalClients = eduClientsWithSector.filter(client => 
  client.setor === 'Químico'
);

const industrialClients = eduClientsWithSector.filter(client => 
  client.setor === 'Industrial' || client.setor === 'Eletrônico' || client.setor === 'Elétrico'
);

// Geographic/Market-based filters
const americanClients = eduClients.filter(client => 
  client.bolsa.includes('NYSE') || 
  client.bolsa.includes('NASDAQ') || 
  client.bolsa.includes('TORONTO')
);

const asianClients = eduClients.filter(client => 
  client.bolsa.includes('TÓQUIO') || 
  client.bolsa.includes('Tokyo') || 
  client.bolsa.includes('COREIA')
);

const brazilianClients = eduClients.filter(client => 
  client.bolsa.includes('BOLSA DE SP (B3)')
);

// Binary filters similar to capital aberto/fechado
// Domestic vs International (based on exchange location)
const domesticClients = eduClients.filter(client => 
  client.bolsa.includes('BOLSA DE SP (B3)')
);

const internationalClients = eduClients.filter(client => 
  !client.bolsa.includes('BOLSA DE SP (B3)')
);

// Industrial vs Services sectors
const industrialEduClients = eduClientsWithSector.filter(client => 
  ['Automotivo', 'Industrial', 'Eletrônico', 'Elétrico', 'Metalúrgica', 
   'Químico', 'Pneus', 'Siderúrgica', 'Ferroviário', 'Têxtil', 
   'Petróleo & Gas', 'Maquinário'].includes(client.setor)
);

const servicesEduClients = eduClientsWithSector.filter(client => 
  ['Farmacêutico', 'Saúde', 'Energia', 'Aeroportuário', 
   'Eletrodomésticos', 'Utensílios', 'Embalagens', 'Higiene'].includes(client.setor)
);

// Large vs Small companies (based on global recognition)
const largeCorporations = eduClients.filter(client => 
  ['FORD', 'TOYOTA', 'BAXTER', 'MERCK', 'NOVARTIS', 'PANASONIC', 
   'PPG', 'COLGATE', 'FRESENIUS', 'GE HealthCare', 'GE Vernova'].includes(client.cliente)
);

const smallerCompanies = eduClients.filter(client => 
  !['FORD', 'TOYOTA', 'BAXTER', 'MERCK', 'NOVARTIS', 'PANASONIC', 
    'PPG', 'COLGATE', 'FRESENIUS', 'GE HealthCare', 'GE Vernova'].includes(client.cliente)
);

// US vs Non-US markets
const usMarketClients = eduClients.filter(client => 
  client.bolsa.includes('NYSE') || client.bolsa.includes('NASDAQ')
);

const nonUsMarketClients = eduClients.filter(client => 
  !client.bolsa.includes('NYSE') && !client.bolsa.includes('NASDAQ')
);

export { 
  eduClients,
  eduClientsWithSector,
  nyseClients, 
  b3Clients, 
  tokyoClients, 
  europeanClients,
  // Sector filters
  automotiveClients,
  pharmaceuticalClients,
  healthcareClients,
  energyClients,
  chemicalClients,
  industrialClients,
  // Geographic filters
  americanClients,
  asianClients,
  brazilianClients,
  // Binary filters (like capital aberto/fechado)
  domesticClients,
  internationalClients,
  industrialEduClients,
  servicesEduClients,
  largeCorporations,
  smallerCompanies,
  usMarketClients,
  nonUsMarketClients
};
