import { configureStore } from '@reduxjs/toolkit';
import movieReducer, { fetchMovies, clearMovies } from '../../slices/movieSlice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { StoreType } from '../../store/index';

const mock = new MockAdapter(axios);

describe('movieSlice', () => {
  let store: StoreType;

  beforeEach(() => {
    store = configureStore({ reducer: { movies: movieReducer } });
  });

  afterEach(() => {
    mock.reset();
  });

  test('should handle initial state', () => {
    const state = store.getState().movies;
    expect(state).toEqual({
      movies: [],
      loading: false,
      error: null,
      totalPages: 0,
      currentPage: 1,
      query: '',
    });
  });

  test('should fetch movies successfully', async () => {
    mock.onGet('https://api.themoviedb.org/3/search/movie').reply(200, {
      results: [
        { id: 1, title: 'Movie 1', poster_path: '/path1.jpg' },
        { id: 2, title: 'Movie 2', poster_path: '/path2.jpg' },
      ],
      total_pages: 2,
    });

    await store.dispatch(fetchMovies({ query: 'test', page: 1 }));
    const state = store.getState().movies;

    expect(state.movies).toHaveLength(2);
    expect(state.movies[0].title).toBe('Movie 1');
    expect(state.totalPages).toBe(2);
  });

  test('should handle movie fetch failure', async () => {
    mock.onGet('https://api.themoviedb.org/3/search/movie').reply(500);

    await store.dispatch(fetchMovies({ query: 'test', page: 1 }));
    const state = store.getState().movies;

    expect(state.error).toBe(
      'Failed to fetch movies. ERROR: Error: Request failed with status code 500',
    );
    expect(state.loading).toBe(false);
  });

  test('should clear movies', () => {
    store.dispatch(clearMovies());
    const state = store.getState().movies;

    expect(state.movies).toHaveLength(0);
    expect(state.totalPages).toBe(0);
  });
});
