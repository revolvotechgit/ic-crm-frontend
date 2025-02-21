import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import Spinner from './views/spinner/Spinner';
import './_mockApis';
import './utils/i18n';
import { AuthProvider } from './guards/jwt/JwtContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Suspense fallback={<Spinner />}>
          <App />
        </Suspense>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
