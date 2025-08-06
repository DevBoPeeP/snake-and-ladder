import "./index.css";
import { useState } from "react";
import Board from "./components/Board";
import PlayerSetup from "./components/PlayerSetup";
import React from "react";
import RulesModal from "./components/Rules";

function App(): React.JSX.Element {
  const [players, setPlayers] = useState<string[]>([]);
  const [showRules, setShowRules] = useState(true);

  const handlePlayClick = () => {
    setShowRules(false);
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
            <PlayerSetup onPlayersReady={setPlayers} />
          </div>
        </div>
      )}
      {players.length >= 2 && <Board players={players} />}
    </main>
  );
}

export default App;
