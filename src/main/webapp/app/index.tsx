import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import getStore from 'app/config/store';
import { registerLocale } from 'app/config/translation';
import setupAxiosInterceptors from 'app/config/axios-interceptor';
import { clearAuthentication } from 'app/shared/reducers/authentication';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppComponent from 'app/app';
import { loadIcons } from 'app/config/icon-loader';
import { PersistGate } from 'redux-persist/integration/react';
const {store, persistor} = getStore();
registerLocale(store);

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

loadIcons();

store.subscribe(() => {
  const state = store.getState();
  if (state.authentication && state.authentication.userInfo.userId) {
    localStorage.setItem('userId', state.authentication.userInfo.userId); // Save userId to localStorage
  } else {
    localStorage.removeItem('userId'); // Clean up if userId is not present
  }
});

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

const render = Component =>
  root.render(
    <ErrorBoundary>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <Component />
        </div>
      </PersistGate>
      </Provider>
    </ErrorBoundary>
  );

render(AppComponent);
