import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Chip, Grid, Paper, CircularProgress, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getMovieDetails } from '../services/ApiService';
import YouTube from 'react-youtube';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default'
      }}
    >
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Typography color="error">{error}</Typography>
    </Box>
  );

  if (!movie) return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Typography>Movie not found</Typography>
    </Box>
  );

  const trailer = movie.videos?.results?.find(vid => vid.type === 'Trailer');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        p: 4,
        position: 'relative',
      }}
    >
     
      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            color: 'text.primary',
            
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Box sx={{ maxWidth: 1200, width: '100%' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                color: 'text.primary',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                '&::after': {
                  content: '"*"',
                  color: 'text.primary',
                  marginLeft: '4px',
                },
              }}
            >
              {movie.title}
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: 'text.secondary' }}
            >
              {movie.release_date} • {movie.runtime} mins • Rating: {movie.vote_average}
            </Typography>
            <Box sx={{ my: 2 }}>
              {movie.genres?.map(genre => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{
                    mr: 1,
                    mb: 1,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    borderRadius: '16px',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                />
              ))}
            </Box>
            <Typography
              variant="body1"
              paragraph
              sx={{ color: 'text.primary', lineHeight: 1.6 }}
            >
              {movie.overview}
            </Typography>
            {trailer && (
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: 'text.primary', textTransform: 'uppercase' }}
                >
                  Trailer
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    pb: '56.25%',
                    height: 0,
                    overflow: 'hidden',
                    borderRadius: '8px',
                  }}
                >
                  <YouTube
                    videoId={trailer.key}
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: { autoplay: 0 },
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MovieDetails;
