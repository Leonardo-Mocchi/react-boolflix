import { useGlobalContext } from "../contexts/GlobalContext";

export default function SearchBar() {
    const { query, setQuery, handleSearch } = useGlobalContext();

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Cerca un film..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
                Cerca
            </button>
        </div>
    )
}