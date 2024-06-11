// App.js

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);
// import { firebase } from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';

// if (!firebase.apps.length) {
//   firebase.initializeApp({
//   });
// }

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
