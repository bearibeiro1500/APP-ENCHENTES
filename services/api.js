import { API_CONFIG } from '../config';

const fetchWithLogging = async (url) => {
  console.log(`[API] Tentando acessar: ${url}`);
  console.log('[API] Headers:', {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Origin': window.location.origin
  });
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error('[API] Erro na resposta:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('[API] Dados recebidos:', data);
    return data;
  } catch (error) {
    console.error('[API] Erro detalhado:', {
      message: error.message,
      url: url,
      origin: window.location.origin
    });
    throw error;
  }
};

export const fetchSensores = async () => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SENSORES}`;
  return fetchWithLogging(url);
};

export const fetchAlertas = async () => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ALERTAS}`;
  return fetchWithLogging(url);
};

export const fetchHistorico = async () => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HISTORICO}`;
  return fetchWithLogging(url);
};