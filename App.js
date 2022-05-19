LogBox.ignoreLogs(['Setting a timer']);
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyNavigation from './navigation'

export default function App() {
  return (
    <NavigationContainer>
        <MyNavigation />
    </NavigationContainer>
  )
}

