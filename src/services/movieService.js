import axios from 'axios';

// TMDB API configuration
const API_KEY = 'a81fc5a4a44c2310d838aab61935e7c2';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US', // English language
  },
});

// Get popular movies
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw new Error('Failed to fetch popular movies');
  }
};

// Search movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: { 
        query,
        page,
        include_adult: false
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies');
  }
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error('Failed to fetch movie details');
  }
};

// Get movie images
export const getMovieImages = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/images`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie images:', error);
    throw new Error('Failed to fetch movie images');
  }
};
