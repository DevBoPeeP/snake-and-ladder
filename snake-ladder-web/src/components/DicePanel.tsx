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
      <p id="tog"> {currentPlayer} Turn:</p>
      <p id="dice">{currentPlayerState.diceValue}</p>
      <Dice
        diceValue={currentPlayerState.diceValue}
        onRoll={(value) => {
          // const diceElement = document.getElementById("dice");
          // if (diceElement) {
          //   diceElement.innerText = value.toString();
          // }
          // Call the callback to switch to next player after roll
          if (onPlayerTurn) {
            onPlayerTurn(value);
          }
        }}
      />
      <div></div>
    </div>
  );
};

export default DicePanel;
