import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import movieReducer, { setQuery } from '../../slices/movieSlice';
import SearchBar from '../../components/SearchBar';
import { StoreType } from '../../store/index';

describe('SearchBar Component', () => {
  let store: StoreType;

  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    store = configureStore({ reducer: { movies: movieReducer } });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('renders input and button', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>,
    );

    expect(screen.getByPlaceholderText('Search for movies...')).toBeInTheDocument();
    expect(screen.getByText('Clear Search Results')).toBeInTheDocument();
  });

  test('dispatches setQuery action on input change', async () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Search for movies...'), {
      target: { value: 'Inception' },
    });

    await waitFor(() => {
      const state = store.getState();
      expect(state.movies.query).toBe('Inception');
    });
  });

  test('dispatches clearMovies action and clears input on button click', async () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>,
    );
    store.dispatch(setQuery('Inception'));
    fireEvent.change(screen.getByPlaceholderText('Search for movies...'), {
      target: { value: 'Inception' },
    });

    fireEvent.click(screen.getByText('Clear Search Results'));

    await waitFor(() => {
      const state = store.getState();
      expect(state.movies.query).toBe('');
    });
  });
});
