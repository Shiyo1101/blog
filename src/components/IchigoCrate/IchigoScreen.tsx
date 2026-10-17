import type { IchigoCrateHandle } from "ichigocrate-react";
import { type CSSProperties, lazy, Suspense } from "react";

// wasm を同梱した大きなモジュールのため、エミュレータを表示するときに初めて読み込む
const IchigoCrate = lazy(async () => {
  const { IchigoCrate: component } = await import("ichigocrate-react");
  return { default: component };
});

/** IchigoJam の論理画面の縦横比（256×192） */
const SCREEN_ASPECT_RATIO = "4 / 3";
/** canvas の枠線の太さ（px）。ライブラリの既定値に合わせる */
const SCREEN_BORDER_WIDTH_PX = 8;

// ライブラリは scale に応じた固定サイズを指定するため、記事の幅に合わせて縮むよう上書きする
const SCREEN_STYLE: CSSProperties = {
  width: `calc(100% - ${SCREEN_BORDER_WIDTH_PX * 2}px)`,
  height: "auto",
  aspectRatio: SCREEN_ASPECT_RATIO,
};

type IchigoScreenProps = {
  /** 画面（canvas）のアクセシブルな名前 */
  label: string;
  /** 起動時に読み込むプログラム */
  defaultProgram?: string;
  /** 起動時にプログラムを実行するか */
  autoRun?: boolean;
  /** 外部から操作できるようになったときに呼ばれる（画面を表示するだけなら不要） */
  onReady?: (handle: IchigoCrateHandle) => void;
};

/** IchigoJam BASIC のエミュレータ画面 */
export const IchigoScreen = ({
  label,
  defaultProgram,
  autoRun = false,
  onReady,
}: IchigoScreenProps) => (
  <div className="space-y-2">
    <Suspense
      fallback={
        <div
          className="flex w-full items-center justify-center bg-screen font-ichigojam text-base text-screen-foreground"
          style={{ aspectRatio: SCREEN_ASPECT_RATIO }}
        >
          LOADING...
        </div>
      }
    >
      <IchigoCrate
        aria-label={label}
        defaultProgram={defaultProgram}
        autoRun={autoRun}
        onReady={onReady}
        persist={false}
        captureTab={false}
        style={SCREEN_STYLE}
      />
    </Suspense>
    <p className="text-sm text-muted-foreground">
      画面をクリックするとキーボードで入力できます（Esc で停止、Tab
      で画面の外へ移動）
    </p>
  </div>
);

/** 実行中のプログラムを止め、画面とプログラムを初期化してから code を実行する */
export const runProgram = (handle: IchigoCrateHandle, code: string) => {
  handle.break();
  handle.reset();
  handle.loadProgram(code);
  handle.run();
};
