import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import './Header.css';

const Header = () => {
  const { favorites } = useFavorites();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Movie Catalog</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link favorites-link">
            Favorites
            {favorites.length > 0 && (
              <span className="favorites-count">{favorites.length}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
