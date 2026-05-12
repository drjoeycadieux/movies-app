import React, { useState } from 'react';
import * as Apollo from '@apollo/client';
import './App.css';

// Extract hooks from the Apollo namespace to avoid Vite import errors
const { useQuery, useMutation, gql } = Apollo;

// 1. Define the Query
const GET_MOVIES = gql`
  query GetMovies {
    allMovies {
      id
      title
      watched
    }
  }
`;

// 2. Define the Mutation
const ADD_MOVIE = gql`
  mutation AddMovie($title: String!) {
    addMovie(title: $title) {
      id
      title
    }
  }
`;

function App() {
  const [movieTitle, setMovieTitle] = useState('');
  
  // Use the hooks
  const { loading, error, data, refetch } = useQuery(GET_MOVIES);
  const [addMovie] = useMutation(ADD_MOVIE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!movieTitle.trim()) return;

    try {
      await addMovie({ variables: { title: movieTitle } });
      setMovieTitle('');
      refetch(); // Refresh the list
    } catch (err) {
      console.error("Mutation error:", err);
    }
  };

  if (loading) return <div className="container"><h1>Loading Watchlist...</h1></div>;
  if (error) return <div className="container"><h1>Error connecting to API :(</h1></div>;

  return (
    <div className="container">
      <h1>🎬 My Movies</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Enter movie title..."
        />
        <button type="submit">Add Movie</button>
      </form>

      <ul>
        {data && data.allMovies.map((movie) => (
          <li key={movie.id}>
            <span>{movie.title}</span>
            <span className={`watched-badge watched-${movie.watched}`}>
              {movie.watched ? '✅' : '⏳'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;