import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../slices/movieSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;
export default store;
