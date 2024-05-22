import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de login aqui (opcional)
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Acesse</Text>
      <Text style={styles.subtitle}>com e-mail e senha para entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.rememberContainer}>
        <Text style={styles.rememberText}>Lembrar minha senha</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Senha')}>
          <Text style={styles.forgotText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.createAccountText}>Não tem conta? Criar uma conta</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>ou continue com</Text>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('./assets/images/google.png')} style={styles.socialButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('./assets/images/facebook.png')} style={styles.socialButtonImage} />
        </TouchableOpacity>
      </View>

      <Text style={styles.versionText}>versão 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 50
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#61A186',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7D7D7D',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberText: {
    marginRight: 'auto',
    color: '#7D7D7D'
  },
  forgotText: {
    color: '#5E9A81',
  },
  button: {
    height: 50,
    backgroundColor: '#5E9A81',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createAccountText: {
    fontSize: 16,
    color: '#5E9A81',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 25
  },
  orText: {
    fontSize: 16,
    color: '#7D7D7D',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 25
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    // backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  socialButtonImage: {
    width: 50,
    height: 50,
    // resizeMode: 'contain',
  },
  versionText: {
    fontSize: 12,
    color: '#7D7D7D',
    textAlign: 'center',
    marginTop:120
  },
});
