import { useState } from "react";
import SetupPlayers from "./SetupPlayers";
import PlayerForm from "./PlayerForm";
import PlayerRound from "./PlayerRound";

export default function MafiaGame() {
  const [stage, setStage] = useState(1); // 1: setup, 2: names, 3: game
  const [playerCount, setPlayerCount] = useState(0);
  const [roleCounts, setRoleCounts] = useState({});
  const [players, setPlayers] = useState([]);

  // define available roles (feel free to edit)
  const availableRoles = ["Mafia", "Cop", "Detective", "Villager"];

  // called when SetupPlayers completes
  const handleSetupComplete = (count, selectedRoleCounts) => {
    setPlayerCount(count);
    setRoleCounts(selectedRoleCounts);
    setStage(2);
  };

  // called when PlayerForm completes (names array)
  const handleNamesComplete = (enteredNames) => {
    // Build role pool from roleCounts
    const rolePool = [];

    // push non-villager roles
    Object.entries(roleCounts).forEach(([role, num]) => {
      const n = Number(num) || 0;
      if (role === "Villager") return; // handle villagers afterwards
      for (let i = 0; i < n; i++) rolePool.push(role);
    });

    const villagersSpecified = Number(roleCounts["Villager"] || 0);
    const totalSoFar = rolePool.length + villagersSpecified;

    // If totalSoFar > enteredNames.length, this should not happen (we validated),
    // but guard anyway by trimming villagersSpecified.
    let finalVillagers = villagersSpecified;
    if (totalSoFar > enteredNames.length) {
      finalVillagers = Math.max(0, enteredNames.length - rolePool.length);
    } else if (totalSoFar < enteredNames.length) {
      // fill remaining seats with villagers
      finalVillagers = villagersSpecified + (enteredNames.length - totalSoFar);
    }

    for (let i = 0; i < finalVillagers; i++) rolePool.push("Villager");

    // Now rolePool length should be >= enteredNames.length, slice and shuffle
    const shuffled = rolePool
      .slice(0, enteredNames.length)
      .sort(() => Math.random() - 0.5);

    const assigned = enteredNames.map((name, i) => ({
      name,
      role: shuffled[i],
      revealed: false,
      revealCount: 0,
    }));

    setPlayers(assigned);
    setStage(3);
  };

  // toggle reveal: only increment revealCount when showing (hidden -> shown)
  const handleReveal = (index) => {
    setPlayers((prev) =>
      prev.map((p, i) => {
        if (i !== index) return p;

        if (!p.revealed) {
          // Was hidden, now showing: increment
          return { ...p, revealed: true, revealCount: (p.revealCount || 0) + 1 };
        } else {
          // Was shown, now hide: do not increment
          return { ...p, revealed: false };
        }
      })
    );
  };

  const handleRestart = () => {
    setStage(1);
    setPlayerCount(0);
    setRoleCounts({});
    setPlayers([]);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">🎭 Palermo — Mafia Game</h1>

      {stage === 1 && (
        <SetupPlayers
          availableRoles={availableRoles}
          onComplete={handleSetupComplete}
        />
      )}

      {stage === 2 && (
        <PlayerForm playerCount={playerCount} onComplete={handleNamesComplete} />
      )}

      {stage === 3 && (
        <>
          <PlayerRound players={players} onReveal={handleReveal} />
          <div className="mt-4">
            <button
              onClick={handleRestart}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Restart / New Round
            </button>
          </div>
        </>
      )}
    </div>
  );
}
