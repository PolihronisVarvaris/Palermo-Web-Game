import React, { useEffect, useState } from "react";
import Deck from "./Deck";
import CardFlip from "./CardFlip.jsx"; 
import { ROLE_IMAGES } from "./roleImages";
import "./PalermoGameDesign.css";


const DEFAULT_ROLES = [
  "Associate",
    "Author",
    "Black_Killer",
    "Bulletproof",
    "Cannibal",
    "Cop",
    "Day_Bomber",
    "Fog",
    "Healer",
    "Heretic",
    "Jester",
    "King",
    "Lawyer",
    "Librarian",
    "Lovers",
    "Messenger",
    "Mother",
    "Muse",
    "Night_Bomber",
    "Nightbringer",
    "Oracle",
    "Painter",
    "Peasant",
    "Poisoner",
    "Reader",
    "Red_Killer",
    "Reflector",
    "Spy",
    "Stripper",
    "Thief",
    "Tonguebreaker",
    "Witch"
];


const DEFAULT_ROLE_DESCRIPTIONS = {
  Associate: {
    title: "💋 Associate (Πουτάνα)",
    objective: "Assist the Mafia without being directly involved.",
    alignment: "Evil (Team Victory)",
    abilities: [
      "Knows who the Mafia members are.",
      "Cannot kill but may redirect or protect players.",
      "Her power lies in deception—she excels at lying and manipulating town perception."
    ]
  }, 
  Author: {
    title: "📖 Author (Συγγραφέας)",
    objective: "Uncover the truth through written investigation.",
    alignment: "Good (Town Victory)",
    abilities: [
      "Can investigate one player each night to determine if they are a killer.",
      "Receives the results the following night after the investigation.",
      "May use accumulated knowledge to guide the town discreetly."
    ]
  },
  Black_Killer: {
    title: "Black Killer (Μαύρος Δολοφόνος)",
    objective: "Lead the Mafia and choose who dies.",
    alignment: "Evil (Mafia Team Victory)",
    abilities: [
      "Each night, selects the target to be killed.",
      "The Red Killer executes the chosen victim.",
      "Strategic mastermind of the Mafia’s operations.",
      "If eliminated, the Red Killer may inherit decision-making power."
    ]
  },
  Bulletproof: {
    title: "🛡️ Bulletproof (Αλεξίσφαιρος)",
    objective: "Survive assassination attempts.",
    alignment: "Good (Town Victory)",
    abilities: [
      "Immune to one night kill.",
      "Can still be voted out during the day.",
      "Once the immunity is used, becomes vulnerable like any other player."
    ]
  },
  Cannibal: {
    title: "🩸 Cannibal (Κανίβαλος)",
    objective: "Consume the dead to gain their power.",
    alignment: "Evil (Solo Victory)",
    abilities: [
      "Once per game, may devour a dead player.",
      "Steals that player's abilities and uses them as his own.",
      "Cannot consume more than one corpse, so choose wisely."
    ]
  },
  Cop: {
    title: "👮‍♂️ Cop (Μπάτσος)",
    objective: "Identify Mafia members and protect the town.",
    alignment: "Good (Town Victory)",
    abilities: [
      "Sees the Red Killer.",
      "May collaborate with other investigative roles to guide the town."
    ]},  
  Day_Bomber: {
    title: "💣 Day Bomber (Καμικάζι Μέρας)",
    objective: "Explode during the day to cause chaos.",
    alignment: "Evil (Solo Victory)",
    abilities: [
      "Can publicly detonate once per game.",
      "Kills one chosen player instantly by sacrificing himself.",
      "May activate before or during the voting process.",
      "Disrupts town strategy and forces panic decisions."
    ]
  },
  Fog: {
    title: "🌫️ Fog (Ομίχλη)",
    objective: "Disrupt the game by delaying all abilities.",
    alignment: "Neutral",
    abilities: [
      "While Fog is alive, no other roles' abilities can activate.",
      "Once Fog dies, all abilities resume as normal.",
      "Passive disruption. Fog does not act directly but controls the pace of the game."
    ]
  },
  Healer: {
    title: "🩺 Healer (Γιατρός)",
    objective: "Protect players from harm.",
    alignment: "Good (Town Victory)",
    abilities: [
      "Can heal one player per night.",
      "Prevents death from attacks.",
      "May be immune to poisoning or curses."
    ]
  },
  Heretic: {
    title: "🕯️ Heretic (Αιρετικός)",
    objective: "Curse one player to be vulnerable.",
    alignment: "Evil (Solo Victory)",
    abilities: [
      "Removes all buffs and makes them killable.",
      "May bypass protection or immunity.",
      "Can only curse one player per night."
    ]
  },
  Jester: { 
    title: "🎭 Jester (Τρέλα)", 
    objective: "Get voted as the killer. If the town condemns him, he wins alone.", 
    alignment: "Neutral (Solo Victory)", 
    abilities: [
      "Can lie freely, sow confusion, and provoke suspicion.",
      "Causes others to doubt their own logic.",
      "No killing power, his weapon is chaos."
    ] 
  },
  King: {
    title: "👑 King (Βασιλιάς)",
    objective: "Rule the town or die trying.",
    alignment: "Neutral",
    abilities: [
      "His vote counts as 2.",
      "May influence town decisions through authority.",
      "Can be targeted like any other player despite his power."
    ]
  },
  Lawyer: {
    title: "📜 Lawyer (Δικηγόρος)",
    objective: "Make one player appear innocent.",
    alignment: "Evil (Support)",
    abilities: [
      "Chooses one player per night.",
      "That player will appear innocent to any investigative role (e.g. Cop, Reader).",
      "Can protect Mafia members or mislead the town by shielding key allies."
    ]
  },
  Librarian: {
    title: "📚 Librarian (Βιβλιοθηκάριος)",
    objective: "Support the town with hidden knowledge.",
    alignment: "Good (Town Victory)",
    abilities: [
      "Starts the game knowing the identity of two Citizens.",
      "Has no other powers—relies on trust and deduction."
    ]
  },
  Lovers: {
    title: "💘 Lovers (Εραστές)",
    objective: "Survive together at all costs.",
    alignment: "Neutral (Shared Victory)",
    abilities: [
      "Two players are secretly linked as Lovers.",
      "If one Lover dies, the other dies immediately from heartbreak.",
      "One can sacrifice himself for the other before the voting starts."
    ]
  },
  Messenger: {
    title: "✉️ Messenger (Αγγελιαφόρος)",
    objective: "Influence the game through secret communication.",
    alignment: "Neutral",
    abilities: [
      "Can send one private message to any player each night.",
      "Message may contain truth, lies, or strategic manipulation.",
      "Can influence votes, sow confusion, or build secret alliances.",
      "Power lies in persuasion, not direct action."
    ]
  },
  Mother: {
    title: "🕊️ Mother Teresa (Μητέρα Τερέζα)",
    objective: "Bring one soul back from the dead.",
    alignment: "Good (Town Victory)",
    abilities: [
      "Can revive one player per game.",
      "Revival must target a player killed during the previous night.",
      "The resurrection happens the following morning—no other timing is allowed.",
      "Cannot revive players killed during the day or on earlier nights.",
      "Her power is sacred and limited—use it wisely."
    ]
  },
  Muse: {
    title: "🎼 Muse (Μούσα)",
    objective: "Inspire and manipulate decisions from the shadows.",
    alignment: "Neutral",
    abilities: [
      "During the day, chooses one player whose vote will be changed.",
      "The altered vote is redirected to a target of the Muse’s choice.",
      "Can shift the outcome of the town’s decisions."
    ]
  },
  Night_Bomber: {
    title: "🌑 Night Bomber (Καμικάζι Νύχτας)",
    objective: "Strike silently during the night.",
    alignment: "Evil (Solo Victory)",
    abilities: [
      "Can detonate once per game during the night phase.",
      "Kills one chosen player instantly by sacrificing himself.",
      "If killed during the night, he may immediately detonate and take one player down with him.",
      "Creates fear and confusion, disrupting night strategies."
    ]
  },
  Nightbringer: {
    title: "🌙 Nightbringer (Νυχτοπέταλο)",
    objective: "Delay the night phase until death.",
    alignment: "Evil (Solo Victory)",
    abilities: [
      "While Nightbringer is alive, the night phase is completely blocked.",
      "No player can use night abilities until she dies.",
      "Passive disruption—her mere presence halts the flow of the game."
    ]
  },
  Oracle: {
    title: "🔮 Oracle (Μάντισσα)",
    objective: "Reveal hidden truths after death.",
    alignment: "Good (Town Victory)",
    abilities: [
      "If killed by vote, the role of the last person who she voted is revealed.",
      "Passive ability—activates only upon lynching.",
      "Can influence town strategy even after death."
    ]
  },
  Painter: {
    title: "🎨 Painter (Ζωγράφος)",
    objective: "Mislead investigations by framing others.",
    alignment: "Evil (Support)",
    abilities: [
      "Each night, chooses one player to frame. He can't frame the same person two times",
      "If that player is investigated by the Cop, they will appear guilty.",
      "Can only frame one player per night—timing and target are crucial."
    ]
  },
  Peasant: {
    title: "🧑‍🌾 Peasant (Χωρικός)",
    objective: "Survive and support the town.",
    alignment: "Good (Town Victory)",
    abilities: [
      "Has no special powers or abilities.",
      "Relies on logic, discussion, and intuition to identify threats.",
    ]
  },
  Poisoner: {
    title: "☠️ Poisoner (Δηλητηριαστής)",
    objective: "Kill slowly and secretly.",
    alignment: "Evil (Solo Victory)",
    abilities: [
      "At night, chooses one player to poison.",
      "The poisoned player dies the next day, right before voting begins.",
      "Cannot poison more than one player per game."
    ]
  },
  Reader: {
    title: "⚰️ Reader (Ιατροδικαστής)",
    objective: "Learn from the dead.",
    alignment: "Neutral",
    abilities: [
      "Can read the role of a dead player.",
      "May gain insight into the game’s hidden dynamics.",
      "Can only read one corpse per night."
    ]
  },
  Red_Killer: {
    title: "🔪 Red Killer (Κόκκινος Δολοφόνος)",
    objective: "Execute the Mafia’s chosen victims.",
    alignment: "Evil (Mafia Team Victory)",
    abilities: [
      "Acts as the right hand of the Black Killer.",
      "Carries out the actual kills decided by the Mafia.",
      "If the Black Killer dies, the Red Killer may inherit decision power."
    ]
  },
  Reflector: {
    title: "🪞 Reflector (Αντανακλαστής)",
    objective: "Redirect fate by reversing effects between players.",
    alignment: "Neutral",
    abilities: [
      "Each night, selects two players.",
      "Any harmful effect targeting the first player is redirected to the second—and vice versa.",
      "Example: If the first is a killer and the second a victim, the killer dies at dawn instead.",
      "Requires strategic timing and insight to manipulate outcomes."
    ]
  },
  Spy: {
    title: "🕵️‍♂️ Spy (Κατάσκοπος)",
    objective: "Gather intelligence while hiding his true allegiance.",
    alignment: "Good (Town Victory)",
    abilities: [
      "Appears as a killer to other killers.",
      "May infiltrate the Mafia without being suspected."
    ]
  },
  Stripper: {
    title: "👠 Stripper (Στριπτιτζού)",
    objective: "Disarm players by silencing their powers.",
    alignment: "Neutral",
    abilities: [
      "Each night, selects one player",
      "That player’s abilities are disabled for the night.",
      "Can strategically block powerful roles or disrupt enemy plans."
    ]
  },
  Thief: {
    title: "🫳 Thief (Κλέφτης)",
    objective: "Steal a role and switch allegiance.",
    alignment: "Neutral → Variable",
    abilities: [
      "Once per game, selects one living player and steals their role.",
      "Immediately adopts that role’s abilities and joins their team.",
      "The original player keeps his role.",
      "Timing is key—stealing too early or too late can backfire."
    ]
  },
  Tonguebreaker: {
    title: "👅 Tonguebreaker (Μουγγοτής)",
    objective: "Control the flow of discussion and voting.",
    alignment: "Evil (Solo Victory)",
    abilities: [
      "Each day, chooses one player to mute—this player cannot speak or defend themselves during voting.",
      "Always votes first in the voting phase.",
      "Decides whether voting proceeds clockwise or counterclockwise from their position.",
      "Can manipulate the town’s rhythm and silence key voices."
    ]
  },
  Witch: {
    title: "🪄 Witch (Μάγισσα)",
    objective: "Manipulate fate through life and death.",
    alignment: "Neutral",
    abilities: [
      "Can kill one player per game.",
      "Can save one player per game.",
      "May use both actions in the same game.",
      "Each action can be used once, so timing is crucial.",
      "Her magic can shift the balance of power dramatically."
    ]
  }
};

export default function PalermoGameDesign() {
  const [lastPreviewedRole, setLastPreviewedRole] = useState(null);
  const [stage, setStage] = useState(1);
  const [playerCount, setPlayerCount] = useState(4);

  // roleCounts hold count and alignmentColor (Light/Lone/Dark stored as 'color' & 'alignment')
  const [rolesList] = useState(DEFAULT_ROLES);
  const [roleCounts, setRoleCounts] = useState(
    Object.fromEntries(
      DEFAULT_ROLES.map((r) => [r, { count: 0, alignment: "Light", color: "white" }])
    )
  );

  // players' names (persisted across reset)
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState("");

  // players in game (created on startGame)
  const [players, setPlayers] = useState([]);
  const [showDeck, setShowDeck] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);

  // winner state
  const [winner, setWinner] = useState(null);

  // role descriptions (alignment is derived from roleCounts alignment selection)
  const [roleDescriptions] = useState(DEFAULT_ROLE_DESCRIPTIONS);

  // totals
  const totalAssigned = Object.values(roleCounts).reduce((s, v) => s + Number(v.count || 0), 0);

  // --- Setup helpers ---
  function toggleRoleCheckbox(role) {
    setRoleCounts((prev) => ({
      ...prev,
      [role]: { 
        ...prev[role], 
        count: prev[role].count > 0 ? 0 : 1 
      }
    }));

    // update last previewed role
    setLastPreviewedRole(role);
  }

  function setRoleNumber(role, val) {
    setRoleCounts((prev) => ({
      ...prev,
      [role]: { ...prev[role], count: Math.max(0, Number(val || 0)) }
    }));
  }
  function setRoleAlignment(role, alignment) {
    // alignment: "Light" | "Lone" | "Dark"
    const color = alignment === "Light" ? "white" : alignment === "Dark" ? "black" : "red";
    setRoleCounts((prev) => ({
      ...prev,
      [role]: { ...prev[role], alignment, color }
    }));
  }
  function canProceedSetup() {
    return playerCount >= 3 && totalAssigned <= playerCount;
  }
  function handleNextFromSetup() {
    if (!canProceedSetup()) {
      alert("Check that player count >=3 and total assigned roles <= players.");
      return;
    }
    setStage(2);
  }

  // --- Add names ---
  function addName() {
    const t = currentName.trim();
    if (!t) return;
    if (names.length >= playerCount) return;
    setNames((p) => [...p, t]);
    setCurrentName("");
  }

  // --- Start game ---
  function startGame() {
    if (names.length !== playerCount) {
      alert(`Please add all ${playerCount} players first.`);
      return;
    }
    const pool = [];
    Object.entries(roleCounts).forEach(([role, data]) => {
      for (let i = 0; i < (Number(data.count) || 0); i++) {
        pool.push({ role, color: data.color || (data.alignment === "Dark" ? "black" : data.alignment === "Lone" ? "red" : "white") , alignment: data.alignment });
      }
    });
    // auto-fill villagers
    while (pool.length < playerCount) pool.push({ role: "Villager", color: "white", alignment: "Light" });

    const shuffled = pool.sort(() => Math.random() - 0.5);
    const created = names.map((n, i) => ({
      name: n,
      role: shuffled[i].role,
      color: shuffled[i].color,
      alignment: shuffled[i].alignment,
      flipped: false,    // visual state of card (front/back)
      canFlip: false,    // whether Role button enabled flipping
      revealCount: 0,
      alive: true
    }));
    setPlayers(created);
    setStage(3);
    setCurrentIndex(0);
    setWinner(null);
  }

  // --- Flip/Role logic ---
  // Role button toggles whether player can flip. Flips (clicking card) only work if canFlip is true.
  function toggleRoleEnable(index) {
    setPlayers((prev) =>
      prev.map((p, i) => {
        if (i !== index) return p;
        // toggling canFlip; when turning off, also ensure flipped false (hide front)
        if (p.canFlip) {
          return { ...p, canFlip: false, flipped: false };
        } else {
          return { ...p, canFlip: true };
        }
      })
    );
  }

  function handleCardClick(index) {
    setPlayers((prev) =>
      prev.map((p, i) => {
        if (i !== index) return p;
        if (!p.canFlip) return p; // if flipping not allowed, do nothing
        // toggling flipped state; if flipping to front, increment revealCount
        if (!p.flipped) {
          return { ...p, flipped: true, revealCount: (p.revealCount || 0) + 1 };
        } else {
          return { ...p, flipped: false };
        }
      })
    );
  }

  // Kill/revive
  function toggleAlive(index) {
    setPlayers((prev) => {
      const updated = prev.map((p, i) => (i === index ? { ...p, alive: !p.alive } : p));
      checkWinner(updated);
      return updated;
    });
  }

  // --- Winner logic & alert ---
  function checkWinner(playersArray) {
    // Simple rule: if no mafia alive -> town wins. If mafia >= others -> mafia wins.
    const alive = playersArray.filter((p) => p.alive);
    const mafiaAlive = alive.filter((p) => p.role === "Mafia").length;
    const othersAlive = alive.filter((p) => p.role !== "Mafia").length;
    if (mafiaAlive === 0) {
      setWinner("Town wins 🎉");
    } else if (mafiaAlive >= othersAlive) {
      setWinner("Mafia wins 🩸");
    } else {
      setWinner(null);
    }
  }

  // show alert when winner changes to non-null
  useEffect(() => {
    if (winner) {
      // small timeout to allow UI update before blocking alert
      setTimeout(() => {
        alert(winner);
      }, 60);
    }
  }, [winner]);

  // --- Reset behavior ---
  // resetKeep: return to setup but keep names & roleCounts so user can edit them
  function resetKeep() {
    setStage(1);
    setPlayers([]);
    setCurrentIndex(0);
    setWinner(null);
    // keep names & roleCounts unchanged so user can edit
  }
  // hard reset - clear everything
  function hardReset() {
    setStage(1);
    setPlayers([]);
    setNames([]);
    setRoleCounts(
      Object.fromEntries(DEFAULT_ROLES.map((r) => [r, { count: 0, alignment: "Light", color: "white" }]))
    );
    setCurrentIndex(0);
    setWinner(null);
  }

  // Preload images for current player to avoid flicker
  useEffect(() => {
    if (!players || players.length === 0) return;
    const p = players[currentIndex];
    if (!p) return;
    
    const front = new Image();
    front.src = ROLE_IMAGES[p.role] || ROLE_IMAGES.back;
    const back = new Image();
    back.src = ROLE_IMAGES.back;
  }, [currentIndex, players]);

  // When switching currentIndex reset flipped state for others (keep canFlip false for others)
  useEffect(() => {
    setPlayers((prev) =>
      prev.map((p, i) => 
        i === currentIndex 
          ? p 
          : { ...p, flipped: false } // only close others, keep current as-is
      )
    );
  }, [currentIndex]);

  // --- UI helpers for role description shown during setup: chosen role (left box) ---

  return (
    <div className="palermo-container">
      <header>
        <h1>Palermo — Mafia</h1>
        <div>
          <button className="btn-reset" onClick={resetKeep}>Reset (keep names & roles)</button>
          <button className="btn-reset" style={{ marginLeft: 8 }} onClick={hardReset}>Hard Reset</button>
        </div>
      </header>

      <div className="game-layout">
        {/* LEFT: during stage1 show role descriptions as you configure; during stage3 show players list */}
        <div className="left-box">
          {stage === 1 && (
            <>
              <h3>Setup Roles</h3>
              <div style={{ marginBottom: 8 }}>
                <label>Number of players: </label>
                <input
                  type="number"
                  min={3}
                  value={playerCount}
                  onChange={(e) => setPlayerCount(Math.max(3, Number(e.target.value || 3)))}
                />
                <button style={{ marginLeft: 8 }} onClick={() => { if (canProceedSetup()) handleNextFromSetup(); else alert("Fix roles/players"); }}>
                  Next
                </button>
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                {rolesList.map((role) => {
                  const data = roleCounts[role];
                  return (
                    <div key={role} style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="checkbox"
                          checked={Number(data.count || 0) > 0}
                          onChange={() => toggleRoleCheckbox(role)}
                        />
                        <strong>{role}</strong>
                      </div>

                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="number"
                          min={0}
                          value={data.count}
                          onChange={(e) => setRoleNumber(role, e.target.value)}
                          style={{ width: 70 }}
                        />
                        <select value={data.alignment} onChange={(e) => setRoleAlignment(role, e.target.value)}>
                          <option value="Light">Light</option>
                          <option value="Lone">Lone</option>
                          <option value="Dark">Dark</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: 12 }}>
                <strong>Total:</strong> {totalAssigned} / {playerCount}
              </div>

              {/* show description for first checked role or a message */}
              <div style={{ marginTop: 12, padding: 10, background: "rgba(0,0,0,0.25)", borderRadius: 8 }}>
                <h4 style={{ marginTop: 0 }}>Role preview</h4>
                {lastPreviewedRole ? (() => {
                  const data = roleCounts[lastPreviewedRole];
                  const desc = roleDescriptions[lastPreviewedRole] || DEFAULT_ROLE_DESCRIPTIONS[lastPreviewedRole];
                  const alignment = data.alignment || desc.alignment || "Light";
                  return (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong>{desc.title}</strong>
                        <span style={{ color: alignment === "Dark" ? "#ff6b6b" : alignment === "Lone" ? "#ffcc00" : "#fff" }}>{alignment}</span>
                      </div>
                      <p style={{ margin: "8px 0" }}><strong>Objective:</strong> {desc.objective}</p>
                      <p style={{ margin: "8px 0" }}><strong>Abilities:</strong></p>
                      <ul>
                        {(desc.abilities || []).map((a, i) => <li key={i}>{a}</li>)}
                      </ul>
                    </div>
                  );
                })() : (
                  <div className="small-muted">Toggle a role to preview its description and choose alignment.</div>
                )}
              </div>
            </>
          )}

          {stage === 2 && (
            <>
              <h3>Add players</h3>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addName()}
                  placeholder={`Player ${names.length + 1}`}
                />
                <button onClick={addName}>Add</button>
              </div>
              <div style={{ marginTop: 8 }}>{names.length}/{playerCount}</div>
              <ol style={{ marginTop: 8 }}>
                {names.map((n, i) => <li key={i}>{n}</li>)}
              </ol>
              <div style={{ marginTop: 10 }}>
                <button disabled={names.length !== playerCount} onClick={startGame}>Start Game</button>
              </div>
            </>
          )}

          {stage === 3 && (
            <>
              <h3>Players</h3>
              <div style={{ marginTop: 8 }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {players.map((p, i) => (
                    <li key={i} style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div style={{ fontWeight: "700" }}>{i+1}.</div>
                        <div style={{ color: p.alive ? "inherit" : "#999", textDecoration: p.alive ? "none" : "line-through" }}>{p.name}</div>
                        {p.revealCount > 0 && <div style={{ fontSize: 12, color: "#ccd" }}>{`(Seen ${p.revealCount})`}</div>}
                      </div>

                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          onClick={() => { setCurrentIndex(i); }}
                          className={currentIndex === i ? "selected-player" : ""}
                        >
                          Select
                        </button>

                        <button onClick={() => toggleRoleEnable(i)}>
                          {players[i].canFlip ? "Disable Role" : "Role"}
                        </button>

                        <button onClick={() => toggleAlive(i)} style={{ backgroundColor: p.alive ? "#b22222" : "#2a8bf2" }}>
                          {p.alive ? "Kill" : "Revive"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 10 }}>
                  <button style={{ marginLeft: 8 }}onClick={() => setShowDeck((prev) => !prev)}>{showDeck ? "Hide Deck" : "Show Deck"}</button>
                  <button onClick={() => { setPlayers((prev)=>prev.map(p=>({ ...p, flipped: false, canFlip: false }))); setCurrentIndex(0); }}>Hide all</button>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <strong>Winner:</strong> {winner || "—"}
              </div>
            </>
          )}
        </div>

        {/* CENTER: card preview */}
        <div className="center-card">
          {showDeck ? (
            <Deck players={players} />  
          ) : stage === 3 && players[currentIndex] ? (
            <CardFlip
              flipped={players[currentIndex].flipped}
              backImage={ROLE_IMAGES.back}
              frontImage={
                ROLE_IMAGES[players[currentIndex].role] || ROLE_IMAGES.back
              }
              onClick={() => handleCardClick(currentIndex)}
            />
          ) : (
            <div style={{ textAlign: "center", color: "#ccc" }}>
              <div style={{ fontSize: 18, marginBottom: 8 }}>Card preview</div>
              <div className="small-muted">
                Cards flip only during the game. Select a player and press Role to enable flipping.
              </div>
            </div>
          )}
        </div>


        {/* RIGHT: role info (only for the currently selected player when revealed) */}
        <div className="right-section">
          {stage === 3 && players[currentIndex] ? (
            players[currentIndex].flipped ? (
              <>
                <h3 style={{ color: players[currentIndex].color }}>
                  {roleDescriptions[players[currentIndex].role]?.title || players[currentIndex].role}
                </h3>
                <p><strong>Alignment:</strong> {players[currentIndex].alignment}</p>
                <p>
                  <strong>Objective:</strong>{" "}
                  {roleDescriptions[players[currentIndex].role]?.objective || "—"}
                </p>
                <div style={{ marginTop: 8 }}>
                  <p><strong>Abilities / Notes</strong></p>
                  <ul>
                    {(roleDescriptions[players[currentIndex].role]?.abilities || []).map((a, idx) => (
                      <li key={idx}>{a}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div style={{ color: "#ccc" }}>
                Select player and press Role to view their card. Then click the card to flip.
              </div>
            )
          ) : (
            <div style={{ color: "#ccc" }}>
              Role information will appear here during the game when a player's card is revealed.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

