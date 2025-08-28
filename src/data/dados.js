import { eduClients } from './eduClients.js';
import { geClients } from './geClients.js';

// Function to determine sector based on company name (basic mapping)
const getSectorForCompany = (companyName) => {
  const name = companyName.toLowerCase();
  
  // Sector mapping based on company names
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
    'wabtec': 'Ferroviário',
    'motiva': 'Energia',
    'martin brower': 'Alimentício',
    'amil': 'Saúde',
    'hotel': 'Hotelaria',
    'turismo': 'Turismo',
    'supermercados': 'Varejo',
    'armarinhos': 'Varejo',
    'modernarte': 'Varejo',
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
  
  return 'Outros'; // Default sector
};

// Transform eduClients to allData format
const eduData = eduClients.map(client => ({
  empresa: client.cliente,
  capitalAberto: 'SIM', // All edu clients are publicly traded
  bolsa: client.bolsa,
  ticker: client.ticker,
  setor: getSectorForCompany(client.cliente),
  fonte: 'EDU'
}));

// Transform geClients to allData format
const geData = geClients.map(client => ({
  empresa: client.cliente,
  capitalAberto: client.capitalAberto || 'SIM',
  bolsa: client.bolsa,
  ticker: client.ticker,
  setor: getSectorForCompany(client.cliente),
  fonte: 'GE'
}));

// Combine all data
const allData = [...eduData, ...geData];

// Adicionar empresas que não são de capital aberto
const closedCompanies = [
  'CINBAL', 'DAICAST', 'AMÉRICA EMBALAGENS', 'IBG', 'METALFAST', 'SEW', 'SOMMAPLAST', 'FRIGOL', 'NOURYON',
  'BOGE', 'DUROLINE', 'DICKOW', 'DE MILLUS', 'CARIFLEX', 'ELEKEIROZ', 'ELGIN', 'FERTILIZANTES TOCANTINS',
  'GSA GAMA', 'MACCAFERRI - BMD', 'MINERAÇÃO HORICAL', 'PAMPLONA', 'SL DO BRASIL', 'FILTROS FRAM', 'FAGRON - SM EMPREENDIMENTOS',
  'THERMANSOL', 'PROLEC', 'SODECIA', 'SUDATI', 'STIHL', 'KANJIKO', 'CROMEX S/A', 'FESTO', 'MARELLI', 'PLASTEK',
  'SOLENIS', 'TIGRE', 'TKE', 'TMD', 'ADS (GRUPO NC)', 'AEROPORTO SALVADOR', 'AGRITECH', 'CPE', 'DIGIPIX', 'DRYLOCK',
  'FFS', 'FUPRESA', 'HOSPITAL MOINHOS', 'INVISTA (LYCRA)', 'KROMBERG SCHUBERT', 'MA AUTOMOTIVE', 'MALHARIA BERLAN',
  'NEOLAB', 'RFR', 'SUGGAR', 'VIPAL', 'VIRACOPOS', 'AQUAFAST', 'COPELMI/SEIVAL SUL', 'DAMAPEL', 'GALVANIZAÇÃO JOSITA',
  'JCB', 'MAUSA', 'SAARGUMMI', 'ZANDEI', 'BEM ESTAR', 'BOM PLAST', 'LIBBS', 'MANN HUMMEL', 'MG TIRES',
  'MIIKA NACIONAL', 'PURATOS', 'REGALI', 'SANTA CLARA', 'SEOYON', 'WELLOUR', 'BEPLAST'
];

// Separate NYSE and B3 data for easier access
const usData = allData.filter(company => 
  company.bolsa && (
    company.bolsa === 'NYSE' || 
    company.bolsa === 'NASDAQ'
  )
);

const eurData = allData.filter(company => 
  company.bolsa && company.bolsa === 'ENX'
);

const brData = allData.filter(company => 
  company.bolsa && company.bolsa === 'B3'
);

// Additional filters
const publicCompanies = allData.filter(company => 
  company.capitalAberto === 'SIM'
);

const privateCompanies = allData.filter(company => 
  company.capitalAberto === 'NÃO'
);

const eduCompanies = allData.filter(company => 
  company.fonte === 'EDU'
);

const geCompanies = allData.filter(company => 
  company.fonte === 'GE'
);

export { 
  allData, 
  closedCompanies, 
  usData, 
  brData,
  eurData,
  publicCompanies,
  privateCompanies,
  eduCompanies,
  geCompanies
};