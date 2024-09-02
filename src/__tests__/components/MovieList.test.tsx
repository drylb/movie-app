import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import movieReducer, { fetchMovies } from '../../slices/movieSlice';
import MovieList from '../../components/MovieList';
import { StoreType } from '../../store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const mock = new MockAdapter(axios);

describe('MovieList Component', () => {
  let store: StoreType;

  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  beforeEach(() => {
    store = configureStore({ reducer: { movies: movieReducer } });
  });

  afterEach(() => {
    mock.reset();
  });

  test('renders initial state', () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<MovieList />} />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/nothing here.../i)).toBeInTheDocument();
  });

  test('renders error state', async () => {
    mock.onGet('https://api.themoviedb.org/3/search/movie').reply(500);

    await store.dispatch(fetchMovies({ query: 'test', page: 1 }));

    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<MovieList />} />
          </Routes>
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/failed to fetch movies/i)).toBeInTheDocument();
  });

  test('renders movies when fetched successfully', async () => {
    mock.onGet('https://api.themoviedb.org/3/search/movie').reply(200, {
      results: [
        { id: 1, title: 'Movie 1', poster_path: '/path1.jpg' },
        { id: 2, title: 'Movie 2', poster_path: '/path2.jpg' },
        { id: 3, title: 'Movie 3', poster_path: '/path3.jpg' },
        { id: 4, title: 'Movie 4', poster_path: '/path4.jpg' },
      ],
      total_pages: 5,
    });

    await store.dispatch(fetchMovies({ query: 'test', page: 1 }));

    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<MovieList />} />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Movie 3')).toBeInTheDocument();
    expect(screen.getByText('Movie 4')).toBeInTheDocument();
  });
});
