// navigation/StackNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../LoginScreen';
import AfericoesScreen from '../screens/AfericoesScreen';
import ConsultasScreen from '../screens/ConsultasScreen';
import ExamesRealizados from '../screens/ExamesScreen';
import CadastroScreen from '../screens/CadastroScreen';
import SenhaScreen from '../screens/SenhaScreen';
import CalculoIMC from '../screens/CalculoIMC';
import PressaoScreen from '../screens/PressaoScreen';
import GlicemiaScreen from '../screens/GlicemiaScreen';
const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Afericoes" component={AfericoesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Consultas" component={ConsultasScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Exames" component={ExamesRealizados} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Senha" component={SenhaScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CalculoIMC" component={CalculoIMC} options={{ headerShown: false }} />
      <Stack.Screen name="PressaoArterial" component={PressaoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Glicemia" component={GlicemiaScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
