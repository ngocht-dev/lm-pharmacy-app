const ROUTES = {
  AUTH: {
    LOGIN: 'LoginScreen',
  },
  DASHBOARD: {
    HOME: 'HomeScreen',
    ORDERS: 'CheckoutScreen',
    ACCOUNT: 'AccountScreen',
  },
  PRODUCTS: {
    LIST: 'ProductScreen',
  },
  PROFILE: {
    MAIN: 'ProfileScreen',
  },
} as const;

export default ROUTES;
