import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import App from './components/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>  {/* Wrap the app with HashRouter */}
      <CssBaseline />
      <App />
    </BrowserRouter>
  </StrictMode>,
);

