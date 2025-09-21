// src/components/Deck.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import "./Deck.css";
import { ROLE_IMAGES } from "./roleImages"; // adjust path if your file is elsewhere

export default function Deck({ players = [] }) {
  // Build deck: for each player -> [back, roleImage] so deck length == players.length * 2
  const deckCards = useMemo(
    () =>
      players.flatMap((p) => [
        ROLE_IMAGES.back,
        getRoleImage(p.role),
      ]),
    [players]
  );

  function getRoleImage(role) {
    if (!role) return ROLE_IMAGES.back;
    if (ROLE_IMAGES[role]) return ROLE_IMAGES[role];

    // try normalization: replace spaces/uppercase etc.
    const normalized = String(role).replace(/\s+/g, "_");
    if (ROLE_IMAGES[normalized]) return ROLE_IMAGES[normalized];

    const entry = Object.entries(ROLE_IMAGES).find(
      ([k]) =>
        k.toLowerCase() === String(role).toLowerCase() ||
        k.toLowerCase() === normalized.toLowerCase()
    );
    if (entry) return entry[1];

    return ROLE_IMAGES.back;
  }

  // Spring helpers
  const to = (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 50,
    opacity: 1,
  });
  const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000, opacity: 0 });
  const trans = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

  // track gone cards
  const [gone] = useState(() => new Set());

  // create springs (one per deck card)
  const [springs, api] = useSprings(deckCards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  // re-init when deck changes
  useEffect(() => {
    api.start((i) => ({ ...to(i), from: from(i) }));
    gone.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckCards.length]);

  // drag handler
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2; // flick threshold
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);

      api.start((i) => {
        if (i !== index) return;
        const isGone = gone.has(index);
        const x = isGone ? (dir * (window.innerWidth + 400)) : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.08 : 1;
        const opacity = isGone ? 0 : 1;
        return {
          x,
          rot,
          scale,
          opacity,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });

      // NOTE: no auto-reset; deck stops after the first loop (gone keeps items removed)
    },
    { filterTaps: true }
  );

  return (
    <div className="deck-wrapper">
      {springs.map(({ x, y, rot, scale, opacity }, i) => (
        <animated.div
          key={i}
          className="deck"
          style={{
            // x and y are spring values that will translate the wrapper
            x,
            y,
            // make sure earlier items are on top: index 0 -> highest z-index
            zIndex: deckCards.length - i,
            touchAction: "none",
          }}
        >
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url("${deckCards[i]}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity,
              // when opacity -> 0 make it non-interactive
              pointerEvents: opacity.to((o) => (o < 0.02 ? "none" : "auto")),
            }}
            role="presentation"
          />
        </animated.div>
      ))}
    </div>
  );
}
