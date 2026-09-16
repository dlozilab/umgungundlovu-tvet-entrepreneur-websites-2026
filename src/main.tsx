import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import { restoreSession } from './store/slices/authSlice';
import { loadSite } from './store/slices/siteSlice';
import './styles/index.css'

const BUSINESS_ID = import.meta.env.VITE_BUSINESS_ID || 'demo';

store.dispatch(restoreSession());
store.dispatch(loadSite(BUSINESS_ID));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);