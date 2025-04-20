import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './layout/Layout';

function App() {
  return (
    <LanguageProvider>
      <Layout />
    </LanguageProvider>
  );
}

export default App;