import React, { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [genreMap, setGenreMap] = useState({});
    const [error, setError] = useState(null);

    return (
        <GlobalContext.Provider
            value={{
                query,
                setQuery,
                movies,
                setMovies,
                genreMap,
                setGenreMap,
                error,
                setError,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);