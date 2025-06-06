import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash-icon.png')}
        style={styles.logo}
      />
      <Text style={styles.titulo}>Sistema de Detecção de Enchentes</Text>
      <Text style={styles.subtitulo}>
        Segurança inteligente contra inundações urbanas
      </Text>
      <Text style={styles.instrucao}>
        Use o menu abaixo para navegar entre as funcionalidades do sistema
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1ecf1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  instrucao: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 32,
    fontStyle: 'italic',
  },
});

export default WelcomeScreen;
