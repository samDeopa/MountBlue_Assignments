import { useState } from "react";
import Square from "./square";

const Board = () => {
  const [values, setValues] = useState(Array(9).fill(""));
  const [currentValue, setCurrentValue] = useState("X");
  const [winner, setWinner] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const handleClick = (index) => {
    if (values[index] !== "" || winner) return; // Prevent move if square is filled or game is over

    // If we're currently viewing a past move, discard "future" history
    if (historyIndex != null) {
      setWinner("");
      const newHistory = history.slice(0, historyIndex + 1);
      setHistory(newHistory);
      setHistoryIndex(null);
    }

    const newValues = [...values];
    newValues[index] = currentValue;

    const gameWinner = findWinner(newValues);
    if (gameWinner) {
      setWinner(`Player ${gameWinner} Wins!!!!`);
    }

    setValues(newValues);
    setHistory((history) => [...history, newValues.slice()]);
    if (!gameWinner) {
      setCurrentValue(currentValue === "X" ? "O" : "X");
    }

    if ((history.length == 8) & !winner) {
      setWinner("Its a Draw.");
    }
  };

  const handleHistoryClick = (arr, index) => {
    setHistoryIndex(index);
    setValues([...arr]);
    setCurrentValue(index % 2 === 0 ? "O" : "X"); // Ensure correct turn
  };

  const resetGame = () => {
    setValues(Array(9).fill(""));
    setWinner("");
    setHistory([]);
    setHistoryIndex(null);
    setCurrentValue("X");
  };

  const findWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-[300px] flex flex-wrap">
        {values.map((value, index) => (
          <Square
            key={index}
            value={value}
            clickHandler={() => handleClick(index)}
          />
        ))}
      </div>
      {winner && <div className="text-lg font-bold">{winner}</div>}
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Restart Game
      </button>

      <div className="flex flex-col gap-2">
        {history.map((arr, index) => {
          return (
            <button
              onClick={() => {
                handleHistoryClick(arr, index);
              }}
            >
              {" "}
              Go to Move #{index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
