import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../slices/movieSlice';
import { AppDispatch, RootState } from '../store';
import { Link } from 'react-router-dom';
import IMovie from '../interfaces/IMovie';
import SearchBar from './SearchBar';
import Header from './Header';
import Pagination from './Pagination';
import Footer from './Footer';

const MoviesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { movies, loading, error, totalPages, currentPage, query } = useSelector(
    (state: RootState) => state.movies,
  );

  const [internalPage, setInternalPage] = useState(1);
  const itemsPerPage = 10;
  const startIdx = (internalPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const displayInternalMovies = movies.slice(startIdx, endIdx);

  useEffect(() => {
    if (query) {
      dispatch(fetchMovies({ query, page: currentPage }));
    }
  }, [query, currentPage, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [displayInternalMovies]);

  const handleNextInternalPage = (): void => {
    if (endIdx < movies.length) {
      setInternalPage(internalPage + 1);
    } else if (currentPage < totalPages) {
      setInternalPage(1);
      dispatch(fetchMovies({ query, page: currentPage + 1 }));
    }
  };

  const handlePreviousInternalPage = (): void => {
    if (internalPage > 1) {
      setInternalPage(internalPage - 1);
    } else if (currentPage > 1) {
      setInternalPage(2);
      dispatch(fetchMovies({ query, page: currentPage - 1 }));
    }
  };

  const internalMoviesLength = displayInternalMovies.length;
  const prevButtonDisabled = currentPage === 1 && internalPage === 1;
  const nextButtonDisabled = currentPage === totalPages && endIdx >= movies.length;

  return (
    <>
      <div className="container">
        <Header />

        <div className="search-bar">
          <SearchBar />
        </div>

        <div className="movie-list-container">
          {loading && <div className="loading">Loading...</div>}
          {error && <div className="error">Failed to fetch: {error}</div>}
          {internalMoviesLength === 0 && !loading && !error && (
            <div className="nothing-here">Nothing here...</div>
          )}
          {!loading && !error && (
            <ul className="movie-list">
              {displayInternalMovies.map((movie: IMovie) => (
                <li className="movie-item" key={movie.id}>
                  <h3>{movie.title}</h3>
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                  )}
                  <Link to={`/movies/${movie.id}`}>Detailed Page</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {internalMoviesLength > 0 && !loading && !error && (
          <div className="pagination">
            <Pagination
              handlePreviousInternalPage={handlePreviousInternalPage}
              handleNextInternalPage={handleNextInternalPage}
              prevButtonDisabled={prevButtonDisabled}
              nextButtonDisabled={nextButtonDisabled}
              totalPages={totalPages}
              internalPage={internalPage}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MoviesList;
