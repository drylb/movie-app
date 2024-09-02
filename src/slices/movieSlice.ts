import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import IMovie from '../interfaces/IMovie';
import { ThunkActionType, ThunkArgType, MoviesStateType, ActionType } from '../types/types';

const initialState: MoviesStateType = {
  movies: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  query: '',
};

const API_URL = 'https://api.themoviedb.org/3/search/movie';

export const fetchMovies = createAsyncThunk<ThunkActionType, ThunkArgType>(
  'movies/fetchMovies',
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          query,
          language: 'en-US',
          page,
        },
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      });

      return {
        movies: response.data.results.map((movie: IMovie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          overview: movie.overview,
        })),
        totalPages: response.data.total_pages,
        currentPage: page,
      };
    } catch (error) {
      return rejectWithValue(`Failed to fetch movies. ERROR: ${error}`);
    }
  },
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setQuery: (state, action: ActionType) => {
      state.query = action.payload;
      state.currentPage = 1;
    },
    clearMovies: (state) => {
      state.movies = [];
      state.error = null;
      state.totalPages = 0;
      state.currentPage = 1;
      state.query = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { setQuery, clearMovies } = movieSlice.actions;

export default movieSlice.reducer;
