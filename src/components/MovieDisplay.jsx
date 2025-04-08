import React, { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

import { faStar } from '@fortawesome/free-solid-svg-icons';

/* used to remap languages for countries that have different initials */
const languageCountryFixes = {
    en: "US", // English → USA
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
    cs: "CZ", // Czech → Czech Republic
};

function getFlagEmoji(languageCode, originCountry) {
    const countryCode = originCountry?.[0] || languageCountryFixes[languageCode] || languageCode;
    if (!countryCode || countryCode.length !== 2) return null;
    return countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt())
        .map((codePoint) => String.fromCodePoint(codePoint))
        .join("");
}


function MovieDisplay() {
    const {
        results,
        genreMap,
        error,
        hasSearched,
        FontAwesomeIcon,
    } = useGlobalContext();

    return (
        <div id="movie_display">
            {/* Show nothing until the search is finalized */}
            {hasSearched && (
                <>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {results.length === 0 ? (
                        <p style={{ color: "gray" }}>Nessun risultato trovato.</p>
                    ) : (
                        <ul className="results-list">
                            {results.map((item) => (
                                <li key={item.id} className="result-item">

                                    {/* cover pic */}
                                    <div className="image-container">
                                        <img
                                            src={
                                                item.poster_path
                                                    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                                                    : "https://placehold.co/342x513?text=Nessuna+Immagine+Trovata"
                                            }
                                            alt={item.title}
                                        />
                                        <div className="details">

                                            {/* title */}
                                            <h2 id="title">{item.title}</h2>

                                            {/* og title */}
                                            {item.original_title !== item.title && (
                                                <p className="fst-italic">{item.original_title}</p>
                                            )}

                                            <p className="d-flex align-items-center m-0">
                                                {/* og language */}
                                                {item.original_language && (
                                                    <>
                                                        {getFlagEmoji(item.original_language, item.origin_country) && (
                                                            <span
                                                                style={{
                                                                    fontSize: "3rem",
                                                                    marginRight: "10px",
                                                                }}
                                                            >
                                                                {getFlagEmoji(item.original_language, item.origin_country)}

                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                                {/* type (movie/series) */}
                                                <strong> {item.type === "movie" ? "Film" : "Serie TV"} </strong>

                                                {/* release year */}
                                                {item.release_date && (
                                                    <span>
                                                        <span>&nbsp;</span>

                                                        del
                                                        <strong> {item.release_date.split("-")[0]}</strong>
                                                    </span>
                                                )}
                                            </p>

                                            {/* rating */}
                                            {item.vote_count > 0 && (
                                                <p>
                                                    {[...Array(5)].map((_, index) => (
                                                        <FontAwesomeIcon
                                                            key={index}
                                                            icon={faStar}
                                                            style={{
                                                                color: index < Math.ceil(item.vote_average / 2) ? "gold" : "gray",
                                                            }}
                                                        />
                                                    ))}
                                                    <span> ({item.vote_count})</span>
                                                </p>
                                            )}

                                            {/* genre */}
                                            {item.genre_ids &&
                                                item.genre_ids
                                                    .map(id => genreMap[id] || "Unknown")
                                                    .filter(genre => genre !== "Unknown").length > 0 && (
                                                    <p>
                                                        {item.genre_ids
                                                            .map(id => genreMap[id] || "Unknown")
                                                            .filter(genre => genre !== "Unknown")
                                                            .join(", ")}
                                                    </p>
                                                )}

                                            {/* plot */}
                                            <p>{item.overview}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}

export default MovieDisplay