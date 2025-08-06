import React from "react";
import Dice from "./Dice";

interface DicePanelProps {
  players: string[];
  currentPlayerIndex: number;
  onPlayerTurn?: () => void;
}

const DicePanel = ({
  players,
  currentPlayerIndex,
  onPlayerTurn,
}: DicePanelProps): React.JSX.Element => {
  const currentPlayer = players[currentPlayerIndex] || "Player";

  return (
    <div id="diceCont">
      <p id="tog"> {currentPlayer} Turn:</p>
      <p id="dice">0</p>
      <Dice
        onRoll={(value) => {
          const diceElement = document.getElementById("dice");
          if (diceElement) {
            diceElement.innerText = value.toString();
          }
          // Call the callback to switch to next player after roll
          if (onPlayerTurn) {
            onPlayerTurn();
          }
        }}
      />
    </div>
  );
};

export default DicePanel;
