import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import movieReducer from '../../slices/movieSlice';
import DetailedPage from '../../components/DetailedPage';
import { StoreType } from '../../store';

const mockMovies = [
  {
    id: 1,
    title: 'Movie 1',
    poster_path: '/path1.jpg',
    overview: 'Overview of Movie 1',
    release_date: '2024-01-01',
  },
  {
    id: 2,
    title: 'Movie 2',
    poster_path: '/path2.jpg',
    overview: 'Overview of Movie 2',
    release_date: '2024-02-01',
  },
];

describe('DetailedPage Component', () => {
  let store: StoreType;

  beforeEach(() => {
    store = configureStore({
      reducer: { movies: movieReducer },
      preloadedState: {
        movies: {
          movies: mockMovies,
          loading: false,
          error: null,
          totalPages: 1,
          currentPage: 1,
          query: '',
        },
      },
    });
  });

  test('renders movie details based on route params', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies/1']}>
          <Routes>
            <Route path="/movies/:id" element={<DetailedPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const [title, overview] = screen.getAllByText(/movie 1/i);
    expect(title).toBeInTheDocument();
    expect(overview).toBeInTheDocument();
    expect(screen.getByAltText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });

  test('shows "Movie not found" if movie does not exist', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies/999']}>
          <Routes>
            <Route path="/movies/:id" element={<DetailedPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Movie not found')).toBeInTheDocument();
    });
  });
});
