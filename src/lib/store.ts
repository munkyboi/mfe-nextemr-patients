import { configureStore } from '@reduxjs/toolkit';
import { patientsApi } from './api/patients.api';
import { queueApi } from './api/queue.api';
import { physiciansApi } from './api/physicians.api';
import { referenceApi } from './api/reference.api';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [patientsApi.reducerPath]: patientsApi.reducer,
      [queueApi.reducerPath]: queueApi.reducer,
      [physiciansApi.reducerPath]: physiciansApi.reducer,
      [referenceApi.reducerPath]: referenceApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        patientsApi.middleware,
        queueApi.middleware,
        physiciansApi.middleware,
        referenceApi.middleware
      )
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
