import React, { createContext, useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [genreMap, setGenreMap] = useState({});
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY;

    // Fetch genres and populate genreMap
    useEffect(() => {
        const genreApiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=it-IT`;

        fetch(genreApiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch genres");
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
                console.error("Error fetching genres:", err);
            });
    }, [API_KEY]);

    const handleSearch = () => {
        if (!query) {
            setError("Please enter a search term.");
            return;
        }

        const movieApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=it-IT&query=${encodeURIComponent(query)}`;
        const tvApiUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=it-IT&query=${encodeURIComponent(query)}`;

        setLoading(true);
        setHasSearched(true);

        Promise.all([fetch(movieApiUrl), fetch(tvApiUrl)])
            .then(([movieResponse, tvResponse]) => {
                if (!movieResponse.ok || !tvResponse.ok) {
                    throw new Error(`Error: ${movieResponse.status} or ${tvResponse.status}`);
                }

                return Promise.all([movieResponse.json(), tvResponse.json()]);
            })
            .then(([movieData, tvData]) => {
                console.log("Movie API Response:", movieData); // Log the full movie response
                console.log("TV API Response:", tvData); // Log the full TV response

                const normalizedMovies = movieData.results.map((movie) => ({
                    id: movie.id,
                    title: movie.title,
                    original_title: movie.original_title,
                    original_language: movie.original_language,
                    origin_country: movie.origin_country,
                    release_date: movie.release_date,
                    poster_path: movie.poster_path,
                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count,
                    genre_ids: movie.genre_ids,
                    overview: movie.overview,
                    type: "movie",
                }));

                const normalizedTVShows = tvData.results.map((tv) => ({
                    id: tv.id,
                    title: tv.name,
                    original_title: tv.original_name,
                    original_language: tv.original_language,
                    origin_country: tv.origin_country,
                    release_date: tv.first_air_date,
                    poster_path: tv.poster_path,
                    vote_average: tv.vote_average,
                    vote_count: tv.vote_count,
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
                setLoading(false);
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