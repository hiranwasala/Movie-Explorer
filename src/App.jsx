import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MovieProvider } from './context/MovieContext';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MovieDetails from './components/MovieDetails';
import NavBar from './components/NavBar';
import { Box } from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieProvider>
        <Router>
          <NavBar toggleTheme={toggleTheme} darkMode={darkMode} />
          <Box component="main" sx={{ p: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </Box>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;