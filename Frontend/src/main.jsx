import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import './components/i18n.jsx'; // Import the i18n configuration

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <App />
    </>
  </StrictMode>,
);
