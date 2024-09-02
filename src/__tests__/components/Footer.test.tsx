import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../../slices/movieSlice';
import MoviesList from '../../components/MovieList';
import { StoreType } from '../../store/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

describe('Footer Component', () => {
  let store: StoreType;

  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  beforeEach(() => {
    store = configureStore({ reducer: { movies: movieReducer } });
  });

  test('renders footer initially', () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<MoviesList />} />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/enlabs/i)).toBeInTheDocument();
  });
});
