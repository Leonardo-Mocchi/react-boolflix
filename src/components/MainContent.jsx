import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import MovieDisplay from "./MovieDisplay";

function MainContent() {
    const { hasSearched } = useGlobalContext();

    const featuredContent = [
        {
            id: 1,
            title: "Top 10 Film del Momento",
            description: "Scopri i film più popolari di oggi!",
            emoji: "🔥",
        },
        {
            id: 2,
            title: "Serie TV da Non Perdere",
            description: "Le serie TV più amate dagli spettatori.",
            emoji: "📺",
        },
        {
            id: 3,
            title: "Classici del Cinema",
            description: "Rivivi i capolavori che hanno fatto la storia del cinema.",
            emoji: "🎥",
        },
    ];

    return (
        <main>
            {!hasSearched ? (
                <>
                    <div
                        style={{
                            textAlign: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.85)",
                            padding: "50px",
                            borderRadius: "15px",
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
                            maxWidth: "600px",
                            width: "100%",
                        }}
                    >
                        <h1
                            style={{
                                fontSize: "3.5rem",
                                marginBottom: "20px",
                                fontWeight: "bold",
                                textShadow: "2px 2px 5px rgba(255, 0, 0, 0.8)",
                            }}
                        >
                            🎬 Benvenuto su Boolflix!
                        </h1>
                        <p
                            style={{
                                fontSize: "1.4rem",
                                marginBottom: "30px",
                                lineHeight: "1.8",
                                textShadow: "1px 1px 3px rgba(255, 255, 255, 0.5)",
                            }}
                        >
                            Sei nel posto giusto per scoprire il tuo prossimo film o serie TV preferito. <br />
                            Usa la barra di ricerca in alto e lascia che Boolflix faccia la magia! ✨
                        </p>
                        <p
                            style={{
                                fontSize: "1rem",
                                fontStyle: "italic",
                                color: "#ccc",
                                marginTop: "20px",
                            }}
                        >
                            "Il cinema è la scrittura moderna il cui inchiostro è la luce." – Jean Cocteau
                        </p>
                    </div>

                    {/* Featured Content Cards */}
                    <div className="card-container">
                        {featuredContent.map((item) => (
                            <div className="card" key={item.id}>
                                <h2>
                                    {item.emoji} {item.title}
                                </h2>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <MovieDisplay />
            )}
        </main>
    );
}

export default MainContent;