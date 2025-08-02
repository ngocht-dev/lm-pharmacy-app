import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useAuthStatus } from '@/modules/auth/hooks';
import LoginScreen from '@/modules/auth/screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import ROUTES from './routes';
import { RootStackParamList } from './types';

export const Stack = createStackNavigator<RootStackParamList>();

function RootNavigation() {
  const { isAuthenticated } = useAuthStatus();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Dashboard" component={BottomTabNavigator} />
        ) : (
          <Stack.Screen name={ROUTES.AUTH.LOGIN} component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
