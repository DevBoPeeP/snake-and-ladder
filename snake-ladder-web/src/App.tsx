import "./index.css";
import React, { useState } from "react";
import Board from "./components/Board";
import PlayerSetup from "./components/PlayerSetup";
import RulesModal from "./components/Rules";
import { createGame } from "./services/api";

function App(): React.JSX.Element {
  const [players, setPlayers] = useState<string[]>([]);
  const [showRules, setShowRules] = useState(true);
  const [gameId, setGameId] = useState<number | null>(null);
  const [gameState, setGameState] = useState<any>(null);

  const handlePlayClick = () => {
    setShowRules(false);
  };

  const handlePlayersReady = async (playerNames: string[]) => {
    try {
      const game = await createGame(playerNames);
      setGameId(game.gameId);
      setGameState(game);
      setPlayers(playerNames);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  return (
    <main
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        color: "white",
        margin: "5rem",
      }}
    >
      <h1>Snakes and Ladders</h1>
      {showRules && (
        <div className="modal-overlay">
          <div className="modal-content">
            <RulesModal onPlay={handlePlayClick} />
          </div>
        </div>
      )}
      {!showRules && players.length < 1 && (
        <div className="modal-overlay">
          <div className="modal-content">
            <PlayerSetup onPlayersReady={handlePlayersReady} />
          </div>
        </div>
      )}
      {players.length >= 1 && gameId && (
        <Board players={players} gameId={gameId} gameState={gameState} />
      )}
    </main>
  );
}

export default App;
