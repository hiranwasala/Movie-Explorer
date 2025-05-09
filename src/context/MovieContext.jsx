import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchTrendingMovies, searchMovies, fetchPopularMovies } from '../services/ApiService';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]); // New state for popular movies
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch initial data (trending and popular movies)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch both trending and popular movies in parallel
        const [trendingData, popularData] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMovies()
        ]);
        
        setTrending(trendingData);
        setPopular(popularData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Search movies function
  const search = async (newQuery, newPage = 1) => {
    if (!newQuery.trim()) return;
    
    try {
      setLoading(true);
      setQuery(newQuery);
      setPage(newPage);
      
      const { results, total_pages } = await searchMovies(newQuery, newPage);
      
      if (newPage === 1) {
        setMovies(results);
      } else {
        setMovies(prev => [...prev, ...results]);
      }
      
      setTotalPages(total_pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load more results for pagination
  const loadMore = () => {
    if (page < totalPages) {
      search(query, page + 1);
    }
  };

  // Add movie to favorites
  const addFavorite = (movie) => {
    if (!favorites.some(fav => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  // Remove movie from favorites
  const removeFavorite = (id) => {
    setFavorites(favorites.filter(movie => movie.id !== id));
  };

  // Check if a movie is in favorites
  const isFavorite = (id) => {
    return favorites.some(movie => movie.id === id);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        trending,
        popular, // Include popular movies in context
        loading,
        error,
        query,
        page,
        totalPages,
        favorites,
        isFavorite,
        search,
        loadMore,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);