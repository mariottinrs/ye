import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function AfericoesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aferições</Text>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Pressão arterial mede a força do sangue nas artérias, glicemia monitora os níveis de açúcar no sangue, e IMC avalia se o peso está adequado à altura.
          Manter a pressão arterial, glicemia e IMC atualizados ajuda a prevenir doenças cardíacas, diabetes e obesidade.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PressaoArterial')}>
          <Image source={require('../assets/images/pressao.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Pressão Arterial</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Glicemia')}>
          <Image source={require('../assets/images/glicemia.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Glicemia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CalculoIMC')}>
          <Image source={require('../assets/images/imc.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>IMC</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.warningContainer}>
        <Image source={require('../assets/images/caution.png')} style={styles.warningIcon} />
        <Text style={styles.warningText}>
        Manter controle sobre a pressão arterial, glicemia e IMC é crucial para a saúde geral. Esses índices estão diretamente ligados a doenças cardiovasculares, diabetes e peso saudável. Controlar esses fatores não apenas previne complicações graves, mas também promove uma melhor qualidade de vida e bem-estar. É essencial monitorá-los regularmente e adotar hábitos saudáveis para garantir uma vida longa e saudável.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 50, 
    borderTopColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#61A186',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  description: {
    marginBottom: 20,
    marginTop: 30,
    padding: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#61A186',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningContainer: {
    alignItems: 'center',
    backgroundColor: '#fff3f3',
    padding: 15,
    borderRadius: 5,
    borderColor: '#f5c6cb',
    borderWidth: 1,
    marginTop: 30,
  },
  warningIcon: {
    width: 24,
    height: 24,
    marginBottom: 10,
  },
  warningText: {
    color: '#721c24',
    fontSize: 14,
    textAlign: 'center',
  },
});
