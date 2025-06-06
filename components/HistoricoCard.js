import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoricoCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.acao}</Text>
      <Text style={styles.text}>Origem: {item.origem}</Text>
      <Text style={styles.timestamp}>
        Data: {new Date(item.dataHora).toLocaleString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eef6ff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#2196f3',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#0d47a1',
  },
  text: {
    fontSize: 13,
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#555',
    marginTop: 6,
  },
});

export default HistoricoCard;
