import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import { searchMovies, getPopularMovies } from '../services/movieService';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Load popular movies on component mount
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPopularMovies();
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setIsSearchMode(false);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to load popular movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadPopularMovies();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(searchQuery, 1);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setIsSearchMode(true);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to find movies');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = async () => {
    if (currentPage >= totalPages) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      let data;
      
      if (isSearchMode) {
        data = await searchMovies(searchQuery, nextPage);
      } else {
        data = await getPopularMovies(nextPage);
      }

      setMovies(prev => [...prev, ...data.results]);
      setCurrentPage(nextPage);
    } catch (err) {
      setError('Failed to load more movies');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies..."
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
        {isSearchMode && (
          <button onClick={loadPopularMovies} className="show-popular-btn">
            Show Popular
          </button>
        )}
      </div>

      <MovieList movies={movies} loading={loading} error={error} />

      {movies.length > 0 && currentPage < totalPages && !loading && (
        <div className="load-more-container">
          <button onClick={loadMoreMovies} className="load-more-btn">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
