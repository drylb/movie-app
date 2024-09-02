# Movie App Documentation

## Overview

The Movie App allows users to search for movies, view detailed information, and navigate through paginated search results. Built with React, Redux, SCSS, React Router, and TypeScript, the app fetches data from an external movie API and provides a user-friendly, mobile-first interface.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Components](#components)
   - [SearchBar](#searchbar)
   - [MoviesList](#movieslist)
   - [DetailedPage](#detailedpage)
   - [Pagination](#pagination)
   - [Header](#header)
   - [Footer](#footer)
4. [State Management](#state-management)
5. [Testing](#testing)


## Features

- Search movies by title.
- Paginate through search results.
- View detailed movie information.
- Handle loading and error states.

## Installation

1. **Clone the Repository:**

  ```
   git clone https://github.com/drylb/movie-app
   cd movie-app
  ```

2. **Install Dependecies:**

  ```
  npm install
  ```
3. **Set up enviroment variables:**
- Use [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)
- Create a .env file in the root of the project and add your API key and API Acces token:
```
REACT_APP_TMDB_API_KEY=you_api_key_here
REACT_APP_TMDB_ACCESS_TOKEN=you_api_access_token_here
```
4. **Start Development Server:**

  ```
  npm start
  ```
## Components

### SearchBar

- Provides a search input and button.
- Updates and clears the search query.

### MoviesList

- Displays a list of movies.

### DetailedPage

- Displays detailed movie information.

### Pagination

- Handles pagination with previous and next buttons.
- Displays current page and total pages.

### Header

- Contains header content.

### Footer

- Contains footer content.

## State Management

### Redux Toolkit

- Manages global state including queries and movie data.

### Actions

- `setQuery(query: string)`: Sets the search query.
- `fetchMovies(payload: { query: string, page: number })`: Fetches movies.
- `clearMovies()`: Clears movie data.

## Testing

- Tests cover component rendering, state management, and pagination.
  
  ```
  npm test
  ```
