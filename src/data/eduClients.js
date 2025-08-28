const eduClients = [
  // Companies marked as NÃO
  { cliente: 'CINAL', bolsa: null, ticker: null, observacao: null },
  { cliente: 'DAICAST', bolsa: null, ticker: null, observacao: null },
  { cliente: 'AMÉRICA EMBALAGENS', bolsa: null, ticker: null, observacao: null },
  { cliente: 'IBG', bolsa: null, ticker: null, observacao: null },
  { cliente: 'METALAST', bolsa: null, ticker: null, observacao: null },
  { cliente: 'SEW', bolsa: null, ticker: null, observacao: null },
  { cliente: 'SUMMAPLAST', bolsa: null, ticker: null, observacao: null },
  { cliente: 'FRIGOL', bolsa: null, ticker: null, observacao: null },
  { cliente: 'RCINVON', bolsa: null, ticker: null, observacao: 'Em análise (Capital Aberto) | EURONEXT AMSTERDAM' },
  
  // Companies marked as SIM
  { cliente: 'BAXTER', bolsa: 'NYSE', ticker: 'BAX', observacao: null },
  { cliente: 'FORD', bolsa: 'NYSE', ticker: 'F', observacao: null },
  { cliente: 'FITESA', bolsa: 'B3', ticker: 'FIT3', observacao: null },
  { cliente: 'MAHLE', bolsa: 'B3', ticker: 'LEVE3', observacao: null },
  { cliente: 'METALAC', bolsa: 'BELEX', ticker: 'MTLC', observacao: null },
  { cliente: 'ROP - ENGIE', bolsa: 'B3', ticker: 'EGIE3', observacao: null },
  { cliente: 'BAKER HUGHES', bolsa: 'NYSE', ticker: 'BKR', observacao: 'BHGE (GE Company)' },
  { cliente: 'CROWN', bolsa: 'NYSE', ticker: 'CCK', observacao: 'Crown Holdings' },
  { cliente: 'Koito Manufacturing Co Ltd (NAL DO BRASIL)', bolsa: 'TSE', ticker: '7276', observacao: null },
  { cliente: 'Asahi Glass Co (AGC)', bolsa: 'TSE', ticker: '5201', observacao: null },
  
  // Additional NÃO companies
  { cliente: 'BEFAST', bolsa: null, ticker: null, observacao: null },
  { cliente: 'BOSE', bolsa: null, ticker: null, observacao: null },
  { cliente: 'DUNOOLINE', bolsa: null, ticker: null, observacao: null },
  { cliente: 'BIOCOW', bolsa: null, ticker: null, observacao: null },
  { cliente: 'EX MILLEX', bolsa: null, ticker: null, observacao: null },
  { cliente: 'CARRERA', bolsa: null, ticker: null, observacao: null },
  { cliente: 'GAMEIRO2', bolsa: null, ticker: null, observacao: null },
  { cliente: 'ELGIN', bolsa: null, ticker: null, observacao: null },
  { cliente: 'FERTILIZANTES TOCANTINS', bolsa: null, ticker: null, observacao: null },
  { cliente: 'GGA GAMA', bolsa: null, ticker: null, observacao: null },
  { cliente: 'MACCAFERRI - BIAD', bolsa: null, ticker: null, observacao: null },
  { cliente: 'MINERAÇÃO HORICAL', bolsa: null, ticker: null, observacao: null },
  { cliente: 'PAMAFOND', bolsa: null, ticker: null, observacao: null },
  { cliente: 'SL DO BRASIL', bolsa: null, ticker: null, observacao: null },
  { cliente: 'FILTROS FRAM', bolsa: null, ticker: null, observacao: null },
  { cliente: 'FAGRON - SM EMPREENDIMENTOS', bolsa: null, ticker: null, observacao: null },
  { cliente: 'THERMAXPOL', bolsa: null, ticker: null, observacao: null },
  
  // Additional SIM companies
  { cliente: 'CJ', bolsa: 'KRX', ticker: 'KRX: 001040', observacao: null },
  { cliente: 'CNH Industrial', bolsa: 'NYSE', ticker: 'NYSE: CNH', observacao: null },
  { cliente: 'Faurecia', bolsa: 'EPA', ticker: 'EPA: FRVIA', observacao: null },
  { cliente: 'GE HealthCare', bolsa: 'NASDAQ', ticker: 'NASDAQ: GEHC', observacao: null },
  { cliente: 'Groupe SEB', bolsa: 'EPA', ticker: 'EPA: SK', observacao: null },
  { cliente: 'GE Vernova', bolsa: 'NYSE', ticker: 'NYSE: GEV', observacao: null },
  { cliente: 'Iveco', bolsa: 'BIT', ticker: 'BIT: IVG', observacao: null },
  { cliente: 'Legrand', bolsa: 'EPA', ticker: 'EPA: LR', observacao: null },
  { cliente: 'Yamaha', bolsa: 'TSE', ticker: 'TYO: 7951', observacao: null },
  
  // More NÃO companies
  { cliente: 'Protec', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Solecir', bolsa: null, ticker: null, observacao: null },
  { cliente: 'SabEst', bolsa: null, ticker: null, observacao: null },
  { cliente: 'S3A', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Carajás', bolsa: null, ticker: null, observacao: null },
  { cliente: 'Conmax S/A', bolsa: null, ticker: null, observacao: null },
  
  // Continuing SIM companies
  { cliente: 'AKZO NOBEL', bolsa: 'EURONEXT', ticker: 'AKZA', observacao: 'Euronext Amsterdam' },
  { cliente: 'BRIDGESTONE', bolsa: 'TSE', ticker: '5108', observacao: null },
  { cliente: 'COLGATE', bolsa: 'B3', ticker: 'COLG34', observacao: null },
  { cliente: 'COLGATE', bolsa: 'NYSE', ticker: 'CL', observacao: null },
  
  // NÃO company
  { cliente: 'FESTO', bolsa: null, ticker: null, observacao: null },
  
  // SIM companies
  { cliente: 'FRESENIUS', bolsa: 'NYSE', ticker: 'FMS', observacao: null },
  { cliente: 'FRESENIUS', bolsa: 'XETRA', ticker: 'FRE', observacao: null },
  { cliente: 'FRESENIUS', bolsa: 'XETRA', ticker: 'FME', observacao: null },
  
  // NÃO company
  { cliente: 'MARELLI', bolsa: null, ticker: null, observacao: null },
  
  // SIM companies
  { cliente: 'PANASONIC', bolsa: 'TSE', ticker: '6752', observacao: null },
  
  // NÃO company
  { cliente: 'PLASTEK', bolsa: null, ticker: null, observacao: null },
  
  // SIM companies
  { cliente: 'PPG', bolsa: 'NYSE', ticker: 'PPG', observacao: null },
  
  // NÃO companies
  { cliente: 'SOLENIS', bolsa: null, ticker: null, observacao: null },
  { cliente: 'TIGRE', bolsa: null, ticker: null, observacao: null },
  { cliente: 'TLE', bolsa: null, ticker: null, observacao: null },
  { cliente: 'TMD', bolsa: null, ticker: null, observacao: null },
  
  // SIM companies
  { cliente: 'TOYOTA', bolsa: 'NYSE', ticker: 'TM', observacao: null },
  { cliente: 'TOYOTA', bolsa: 'TSE', ticker: '7203', observacao: null },
  { cliente: 'TUPPERWARE', bolsa: 'NYSE', ticker: 'TUP', observacao: null },
  { cliente: 'TUPY', bolsa: 'B3', ticker: 'TUPY3', observacao: null },
  
  // NÃO companies
  { cliente: 'AOS (GRUPO NO)', bolsa: null, ticker: null, observacao: null },
  { cliente: 'AEROPORTO SALVADOR', bolsa: null, ticker: null, observacao: null },
  { cliente: 'AGRITECH', bolsa: null, ticker: null, observacao: null },
  
  // SIM company
  { cliente: 'CCL', bolsa: 'TSX', ticker: 'CCL-B.TO', observacao: null },
  
  // NÃO companies
  { cliente: 'CPE', bolsa: null, ticker: null, observacao: null },
  { cliente: 'DISHPX', bolsa: null, ticker: null, observacao: null },
  { cliente: 'DRYLOCK', bolsa: null, ticker: null, observacao: null },
  
  // SIM company
  { cliente: 'FRAPORT', bolsa: 'XETRA', ticker: 'FRA', observacao: 'Bolsa de Frankfurt (Xetra)' },
  
  // NÃO companies
  { cliente: 'JUNPESA', bolsa: null, ticker: null, observacao: null },
  { cliente: 'HOSPITAL MOINHOS', bolsa: null, ticker: null, observacao: null },
  { cliente: 'INVISTA (LYSA)', bolsa: null, ticker: null, observacao: null },
  { cliente: 'INVISTA PERFORMANCE', bolsa: null, ticker: null, observacao: null },
  { cliente: 'JXA AUTOMOTIVE', bolsa: null, ticker: null, observacao: null },
  { cliente: 'MALABARA BURAN', bolsa: null, ticker: null, observacao: null },
  { cliente: 'NECLAB', bolsa: null, ticker: null, observacao: null },
  
  // SIM companies
  { cliente: 'NOVARTIS', bolsa: 'SIX', ticker: 'NVS34', observacao: 'SIX Values de Zurique (SIX) | SB (Brasil, vl)' },
  
  // NÃO company
  { cliente: 'SFX', bolsa: null, ticker: null, observacao: null },
  
  // SIM companies
  { cliente: 'SANDOZ', bolsa: 'SIX', ticker: 'SDZ', observacao: 'SIX Values de Zurique SIX Swiss Exchange' },
  
  // NÃO company
  { cliente: 'SUGGAR', bolsa: null, ticker: null, observacao: null },
  
  // SIM company
  { cliente: 'TDK', bolsa: 'TSE', ticker: 'TTDKY', observacao: '1 Tóquio (Tokyo Stock Exchange) e Mer' },
  
  // NÃO companies
  { cliente: 'VIPAL', bolsa: null, ticker: null, observacao: null },
  { cliente: 'VIRACOPOS', bolsa: null, ticker: null, observacao: null },
  { cliente: 'AQUAFEST', bolsa: null, ticker: null, observacao: null },
  { cliente: 'COFLEM/SERVAI SUS', bolsa: null, ticker: null, observacao: null },
  
  // SIM company
  { cliente: 'DAF', bolsa: 'NASDAQ', ticker: 'PCAR', observacao: 'Paccar (Subsidiária da DAF)' },
  
  // NÃO companies
  { cliente: 'GAMATEL', bolsa: null, ticker: null, observacao: null },
  { cliente: 'SIAP', bolsa: null, ticker: null, observacao: null },
  { cliente: 'GALVANIZAÇÃO JOSITA', bolsa: null, ticker: null, observacao: null },
  { cliente: 'ASA', bolsa: null, ticker: null, observacao: null },
  { cliente: 'MALISA', bolsa: null, ticker: null, observacao: null },
  
  // SIM companies
  { cliente: 'MERCK', bolsa: 'NYSE', ticker: 'MRK; MRCK34', observacao: 'Merck & Co., Inc.' },
  { cliente: 'OMPI', bolsa: 'NYSE', ticker: 'STVN', observacao: 'Stevanato Group' },
  
  // NÃO company
  { cliente: 'SKANSIAMMI', bolsa: null, ticker: null, observacao: null },
  
  // SIM company
  { cliente: 'THYSSENKRUPP', bolsa: 'XETRA', ticker: 'TKA', observacao: 'ThyssenKrupp AG' },
  
  // NÃO companies
  { cliente: 'ZANOTI', bolsa: null, ticker: null, observacao: null },
  { cliente: 'BEM ESTAR', bolsa: null, ticker: null, observacao: null },
  { cliente: 'BOM PLAST', bolsa: null, ticker: null, observacao: null },
  
  // SIM company
  { cliente: 'BREMBO', bolsa: 'FTMIB', ticker: 'BRE', observacao: 'Brembo S.p.A (matriz)' },
  
  // NÃO companies
  { cliente: 'UBIS', bolsa: null, ticker: null, observacao: null },
  { cliente: 'MANN+HUMMEL', bolsa: null, ticker: null, observacao: null },
  { cliente: 'MG FIRES', bolsa: null, ticker: null, observacao: null },
  { cliente: 'MG TINTAS', bolsa: null, ticker: null, observacao: null },
  { cliente: 'INTERNACIONAL', bolsa: null, ticker: null, observacao: null },
  { cliente: 'KIMAFOX', bolsa: null, ticker: null, observacao: null },
  { cliente: 'REGALI', bolsa: null, ticker: null, observacao: null },
  { cliente: 'SANTA CLARA', bolsa: null, ticker: null, observacao: null },
  { cliente: 'SENTION', bolsa: null, ticker: null, observacao: null },
  
  // SIM company
  { cliente: 'WABTEC', bolsa: 'NYSE', ticker: 'WAB', observacao: null }
];

// Filter by exchange for easier access
const nyseClients = eduClients.filter(client => 
  client.bolsa === 'NYSE' || 
  client.bolsa === 'NASDAQ'
);

const b3Clients = eduClients.filter(client => 
  client.bolsa === 'B3'
);

const tokyoClients = eduClients.filter(client => 
  client.bolsa === 'TSE'
);

const europeanClients = eduClients.filter(client => 
  ['EPA', 'XETRA', 'FTMIB', 'EURONEXT', 'SIX', 'BIT'].includes(client.bolsa)
);

// Function to determine sector based on company name
const getSectorForCompany = (companyName) => {
  const name = companyName.toLowerCase();
  
  const sectorMap = {
    // Existing companies
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
    'wabtec': 'Ferroviário',
    
    // New companies from spreadsheet
    'cinal': 'Industrial',
    'daicast': 'Metalúrgica',
    'américa embalagens': 'Embalagens',
    'ibg': 'Industrial',
    'metalast': 'Metalúrgica',
    'sew': 'Industrial',
    'summaplast': 'Plásticos',
    'frigol': 'Alimentício',
    'rcinvon': 'Industrial',
    'befast': 'Industrial',
    'bose': 'Eletrônico',
    'dunooline': 'Industrial',
    'biocow': 'Agropecuário',
    'ex millex': 'Industrial',
    'carrera': 'Industrial',
    'gameiro2': 'Industrial',
    'elgin': 'Industrial',
    'fertilizantes tocantins': 'Agropecuário',
    'gga gama': 'Industrial',
    'maccaferri': 'Construção Civil',
    'mineração horical': 'Mineração',
    'pamafond': 'Industrial',
    'sl do brasil': 'Industrial',
    'filtros fram': 'Automotivo',
    'fagron': 'Farmacêutico',
    'thermaxpol': 'Industrial',
    'protec': 'Industrial',
    'solecir': 'Industrial',
    'sabest': 'Industrial',
    's3a': 'Industrial',
    'carajás': 'Mineração',
    'conmax': 'Industrial',
    'festo': 'Automação Industrial',
    'marelli': 'Automotivo',
    'plastek': 'Plásticos',
    'solenis': 'Químico',
    'tigre': 'Construção Civil',
    'tle': 'Industrial',
    'tmd': 'Industrial',
    'aos': 'Industrial',
    'aeroporto salvador': 'Aeroportuário',
    'agritech': 'Agropecuário',
    'cpe': 'Industrial',
    'dishpx': 'Industrial',
    'drylock': 'Industrial',
    'junpesa': 'Industrial',
    'hospital moinhos': 'Saúde',
    'invista': 'Químico',
    'jxa automotive': 'Automotivo',
    'malabara buran': 'Industrial',
    'neclab': 'Industrial',
    'sfx': 'Industrial',
    'suggar': 'Eletrodomésticos',
    'vipal': 'Pneus',
    'viracopos': 'Aeroportuário',
    'aquafest': 'Industrial',
    'coflem': 'Saúde',
    'gamatel': 'Telecomunicações',
    'siap': 'Industrial',
    'galvanização josita': 'Metalúrgica',
    'asa': 'Industrial',
    'malisa': 'Industrial',
    'skansiammi': 'Industrial',
    'zanoti': 'Industrial',
    'bem estar': 'Saúde',
    'bom plast': 'Plásticos',
    'ubis': 'Industrial',
    'mann+hummel': 'Automotivo',
    'mg fires': 'Industrial',
    'mg tintas': 'Químico',
    'internacional': 'Industrial',
    'kimafox': 'Industrial',
    'regali': 'Industrial',
    'santa clara': 'Industrial',
    'sention': 'Industrial'
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

// Additional new sector filters
const plasticsClients = eduClientsWithSector.filter(client => 
  client.setor === 'Plásticos'
);

const miningClients = eduClientsWithSector.filter(client => 
  client.setor === 'Mineração'
);

const constructionClients = eduClientsWithSector.filter(client => 
  client.setor === 'Construção Civil'
);

const agribusinessClients = eduClientsWithSector.filter(client => 
  client.setor === 'Agropecuário'
);

const telecomClients = eduClientsWithSector.filter(client => 
  client.setor === 'Telecomunicações'
);

const foodClients = eduClientsWithSector.filter(client => 
  client.setor === 'Alimentício'
);

// Geographic/Market-based filters
const americanClients = eduClients.filter(client => 
  ['NYSE', 'NASDAQ', 'TSX'].includes(client.bolsa)
);

const asianClients = eduClients.filter(client => 
  ['TSE', 'KRX'].includes(client.bolsa)
);

const brazilianClients = eduClients.filter(client => 
  client.bolsa === 'B3'
);

// Binary filters similar to capital aberto/fechado
// Domestic vs International (based on exchange location)
const domesticClients = eduClients.filter(client => 
  client.bolsa === 'B3'
);

const internationalClients = eduClients.filter(client => 
  client.bolsa !== 'B3'
);

// Industrial vs Services sectors
const industrialEduClients = eduClientsWithSector.filter(client => 
  ['Automotivo', 'Industrial', 'Eletrônico', 'Elétrico', 'Metalúrgica', 
   'Químico', 'Pneus', 'Siderúrgica', 'Ferroviário', 'Têxtil', 
   'Petróleo & Gas', 'Maquinário', 'Plásticos', 'Construção Civil',
   'Mineração', 'Automação Industrial', 'Telecomunicações'].includes(client.setor)
);

const servicesEduClients = eduClientsWithSector.filter(client => 
  ['Farmacêutico', 'Saúde', 'Energia', 'Aeroportuário', 
   'Eletrodomésticos', 'Utensílios', 'Embalagens', 'Higiene',
   'Alimentício', 'Agropecuário'].includes(client.setor)
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
  ['NYSE', 'NASDAQ'].includes(client.bolsa)
);

const nonUsMarketClients = eduClients.filter(client => 
  !['NYSE', 'NASDAQ'].includes(client.bolsa)
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
  // New sector filters
  plasticsClients,
  miningClients,
  constructionClients,
  agribusinessClients,
  telecomClients,
  foodClients,
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
