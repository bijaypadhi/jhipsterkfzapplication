import { AnyAction, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import sharedReducers from 'app/shared/reducers';
import errorMiddleware from './error-middleware';
import notificationMiddleware from './notification-middleware';
import loggerMiddleware from './logger-middleware';

// Persist configuration
const persistConfig = {
  key: 'root', // Key for persisted state
  storage,
  whitelist: ['authentication'], // Specify which slices of state to persist
};
const rootReducer = combineReducers(sharedReducers);
// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.config', 'payload.request', 'error', 'meta.arg'],
      },
    }).concat(errorMiddleware, notificationMiddleware, loadingBarMiddleware(), loggerMiddleware),
});

// Create the persistor
const persistor = persistStore(store);

const getStore = () => ({ store, persistor }); // Return both store and persistor

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, AnyAction>;

export { store, persistor }; // Export both store and persistor
export default getStore;
