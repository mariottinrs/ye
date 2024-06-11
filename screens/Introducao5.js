// Introducao5.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export default function Introducao5({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/afericoesintro.png')} style={styles.image} />
      <View style={styles.textBox}>
        <Text style={styles.title}>Aferições</Text>
        <Text style={styles.subtitle}>
        "YeGestaoSaude oferece um recurso essencial para o acompanhamento das suas aferições diárias. Com a capacidade de armazenar e monitorar dados como pressão arterial, glicemia, peso e outros, o aplicativo simplifica a gestão da sua saúde. Acesso fácil às informações de saúde permite uma compreensão mais clara das tendências ao longo do tempo, incentivando hábitos saudáveis e fornecendo dados valiosos para consultas médicas e acompanhamento personalizado."
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
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
    justifyContent: 'center',
    borderTopWidth: 50, 
    borderTopColor: 'transparent',  
  },
  image: {
    width: '80%',  
    height: '50%',  
    resizeMode: 'contain',
    alignSelf: 'center',  
    marginBottom: 400,
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
