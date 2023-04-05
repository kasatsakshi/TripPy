import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userRedux';
const LOGOUT_USER = 'user/logoutUser';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Combine all reducers.
const appReducer = combineReducers({
  user: userReducer,
  state: (state = {}) => state,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === LOGOUT_USER) {
    storage.removeItem('persist:root');
    state = undefined;
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
