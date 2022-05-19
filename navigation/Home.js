import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '../contains'
import { HomeScreen } from '../screens'

const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor  : COLORS.white,
        headerStyle : {
          backgroundColor : COLORS.main,
        },
        headerTitle : 'ZENDVN CHAT APP',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default HomeStackScreen;