import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MedicamentosScreen({ navigation }) {
  const [medicamentosEntries, setMedicamentosEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedicamento, setSelectedMedicamento] = useState(null);
  const [newMedicamento, setNewMedicamento] = useState({
    medicamento: '',
    date: '',
    time: ''
  });

  const loadMedicamentos = async () => {
    try {
      const medicamentos = await AsyncStorage.getItem('medicamentos');
      if (medicamentos !== null) {
        setMedicamentosEntries(JSON.parse(medicamentos));
      }
    } catch (error) {
      console.error('Erro ao carregar medicamentos:', error);
    }
  };

  const saveMedicamentos = async (medicamentos) => {
    try {
      await AsyncStorage.setItem('medicamentos', JSON.stringify(medicamentos));
    } catch (error) {
      console.error('Erro ao salvar medicamentos:', error);
    }
  };

  useEffect(() => {
    loadMedicamentos();
  }, []);

  const handleAddMedicamento = () => {
    const updatedMedicamentos = [
      ...medicamentosEntries,
      { id: Date.now().toString(), ...newMedicamento }
    ];
    setMedicamentosEntries(updatedMedicamentos);
    saveMedicamentos(updatedMedicamentos);
    setNewMedicamento({ medicamento: '', date: '', time: '' });
    setModalVisible(false);
  };

  const handleDeleteMedicamento = (id) => {
    const updatedMedicamentos = medicamentosEntries.filter(entry => entry.id !== id);
    setMedicamentosEntries(updatedMedicamentos);
    saveMedicamentos(updatedMedicamentos);
    setSelectedMedicamento(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => setSelectedMedicamento(item)}>
      <Text style={styles.itemText}>{item.medicamento}</Text>
      <Text style={styles.chevron}>{'>'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/back.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>Medicamentos</Text>
      <FlatList
        data={medicamentosEntries}
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
            <Text style={styles.modalTitle}>Adicionar Medicamento</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do Medicamento"
              value={newMedicamento.medicamento}
              onChangeText={(text) => setNewMedicamento({ ...newMedicamento, medicamento: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Data"
              value={newMedicamento.date}
              onChangeText={(text) => setNewMedicamento({ ...newMedicamento, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Hora"
              value={newMedicamento.time}
              onChangeText={(text) => setNewMedicamento({ ...newMedicamento, time: text })}
            />
            <Button title="Adicionar" onPress={handleAddMedicamento} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={!!selectedMedicamento}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedMedicamento(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes do Medicamento</Text>
            {selectedMedicamento && (
              <>
                <Text>Nome do Medicamento: {selectedMedicamento.medicamento}</Text>
                <Text>Data: {selectedMedicamento.date}</Text>
                <Text>Hora: {selectedMedicamento.time}</Text>
                <Button title="Excluir" onPress={() => handleDeleteMedicamento(selectedMedicamento.id)} />
                <Button title="Fechar" onPress={() => setSelectedMedicamento(null)} />
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
  chevron: {
    fontSize: 20,
    color: '#000',
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
});