/**
 * IchigoJamにおけるカーソルの文字コード
 * @type {string}
 */
export const IchigoJamCharacterOfCursor = "ƒ";

/**
 * IchigoJamの文字コードを定義するオブジェクト
 * @type {Object}
 * @property {string} ArrowLeft - 左矢印
 * @property {string} ArrowRight - 右矢印
 * @property {string} ArrowUp - 上矢印
 * @property {string} ArrowDown - 下矢印
 * @property {string} Spade - スペード
 * @property {string} Heart - ハート
 * @property {string} Club - クラブ
 * @property {string} Diamond - ダイヤ
 * @property {string} Circle - 円
 * @property {string} Ball - ボール
 * @property {string} Ten - 十
 * @property {string} RiceBall - おにぎり
 * @property {string} Cat - 猫
 * @property {string} Jellyfish - クラゲ
 * @property {string} Note - 音符
 * @property {string} AtMark
 * @property {string} Plane - 飛行機
 * @property {string} UFO - UFO
 * @property {string} Beam - ビーム
 * @property {string} Helicopter - ヘリコプター
 * @property {string} Virus - ウイルス
 * @property {string} Coin - コイン
 * @property {string} TreasureBox - 宝箱
 * @property {string} UpStairs - 上り階段
 * @property {string} DownStairs - 下り階段
 * @property {string} Human - 人間
 * @property {string} StandingHuman - 立っている人間
 * @property {string} RunningHumanRight - 右に走る人間
 * @property {string} SquareBracketLeft - 左角括弧
 * @property {string} RunningHumanLeft - 左に走る人間
 * @property {string} SquareBracketRight - 右角括弧
 * @property {string} Strawberry - いちご
 */
export const IJCharacterCodes = {
  ArrowLeft: "Ǡ",
  ArrowRight: "ǡ",
  ArrowUp: "Ǣ",
  ArrowDown: "ǣ",
  Spade: "Ǥ",
  Heart: "ǥ",
  Club: "Ǧ",
  Diamond: "ǧ",
  Circle: "Ǩ",
  Ball: "ǩ",
  Ten: "Ǫ",
  RiceBall: "ǫ",
  Cat: "Ǭ",
  Jellyfish: "ǭ",
  Note: "Ǯ",
  AtMark: "ǯ",
  Plane: "ǰ",
  UFO: "Ǳ",
  Beam: "ǲ",
  Helicopter: "ǳ",
  Virus: "Ǵ",
  Coin: "ǵ",
  TreasureBox: "Ƕ",
  UpStairs: "Ƿ",
  DownStairs: "Ǹ",
  Human: "ǹ",
  StandingHuman: "Ǻ",
  RunningHumanRight: "ǻ",
  SquareBracketLeft: "Ǽ",
  RunningHumanLeft: "ǽ",
  SquareBracketRight: "Ǿ",
  Strawberry: "ǿ",
} as const;

export type IJCharacterCode = keyof typeof IJCharacterCodes;
