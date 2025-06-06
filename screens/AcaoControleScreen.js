import React from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { API_CONFIG } from '../config';

const AcaoControleScreen = () => {
  const executarAcao = (acao) => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HISTORICO}`;
    console.log('Tentando enviar ação para:', url);
    
    fetch(url, {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        acao: acao,
        origem: 'App Mobile'
      })
    })
    .then(async response => {
      console.log('Status da resposta:', response.status);
      if (response.ok) {
        Alert.alert('Sucesso', `Ação "${acao}" registrada com sucesso.`);
      } else {
        const errorText = await response.text();
        console.error('Erro na resposta:', errorText);
        Alert.alert('Erro', 'Não foi possível registrar a ação. Tente novamente.');
      }
    })
    .catch(error => {
      console.error('Erro ao executar ação:', {
        message: error.message,
        url: url
      });
      Alert.alert('Erro', 'Erro de conexão com o servidor. Verifique sua conexão e tente novamente.');
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ações de Contenção</Text>
      <Text style={styles.debug}>Endpoint: {API_CONFIG.BASE_URL}{API_CONFIG.ENDPOINTS.HISTORICO}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Abrir comportas"
          color="#007BFF"
          onPress={() => executarAcao('Abrir comportas')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Ativar bombas de drenagem"
          color="#28A745"
          onPress={() => executarAcao('Ativar bombas de drenagem')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Emitir alerta sonoro"
          color="#FFC107"
          onPress={() => executarAcao('Emitir alerta sonoro')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Enviar equipe de campo"
          color="#DC3545"
          onPress={() => executarAcao('Enviar equipe de campo')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  debug: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default AcaoControleScreen;
