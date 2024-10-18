import { configureStore } from '@reduxjs/toolkit';
//import { setupListeners } from '@reduxjs/toolkit/query';

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

//setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
