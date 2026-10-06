import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/index';
import { restoreSession } from './store/slices/authSlice';
import { loadSite, hydrateDemo } from './store/slices/siteSlice';
import { demoBusiness, demoServices, demoMedia } from './data/demoContent';
import './styles/index.css';

const BUSINESS_ID = import.meta.env.VITE_BUSINESS_ID || 'demo';
if (import.meta.env.DEV) {
  store.dispatch(hydrateDemo({ business: demoBusiness, services: demoServices, media: demoMedia }));
} else {
  store.dispatch(loadSite(BUSINESS_ID));
}
store.dispatch(restoreSession());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);