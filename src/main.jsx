import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import Spinner from './views/spinner/Spinner';
import './_mockApis';
import './utils/i18n';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './guards/jwt/JwtContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </Provider>,
);
