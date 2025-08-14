import React, { useState } from "react";

const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

interface DiceProps {
  onRoll: (value: number) => void;
  diceValue: number;
  nextPlayerName: string;
}
const Dice = ({
  onRoll,
  diceValue = 0,
  nextPlayerName,
}: DiceProps): React.JSX.Element => {
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
      onRoll(0); // We don't need the value here anymore, backend will handle it
    }, 500);
  };

  return (
    <div style={{ display: "grid", gap: "0.5rem", placeItems: "center" }}>
      <div
        className={`dice${rolling ? " rolling" : ""}`}
        style={{ color: "black" }}
      >
        {diceFaces[diceValue - 1] || "⚀"} {/* Show the value from backend */}
      </div>
      <p style={{ fontSize: "1.5rem", color: "White" }}>
        {nextPlayerName} 's Turn:
      </p>
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
};
export default Dice;
