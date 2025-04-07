import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

// Mapping between language codes and country codes
const languageCountryFixes = {
    en: "GB", // English → United Kingdom
    hi: "IN", // Hindi → India
    ko: "KR", // Korean → South Korea
    zh: "CN", // Chinese → China
    ja: "JP", // Japanese → Japan
    ar: "SA", // Arabic → Saudi Arabia
    sv: "SE", // Swedish → Sweden
    da: "DK", // Danish → Denmark
    pl: "PL", // Polish → Poland
    el: "GR", // Greek → Greece
    he: "IL", // Hebrew → Israel
    vi: "VN", // Vietnamese → Vietnam
    ms: "MY", // Malay → Malaysia
    fa: "IR", // Persian → Iran
    ur: "PK", // Urdu → Pakistan
    bn: "BD", // Bengali → Bangladesh
    ta: "LK", // Tamil → Sri Lanka
    te: "IN", // Telugu → India
    kn: "IN", // Kannada → India
    ml: "IN", // Malayalam → India
    si: "LK", // Sinhala → Sri Lanka
    am: "ET", // Amharic → Ethiopia
    sw: "KE", // Swahili → Kenya
    ha: "NG", // Hausa → Nigeria
    yo: "NG", // Yoruba → Nigeria
    ig: "NG", // Igbo → Nigeria
    zu: "ZA", // Zulu → South Africa
    xh: "ZA", // Xhosa → South Africa
    st: "ZA", // Southern Sotho → South Africa
    ts: "ZA", // Tsonga → South Africa
    tn: "BW", // Tswana → Botswana
};

function getFlagEmoji(languageCode) {
    const countryCode = languageCountryFixes[languageCode] || languageCode;
    if (!countryCode || countryCode.length !== 2) return "🏳️";
    return countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt())
        .map((codePoint) => String.fromCodePoint(codePoint))
        .join("");
}

function MainContent() {
    const { query, setQuery, results, genreMap, error, handleSearch } = useGlobalContext();

    return (
        <div>
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
                {results.map((item) => (
                    <li key={item.id} style={{ listStyle: "none" }}>
                        <img
                            src={
                                item.poster_path
                                    ? `https://image.tmdb.org/t/p/w780${item.poster_path}`
                                    : "https://placehold.co/780x439?text=No+Image"
                            }
                            alt={item.title}
                        />
                        <h2 id="title">{item.title}</h2>
                        <p>Tipo: {item.type === "movie" ? "Film" : "Serie TV"}</p>
                        <p>Titolo Originale: {item.original_title}</p>
                        <p>Anno: {item.release_date ? item.release_date.split("-")[0] : "N/A"}</p>
                        <p>
                            Lingua Originale:{" "}
                            {item.original_language
                                ? `${getFlagEmoji(item.original_language)} (${item.original_language})`
                                : "Sconosciuta"}
                        </p>
                        <p>Voto: {item.vote_average}</p>
                        <p>
                            Generi:{" "}
                            {item.genre_ids && item.genre_ids.length > 0
                                ? item.genre_ids.map((id) => genreMap[id] || "Unknown").join(", ")
                                : "N/A"}
                        </p>
                        <p>Trama: {item.overview}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MainContent;