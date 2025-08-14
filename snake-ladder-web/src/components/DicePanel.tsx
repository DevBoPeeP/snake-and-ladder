import React from "react";
import Dice from "./Dice";

interface DicePanelProps {
  players: string[];
  currentPlayerIndex: number;
  onPlayerTurn?: (diceValue: number) => void;
  disabled?: boolean;
  playerState?: { name: string; diceValue: number }[];
}

const DicePanel = ({
  players,
  currentPlayerIndex,
  onPlayerTurn,
  playerState,
}: DicePanelProps): React.JSX.Element => {
  const currentPlayer = players[currentPlayerIndex] || "Player";
  const currentPlayerState = playerState?.[currentPlayerIndex] || {
    name: currentPlayer,
    diceValue: 0,
  };

  return (
    <div id="diceCont">
      <p id="tog"> {currentPlayer} Played:</p>
      <p id="dice">{currentPlayerState.diceValue || 0}</p>
      <Dice
        diceValue={currentPlayerState.diceValue}
        nextPlayerName={
          players[(currentPlayerIndex + 1) % players.length] || "Player"
        }
        onRoll={() => {
          if (onPlayerTurn) {
            onPlayerTurn(0); // Value will come from backend
          }
        }}
      />
    </div>
  );
};

export default DicePanel;
