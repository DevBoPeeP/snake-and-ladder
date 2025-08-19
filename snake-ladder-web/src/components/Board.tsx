import React, { useState, useEffect } from "react";
import DicePanel from "./DicePanel";
import { makeMove } from "../services/api";
import type { Player } from "../types/player";

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
    // const x = row * 60;
    const y = -(row * tileHeight) - correction;
    // const y = col * 60;

    return { x, y };
  };
  const handlePlayerTurn = async () => {
    try {
      // Get current player ID from game state
      const currentPlayerId = currentGameState.players[currentPlayerIndex].id;

      // Make move API call (backend rolls dice and updates game)
      const moveResponse = await makeMove(gameId, currentPlayerId);

      console.log("Move response:", moveResponse);

      // Store the rolled dice value so DicePanel/Dice can display it
      setCurrentGameState((prev: any) => ({
        ...prev,
        players: prev.players.map((p: Player, i: number) =>
          i === currentPlayerIndex
            ? {
                ...p,
                diceValue: moveResponse.diceRoll,
                position: moveResponse.newPosition,
              }
            : p
        ),
      }));

      // Update player positions on the board UI
      updatePlayerPositions(currentGameState);

      // Move to next player if game isn't won
      if (!moveResponse.gameWon) {
        setCurrentPlayerIndex(
          (prevIndex) => (prevIndex + 1) % currentGameState.players.length
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
        if (player.position === 0) {
          playerElement.style.left = `-10%`;
        } else {
          playerElement.style.left = `0%`;
          const { x, y } = getPositionCoordinates(player.position);
          playerElement.style.transform = `translate(${x}px, ${y}px)`;
        }
      }
    });
  };

  useEffect(() => {
    if (currentGameState) {
      updatePlayerPositions(currentGameState);
    }
  }, [currentGameState]);

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
      <div className="cont">
        {tiles}
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
      <DicePanel
        players={players}
        currentPlayerIndex={currentPlayerIndex}
        onPlayerTurn={handlePlayerTurn}
        playerState={currentGameState}
      />
    </div>
  );
};

export default Board;
