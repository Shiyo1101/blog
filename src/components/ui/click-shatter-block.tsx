import React, { useRef, useEffect } from "react";
import { useState } from "react";

interface ClickShatterBlockProps {
  shatterBlockSize?: number;
  shatterBlockRadius?: number;
  shatterBlockCount?: number;
  duration?: number;
  extraScale?: number;
  children?: React.ReactNode;
}

interface ShatterBlock {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  startTime: number;
}

const ClickShatterBlock: React.FC<ClickShatterBlockProps> = ({
  shatterBlockSize = 8,
  shatterBlockRadius = 30,
  shatterBlockCount = 10,
  duration = 500,
  extraScale = 1.0,
  children,
}) => {
  const [shatterBlockColor, setShatterBlockColor] = useState("#fff");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shatterBlocksRef = useRef<ShatterBlock[]>([]);
  const gravity = 0.5;

  // テーマ変更を検知して色を更新するuseEffect
  useEffect(() => {
    // CSS変数から色を取得する関数
    const getColor = () => {
      // 現在のテーマの前景色(--foreground)を取得
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim();
    };

    setShatterBlockColor(getColor());

    const observer = new MutationObserver(() => {
      setShatterBlockColor(getColor());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: NodeJS.Timeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const draw = (_timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shatterBlocksRef.current = shatterBlocksRef.current.filter(
        (shatterBlock) => {
          shatterBlock.x += shatterBlock.vx;
          shatterBlock.vy += gravity;
          shatterBlock.y += shatterBlock.vy;
          shatterBlock.life -= 1;

          if (shatterBlock.life <= 0) {
            return false;
          }

          const progress = shatterBlock.life / (duration / 16);
          ctx.globalAlpha = Math.max(0, progress);
          ctx.fillStyle = shatterBlockColor;
          ctx.fillRect(
            shatterBlock.x,
            shatterBlock.y,
            shatterBlock.size,
            shatterBlock.size,
          );
          ctx.globalAlpha = 1.0;

          return true;
        },
      );

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [shatterBlockColor, duration]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    // 飛び散る数をランダムにする
    const numShatterBlocks = Math.floor(Math.random() * shatterBlockCount) + 5;

    const newShatterBlocks: ShatterBlock[] = Array.from(
      { length: numShatterBlocks },
      () => {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * shatterBlockRadius * extraScale;
        return {
          x,
          y,
          vx: Math.cos(angle) * speed * 0.2,
          vy: Math.sin(angle) * speed * 0.2 - 3,
          size: Math.random() * shatterBlockSize + 2,
          life: duration / 16,
          startTime: now,
        };
      },
    );

    shatterBlocksRef.current.push(...newShatterBlocks);
  };

  return (
    <div
      className="relative w-full h-full pointer-events-auto"
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      {children}
    </div>
  );
};

export default ClickShatterBlock;
