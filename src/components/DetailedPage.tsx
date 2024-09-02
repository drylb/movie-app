import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store';
import IMovie from '../interfaces/IMovie';
import Footer from './Footer';
import Header from './Header';

const DetailedPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movies } = useSelector((state: RootState) => state.movies);
  const movie = movies.find((movie: IMovie) => movie.id === Number(id));

  if (!movie) return <div className="movie-not-found">Movie not found</div>;

  return (
    <>
      <Header />
      <div className="detailed-page-container">
        <h1>{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
        <p className="overview">
          <strong>Overview:</strong> {movie.overview}
        </p>
        <p className="release-date">
          <strong>Release Date:</strong> {movie.release_date}
        </p>
      </div>
      <Footer />
    </>
  );
};

export default DetailedPage;
