import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchTrendingMovies, searchMovies, fetchPopularMovies } from '../services/ApiService';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        
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


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);


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

 
  const loadMore = () => {
    if (page < totalPages) {
      search(query, page + 1);
    }
  };


  const addFavorite = (movie) => {
    if (!favorites.some(fav => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };


  const removeFavorite = (id) => {
    setFavorites(favorites.filter(movie => movie.id !== id));
  };


  const isFavorite = (id) => {
    return favorites.some(movie => movie.id === id);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        trending,
        popular, 
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
