import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './../app/Store';
import AppLayout from './AppLayout';

const Popup = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppLayout />
      </PersistGate>
    </Provider>
  );
};

export default Popup;
