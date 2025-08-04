const ROUTES = {
  AUTH: {
    LOGIN: 'LoginScreen',
  },
  DASHBOARD: {
    HOME: 'HomeScreen',
    ORDERS: 'OrdersScreen',
    ACCOUNT: 'AccountScreen',
    MAIN: 'Dashboard',
  },
  MY_ORDERS: 'MyOrdersScreen',
  PRODUCTS: {
    LIST: 'ProductScreen',
  },
  PROFILE: {
    MAIN: 'ProfileScreen',
  },
} as const;

export default ROUTES;
