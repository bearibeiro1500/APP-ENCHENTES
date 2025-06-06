import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, Alert } from 'react-native';
import { fetchAlertas } from '../services/api';
import { API_CONFIG } from '../config';
import AlertaCard from '../components/AlertaCard';

const AlertasScreen = () => {
  const [alertas, setAlertas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [ultimoErro, setUltimoErro] = useState(null);

  const carregarAlertas = async () => {
    try {
      setCarregando(true);
      setUltimoErro(null);
      console.log('Tentando buscar alertas em:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ALERTAS}`);
      const dados = await fetchAlertas();
      console.log('Dados dos alertas recebidos:', dados);
      if (Array.isArray(dados)) {
        setAlertas(dados);
      } else {
        const erro = 'Dados recebidos não são um array: ' + JSON.stringify(dados);
        console.error(erro);
        setUltimoErro(erro);
        Alert.alert('Erro', 'Formato de dados inválido recebido do servidor');
      }
    } catch (error) {
      const mensagemErro = `Erro: ${error.message}`;
      console.error('Erro detalhado ao carregar alertas:', error);
      setUltimoErro(mensagemErro);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os alertas. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarAlertas();
    // Atualiza os dados a cada 30 segundos
    const interval = setInterval(carregarAlertas, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={carregando} onRefresh={carregarAlertas} />}
    >
      <Text style={styles.titulo}>Alertas Ativos</Text>
      <View style={styles.debugContainer}>
        <Text style={styles.debug}>Endpoint: {API_CONFIG.BASE_URL}{API_CONFIG.ENDPOINTS.ALERTAS}</Text>
        {ultimoErro && <Text style={styles.debugError}>Último erro: {ultimoErro}</Text>}
        <Text style={styles.debug}>Total de alertas: {alertas.length}</Text>
      </View>
      {alertas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.nenhum}>Nenhum alerta ativo no momento.</Text>
          <Text style={styles.subNenhum}>Puxe para baixo para atualizar</Text>
        </View>
      ) : (
        alertas.map(alerta => (
          <AlertaCard key={alerta.id} alerta={alerta} />
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

export default AlertasScreen;
