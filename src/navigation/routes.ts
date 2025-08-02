const ROUTES = {
  AUTH: {
    LOGIN: 'LoginScreen',
  },
  DASHBOARD: {
    HOME: 'HomeScreen',
    ORDERS: 'OrdersScreen',
    ACCOUNT: 'AccountScreen',
  },
  PRODUCTS: {
    LIST: 'ProductScreen',
  },
} as const;

export default ROUTES;
