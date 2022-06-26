import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ToggleColorModeProvide from './utils/ToggleColorMode';
import App from './components/App';
import store from './app/store';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ToggleColorModeProvide>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvide>
  </Provider>,
);

