import type { IchigoCrateHandle } from "ichigocrate-react";
import { Close, Play, Reload, Stop } from "pixelarticons/react";
import { useEffect, useId, useRef, useState } from "react";

import { IchigoScreen, runProgram } from "./IchigoScreen";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type IchigoCodeRunnerProps = {
  /** 実行するプログラム */
  code: string;
  /** コードブロックの見出し（画面のアクセシブルな名前に使う） */
  title: string;
};

/**
 * コードブロックの実行ボタンと、押したときに開くエミュレータ。
 * 親の figure のグリッドに直接並ぶよう、要素は 2 つに分けて返す
 * （閉じているときは見出しの行に「実行」、開いているときはコードの下に操作と画面）
 */
const IchigoCodeRunner = ({ code, title }: IchigoCodeRunnerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleRef = useRef<IchigoCrateHandle | null>(null);
  const runButtonRef = useRef<HTMLButtonElement | null>(null);
  const restartButtonRef = useRef<HTMLButtonElement | null>(null);
  const hasToggledRef = useRef(false);
  const screenId = useId();

  // 開閉でボタンが入れ替わるため、操作を続けられるようフォーカスを移す
  useEffect(() => {
    if (!hasToggledRef.current) {
      return;
    }
    (isOpen ? restartButtonRef : runButtonRef).current?.focus();
  }, [isOpen]);

  const toggle = (open: boolean) => {
    hasToggledRef.current = true;
    if (!open) {
      handleRef.current = null;
    }
    setIsOpen(open);
  };

  return (
    <>
      {!isOpen && (
        <div className="col-start-2 row-start-1 self-center pr-2">
          <Button
            ref={runButtonRef}
            size="sm"
            aria-expanded="false"
            aria-controls={screenId}
            onClick={() => toggle(true)}
          >
            <Play aria-hidden="true" />
            実行
          </Button>
        </div>
      )}
      <div
        id={screenId}
        className={cn(
          "col-span-full row-start-3",
          isOpen && "space-y-4 border-t-2 border-border bg-card p-4",
        )}
      >
        {isOpen && (
          <>
            <div className="flex flex-wrap gap-3">
              <Button
                ref={restartButtonRef}
                size="sm"
                onClick={() => {
                  if (handleRef.current) {
                    runProgram(handleRef.current, code);
                  }
                }}
              >
                <Reload aria-hidden="true" />
                最初から実行
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleRef.current?.break()}
              >
                <Stop aria-hidden="true" />
                停止
              </Button>
              <Button
                size="sm"
                variant="secondary"
                aria-expanded="true"
                aria-controls={screenId}
                onClick={() => toggle(false)}
              >
                <Close aria-hidden="true" />
                閉じる
              </Button>
            </div>
            <IchigoScreen
              label={`${title} の実行画面`}
              defaultProgram={code}
              autoRun
              onReady={(handle) => {
                handleRef.current = handle;
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default IchigoCodeRunner;
