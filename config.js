// Configurações da API
export const API_CONFIG = {
  // Para desenvolvimento local use localhost
  // Para acesso externo, use o IP da máquina (ex: http://192.168.0.11:8080)
  // Certifique-se que a origem (http://localhost:19006) está permitida no CORS do backend
  BASE_URL: 'http://localhost:8080',
  ENDPOINTS: {
    SENSORES: '/api/sensores',
    ALERTAS: '/api/alertas',
    HISTORICO: '/api/historico'
  }
}; 