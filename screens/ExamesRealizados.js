import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Button, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function ExamesRealizadosScreen({ navigation }) {
  const [examesEntries, setExamesEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExame, setSelectedExame] = useState(null);
  const [newExame, setNewExame] = useState({
    descricao: '',
    date: '',
    time: '',
    imagem: null,
  });

  const loadExames = async () => {
    try {
      const exames = await AsyncStorage.getItem('exames');
      if (exames !== null) {
        setExamesEntries(JSON.parse(exames));
      }
    } catch (error) {
      console.error('Erro ao carregar exames:', error);
    }
  };

  const saveExames = async (exames) => {
    try {
      await AsyncStorage.setItem('exames', JSON.stringify(exames));
    } catch (error) {
      console.error('Erro ao salvar exames:', error);
    }
  };

  useEffect(() => {
    loadExames();
  }, []);

  const handleAddExame = async () => {
    const updatedExames = [
      ...examesEntries,
      { id: Date.now().toString(), ...newExame }
    ];
    setExamesEntries(updatedExames);
    saveExames(updatedExames);
    setNewExame({ descricao: '', date: '', time: '', imagem: null });
    setModalVisible(false);
  };

  const handleDeleteExame = (id) => {
    const updatedExames = examesEntries.filter(entry => entry.id !== id);
    setExamesEntries(updatedExames);
    saveExames(updatedExames);
    setSelectedExame(null);
  };

  const handleOpenCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Por favor, conceda permissão para acessar a câmera');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setNewExame({ ...newExame, imagem: result.uri });
    }
  };

  const handleOpenGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setNewExame({ ...newExame, imagem: result.uri });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => setSelectedExame(item)}>
      <Text style={styles.itemText}>{item.descricao}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/back.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>Exames Realizados</Text>
      <FlatList
        data={examesEntries}
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
            <Text style={styles.modalTitle}>Adicionar Exame</Text>
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={newExame.descricao}
              onChangeText={(text) => setNewExame({ ...newExame, descricao: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Data"
              value={newExame.date}
              onChangeText={(text) => setNewExame({ ...newExame, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Hora"
              value={newExame.time}
              onChangeText={(text) => setNewExame({ ...newExame, time: text })}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleOpenGallery}>
                <Text style={styles.buttonText}>Selecionar da Galeria</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleOpenCamera}>
                <Text style={styles.buttonText}>Tirar Foto</Text>
              </TouchableOpacity>
            </View>
            {newExame.imagem && (
              <Image source={{ uri: newExame.imagem }} style={styles.previewImage} />
            )}
            <Button title="Adicionar" onPress={handleAddExame} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={!!selectedExame}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedExame(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes do Exame</Text>
            {selectedExame && (
              <>
                <Text>Descrição: {selectedExame.descricao}</Text>
                <Text>Data: {selectedExame.date}</Text>
                <Text>Hora: {selectedExame.time}</Text>
                {selectedExame.imagem && (
                  <Image source={{ uri: selectedExame.imagem }} style={styles.previewImage} />
                )}
                <View style={styles.modalButtons}>
                  <Button title="Excluir" onPress={() => handleDeleteExame(selectedExame.id)} />
                  <Button title="Fechar" onPress={() => setSelectedExame(null)} />
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
    marginBottom: 10,
  },
  modalButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61A186',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});

