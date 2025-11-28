import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { getMovieDetails } from '../services/movieService';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie information');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="error-container">
        <p>{error || 'Movie not found'}</p>
        <button onClick={() => navigate('/')} className="back-btn">
          Back to Home
        </button>
      </div>
    );
  }

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  return (
    <div className="movie-detail">
      {backdropUrl && (
        <div className="movie-backdrop">
          <img src={backdropUrl} alt={movie.title} />
        </div>
      )}
      
      <div className="movie-detail-content">
        <div className="movie-detail-poster">
          <img src={posterUrl} alt={movie.title} />
        </div>
        
        <div className="movie-detail-info">
          <h1 className="movie-detail-title">{movie.title}</h1>
          
          <div className="movie-detail-meta">
            <span className="movie-rating">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </span>
            <span className="movie-release-date">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </span>
            <span className="movie-runtime">
              {movie.runtime ? `${movie.runtime} мин` : 'N/A'}
            </span>
          </div>

          <div className="movie-genres">
            {movie.genres && movie.genres.map(genre => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="movie-overview">
          <h3>Overview</h3>
          <p>{movie.overview || 'Description not available'}</p>
          </div>

          <div className="movie-actions">
            <button 
              className={`favorite-btn ${isFavorite(movie.id) ? 'favorited' : ''}`}
              onClick={handleFavoriteClick}
            >
              {isFavorite(movie.id) ? '❤️' : '🤍'}
              {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            
            <button onClick={() => navigate('/')} className="back-btn">
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
