import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';

export default function CalculoIMC({ navigation }) {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');

  const calcularIMC = () => {
    if (!altura || !peso) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const alturaM = parseFloat(altura) / 100;
    const pesoKg = parseFloat(peso);
    const imcCalculado = pesoKg / (alturaM * alturaM);
    setImc(imcCalculado.toFixed(1));

    let classificacaoIMC = '';
    if (imcCalculado < 18.5) {
      classificacaoIMC = 'Abaixo do peso';
    } else if (imcCalculado >= 18.5 && imcCalculado < 24.9) {
      classificacaoIMC = 'Peso normal';
    } else if (imcCalculado >= 25 && imcCalculado < 29.9) {
      classificacaoIMC = 'Sobrepeso';
    } else {
      classificacaoIMC = 'Obesidade';
    }
    setClassificacao(classificacaoIMC);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'←'}</Text>
        </TouchableOpacity>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>

      <Text style={styles.label}>Altura (cm):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />
      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      <TouchableOpacity style={styles.button} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>
      {imc && (
        <View style={styles.result}>
          <Text style={styles.resultText}>IMC Calculado: {imc}</Text>
          <Text style={styles.resultText}>Classificação: {classificacao}</Text>
        </View>
      )}
      <View style={styles.warning}>
        <Text style={styles.warningText}>
          Um índice de Massa Corporal (IMC) alto pode representar um risco significativo para sua saúde...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#61A186',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#61A186',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  warning: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
  },
  warningText: {
    color: '#d32f2f',
    fontSize: 14,
  },
});
