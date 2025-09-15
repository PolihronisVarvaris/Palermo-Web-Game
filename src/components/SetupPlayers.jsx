import { useState, useEffect } from "react";

export default function SetupPlayers({ availableRoles, onComplete }) {
  const defaultCount = 3;
  const [count, setCount] = useState(defaultCount);

  // roleCounts: { roleName: number }
  const [roleCounts, setRoleCounts] = useState(
    Object.fromEntries(availableRoles.map((r) => [r, 0]))
  );

  // keep a live total to display
  const totalAssigned = Object.values(roleCounts).reduce(
    (s, v) => s + Number(v || 0),
    0
  );

  // reset roleCounts if availableRoles changes
  useEffect(() => {
    setRoleCounts(Object.fromEntries(availableRoles.map((r) => [r, 0])));
  }, [availableRoles]);

  // toggle checkbox for role: if enabled set to 1, if disabled set to 0
  const toggleRole = (role) => {
    setRoleCounts((prev) => {
      const old = Number(prev[role] || 0);
      return { ...prev, [role]: old > 0 ? 0 : 1 };
    });
  };

  const setRoleNumber = (role, val) => {
    const n = Math.max(0, Number(val || 0));
    setRoleCounts((prev) => ({ ...prev, [role]: n }));
  };

  const canProceed = () => {
    if (count < 3) {
      alert("Minimum 3 players required.");
      return false;
    }
    if (totalAssigned > count) {
      alert(`You assigned ${totalAssigned} roles but there are only ${count} players.`);
      return false;
    }
    // okay to proceed (if totalAssigned is 0, it's fine — rest will be villagers)
    return true;
  };

  const handleNext = () => {
    if (!canProceed()) return;
    onComplete(count, roleCounts);
  };

  return (
    <div className="max-w-lg mx-auto text-left">
      <div className="mb-4">
        <label className="mr-2 font-semibold">Number of Players:</label>
        <input
          type="number"
          min="3"
          value={count}
          onChange={(e) => setCount(Math.max(3, Number(e.target.value || 3)))}
          className="border p-1 rounded w-20"
        />
      </div>

      <h2 className="mb-2 font-semibold">Role configuration</h2>

      <div className="mb-2 text-sm text-gray-600">
        Toggle roles and set how many of each role you want. Total assigned:
        <strong> {totalAssigned} / {count}</strong>
      </div>

      <div className="space-y-2">
        {availableRoles.map((role) => {
          const enabled = Number(roleCounts[role] || 0) > 0;
          return (
            <div key={role} className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => toggleRole(role)}
                />
                <span className="font-medium">{role}</span>
              </label>

              <input
                type="number"
                min="0"
                value={roleCounts[role]}
                onChange={(e) => setRoleNumber(role, e.target.value)}
                className="w-20 border p-1 rounded text-center"
                // keep it enabled so the host can fine-tune counts even if checkbox off
              />
              <span className="text-sm text-gray-500">count</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <button
          onClick={handleNext}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
