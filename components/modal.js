import React from 'react';
import { Modal, View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CustomModal({ visible, message, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true} 
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Atenção</Text>
          <Text style={styles.text}>{message || 'Ocorreu um erro!'}</Text>
          <Button title="OK" onPress={onClose} style={styles.button} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start', // Alinha os elementos ao topo
    alignItems: 'center',
    paddingTop: 100, // Ajuste conforme necessário
    zIndex: 1000, // Garante que o modal fique acima dos outros componentes
  },
  container: {
  position: 'absolute',
  top: '40%', // Ajuste para descer mais ou menos
  backgroundColor: 'white',
  width: width * 0.85,
  minHeight: 180,
  borderRadius: 12,
  padding: 25,
  alignItems: 'center',
  elevation: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20, // Move o título mais para baixo
    marginBottom: 10,
    textAlign: 'center',
    color: '#6200EE',
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    marginTop: 10,
    width: '80%',
    backgroundColor: '#6200EE',
  },
});
