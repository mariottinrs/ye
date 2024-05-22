import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const lastConsulta = {
  consulta: 'Cardiologista',
  date: '20/05/2024',
  time: '10:00',
};

const lastGlicemia = {
  glicemia: '120 mg/dL',
  date: '21/05/2024',
  time: '08:00',
};

const lastPressao = {
  pressao: '120/80 mmHg',
  date: '22/05/2024',
  time: '09:00',
};

export default function HomeScreen({ navigation }) {
  const [lastData, setLastData] = useState({});

  useEffect(() => {

    setLastData({
      consulta: lastConsulta,
      glicemia: lastGlicemia,
      pressao: lastPressao,
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.username}>Murilo Orsi</Text>
          <Text style={styles.subtitle}>
            YE Gestão de Saúde irá te ajudar a melhorar seu controle de exames, aferições e medicamentos
          </Text>
        </View>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.categories}>
        <Text style={styles.categoryTitle}>Categorias</Text>
        <View style={styles.categoryGrid}>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('Consultas')}>
            <Image source={require('../assets/images/consultas.png')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Consultas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}>
            <Image source={require('../assets/images/medicamentos.png')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Medicamentos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('Afericoes')}>
            <Image source={require('../assets/images/afericoes.png')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Aferições</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('Exames')}>
            <Image source={require('../assets/images/exames.png')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Exames</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.otherOptions}>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>
            Última Consulta: {lastData.consulta ? `${lastData.consulta.consulta} em ${lastData.consulta.date} às ${lastData.consulta.time}` : 'Nenhuma consulta registrada'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>
            Último Índice Glicêmico: {lastData.glicemia ? `${lastData.glicemia.glicemia} em ${lastData.glicemia.date} às ${lastData.glicemia.time}` : 'Nenhuma glicemia registrada'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>
            Última Pressão: {lastData.pressao ? `${lastData.pressao.pressao} em ${lastData.pressao.date} às ${lastData.pressao.time}` : 'Nenhuma pressão registrada'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  header: {
    backgroundColor: '#61A186',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  menuText: {
    fontSize: 24,
    color: '#fff',
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  categories: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  otherOptions: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  optionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
  },
});
