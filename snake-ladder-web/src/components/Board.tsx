import React, { useState, useEffect } from "react";
import DicePanel from "./DicePanel";
import { makeMove, getGameState } from "../services/api";

// Define the Player type
interface Player {
  id: number;
  name: string;
  color: string;
  position: number;
  diceValue?: number;
}

interface BoardProps {
  players: string[];
  gameId: number;
  gameState: any;
}

const Board = ({
  players,
  gameId,
  gameState,
}: BoardProps): React.JSX.Element => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentGameState, setCurrentGameState] = useState(gameState);

  // Calculate board position for a given square number
  const getPositionCoordinates = (
    position: number,
    correction = 0
  ): { x: number; y: number } => {
    if (position < 1 || position > 100) return { x: 0, y: 0 };

    const boardElement = document.querySelector(".cont") as HTMLElement;
    if (!boardElement) return { x: 0, y: 0 };

    const boardWidth = boardElement.offsetWidth;
    const boardHeight = boardElement.offsetHeight;

    const tileWidth = boardWidth / 10;
    const tileHeight = boardHeight / 10;

    // Convert to zero-based index
    position = position - 1;

    const row = Math.floor(position / 10);
    const col = position % 10;

    // Zig-zag: even rows left→right, odd rows right→left
    const adjustedCol = row % 2 === 0 ? col : 9 - col;

    const x = adjustedCol * tileWidth;
    const y = -(row * tileHeight) - correction;

    return { x, y };
  };
  const handlePlayerTurn = async () => {
    try {
      // Get current player ID from game state
      const currentPlayerId = currentGameState.players[currentPlayerIndex].id;

      // Make move API call (backend rolls dice and updates game)
      const moveResponse = await makeMove(gameId, currentPlayerId);

      // Store the rolled dice value so DicePanel/Dice can display it
      setCurrentGameState((prev: any) => ({
        ...prev,
        players: prev.players.map((p: Player, i: number) =>
          i === currentPlayerIndex
            ? { ...p, diceValue: moveResponse.diceValue }
            : p
        ),
      }));

      // Fetch updated game state from backend
      const updatedGameState = await getGameState(gameId);
      console.log("Updated game state:", updatedGameState);

      // Update full game state
      setCurrentGameState(updatedGameState);

      // Update player positions on the board UI
      updatePlayerPositions(updatedGameState);

      // Move to next player if game isn't won
      if (!moveResponse.gameWon) {
        setCurrentPlayerIndex(
          (prevIndex) => (prevIndex + 1) % updatedGameState.players.length
        );
      }
    } catch (error) {
      console.error("Error making move:", error);
    }
  };

  const updatePlayerPositions = (gameState: any) => {
    // Implement logic to update player positions on the board
    gameState.players.forEach((player: any) => {
      const playerElement = document.getElementById(`player-${player.id}`);
      if (playerElement) {
        playerElement.style.transition = "all 0.5s linear";
        const { x, y } = getPositionCoordinates(player.position);
        playerElement.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
  };

  useEffect(() => {
    if (gameState) {
      updatePlayerPositions(gameState);
    }
  }, [gameState]);

  const tiles = [];
  for (let row = 9; row >= 0; row--) {
    if ((9 - row) % 2 === 0) {
      // Even row from left to right
      for (let col = 1; col <= 10; col++) {
        const num = row * 10 + col;
        tiles.push(<div className="box" key={num} id={`b${num}`}></div>);
      }
    } else {
      // Odd row from right to left
      for (let col = 10; col >= 1; col--) {
        const num = row * 10 + col;
        tiles.push(<div className="box" key={num} id={`b${num}`}></div>);
      }
    }
  }

  return (
    <div className="relative">
      <div className="cont">{tiles}</div>
      <div id="b1">
        {currentGameState?.players?.map((player: any) => (
          <div
            key={player.id}
            id={`player-${player.id}`}
            className="player-token"
            style={{
              backgroundColor: player.color,
            }}
          >
            {player.name.charAt(0).toUpperCase()}
          </div>
        ))}
      </div>
      <img src="/S&L 2.png" alt="Board" className="board-img" />
      <DicePanel
        players={players}
        currentPlayerIndex={currentPlayerIndex}
        onPlayerTurn={handlePlayerTurn}
        playerState={currentGameState.players}
      />
    </div>
  );
};

export default Board;
