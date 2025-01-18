import React, { Suspense } from 'react';
import { AuthProvider } from 'src/guards/jwt/JwtContext';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import Spinner from './views/spinner/Spinner';
import './_mockApis';
import './utils/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Suspense>
  </Provider>,
);
