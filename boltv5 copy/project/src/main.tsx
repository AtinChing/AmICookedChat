import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="genai-05808952325237127.us.auth0.com"
      clientId="3HpRI94SGTfB2SPAp7rZvgzn1BpOtkuI"
      authorizationParams={{
        redirect_uri: window.location.origin + '/callback'
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
