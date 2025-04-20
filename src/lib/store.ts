import { configureStore } from '@reduxjs/toolkit';
import { patientsApi } from './api/patients.api';
import { queueApi } from './api/queue.api';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [patientsApi.reducerPath]: patientsApi.reducer,
      [queueApi.reducerPath]: queueApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(patientsApi.middleware, queueApi.middleware)
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
