// No HomeScreen
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  const handleBackPress = () => {
    Alert.alert(
      "Confirmar Saída",
      "Você deseja sair do Aplicativo?",
      [
        {
          text: "Voltar",
          onPress: () => console.log("Voltar Pressionado"),
          style: "cancel"
        },
        {
          text: "Confirmar",
          onPress: () => navigation.navigate('Login')
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={handleBackPress}>
          <Text style={styles.menuText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.username}>Bem Vindo</Text>
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
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('Medicamentos')}>
            <Image source={require('../assets/images/medicamentos.png')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Medicamentos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('Afericoes')}>
            <Image source={require('../assets/images/afericoes.png')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Aferições</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('ExamesRealizados')}>
            <Image source={require('../assets/images/exames.png')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Exames</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.warningContainer}>
        <Image source={require('../assets/images/lightbulb.png')} style={styles.warningIcon} />
        <Text style={styles.warningText}>
          Agende consultas regularmente, gerencie seus medicamentos, monitore indicadores de saúde e acompanhe os resultados de exames. Ao manter esses aspectos sob controle, você está investindo no seu bem-estar e prevenindo complicações futuras. Priorize sua saúde, consulte seu médico regularmente e siga suas orientações para uma vida mais saudável e equilibrada.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopWidth: 50,
    borderTopColor: '#61A186',
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
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '45%',
    height: 140,
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  warningContainer: {
    alignItems: 'center',
    backgroundColor: '#fff3f3',
    padding: 15,
    borderRadius: 5,
    borderColor: '#f5c6cb',
    borderWidth: 1,
    marginTop: 0,
    maxWidth: '90%',
    alignSelf: 'center',
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
