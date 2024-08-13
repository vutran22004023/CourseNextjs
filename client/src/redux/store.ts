'use client'
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userReducer from './Slides/userSide';
import timeReducer from './Slides/timeVideoSide';
import searchReducer from './Slides/searchSide';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  timesVideo: timeReducer,
  searchs: searchReducer,
  // Add other reducers as needed
});

// Configure persist options
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['timesVideo','searchs'], // Blacklist 'user' reducer from being persisted (if needed)
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store instance
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })// Add checkAuthMiddleware
});

// Create persistor
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
