import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = ({ toggleTheme, darkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        {/* Logo/Brand */}
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          MovieExplorer
        </Typography>

        {/* Navigation Links - Desktop */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/" 
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/favorites" 
              startIcon={<FavoriteIcon />}
            >
              Favorites
            </Button>
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        )}

        {/* Theme Toggle */}
        <IconButton 
          color="inherit" 
          onClick={toggleTheme}
          sx={{ ml: 2 }}
        >
          {darkMode ? (
            <span role="img" aria-label="light-mode">☀️</span>
          ) : (
            <span role="img" aria-label="dark-mode">🌙</span>
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;