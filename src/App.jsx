import { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [genreMap, setGenreMap] = useState({});
  const [error, setError] = useState(null);

  const handleSearch = () => {
    const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

    if (!query) {
      setError("Please enter a search term.");
      return;
    }

    fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=it-IT`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setMovies(data.results || []);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setMovies([]);
      });
  };

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=it-IT`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const genres = data.genres.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {});
        setGenreMap(genres);
      })
      .catch((err) => {
        console.error("Failed to fetch genres:", err.message);
      });
  }, []);

  return (
    <div>
      <h1>BoolFlix</h1>
      <div>
        <input
          type="text"
          placeholder="Cerca un film..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Cerca</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      <ul>
        {movies.map((movie) => (
          <li key={movie.id} style={{ listStyle: "none" }}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
                  : "https://placehold.co/780x439?text=No+Image"
              }
              alt={movie.title}
            />
            <h2 id="title">{movie.title}</h2>
            <p>Titolo Originale: {movie.original_title}</p>
            <p>Lingua: {movie.original_language}</p>
            <p>Voto: {movie.vote_average}</p>
            <p>Generi: {movie.genre_ids.map((id) => genreMap[id] || "Unknown").join(", ")}</p>
            <p>Trama: {movie.overview}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;