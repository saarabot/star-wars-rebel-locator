import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/gugi';
import '@fontsource/oxanium';
import '@fontsource/oxanium/500.css';
import '@fontsource/orbitron/700.css';
import App from './App.tsx';
import './index.css';

import { store } from '@/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
