'use client';

import { useState } from 'react';
import styles from './TicTacToe.module.css';

type Player = 'X' | 'O';
type Square = Player | null;

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TicTacToePage() {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');

  const winner = winningLines
    .map((line) => line.map((index) => squares[index]))
    .find(([first, second, third]) => first && first === second && first === third)?.[0];
  const isDraw = !winner && squares.every(Boolean);

  const playSquare = (index: number) => {
    if (squares[index] || winner) return;

    setSquares((current) =>
      current.map((square, squareIndex) =>
        squareIndex === index ? currentPlayer : square,
      ),
    );
    setCurrentPlayer((player) => (player === 'X' ? 'O' : 'X'));
  };

  const reset = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer('X');
  };

  return (
    <main className={styles.container}>
      <h1>Tic-Tac-Toe</h1>
      <p role="status">
        {winner ? `Winner: ${winner}` : isDraw ? 'It is a draw.' : `Turn: ${currentPlayer}`}
      </p>
      <div className={styles.board}>
        {squares.map((square, index) => (
          <button
            className={styles.square}
            key={index}
            type="button"
            aria-label={`Square ${index + 1}${square ? `: ${square}` : ''}`}
            onClick={() => playSquare(index)}
          >
            {square}
          </button>
        ))}
      </div>
      <button className={styles.reset} type="button" onClick={reset}>
        Reset
      </button>
    </main>
  );
}
