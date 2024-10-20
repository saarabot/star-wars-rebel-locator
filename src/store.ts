import { configureStore } from '@reduxjs/toolkit';

import rebelsReducer from '@/features/rebelsSlice';
import locationReducer from '@/features/locationSlice';
import { rebelApi } from '@/services/rebel';

export const store = configureStore({
  reducer: {
    rebels: rebelsReducer,
    location: locationReducer,
    [rebelApi.reducerPath]: rebelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      rebelApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
