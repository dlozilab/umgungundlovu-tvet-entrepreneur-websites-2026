import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/index';
import { restoreSession } from './store/slices/authSlice';
import { loadSite } from './store/slices/siteSlice';
import './styles/index.css';

store.dispatch(restoreSession());
store.dispatch(loadSite(import.meta.env.VITE_BUSINESS_ID || 'demo'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);