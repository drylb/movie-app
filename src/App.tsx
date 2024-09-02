import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MovieList from './components/MovieList';
import DetailedPage from './components/DetailedPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movies/:id" element={<DetailedPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
