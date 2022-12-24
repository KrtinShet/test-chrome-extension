import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';

import AuthSlice from './Slice/AuthSlice';
import CounterSlice from './Slice/CounterSlice';
import { encrypt } from '../utils';

const rootReducer = combineReducers({
  auth: AuthSlice.reducer,
  counter: CounterSlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: {
      getItem: async (key) => {
        const item = await chrome.storage.session.get(key);
        return item[key];
      },
      setItem: async (key, value) => {
        await chrome.storage.session.set({ [key]: value });
        const dataToStore = {
          auth: {
            ...value.auth,
            password: undefined,
            isLoggedIn: false,
          },
          counter: {
            ...value.counter,
            count: encrypt(value.counter.count, value.auth.password),
          },
        };

        await chrome.storage.local.set({ [key]: dataToStore });
      },
      removeItem: async (key) => {
        await chrome.storage.session.remove(key);
      },
    },
    serialize: false,
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

const persistor = persistStore(store);

export { store, persistor };
