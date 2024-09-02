import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setQuery, clearMovies } from '../slices/movieSlice';
import { useDebounce } from '../hooks/useDebounce';
import { AppDispatch } from '../store';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== '') {
      dispatch(setQuery(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);
  const handleClearResults = (): void => {
    dispatch(clearMovies());
    setSearchTerm('');
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleClearResults}>Clear Search Results</button>
    </>
  );
};

export default SearchBar;
