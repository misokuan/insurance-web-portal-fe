import { configureStore } from '@reduxjs/toolkit';

import { api } from '../app/api/apiSlice'
import { usersSlice } from '@/app/users/usersSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      users: usersSlice.reducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(api.middleware)
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']