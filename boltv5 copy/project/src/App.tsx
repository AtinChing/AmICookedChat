import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Landing from './components/Landing/Landing';
import ProtectedRoute from './components/ProtectedRoute';
import MainPanel from './components/MainPanel/MainPanel';
import Callback from './components/Callback';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/callback" element={<Callback />} />
            <Route
              path="/main"
              element={
                <ProtectedRoute>
                  <Layout>
                    <MainPanel />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
