import type { Player } from "../types/player";

type WinnerModalProps = {
  winner: Player;
  onRestart: () => void;
};

export const WinnerModal = ({ winner, onRestart }: WinnerModalProps) => {
  return (
    <div className="winner-modal">
      <div className="winner-content">
        <h2>Game Over!</h2>
        <p>
          <span style={{ color: winner.color }}>{winner.name}</span> has won the
          game!
        </p>
        <button onClick={onRestart}>Play Again</button>
      </div>
    </div>
  );
};
