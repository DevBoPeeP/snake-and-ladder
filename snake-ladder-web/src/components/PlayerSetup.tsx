import { useState } from "react";

interface Props {
  onPlayersReady: (players: string[]) => void;
}

const PlayerSetup = ({ onPlayersReady }: Props): React.JSX.Element => {
  const [names, setNames] = useState<string[]>(["", ""]);

  const updateName = (index: number, value: string) => {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  };

  const addPlayer = () => {
    if (names.length < 6) setNames([...names, ""]);
  };

  const removePlayer = () => {
    if (names.length > 1) setNames(names.slice(0, -1));
  };

  const startGame = () => {
    if (names.every((name) => name.trim() !== "")) {
      onPlayersReady(names);
    } else {
      alert("Please enter all player names");
    }
  };

  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      <h2 style={{ color: "black" }}>Enter Player Names </h2>
      {names.map((name, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Player ${index + 1}`}
          value={name}
          onChange={(e) => updateName(index, e.target.value)}
        />
      ))}
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={addPlayer} disabled={names.length >= 6}>
          Add Player
        </button>
        <button onClick={removePlayer} disabled={names.length <= 1}>
          Remove Player
        </button>
      </div>
      <button onClick={startGame} style={{ marginTop: "1rem" }}>
        Start Game
      </button>
    </div>
  );
};

export default PlayerSetup;
