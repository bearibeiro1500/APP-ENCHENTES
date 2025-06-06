import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, Alert } from 'react-native';
import { fetchHistorico } from '../services/api';
import { API_CONFIG } from '../config';
import HistoricoCard from '../components/HistoricoCard';

const HistoricoScreen = () => {
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const carregarHistorico = async () => {
    try {
      setCarregando(true);
      console.log('Tentando buscar histórico em:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HISTORICO}`);
      const dados = await fetchHistorico();
      console.log('Dados do histórico recebidos:', dados);
      if (Array.isArray(dados)) {
        setHistorico(dados);
      } else {
        console.error('Dados recebidos não são um array:', dados);
        Alert.alert('Erro', 'Formato de dados inválido recebido do servidor');
      }
    } catch (error) {
      console.error('Erro detalhado ao carregar histórico:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar o histórico. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarHistorico();
    // Atualiza os dados a cada 30 segundos
    const interval = setInterval(carregarHistorico, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={carregando} onRefresh={carregarHistorico} />}
    >
      <Text style={styles.titulo}>Histórico de Ações</Text>
      <Text style={styles.debug}>Endpoint: {API_CONFIG.BASE_URL}{API_CONFIG.ENDPOINTS.HISTORICO}</Text>
      {historico.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.nenhum}>Nenhum registro no histórico.</Text>
          <Text style={styles.subNenhum}>Puxe para baixo para atualizar</Text>
        </View>
      ) : (
        historico.map(item => <HistoricoCard key={item.id} item={item} />)
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
  },
  debug: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default HistoricoScreen;
