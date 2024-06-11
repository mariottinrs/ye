import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ConsultasScreen({ navigation }) {
  const [consultasEntries, setConsultasEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [newConsulta, setNewConsulta] = useState({
    consulta: '',
    date: '',
    time: ''
  });

  const loadConsultas = async () => {
    try {
      const consultas = await AsyncStorage.getItem('consultas');
      if (consultas !== null) {
        setConsultasEntries(JSON.parse(consultas));
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  };

  const saveConsultas = async (consultas) => {
    try {
      await AsyncStorage.setItem('consultas', JSON.stringify(consultas));
    } catch (error) {
      console.error('Erro ao salvar consultas:', error);
    }
  };

  useEffect(() => {
    loadConsultas();
  }, []);

  const handleAddConsulta = () => {
    const updatedConsultas = [
      ...consultasEntries,
      { id: Date.now().toString(), ...newConsulta }
    ];
    setConsultasEntries(updatedConsultas);
    saveConsultas(updatedConsultas);
    setNewConsulta({ consulta: '', date: '', time: '' });
    setModalVisible(false);
  };

  const handleDeleteConsulta = (id) => {
    const updatedConsultas = consultasEntries.filter(entry => entry.id !== id);
    setConsultasEntries(updatedConsultas);
    saveConsultas(updatedConsultas);
    setSelectedConsulta(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => setSelectedConsulta(item)}>
      <Text style={styles.itemText}>{item.consulta}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/back.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>Consultas</Text>
      <FlatList
        data={consultasEntries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Image source={require('../assets/images/add.png')} style={styles.icon} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Consulta</Text>
            <TextInput
              style={styles.input}
              placeholder="Consulta"
              value={newConsulta.consulta}
              onChangeText={(text) => setNewConsulta({ ...newConsulta, consulta: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Data"
              value={newConsulta.date}
              onChangeText={(text) => setNewConsulta({ ...newConsulta, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Hora"
              value={newConsulta.time}
              onChangeText={(text) => setNewConsulta({ ...newConsulta, time: text })}
            />
            <View style={styles.modalButtons}>
              <Button title="Adicionar" onPress={handleAddConsulta} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={!!selectedConsulta}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedConsulta(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes da Consulta</Text>
            {selectedConsulta && (
              <>
                <Text>Consulta: {selectedConsulta.consulta}</Text>
                <Text>Data: {selectedConsulta.date}</Text>
                <Text>Hora: {selectedConsulta.time}</Text>
                <View style={styles.modalButtons}>
                  <Button title="Excluir" onPress={() => handleDeleteConsulta(selectedConsulta.id)} />
                  <Button title="Fechar" onPress={() => setSelectedConsulta(null)} />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderTopWidth: 50, 
    borderTopColor: 'transparent',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#61A186',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    marginHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#61A186',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
