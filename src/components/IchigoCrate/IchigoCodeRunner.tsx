import type { IchigoCrateHandle } from "ichigocrate-react";
import { PlayIcon, RotateCcwIcon, SquareIcon, XIcon } from "lucide-react";
import { useId, useRef, useState } from "react";

import { IchigoScreen, runProgram } from "./IchigoScreen";
import { Button } from "@/components/ui/button";

type IchigoCodeRunnerProps = {
  /** 実行するプログラム */
  code: string;
  /** コードブロックの見出し（画面のアクセシブルな名前に使う） */
  title: string;
};

/** コードブロックの下に表示する実行ボタンと、押したときに開くエミュレータ */
const IchigoCodeRunner = ({ code, title }: IchigoCodeRunnerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleRef = useRef<IchigoCrateHandle | null>(null);
  const screenId = useId();

  const close = () => {
    handleRef.current = null;
    setIsOpen(false);
  };

  return (
    <div className="space-y-4 border-t-2 border-card-foreground p-4">
      <div className="flex flex-wrap gap-3">
        {isOpen ? (
          <>
            <Button
              size="sm"
              onClick={() => {
                if (handleRef.current) {
                  runProgram(handleRef.current, code);
                }
              }}
            >
              <RotateCcwIcon aria-hidden="true" />
              最初から実行
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleRef.current?.break()}
            >
              <SquareIcon aria-hidden="true" />
              停止
            </Button>
            <Button
              size="sm"
              variant="outline"
              aria-expanded="true"
              aria-controls={screenId}
              onClick={close}
            >
              <XIcon aria-hidden="true" />
              閉じる
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            aria-expanded="false"
            aria-controls={screenId}
            onClick={() => setIsOpen(true)}
          >
            <PlayIcon aria-hidden="true" />
            実行
          </Button>
        )}
      </div>
      <div id={screenId}>
        {isOpen && (
          <IchigoScreen
            label={`${title} の実行画面`}
            defaultProgram={code}
            autoRun
            onReady={(handle) => {
              handleRef.current = handle;
            }}
          />
        )}
      </div>
    </div>
  );
};

export default IchigoCodeRunner;
