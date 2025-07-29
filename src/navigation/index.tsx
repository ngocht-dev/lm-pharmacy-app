import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';

import LoginScreen from '@/modules/auth/screens/LoginScreen';
import ROUTES from './routes';

// Simple HomeScreen component
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.AUTH.LOGIN} component={LoginScreen} />
        <Stack.Screen name={ROUTES.DASHBOARD.HOME} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
