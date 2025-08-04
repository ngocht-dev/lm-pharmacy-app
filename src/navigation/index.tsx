import { useAuthStore } from '@/app/appStore';
import LoginScreen from '@/modules/auth/screens/LoginScreen';
import MyOrdersScreen from '@/modules/orders/screens/MyOrdersScreen';
import OrdersScreen from '@/modules/orders/screens/OrdersScreen';
import ProductScreen from '@/modules/product/screens/ProductScreen';
import ProfileScreen from '@/modules/profile/screens/ProfileScreens';
import { navigationRef } from '@/utils/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const getInitialRouteName = () => {
  const { isAuthenticated } = useAuthStore.getState();
  return isAuthenticated ? 'Dashboard' : 'LoginScreen';
};

const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={getInitialRouteName()}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={BottomTabNavigator} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="MyOrdersScreen" component={MyOrdersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
