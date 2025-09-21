import React from "react";
import "./CardFlip.css";
import { ROLE_IMAGES } from "./roleImages";

export default function CardFlip({ flipped, backImage, frontImage, onClick }) {
  return (
    <div className="card-flip" onClick={onClick}>
      <div className={`card-inner ${flipped ? "is-flipped" : ""}`}>
        <div className="card-face card-back">
          <img src={backImage} alt="back" />
        </div>
        <div className="card-face card-front">
          <img src={frontImage} alt="front" />
        </div>
      </div>
    </div>
  );
}