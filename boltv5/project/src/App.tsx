import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Landing from './components/Landing/Landing';
import ProtectedRoute from './components/ProtectedRoute';
import MainPanel from './components/MainPanel/MainPanel';
import Callback from './components/Callback';
import Layout from './components/Layout/Layout';

function App() {
  return (
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
  );
}

export default App;
