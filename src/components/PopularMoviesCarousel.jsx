import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMovieContext } from '../context/MovieContext';

const PopularMoviesCarousel = ({ movies }) => {
  const { favorites, addFavorite, removeFavorite } = useMovieContext();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: (i) => (
      <Box
        component="span"
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: 'grey.500',
          display: 'inline-block',
          mx: 0.5,
          transition: 'background-color 0.3s ease',
        }}
      />
    ),
    appendDots: dots => (
      <Box
        component="ul"
        sx={{
          margin: 0,
          padding: 0,
          textAlign: 'center',
          '& li': {
            display: 'inline-block',
            '&.slick-active span': {
              bgcolor: 'primary.main', 
            },
            '& button': {
              '&:before': {
                display: 'none',
              },
            },
          },
        }}
      >
        {dots}
      </Box>
    ),
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 2, mt: 4, fontWeight: 'bold' }}>
        Popular Movies
      </Typography>
      <Slider {...settings}>
        {movies.map(movie => {
          const isFavorite = favorites.some(fav => fav.id === movie.id);
          const roundedRating = Number(movie.vote_average).toFixed(1);

          return (
            <Box key={movie.id} sx={{ px: 1 }}>
              <Box
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
                onClick={() => (window.location.href = `/movie/${movie.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    width: '100%',
                    height: '350px',
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                  <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isFavorite) {
                          removeFavorite(movie.id);
                        } else {
                          addFavorite(movie);
                        }
                      }}
                      size="small"
                      sx={{ bgcolor: 'rgba(255, 255, 255, 0.7)', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' } }}
                    >
                      {isFavorite ? (
                        <FavoriteIcon color="error" fontSize="small" />
                      ) : (
                        <FavoriteBorderIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};

export default PopularMoviesCarousel;
