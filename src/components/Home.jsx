import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import "../styles.css";
import React, { useState, useEffect } from 'react';

  

function Home() {
  const [movies, setMovies] = useState([]);
  
  return (
    <div className="page">
      <SearchBar onResults={setMovies} />

      <div className="grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            imdbID={movie.imdbID}
            poster={movie.Poster}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
