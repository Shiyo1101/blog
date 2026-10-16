"use client";

import { type FC, type ReactNode, useEffect, useRef } from "react";

/** 1フレームあたりの想定時間（ms） */
const FRAME_DURATION_MS = 16;
/** 1フレームあたりに加算する重力加速度 */
const GRAVITY = 0.5;
/** リサイズ処理を間引く時間（ms） */
const RESIZE_DEBOUNCE_MS = 100;
/** 1回のクリックで最低限飛び散るブロック数 */
const MIN_SHATTER_BLOCK_COUNT = 5;
/** ブロックの最小サイズ（px） */
const MIN_SHATTER_BLOCK_SIZE = 2;
/** 飛び散る速度の倍率 */
const SPEED_SCALE = 0.2;
/** 飛び散る際の上向きの初速 */
const INITIAL_UPWARD_VELOCITY = 3;

type ClickShatterBlockProps = {
  shatterBlockSize?: number;
  shatterBlockRadius?: number;
  shatterBlockCount?: number;
  duration?: number;
  extraScale?: number;
  children?: ReactNode;
};

type ShatterBlock = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  startTime: number;
};

// 現在のテーマの前景色(--foreground)を取得
const getForegroundColor = () =>
  getComputedStyle(document.documentElement)
    .getPropertyValue("--foreground")
    .trim();

const ClickShatterBlock: FC<ClickShatterBlockProps> = ({
  shatterBlockSize = 8,
  shatterBlockRadius = 30,
  shatterBlockCount = 10,
  duration = 500,
  extraScale = 1,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shatterBlocksRef = useRef<ShatterBlock[]>([]);
  // 描画ループから参照するため、色は state ではなく ref で保持する
  const shatterBlockColorRef = useRef("#fff");

  // テーマ変更を検知して色を更新する
  useEffect(() => {
    shatterBlockColorRef.current = getForegroundColor();

    const observer = new MutationObserver(() => {
      shatterBlockColorRef.current = getForegroundColor();
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
    const parent = canvas?.parentElement;
    if (!canvas || !parent) {
      return;
    }

    let resizeTimeout: NodeJS.Timeout | undefined;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, RESIZE_DEBOUNCE_MS);
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
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    let animationId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shatterBlocksRef.current = shatterBlocksRef.current.filter(
        (shatterBlock) => {
          shatterBlock.x += shatterBlock.vx;
          shatterBlock.vy += GRAVITY;
          shatterBlock.y += shatterBlock.vy;
          shatterBlock.life -= 1;

          if (shatterBlock.life <= 0) {
            return false;
          }

          const progress = shatterBlock.life / (duration / FRAME_DURATION_MS);
          ctx.globalAlpha = Math.max(0, progress);
          ctx.fillStyle = shatterBlockColorRef.current;
          ctx.fillRect(
            shatterBlock.x,
            shatterBlock.y,
            shatterBlock.size,
            shatterBlock.size,
          );
          ctx.globalAlpha = 1;

          return true;
        },
      );

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [duration]);

  // 装飾目的のクリック演出のため、操作要素としての onClick ではなくネイティブのリスナーで登録する
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const now = performance.now();
      // 飛び散る数をランダムにする
      const numShatterBlocks =
        Math.floor(Math.random() * shatterBlockCount) + MIN_SHATTER_BLOCK_COUNT;

      const newShatterBlocks: ShatterBlock[] = Array.from(
        { length: numShatterBlocks },
        () => {
          const angle = Math.random() * 2 * Math.PI;
          const speed = Math.random() * shatterBlockRadius * extraScale;
          return {
            x,
            y,
            vx: Math.cos(angle) * speed * SPEED_SCALE,
            vy: Math.sin(angle) * speed * SPEED_SCALE - INITIAL_UPWARD_VELOCITY,
            size: Math.random() * shatterBlockSize + MIN_SHATTER_BLOCK_SIZE,
            life: duration / FRAME_DURATION_MS,
            startTime: now,
          };
        },
      );

      shatterBlocksRef.current.push(...newShatterBlocks);
    };

    container.addEventListener("pointerdown", handlePointerDown);

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [
    shatterBlockCount,
    shatterBlockRadius,
    shatterBlockSize,
    extraScale,
    duration,
  ]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto relative h-full w-full"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
      />
      {children}
    </div>
  );
};

export default ClickShatterBlock;
