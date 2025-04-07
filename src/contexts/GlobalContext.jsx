import React, { createContext, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [genreMap, setGenreMap] = useState({});
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false); // Moved from MainContent
    const [loading, setLoading] = useState(false); // Moved from MainContent

    const API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY;

    const handleSearch = () => {
        if (!query) {
            setError("Please enter a search term.");
            return;
        }

        const movieApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=it-IT&query=${encodeURIComponent(query)}`;
        const tvApiUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=it-IT&query=${encodeURIComponent(query)}`;

        setLoading(true); // Set loading to true
        setHasSearched(true); // Set hasSearched to true

        Promise.all([fetch(movieApiUrl), fetch(tvApiUrl)])
            .then(([movieResponse, tvResponse]) => {
                if (!movieResponse.ok || !tvResponse.ok) {
                    throw new Error(`Error: ${movieResponse.status} or ${tvResponse.status}`);
                }

                return Promise.all([movieResponse.json(), tvResponse.json()]);
            })
            .then(([movieData, tvData]) => {
                const normalizedMovies = movieData.results.map((movie) => ({
                    id: movie.id,
                    title: movie.title,
                    original_title: movie.original_title,
                    release_date: movie.release_date,
                    poster_path: movie.poster_path,
                    vote_average: movie.vote_average,
                    genre_ids: movie.genre_ids,
                    overview: movie.overview,
                    type: "movie",
                }));

                const normalizedTVShows = tvData.results.map((tv) => ({
                    id: tv.id,
                    title: tv.name,
                    original_title: tv.original_name,
                    release_date: tv.first_air_date,
                    poster_path: tv.poster_path,
                    vote_average: tv.vote_average,
                    genre_ids: tv.genre_ids,
                    overview: tv.overview,
                    type: "tv",
                }));

                const combinedResults = [...normalizedMovies, ...normalizedTVShows];

                setResults(combinedResults);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setResults([]);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after the search is done
            });
    };

    return (
        <GlobalContext.Provider
            value={{
                query,
                setQuery,
                results,
                setResults,
                genreMap,
                setGenreMap,
                error,
                setError,
                handleSearch,
                hasSearched,
                loading,
                FontAwesomeIcon,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);