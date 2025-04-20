import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="DOMAIN_KEY"
      clientId="CLIENT_ID"
      authorizationParams={{
        redirect_uri: window.location.origin + '/callback'
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
