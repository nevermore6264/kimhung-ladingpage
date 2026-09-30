"use client";

import { useSpring, animated } from "@react-spring/web";

export function SpringLift({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [style, api] = useSpring(() => ({ y: 0, scale: 1 }));

  function enter() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    api.start({ y: -8, scale: 1.015 });
  }

  function leave() {
    api.start({ y: 0, scale: 1 });
  }

  return (
    <animated.article
      style={style}
      onPointerEnter={enter}
      onPointerLeave={leave}
      className={className}
    >
      {children}
    </animated.article>
  );
}
