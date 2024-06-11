import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export default function Introducao4({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/examesintro.png')} style={styles.image} />
      <View style={styles.textBox}>
        <Text style={styles.title}>Exames</Text>
        <Text style={styles.subtitle}>
        Armazenar informações sobre exames médicos oferece uma série de vantagens. Primeiramente, proporciona um registro detalhado do histórico de saúde, permitindo acompanhar a evolução ao longo do tempo. Isso facilita a comunicação com os profissionais de saúde e ajuda na tomada de decisões médicas informadas. Além disso, o armazenamento digital dos resultados dos exames simplifica o acesso e compartilhamento dessas informações quando necessário, promovendo uma abordagem colaborativa ao cuidado da saúde. Essa centralização dos dados também pode contribuir para a detecção precoce de problemas de saúde e a implementação de medidas preventivas.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Intro5')}>
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
    color: '#61A186',
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
