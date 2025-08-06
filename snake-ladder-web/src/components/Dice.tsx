import React, { useState } from "react";

const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

interface DiceProps {
  onRoll: (value: number) => void;
}

const Dice = ({ onRoll }: DiceProps): React.JSX.Element => {
  const [diceValue, setDiceValue] = useState(0);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    const roll = Math.floor(Math.random() * 6);
    setTimeout(() => {
      setDiceValue(roll);
      setRolling(false);
      onRoll(roll + 1); // Send value (1-6) to parent for movement
    }, 500);
  };

  return (
    <div style={{ display: "grid", gap: "0.5rem", placeItems: "center" }}>
      <div
        className={`dice${rolling ? " rolling" : ""}`}
        style={{ color: "black" }}
      >
        {diceFaces[diceValue]}
      </div>
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
};

export default Dice;
