import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';

import AccountScreen from '@/modules/dashboard/screens/AccountScreen';
import HomeScreen from '@/modules/dashboard/screens/HomeScreens';
import OrdersScreen from '@/modules/dashboard/screens/OrdersScreen';
import ROUTES from './routes';
import { DashboardTabParamList } from './types';

const Tab = createBottomTabNavigator<DashboardTabParamList>();

const BottomTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === ROUTES.DASHBOARD.HOME) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === ROUTES.DASHBOARD.ORDERS) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === ROUTES.DASHBOARD.ACCOUNT) {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: colors.neutral3,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: 12,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={ROUTES.DASHBOARD.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: t('navigation.home'),
        }}
      />
      <Tab.Screen
        name={ROUTES.DASHBOARD.ORDERS}
        component={OrdersScreen}
        options={{
          tabBarLabel: t('navigation.orders'),
        }}
      />
      <Tab.Screen
        name={ROUTES.DASHBOARD.ACCOUNT}
        component={AccountScreen}
        options={{
          tabBarLabel: t('navigation.account'),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
