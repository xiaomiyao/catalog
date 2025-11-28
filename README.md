# Movie Catalog App

A React application for browsing movies with favorites functionality.

## Features

- 🎬 Browse popular movies
- 🔍 Search movies by title
- ❤️ Add/remove movies to/from favorites
- 📱 Responsive design
- 💾 Favorites saved in localStorage
- 🔄 Lazy loading with "Load More" button
- 🎯 Detailed movie pages with full information

## Setup Instructions

### 1. Install Dependencies

```bash
cd movie-catalog
npm install
```

### 2. Get TMDB API Key

1. Go to [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Create an account
3. Go to Settings > API
4. Request an API key
5. Copy your API key

### 3. Configure API Key

Open `src/services/movieService.js` and replace `'your_api_key_here'` with your actual API key:

```javascript
const API_KEY = "your_actual_api_key_here";
```

### 4. Start the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (irreversible)

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.js       # Navigation header
│   ├── MovieCard.js    # Individual movie card
│   └── MovieList.js    # Grid of movie cards
├── context/            # React Context
│   └── FavoritesContext.js  # Favorites state management
├── pages/              # Page components
│   ├── Home.js         # Main page with search and movie list
│   ├── MovieDetail.js  # Individual movie details
│   └── Favorites.js    # Favorites page
├── services/           # API services
│   └── movieService.js # TMDB API integration
└── App.js              # Main app component
```

## Technologies Used

- React 18
- React Router DOM
- Axios
- TMDB API
- CSS3 with modern features
- LocalStorage for persistence

## Features Implementation

### Main Page

- Header with "Каталог фильмов" title
- Search input with "Искать" button
- Popular movies displayed on load
- "Load More" button for pagination

### Movie Cards

- Poster image
- Movie title
- Release year
- Rating
- "В избранное" button

### Movie Detail Page

- Full movie information
- Poster and backdrop images
- Description, rating, genres
- Add/remove from favorites

### Favorites Page

- List of all favorited movies
- Counter in header
- Persistent storage

### Advanced Features

- LocalStorage persistence
- Lazy loading
- "No movies found" message
- Responsive design
- Loading states
- Error handling

## API Endpoints Used

- `/movie/popular` - Get popular movies
- `/search/movie` - Search movies
- `/movie/{id}` - Get movie details
- `/movie/{id}/images` - Get movie images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
