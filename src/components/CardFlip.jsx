import React from "react";
import "./CardFlip.css";
import { ROLE_IMAGES } from "./roleImages";

export default function CardFlip({ player }) {
  if (!player) return null;

  return (
    <div className="card-wrap">
      <div className={`card ${player.flipped ? "is-flipped" : ""}`}>
        {/* Back face */}
        <div className="card-face back">
          <img src={ROLE_IMAGES.back} alt="back" />
        </div>

        {/* Front face */}
        <div className="card-face front">
          <img
            src={ROLE_IMAGES[player.role] || ROLE_IMAGES.back}
            alt={player.role}
          />
        </div>
      </div>
    </div>
  );
}
