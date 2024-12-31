import React, { useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import AdminLayout from "app/components/Layout/AdminLayout";
import GamesIframe from 'app/modules/games/GamesIframe';
import CanvasModal from 'app/modules/canvas/CanvasModal';
import './style.scss'
const Games = () => {
    const [modalType, setModalType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [startGame, setStartGame] = useState(false);

    // Handling th start game
    const openGameHandler = () => {
        setStartGame(!startGame);
    };

    // Handling the close the game
    const closeGameHandler = () => {
        setStartGame(false);
    };
    return (
        <>
            <AdminLayout>
                {startGame ? <GamesIframe isOpen={startGame} onClose={closeGameHandler} isLoading={isLoading} /> :
                    <Box className="book-container">
                        <Box className="games-container">
                            <Box className="game-card-container">
                                <Box className="game-img-container" onClick={openGameHandler}>
                                    <Image src="content/images/chess.jpeg" className="game-img" alt="chess" />
                                </Box>
                                <Box>
                                    <Text className="game-text">Chess</Text>
                                </Box>
                            </Box>
                            <Box className="game-card-container">
                                <Box className="game-img-container" onClick={openGameHandler}>
                                    <Image src="content/images/ludo-game.png" className="game-img" alt="ludo" />
                                </Box>
                                <Box>
                                    <Text className="game-text">Ludo</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>}
            </AdminLayout>
        </>
    )
}
export default Games;