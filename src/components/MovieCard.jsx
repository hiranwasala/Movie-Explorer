import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  IconButton,
  Tooltip,
  Box
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

const MovieCard = ({ movie, onRemove, showRemoveButton = false }) => {
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useMovieContext();
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(movie.id);
      if (onRemove) onRemove();
    } else {
      addFavorite(movie);
    }
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeFavorite(movie.id);
    if (onRemove) onRemove();
  };

  // Round the rating to 1 decimal place
  const roundedRating = Number(movie.vote_average).toFixed(1);

  return (
    <Card 
      sx={{ 
        width: 250,
        height: 400,
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative', // For absolute positioning of the favorite icon
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6
        },
        cursor: 'pointer',
        m: 1
      }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <CardMedia
        component="img"
        height="250"
        image={movie.poster_path ? 
          `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
          '/no-poster.jpg'}
        alt={movie.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date && movie.release_date.split('-')[0]} •{' '}
          <StarIcon sx={{ color: 'yellow', fontSize: '1rem', verticalAlign: 'middle' }} />{' '}
          Rating: {roundedRating}
        </Typography>
      </CardContent>
      <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
        {showRemoveButton ? (
          <Tooltip title="Remove from favorites">
            <IconButton aria-label="remove from favorites" onClick={handleRemoveClick}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
              {isFavorite ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Card>
  );
};

export default MovieCard;