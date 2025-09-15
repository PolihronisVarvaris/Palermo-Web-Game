import React, { useState } from "react";
import './PalermoGameDesign.css';

export default function PalermoGameDesign() {
  const [stage, setStage] = useState(1);
  const [playerCount, setPlayerCount] = useState(4);
  const rolesList = [
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

  const [roleCounts, setRoleCounts] = useState(
    Object.fromEntries(rolesList.map(r => [r, { count: 0, color: "white" }]))
  );
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [players, setPlayers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [winner, setWinner] = useState(null);

  const roleDescriptions = {
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
    title: "🕴️Black Killer (Μαύρος Δολοφόνος)",
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


  const totalAssigned = Object.values(roleCounts).reduce((s, v) => s + Number(v.count || 0), 0);

  // Helpers
  const toggleRoleCheckbox = role => {
    setRoleCounts(prev => ({
      ...prev,
      [role]: { ...prev[role], count: prev[role].count > 0 ? 0 : 1 }
    }));
  };

  const setRoleNumber = (role, val) => {
    setRoleCounts(prev => ({
      ...prev,
      [role]: { ...prev[role], count: Math.max(0, Number(val || 0)) }
    }));
  };

  const setRoleColor = (role, color) => {
    setRoleCounts(prev => ({
      ...prev,
      [role]: { ...prev[role], color }
    }));
  };

  const canProceedSetup = () => playerCount >= 3 && totalAssigned <= playerCount;
  const handleNextFromSetup = () => { 
    if (!canProceedSetup()) { 
      alert("Check that total roles <= players and player count >=3"); 
      return; 
    } 
    setStage(2); 
  };

  const addName = () => { 
    const t = currentName.trim(); 
    if (!t || names.length >= playerCount) return; 
    setNames(prev => [...prev, t]); 
    setCurrentName(""); 
  };

  const startGame = () => {
    if (names.length !== playerCount) { 
      alert(`Please add all ${playerCount} players first.`); 
      return; 
    }
    const pool = [];
    Object.entries(roleCounts).forEach(([role, data]) => { 
      for (let i = 0; i < data.count; i++) pool.push({ role, color: data.color }); 
    });
    while (pool.length < playerCount) pool.push({ role: "Peasant", color: "white" });
    const shuffled = pool.sort(() => Math.random() - 0.5);
    setPlayers(names.map((n,i) => ({
      name: n,
      role: shuffled[i].role,
      color: shuffled[i].color,
      revealed: false,
      revealCount: 0,
      alive: true
    }))); 
    setStage(3);
    setWinner(null);
  };

  const handleFlip = index => {
    setPlayers(prev => prev.map((p,i) => {
      if (i !== index) return p;
      return {
        ...p,
        revealed: !p.revealed,
        revealCount: !p.revealed ? p.revealCount + 1 : p.revealCount
      };
    }));
  };

  const toggleAlive = index => {
    setPlayers(prev => {
      const updated = prev.map((p,i) => i === index ? { ...p, alive: !p.alive } : p);
      checkWinner(updated);
      return updated;
    });
  };

  const checkWinner = (players) => {
    const alive = players.filter(p => p.alive);
    const mafiaAlive = alive.filter(p => p.role === "Mafia").length;
    const othersAlive = alive.filter(p => p.role !== "Mafia").length;

    if (mafiaAlive === 0) {
      setWinner("Town wins 🎉");
    } else if (mafiaAlive >= othersAlive) {
      setWinner("Mafia wins 🩸");
    }
  };

  const resetAll = () => { 
    setStage(1); 
    setPlayerCount(4); 
    setRoleCounts(Object.fromEntries(rolesList.map(r=>[r,{ count: 0, color: "white" }]))); 
    setNames([]); 
    setPlayers([]); 
    setCurrentIndex(0);
    setWinner(null);
  };

  return (
    <div className="palermo-container">
      <header>
        <button onClick={resetAll} className="btn-reset">Reset</button>
      </header>

      {winner && (
        <div style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "10px" }}>
          {winner}
        </div>
      )}

      <div className="game-layout">
        {/* Left Box */}
        <div className="left-box">
          {stage===1 && (
            <div className="setup-stage">
              <label>Number of Players: </label>
              <input type="number" min="3" value={playerCount} onChange={e=>setPlayerCount(Math.max(3, Number(e.target.value||3)))} />
              <h3>Roles Configuration:</h3>
              {rolesList.map(role=>(
                <div key={role} className="role-row">
                  <input type="checkbox" checked={roleCounts[role].count>0} onChange={()=>toggleRoleCheckbox(role)} />
                  <span>{role}</span>
                  <input type="number" min="0" value={roleCounts[role].count} onChange={e=>setRoleNumber(role,e.target.value)} />
                  <select value={roleCounts[role].color} onChange={e => setRoleColor(role, e.target.value)}>
                    <option value="white">⚪ Light </option>
                    <option value="black">⚫ Dark </option>
                    <option value="red">🔴 Lone </option>
                  </select>
                </div>
              ))}
              <div>Total assigned: {totalAssigned} / {playerCount}</div>
              <button onClick={handleNextFromSetup} disabled={!canProceedSetup()}>Next</button>
            </div>
          )}

          {stage===2 && (
            <div className="names-stage">
              <h2>Add Players</h2>
              <input value={currentName} onChange={e=>setCurrentName(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') addName();}} placeholder={`Player ${names.length+1}`} />
              <button onClick={addName}>Add</button>
              <div>{names.length}/{playerCount}</div>
              <ol>{names.map((n,i)=><li key={i}>{n}</li>)}</ol>
              <button onClick={startGame} disabled={names.length!==playerCount}>Start Game</button>
            </div>
          )}

          {stage===3 && (
            <div className="reveal-stage">
              <h2>Reveal Roles</h2>
              <ul>
                {players.map((p,i)=>(
                  <li key={i} style={{ color: p.alive ? "inherit" : "gray", textDecoration: p.alive ? "none" : "line-through" }}>
                    {i+1}. {p.name} {p.revealCount > 0 && `(Checked ${p.revealCount}) `}
                    <button onClick={()=>setCurrentIndex(i)}>Select</button>
                    <button onClick={()=>toggleAlive(i)}>{p.alive ? "Kill" : "Revive"}</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Center Card */}
        <div className="center-card">
          {stage===3 && players.length>0 && (
            <BigCard
              players={players}
              currentIndex={currentIndex}
              cardRatio={1497/897}
              maxWidth={360}
              onFlip={handleFlip}
            />
          )}
        </div>

        {/* Right Section */}
        <div className="right-section">
          {stage === 3 && players[currentIndex] && players[currentIndex].revealed && (
            (() => {
              const role = players[currentIndex].role;
              const color = players[currentIndex].color || "black";
              const info = roleDescriptions[role];
              if (!info) return null;
              return (
                <div>
                  <h2 style={{ color }}>{info.title}</h2>
                  <p><strong>Objective:</strong> {info.objective}</p>
                  <p><strong>Alignment:</strong> {info.alignment}</p>
                  <p><strong>Abilities:</strong></p>
                  <ul>
                    {info.abilities.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              );
            })()
          )}
        </div>
      </div>
    </div>    
  );
}


function BigCard({ players, currentIndex, cardRatio, maxWidth, onFlip }) {
  const player = players[currentIndex];
  if (!player) return null;

  const w = Math.min(maxWidth, 360);
  const h = w * cardRatio;

  const backImage = "/assets/1.png"; // back
  const roleImages = {
    Associate: "/assets/75.png",
    Author: "/assets/51.png",
    Black_Killer: "/assets/78.png",
    Bulletproof: "/assets/84.png",
    Cannibal: "/assets/12.png",
    Cop: "/assets/69.png",
    Day_Bomber: "/assets/87.png",
    Fog: "/assets/21.png",
    Healer: "/assets/48.png",
    Heretic: "/assets/24.png",
    Jester: "/assets/96.png",
    King: "/assets/63.png",
    Lawyer: "/assets/9.png",
    Librarian: "/assets/54.png",
    Lovers: "/assets/99.png",
    Messenger: "/assets/36.png",
    Mother: "/assets/93.png",
    Muse: "/assets/66.png",
    Night_Bomber: "/assets/90.png",
    Nightbringer: "/assets/18.png",
    Oracle: "/assets/30.png",
    Painter: "/assets/27.png",
    Peasant: "/assets/42.png",
    Poisoner: "/assets/15.png",
    Reader: "/assets/45.png",
    Red_Killer: "/assets/81.png",
    Reflector: "/assets/57.png",
    Spy: "/assets/3.png",
    Stripper: "/assets/60.png",
    Thief: "/assets/6.png",
    Tonguebreaker: "/assets/33.png",
    Witch: "/assets/72.png"
  };

  const frontImage = roleImages[player.role] || backImage;

  return (
    <div style={{ width: w, cursor: "pointer" }} className="card-wrap" onClick={() => onFlip(currentIndex)}>
      <div className={`card ${player.revealed ? "is-flipped" : ""}`} style={{ width: w, height: h }}>
        <img
          src={backImage}
          alt="back"
          className="card-face back rounded-lg shadow-2xl"
          style={{ width: w, height: h }}
        />
        <div
          className="card-face front rounded-lg shadow-2xl"
          style={{
            width: w,
            height: h,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={frontImage}
            alt="front"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }}
          />
        </div>
      </div>
    </div>
  );
}


