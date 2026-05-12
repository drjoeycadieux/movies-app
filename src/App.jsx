import React, { useState } from 'react';
import * as Apollo from '@apollo/client';

// We grab the hooks from the main Apollo object manually
const { useQuery, useMutation, gql } = Apollo;

import './App.css';

const GET_MOVIES = gql`
  query GetMovies {
    allMovies {
      id
      title
      watched
    }
  }
`;

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
  const { loading, error, data, refetch } = useQuery(GET_MOVIES);
  const [addMovie] = useMutation(ADD_MOVIE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!movieTitle) return;

    try {
      await addMovie({ variables: { title: movieTitle } });
      setMovieTitle('');
      refetch();
    } catch (err) {
      console.error('Mutation error:', err);
    }
  };

  if (loading)
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  if (error)
    return (
      <div className="container">
        <h1>Error connecting to API</h1>
      </div>
    );

  return (
    <div className="container">
      <h1>🎬 My Movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Add a new movie..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {data &&
          data.allMovies.map((movie) => (
            <li key={movie.id}>
              <span>{movie.title}</span>
              <span className={`watched-badge watched-${movie.watched}`}>
                {movie.watched ? '✅ Watched' : '⏳ To Watch'}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
