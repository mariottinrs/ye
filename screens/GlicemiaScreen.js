import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GlicemiaScreen({ navigation }) {
  const [glicemiaEntries, setGlicemiaEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGlicemia, setSelectedGlicemia] = useState(null);
  const [newGlicemia, setNewGlicemia] = useState({
    glicemia: '',
    date: '',
    time: ''
  });

  const loadGlicemiaEntries = async () => {
    try {
      const glicemia = await AsyncStorage.getItem('glicemia');
      if (glicemia !== null) {
        setGlicemiaEntries(JSON.parse(glicemia));
      }
    } catch (error) {
      console.error('Erro ao carregar glicemia:', error);
    }
  };

  const saveGlicemiaEntries = async (glicemia) => {
    try {
      await AsyncStorage.setItem('glicemia', JSON.stringify(glicemia));
    } catch (error) {
      console.error('Erro ao salvar glicemia:', error);
    }
  };

  useEffect(() => {
    loadGlicemiaEntries();
  }, []);

  const handleAddGlicemia = () => {
    const updatedGlicemiaEntries = [
      ...glicemiaEntries,
      { id: Date.now().toString(), ...newGlicemia }
    ];
    setGlicemiaEntries(updatedGlicemiaEntries);
    saveGlicemiaEntries(updatedGlicemiaEntries);
    setNewGlicemia({ glicemia: '', date: '', time: '' });
    setModalVisible(false);
  };

  const handleDeleteGlicemia = (id) => {
    const updatedGlicemiaEntries = glicemiaEntries.filter(entry => entry.id !== id);
    setGlicemiaEntries(updatedGlicemiaEntries);
    saveGlicemiaEntries(updatedGlicemiaEntries);
    setSelectedGlicemia(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => setSelectedGlicemia(item)}>
      <Text style={styles.itemText}>{item.glicemia}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/back.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>Glicemia</Text>
      <FlatList
        data={glicemiaEntries}
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
            <Text style={styles.modalTitle}>Adicionar Glicemia</Text>
            <TextInput
              style={styles.input}
              placeholder="Índice Glicêmico"
              value={newGlicemia.glicemia}
              onChangeText={(text) => setNewGlicemia({ ...newGlicemia, glicemia: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Data"
              value={newGlicemia.date}
              onChangeText={(text) => setNewGlicemia({ ...newGlicemia, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Hora"
              value={newGlicemia.time}
              onChangeText={(text) => setNewGlicemia({ ...newGlicemia, time: text })}
            />
            <Button title="Adicionar" onPress={handleAddGlicemia} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={!!selectedGlicemia}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedGlicemia(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes da Glicemia</Text>
            {selectedGlicemia && (
              <>
                <Text>Índice Glicêmico: {selectedGlicemia.glicemia}</Text>
                <Text>Data: {selectedGlicemia.date}</Text>
                <Text>Hora: {selectedGlicemia.time}</Text>
                <Button title="Excluir" onPress={() => handleDeleteGlicemia(selectedGlicemia.id)} />
                <Button title="Fechar" onPress={() => setSelectedGlicemia(null)} />
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
}); 