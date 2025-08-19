import React, { useEffect } from "react";
import Dice from "./Dice";

interface DicePanelProps {
  players: string[];
  currentPlayerIndex: number;
  onPlayerTurn?: (diceValue: number) => void;
  disabled?: boolean;
  playerState?: any;
}

const DicePanel = ({
  players,
  currentPlayerIndex,
  onPlayerTurn,
  playerState,
}: DicePanelProps): React.JSX.Element => {
  const currentPlayer = players[currentPlayerIndex] || "Player";
  const previousPlayerIndex =
    (currentPlayerIndex - 1 + players.length) % players.length;
  const previousPlayer = players[previousPlayerIndex] || "Player";

  // Get current player's state directly using currentPlayerIndex
  const currentPlayerState = playerState?.players?.[currentPlayerIndex] || {
    name: currentPlayer,
    diceValue: null, // null means no dice rolled yet
    color: "gray",
    position: 0,
  };

  // Get previous player's state for display
  const previousPlayerState = playerState?.players?.[previousPlayerIndex] || {
    diceValue: null,
  };

  // Determine what dice value to show - use the same source for both display and dice face
  const getDisplayDiceValue = () => {
    // If it's the very first turn of the game, show nothing
    if (currentPlayerIndex === 0 && !previousPlayerState.diceValue) {
      return null;
    }
    // Show the previous player's dice roll
    return previousPlayerState.diceValue;
  };

  const displayDiceValue = getDisplayDiceValue();
  const diceDisplayValue = displayDiceValue; // Use same value for dice face

  useEffect(() => {
    console.log("Object passed: ", playerState);
    console.log("Current Player State: ", currentPlayerState);
    console.log("Previous Player State: ", previousPlayerState);
    console.log("Display Dice Value: ", displayDiceValue);
    console.log("Dice Display Value: ", diceDisplayValue);
  }, [
    playerState,
    currentPlayerState,
    previousPlayerState,
    displayDiceValue,
    diceDisplayValue,
  ]);

  return (
    <div id="diceCont">
      <p id="tog">{previousPlayer} Played:</p>
      <p id="dice">{displayDiceValue ? displayDiceValue : ""}</p>
      <Dice
        diceValue={diceDisplayValue} // Use the same value as the text display
        currentPlayerName={currentPlayer}
        onRoll={() => {
          if (onPlayerTurn) {
            onPlayerTurn(0); // Value will come from backend
          }
        }}
      />

      <div className="playerStatus">
        <p className="playerStatusTitle">Player Positions:</p>
        {players.map((player, index) => {
          const playerData = playerState?.players?.[index];
          return (
            <table
              key={index}
              style={{ marginTop: "20px" }}
              className="playerInfo"
            >
              <tbody>
                <tr>
                  <td className="playerName">{player}: </td>
                  <td className="playerColor">
                    {playerData?.color || "Unknown"}
                  </td>
                  <td className="playerPosition">
                    {playerData?.position || 0}
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
};

export default DicePanel;
