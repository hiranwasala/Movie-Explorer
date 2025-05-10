
# Project Overview

Movie Explorer is a web application that allows users to discover, search, and explore movies using data from The Movie Database (TMDb) API. The app features a responsive design with light/dark mode toggle, movie carousels, detailed movie pages, and favorites functionality.

# Features

Movie Discovery: Browse trending and popular movies
Search Functionality: Find movies by title
Detailed Movie Pages: View comprehensive movie information including trailers
Favorites System: Save and manage favorite movies
Responsive Design: Works on all device sizes
Theme Toggle: Switch between light and dark modes

# Project Setup

Prerequisites
Node.js (v14 or higher)
npm or yarn
TMDb API key (free account required)

# Installation

1. Clone the repository:

   git clone https://github.com/hiranwasala/Movie-Explrer.git
   cd movie-explorer

2. Install dependencies:

    npm install
      or
    yarn install
   
4. Create a .env file in the root directory:

    REACT_APP_TMDB_API_KEY=your_api_key_here

5. Start the development server:

   npm start
      or
   yarn start

6. Open http://localhost:3000 in your browser.


   # API Usage

The app uses the TMDb API (v3) for all movie data. Key API endpoints used:

  1. Trending movies: /trending/movie/week

  2. Popular movies: /movie/popular

  3. Movie search: /search/movie

  4. Movie details: /movie/{movie_id}
