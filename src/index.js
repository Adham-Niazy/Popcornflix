import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './components/App';

const theme = createTheme({});
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
);

