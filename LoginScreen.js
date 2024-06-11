import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, BackHandler, Modal } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    // Lógica de login aqui (opcional)
    navigation.navigate('Home');
  };

  const handleExit = () => {
    BackHandler.exitApp();
  };

  const handleConfirmExit = () => {
    setModalVisible(true);
  };

  const handleCancelExit = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.exitButton} onPress={handleConfirmExit}>
        <Image source={require('./assets/images/exit.png')} style={styles.exitIcon} />
      </TouchableOpacity>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancelExit}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você realmente quer sair do aplicativo?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleExit}>
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCancelExit}>
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 50, 
    borderTopColor: 'transparent',
  },
  exitButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  exitIcon: {
    width: 24,
    height: 24,
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
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  socialButtonImage: {
    width: 50,
    height: 50,
  },
  versionText: {
    fontSize: 12,
    color: '#7D7D7D',
    textAlign: 'center',
    marginTop: 120
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#5E9A81',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
