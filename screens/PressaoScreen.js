import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PressaoScreen({ navigation }) {
  const [pressaoEntries, setPressaoEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPressao, setSelectedPressao] = useState(null);
  const [newPressao, setNewPressao] = useState({
    pressao: '',
    date: '',
    time: ''
  });

  const loadPressaoEntries = async () => {
    try {
      const pressao = await AsyncStorage.getItem('pressao');
      if (pressao !== null) {
        setPressaoEntries(JSON.parse(pressao));
      }
    } catch (error) {
      console.error('Erro ao carregar pressão arterial:', error);
    }
  };

  const savePressaoEntries = async (pressao) => {
    try {
      await AsyncStorage.setItem('pressao', JSON.stringify(pressao));
    } catch (error) {
      console.error('Erro ao salvar pressão arterial:', error);
    }
  };

  useEffect(() => {
    loadPressaoEntries();
  }, []);

  const handleAddPressao = () => {
    const updatedPressaoEntries = [
      ...pressaoEntries,
      { id: Date.now().toString(), ...newPressao }
    ];
    setPressaoEntries(updatedPressaoEntries);
    savePressaoEntries(updatedPressaoEntries);
    setNewPressao({ pressao: '', date: '', time: '' });
    setModalVisible(false);
  };

  const handleDeletePressao = (id) => {
    const updatedPressaoEntries = pressaoEntries.filter(entry => entry.id !== id);
    setPressaoEntries(updatedPressaoEntries);
    savePressaoEntries(updatedPressaoEntries);
    setSelectedPressao(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => setSelectedPressao(item)}>
      <Text style={styles.itemText}>{item.pressao}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/back.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>Pressão Arterial</Text>
      <FlatList
        data={pressaoEntries}
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
            <Text style={styles.modalTitle}>Adicionar Pressão Arterial</Text>
            <TextInput
              style={styles.input}
              placeholder="Pressão Arterial"
              value={newPressao.pressao}
              onChangeText={(text) => setNewPressao({ ...newPressao, pressao: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Data"
              value={newPressao.date}
              onChangeText={(text) => setNewPressao({ ...newPressao, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Hora"
              value={newPressao.time}
              onChangeText={(text) => setNewPressao({ ...newPressao, time: text })}
            />
            <View style={styles.modalButtons}>
              <Button title="Adicionar" onPress={handleAddPressao} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={!!selectedPressao}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedPressao(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes da Pressão Arterial</Text>
            {selectedPressao && (
              <>
                <Text>Pressão Arterial: {selectedPressao.pressao}</Text>
                <Text>Data: {selectedPressao.date}</Text>
                <Text>Hora: {selectedPressao.time}</Text>
                <View style={styles.modalButtons}>
                  <Button title="Excluir" onPress={() => handleDeletePressao(selectedPressao.id)} />
                  <Button title="Fechar" onPress={() => setSelectedPressao(null)} />
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
