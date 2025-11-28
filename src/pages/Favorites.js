import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieList from '../components/MovieList';
import './Favorites.css';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites">
      <div className="favorites-header">
        <h1>Favorite Movies</h1>
        <p>Total movies: {favorites.length}</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>You don't have any favorite movies yet</p>
          <p>Add movies to favorites to see them here</p>
        </div>
      ) : (
        <MovieList movies={favorites} loading={false} error={null} />
      )}
    </div>
  );
};

export default Favorites;
