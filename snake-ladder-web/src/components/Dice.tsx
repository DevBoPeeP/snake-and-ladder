import React, { useState } from "react";

const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

interface DiceProps {
  onRoll: () => void; // No need to send value — backend decides
  diceValue: number;

  currentPlayerName: string;
}

const Dice = ({
  onRoll,
  diceValue = 0,
  currentPlayerName,
}: DiceProps): React.JSX.Element => {
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);

    setTimeout(() => {
      setRolling(false);
      onRoll(); // Just signal parent
    }, 500);
  };

  return (
    <div style={{ display: "grid", gap: "0.5rem", placeItems: "center" }}>
      <div
        className={`dice${rolling ? " rolling" : ""}`}
        style={{ color: "black", fontSize: "2.5rem" }}
      >
        {diceFaces[diceValue - 1] || diceFaces[0]}
      </div>
      <p
        style={{
          padding: "0.5rem",
          marginTop: "0.5rem",
          fontSize: "1.5rem",
          color: "white",
        }}
      >
        {currentPlayerName}'s Turn:
      </p>
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
};

export default Dice;
