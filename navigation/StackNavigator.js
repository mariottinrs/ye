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
import MedicamentosScreen from '../screens/MedicamentosScreen';
import Introducao1 from '../screens/Introducao1';
import Introducao2 from '../screens/Introducao2';
import Introducao3 from '../screens/Introducao3';
import Introducao4 from '../screens/Introducao4'; 
import Introducao5 from '../screens/Introducao5'; 

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Intro1">
      <Stack.Screen name="Intro1" component={Introducao1} options={{ headerShown: false }} />
      <Stack.Screen name="Intro2" component={Introducao2} options={{ headerShown: false }} />
      <Stack.Screen name="Intro3" component={Introducao3} options={{ headerShown: false }} />
      <Stack.Screen name="Intro4" component={Introducao4} options={{ headerShown: false }} />
      <Stack.Screen name="Intro5" component={Introducao5} options={{ headerShown: false }} />
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
      <Stack.Screen name="Medicamentos" component={MedicamentosScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
