export default function PlayerRound({ players, onReveal }) {
  return (
    <div className="max-w-lg mx-auto text-left">
      <h2 className="mb-3 font-semibold">Players — Reveal your role (one by one)</h2>

      <ul>
        {players.map((p, i) => (
          <li key={i} className="flex items-center gap-3 py-2 border-b">
            <div className="flex-1">
              <div className="font-medium">{i + 1}. {p.name}</div>
              {p.revealed && <div className="text-sm">Role: <strong>{p.role}</strong></div>}
            </div>

            <div className="flex flex-col items-end gap-1">
              <button
                onClick={() => onReveal(i)}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                Role
              </button>

              {p.revealCount > 1 && (
                <div className="text-sm text-red-600">Checked: {p.revealCount}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
