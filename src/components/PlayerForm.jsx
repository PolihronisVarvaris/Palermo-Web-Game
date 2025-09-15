import { useState, useEffect, useRef } from "react";

export default function PlayerForm({ playerCount, onComplete }) {
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [names.length]);

  const handleAddName = () => {
    const trimmed = currentName.trim();
    if (trimmed === "") return;
    if (names.length >= playerCount) return;
    setNames((prev) => [...prev, trimmed]);
    setCurrentName("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddName();
    }
  };

  const handleStart = () => {
    if (names.length !== playerCount) {
      alert(`Please add ${playerCount} names. You added ${names.length}.`);
      return;
    }
    onComplete(names);
  };

  return (
    <div className="max-w-lg mx-auto text-center">
      <h2 className="mb-2 font-semibold">Add Players ({names.length}/{playerCount})</h2>

      <div className="mb-3">
        <input
          ref={inputRef}
          type="text"
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Enter nickname and press Add (or Enter)"
          className="border p-2 rounded w-64"
        />
        <button
          onClick={handleAddName}
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      <ul className="text-left max-h-40 overflow-auto mb-3">
        {names.map((n, i) => (
          <li key={i} className="py-1 border-b">{i + 1}. {n}</li>
        ))}
      </ul>

      <div>
        <button
          onClick={handleStart}
          disabled={names.length !== playerCount}
          className={`px-4 py-2 rounded ${names.length === playerCount ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
