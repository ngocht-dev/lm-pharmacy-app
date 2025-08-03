import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useAuthStatus } from '@/modules/auth/hooks';
import LoginScreen from '@/modules/auth/screens/LoginScreen';
import ProductScreen from '@/modules/product/screens/ProductScreen';
import ProfileScreen from '@/modules/profile/screens/ProfileScreens';
import { navigationRef } from '@/utils/navigation';
import BottomTabNavigator from './BottomTabNavigator';
import ROUTES from './routes';
import { RootStackParamList } from './types';

export const Stack = createStackNavigator<RootStackParamList>();

function RootNavigation() {
  const { isAuthenticated } = useAuthStatus();

  const getInitialRouteName = () => {
    console.log('khanh isAuthenticated', isAuthenticated);
    return isAuthenticated ? 'Dashboard' : ROUTES.AUTH.LOGIN;
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={getInitialRouteName()}
      >
        <Stack.Screen name={ROUTES.AUTH.LOGIN} component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={BottomTabNavigator} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
