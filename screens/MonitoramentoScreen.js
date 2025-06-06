import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, Alert } from 'react-native';
import SensorCard from '../components/SensorCard';
import { fetchSensores } from '../services/api';
import { API_CONFIG } from '../config';

const MonitoramentoScreen = () => {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [ultimoErro, setUltimoErro] = useState(null);

  const carregarDados = async () => {
    try {
      setCarregando(true);
      setUltimoErro(null);
      console.log('Tentando buscar dados em:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SENSORES}`);
      const sensores = await fetchSensores();
      console.log('Dados dos sensores recebidos:', sensores);
      if (Array.isArray(sensores)) {
        setDados(sensores);
      } else {
        const erro = 'Dados recebidos não são um array: ' + JSON.stringify(sensores);
        console.error(erro);
        setUltimoErro(erro);
        Alert.alert('Erro', 'Formato de dados inválido recebido do servidor');
      }
    } catch (error) {
      const mensagemErro = `Erro: ${error.message}`;
      console.error('Erro detalhado ao carregar sensores:', error);
      setUltimoErro(mensagemErro);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os dados dos sensores. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
    // Atualiza os dados a cada 30 segundos
    const interval = setInterval(carregarDados, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={carregando} onRefresh={carregarDados} />}
    >
      <Text style={styles.titulo}>Monitoramento em Tempo Real</Text>
      <View style={styles.debugContainer}>
        <Text style={styles.debug}>Endpoint: {API_CONFIG.BASE_URL}{API_CONFIG.ENDPOINTS.SENSORES}</Text>
        {ultimoErro && <Text style={styles.debugError}>Último erro: {ultimoErro}</Text>}
        <Text style={styles.debug}>Total de sensores: {dados.length}</Text>
      </View>
      {dados.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.nenhum}>Nenhum dado de sensor disponível.</Text>
          <Text style={styles.subNenhum}>Puxe para baixo para atualizar</Text>
        </View>
      ) : (
        dados.map(sensor => (
          <SensorCard 
            key={sensor.id} 
            sensor={{
              id: sensor.id,
              nivelAgua: sensor.nivelAgua,
              clima: sensor.clima,
              dataLeitura: sensor.dataLeitura
            }} 
          />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    paddingBottom: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
    color: '#2c3e50',
  },
  debugContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  debug: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  debugError: {
    fontSize: 12,
    color: '#dc3545',
    marginBottom: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 20,
  },
  nenhum: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  subNenhum: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#999',
  }
});

export default MonitoramentoScreen;
