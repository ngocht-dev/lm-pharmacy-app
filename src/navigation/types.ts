import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// Auth Stack Param List
export type AuthParamList = {
  LoginScreen: undefined;
};

// Dashboard Tab Param List
export type DashboardTabParamList = {
  HomeScreen: undefined;
  OrdersScreen: undefined;
  AccountScreen: undefined;
};

// Root Stack Param List
export type RootStackParamList = {
  Dashboard: NavigatorScreenParams<DashboardTabParamList>;
} & AuthParamList;

// Screen Props Types
export type RootScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

// Global Navigation Types
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
