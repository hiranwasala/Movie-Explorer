import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMovieContext } from '../context/MovieContext';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { search } = useMovieContext();

  const handleSearch = (e) => {
    e.preventDefault();
    search(searchTerm);
  };

  return (
    <form onSubmit={handleSearch}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchBar;