import type { IchigoCrateHandle } from "ichigocrate-react";
import { Play, Power, Stop, Undo } from "pixelarticons/react";
import { useId, useRef, useState } from "react";

import { IchigoScreen, runProgram } from "./IchigoScreen";
import { Button } from "@/components/ui/Button";

type IchigoPlaygroundProps = {
  /** エディタに最初に表示するプログラム */
  code: string;
  /** プレイグラウンドの見出し */
  title: string;
  /** 表示時にプログラムを実行するか */
  autoRun?: boolean;
};

/** プログラムを編集して IchigoJam BASIC で実行できるプレイグラウンド */
const IchigoPlayground = ({
  code: initialCode,
  title,
  autoRun = false,
}: IchigoPlaygroundProps) => {
  const [code, setCode] = useState(initialCode);
  const handleRef = useRef<IchigoCrateHandle | null>(null);
  const editorId = useId();

  return (
    <div className="space-y-4 p-5">
      <div className="space-y-2">
        <label htmlFor={editorId} className="block font-display text-sm">
          プログラム
        </label>
        <textarea
          id={editorId}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={Math.max(code.split("\n").length + 1, 4)}
          spellCheck={false}
          autoCapitalize="characters"
          autoComplete="off"
          className="w-full resize-y border-2 border-border bg-screen p-3 font-ichigojam text-base leading-relaxed text-screen-foreground caret-screen-accent outline-none focus-visible:shadow-focus"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          size="sm"
          onClick={() => {
            if (handleRef.current) {
              runProgram(handleRef.current, code);
            }
          }}
        >
          <Play aria-hidden="true" />
          実行
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
          onClick={() => handleRef.current?.reset()}
        >
          <Power aria-hidden="true" />
          リセット
        </Button>
        <Button
          size="sm"
          variant="secondary"
          disabled={code === initialCode}
          onClick={() => setCode(initialCode)}
        >
          <Undo aria-hidden="true" />
          元のプログラムに戻す
        </Button>
      </div>

      <IchigoScreen
        label={`${title} の実行画面`}
        defaultProgram={initialCode}
        autoRun={autoRun}
        onReady={(handle) => {
          handleRef.current = handle;
        }}
      />
    </div>
  );
};

export default IchigoPlayground;
