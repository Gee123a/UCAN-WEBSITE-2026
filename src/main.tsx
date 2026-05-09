import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Use environment variable
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

console.log("Google Client ID being used:", clientId);

if (!clientId || clientId === "YOUR_GOOGLE_CLIENT_ID_HERE") {
  console.error("ERROR: Google Client ID is missing or using placeholder! Check your .env file.");
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId || ""}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);