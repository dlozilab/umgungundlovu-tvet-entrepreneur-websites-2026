import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/index';
import { restoreSession } from './store/slices/authSlice';
import { loadSite } from './features/siteSlice';
import { hydrateDemo } from './store/slices/siteSlice';
import { demoBusiness, demoServices, demoMedia } from './data/demoContent';
import './styles/index.css';

// TEMPORARY — bypasses Firebase so the UI renders with no project setup.
// Swap back to the commented-out block below once you're ready to test
// against real Firestore data again.
store.dispatch(hydrateDemo({ business: demoBusiness, services: demoServices, media: demoMedia }));

// import { restoreSession } from './store/slices/authSlice';
// import { loadSite } from './store/slices/siteSlice';
const BUSINESS_ID = import.meta.env.VITE_BUSINESS_ID || 'demo';
store.dispatch(restoreSession());
store.dispatch(loadSite(BUSINESS_ID));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);