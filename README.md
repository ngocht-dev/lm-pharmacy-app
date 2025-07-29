# LM Pharmacy App

A React Native/Expo application for pharmacy management.

## ESLint Configuration

This project uses a comprehensive ESLint configuration optimized for React Native and Expo development.

### Features

- **TypeScript Support**: Full TypeScript linting with `@typescript-eslint`
- **React Native Rules**: Specific rules for React Native development
- **Prettier Integration**: Automatic code formatting with Prettier
- **React Hooks**: Proper hooks linting with `eslint-plugin-react-hooks`
- **Modern React**: Configured for React 17+ (no need for React imports in JSX)

### Available Scripts

```bash
# Run ESLint with Expo's configuration
npm run lint

# Run ESLint directly with auto-fix
npm run lint:fix

# Run ESLint to check for issues (no auto-fix)
npm run lint:check
```

### Configuration Details

The ESLint configuration includes:

- **React Native specific rules**: Warns about inline styles, unused styles, and platform-specific components
- **TypeScript strict mode**: Enforces type safety while allowing flexibility for development
- **Prettier formatting**: Ensures consistent code style across the project
- **React Hooks rules**: Prevents common hooks mistakes
- **Asset imports**: Allows `require()` for static assets (images, fonts, etc.)

### Key Rules

- `react/react-in-jsx-scope`: Disabled (not needed in React 17+)
- `@typescript-eslint/no-require-imports`: Disabled (allows asset imports)
- `react-native/no-inline-styles`: Warning (encourages StyleSheet usage)
- `@typescript-eslint/no-explicit-any`: Warning (encourages proper typing)

### Prettier Configuration

The project includes a `.prettierrc` file with the following settings:

- Single quotes
- Semicolons enabled
- 80 character line width
- 2 space indentation

## Development Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
