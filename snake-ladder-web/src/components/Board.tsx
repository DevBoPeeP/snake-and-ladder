import React, { useState } from "react";
import DicePanel from "./DicePanel";

interface BoardProps {
  players: string[];
}

const Board = ({ players }: BoardProps): React.JSX.Element => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const handlePlayerTurn = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };
  const tiles = [];
  for (let i = 100; i >= 1; i--) {
    tiles.push(<div className="box" key={i} id={`b${i}`}></div>);
  }

  return (
    <div className="relative">
      <div className="cont">
        {tiles}
        <div id="b1">
          {players.map((_, index) => (
            <p key={index} id={`p${index + 1}`}></p>
          ))}
        </div>
      </div>
      <img src="/S&L 2.png" alt="Board" className="board-img" />
      <DicePanel
        players={players}
        currentPlayerIndex={currentPlayerIndex}
        onPlayerTurn={handlePlayerTurn}
      />
    </div>
  );
};

export default Board;
