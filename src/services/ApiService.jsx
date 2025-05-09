import axios from 'axios';

// Access environment variables through import.meta.env
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

// Create configured axios instance
const tmdbAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY
  }
});

export const fetchPopularMovies = async () => {
  try {
    const response = await tmdbAPI.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await tmdbAPI.get('/trending/movie/week');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbAPI.get('/search/movie', {
      params: {
        query,
        page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [], total_pages: 0 };
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await tmdbAPI.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};