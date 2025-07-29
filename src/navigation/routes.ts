const ROUTES = {
  COMMON: {
    START_UP: 'StartUpScreen',
    WELCOME: 'WelcomeScreen',
    SEARCH: 'SearchScreen',
    WEBVIEW: 'WebViewScreen',
    LANDING: 'LandingScreen',
  },
  AUTH: {
    SIGN_IN: 'SignInScreen',
    SIGN_UP: 'SignUpScreen',
    FORGOT_PASSWORD: 'ForgotPasswordScreen',
    CHANGE_PASSWORD_SCREEN: 'ChangePasswordScreen',
  },
  ONBOARDING: {
    SELECT_CATEGORIES: 'SelectCategoriesScreen',
    CONNECT_SOCIALS: 'ConnectSocialsScreen',
    SELECT_BRANDS: 'SelectBrandsScreen',
  },
  DASHBOARD: {
    HOME: 'HomeScreen',
    EXPLORE: 'ExploreScreen',
  },
} as const;

export default ROUTES;
