import React from "react";

interface RulesModalProps {
  onPlay: () => void;
}

const RulesModal = ({ onPlay }: RulesModalProps): React.JSX.Element => {
  return (
    <div style={{ display: "grid", gap: "1rem", color: "black" }}>
      <h2>How To Play</h2>
      <ul style={{ fontSize: "0.9rem" }}>
        <li>
          Each player rolls the dice and moves their token forward by the number
          shown.
        </li>
        <li>
          If a player lands on the bottom of a ladder, they climb to the top.
        </li>
        <li>
          If a player lands on the head of a snake, they slide to its tail.
        </li>
        <li>The first player to reach square 100 wins.</li>
      </ul>
      <button
        onClick={onPlay}
        style={{
          padding: "0.5rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        PLAY
      </button>
    </div>
  );
};

export default RulesModal;
