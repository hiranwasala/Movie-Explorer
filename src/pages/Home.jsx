import React from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import ThemeToggle from '../components/ThemeToggle';
import PopularMoviesCarousel from '../components/PopularMoviesCarousel';

const Home = ({ toggleTheme, darkMode }) => {
  const { movies, trending, loading, error, loadMore, page, totalPages, popular } = useMovieContext();

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Movie Explorer
        </Typography>

      </Box>

      {popular.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <PopularMoviesCarousel movies={popular} />
        </Box>
      )}

      <Typography variant="h5" sx={{ mb: 2 }}>
        Search your movie
      </Typography>
      <SearchBar />

      {error && <Typography color="error">{error}</Typography>}

      {movies.length > 0 ? (
        <>
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Search Results
          </Typography>
          <Grid container spacing={2}>
            {movies.map(movie => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          {page < totalPages && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </Box>
          )}
        </>
      ) : (
        <>
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Trending Movies
          </Typography>
          <Grid container spacing={2}>
            {trending.map(movie => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Home;