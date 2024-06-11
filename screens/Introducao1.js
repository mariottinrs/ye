import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export default function IntroScreen1({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logointro.png')} style={styles.image} />
      <View style={styles.textBox}>
        <Text style={styles.title}>YE Gestão de Saúde</Text>
        <Text style={styles.subtitle}>
        "YeGestaoSaude é um aplicativo essencial para o gerenciamento da saúde diária. Armazena informações vitais, como consultas médicas, resultados de exames, histórico de medicamentos e registros precisos de aferições. Com sua interface intuitiva e recursos abrangentes, torna-se uma ferramenta indispensável para promover um estilo de vida saudável e facilitar o acompanhamento médico constante, garantindo o bem-estar e a qualidade de vida."
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Intro2')}>
          <Image source={require('../assets/images/next.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#61A186',
    borderTopWidth: 50, 
    borderTopColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
  },
  textBox: {
    width: '100%',
    height: height * 0.4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: 20,
    color: '#4A7568',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#4A7568',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  buttonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

