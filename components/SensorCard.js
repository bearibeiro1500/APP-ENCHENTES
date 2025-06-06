import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SensorCard = ({ sensor }) => {
  const getNivelRisco = (nivel) => {
    if (nivel >= 3.0) return { cor: '#dc3545', texto: 'PERIGO' };
    if (nivel >= 2.0) return { cor: '#ffc107', texto: 'ATENÇÃO' };
    return { cor: '#28a745', texto: 'NORMAL' };
  };

  const risco = getNivelRisco(sensor.nivelAgua);
  
  // Convertendo a string da data para objeto Date
  const dataLeitura = new Date(sensor.dataLeitura);
  const dataFormatada = dataLeitura.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Ícone do clima
  const getClimaIcon = (clima) => {
    switch (clima.toLowerCase()) {
      case 'ensolarado':
        return 'sunny';
      case 'nublado':
        return 'cloudy';
      case 'chuvoso':
        return 'rainy';
      case 'tempestade':
        return 'thunderstorm';
      case 'chuviscando':
        return 'water';
      default:
        return 'cloud';
    }
  };

  return (
    <View style={[styles.card, { borderLeftColor: risco.cor }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Sensor {sensor.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: risco.cor }]}>
          <Text style={styles.statusText}>{risco.texto}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="water" size={20} color="#17a2b8" />
          <Text style={styles.infoText}>
            Nível da Água: {sensor.nivelAgua.toFixed(2)}m
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name={getClimaIcon(sensor.clima)} size={20} color="#17a2b8" />
          <Text style={styles.infoText}>
            Clima: {sensor.clima}
          </Text>
        </View>
      </View>

      <Text style={styles.timestamp}>
        Última atualização: {dataFormatada}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2c3e50',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#2c3e50',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default SensorCard;
