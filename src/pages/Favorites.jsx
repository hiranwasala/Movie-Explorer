import React from 'react';
import { Container, Grid, Typography, Box, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import ThemeToggle from '../components/ThemeToggle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Favorites = ({ toggleTheme, darkMode }) => {
  const { favorites, removeFavorite } = useMovieContext();
    const navigate = useNavigate();

  return (
    <Container sx={{ py: 4 }}>

      <Box sx={{ position: 'absolute', top: 86, left: 16 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            color: 'text.primary',
            
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          My Favorite Movies
        </Typography>
    
      </Box>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            You haven't added any favorites yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Search for movies and click the heart icon to add them to your favorites
          </Typography>
          <Button variant="contained" href="/">
            Explore Movies
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map(movie => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard 
                movie={movie} 
                onRemove={() => removeFavorite(movie.id)}
                showRemoveButton
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;