"use client";

import { useEffect, useState } from "react";

interface SparkProps {
  id: number;
  x: number;
  y: number;
}

export function ClickSpark({
  sparkColor = "var(--primary)",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
}) {
  const [sparks, setSparks] = useState<SparkProps[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      const newSpark = {
        id,
        x: e.clientX,
        y: e.clientY,
      };
      setSparks((prev) => [...prev, newSpark]);
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, duration);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [duration]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {sparks.map((spark) => (
        <Spark
          key={spark.id}
          x={spark.x}
          y={spark.y}
          color={sparkColor}
          size={sparkSize}
          radius={sparkRadius}
          count={sparkCount}
          duration={duration}
        />
      ))}
    </div>
  );
}

interface SparkComponentProps {
  x: number;
  y: number;
  color: string;
  size: number;
  radius: number;
  count: number;
  duration: number;
}

function Spark({ x, y, color, size, radius, count, duration }: SparkComponentProps) {
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const dx = Math.cos(((i * 360) / count * Math.PI) / 180) * radius * 2;
        const dy = Math.sin(((i * 360) / count * Math.PI) / 180) * radius * 2;

        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              width: size,
              height: size,
              left: -size / 2,
              top: -size / 2,
              animation: `spark-animation-${i} ${duration}ms ease-out forwards`,
            } as any}
          />
        );
      })}
      <style jsx>{`
        ${Array.from({ length: count })
          .map(
            (_, i) => {
              const angle = (i * 360) / count;
              const radian = (angle * Math.PI) / 180;
              const dx = Math.cos(radian) * radius * 2;
              const dy = Math.sin(radian) * radius * 2;
              return `
            @keyframes spark-animation-${i} {
              0% { transform: translate(0, 0) scale(1); opacity: 1; }
              100% { transform: translate(${dx}px, ${dy}px) scale(0); opacity: 0; }
            }
          `;
            }
          )
          .join("\n")}
      `}</style>
    </div>
  );
}
