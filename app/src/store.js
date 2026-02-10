import { configureStore } from '@reduxjs/toolkit';
import { blogsApi } from './services/blogsApi';
import { careersApi } from './services/careersApi';

export const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    [careersApi.reducerPath]: careersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogsApi.middleware, careersApi.middleware),
});
