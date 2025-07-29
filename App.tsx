import React from 'react';
import MainApp from './src';
import translation from './src/assets/translation';

translation.init();

function App(): React.JSX.Element {
  return <MainApp />;
}

export default App;
