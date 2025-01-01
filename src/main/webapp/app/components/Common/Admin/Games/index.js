import React, { useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import AdminLayout from "app/components/Layout/AdminLayout";
import GamesIframe from 'app/modules/games/GamesIframe';
import './style.scss';

const Games = () => {
    const [modalType, setModalType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [requestedSrc, setRequestedSrc] = useState("3000"); // Default to localhost:3000

    // Handling game selection
    const openGameHandler = (game) => {
        setRequestedSrc(game === "chess" ? "4000" : "3000"); // Chess uses localhost:4000, Ludo uses localhost:3000
        setStartGame(true);
    };

    // Handling game modal close
    const closeGameHandler = () => {
        setStartGame(false);
    };

    return (
        <>
            <AdminLayout>
                {startGame ? (
                    <GamesIframe
                        isOpen={startGame}
                        onClose={closeGameHandler}
                        isLoading={isLoading}
                        requestedSrc={requestedSrc} // Pass the selected game's src
                    />
                ) : (
                    <Box className="book-container">
                        <Box className="games-container">
                            {/* Chess Game Card */}
                            <Box className="game-card-container">
                                <Box
                                    className="game-img-container"
                                    onClick={() => openGameHandler("chess")} // Pass "chess" as the game
                                >
                                    <Image
                                        src="content/images/chess.jpeg"
                                        className="game-img"
                                        alt="chess"
                                    />
                                </Box>
                                <Box>
                                    <Text className="game-text">Chess</Text>
                                </Box>
                            </Box>

                            {/* Ludo Game Card */}
                            <Box className="game-card-container">
                                <Box
                                    className="game-img-container"
                                    onClick={() => openGameHandler("ludo")} // Pass "ludo" as the game
                                >
                                    <Image
                                        src="content/images/ludo-game.png"
                                        className="game-img"
                                        alt="ludo"
                                    />
                                </Box>
                                <Box>
                                    <Text className="game-text">Ludo</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
            </AdminLayout>
        </>
    );
};

export default Games;
