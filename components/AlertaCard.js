import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AlertaCard = ({ alerta }) => {
  const getNivelAlerta = (tipo) => {
    switch (tipo?.toUpperCase()) {
      case 'PERIGO':
        return { cor: '#dc3545', texto: 'PERIGO', icone: 'warning' };
      case 'MODERADO':
        return { cor: '#ffc107', texto: 'MODERADO', icone: 'alert-circle' };
      case 'BAIXO':
        return { cor: '#28a745', texto: 'BAIXO', icone: 'information-circle' };
      default:
        return { cor: '#17a2b8', texto: 'INFORMATIVO', icone: 'information' };
    }
  };

  const alertaInfo = getNivelAlerta(alerta.tipo);
  
  // Convertendo a string da data para objeto Date
  const dataAlerta = new Date(alerta.data_alerta);
  const dataFormatada = dataAlerta.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <View style={[styles.card, { borderLeftColor: alertaInfo.cor }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name={alertaInfo.icone} size={24} color={alertaInfo.cor} />
          <Text style={[styles.title, { color: alertaInfo.cor }]}>
            Alerta {alertaInfo.texto}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: alertaInfo.cor }]}>
          <Text style={styles.statusText}>{alertaInfo.texto}</Text>
        </View>
      </View>

      <Text style={styles.descricao}>{alerta.mensagem}</Text>

      <View style={styles.footer}>
        <Text style={styles.timestamp}>
          Emitido em: {dataFormatada}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  descricao: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    marginTop: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  }
});

export default AlertaCard;
