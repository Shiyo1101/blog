import type { CodeLanguage } from "astro";

type LanguageRegistration = Extract<CodeLanguage, object>;

/** シンタックスハイライトで使う IchigoJam BASIC の言語 ID */
export const ICHIGOJAM_LANGUAGE_ID = "ichigojam";

// キーワードは ichigocrate (IchigoJam v1.5 互換インタプリタ) のトークン定義に合わせる。
// https://github.com/Shiyo1101/ichigocrate/blob/main/core/src/tokens.rs

/** 引数を取る関数（直後に `(` が続く） */
const FUNCTIONS = [
  "USR",
  "ABS",
  "RND",
  "ASC",
  "INKEY",
  "TICK",
  "SCR",
  "PEEK",
  "POINT",
  "IN",
  "ANA",
  "I2CR",
  "I2CW",
  "BTN",
  "POS",
  "SOUND",
  "VPEEK",
  "LEN",
  "FILE",
  "LINE",
  "FREE",
  "VER",
  "IOT.IN",
  "SIN",
  "COS",
  "CHR$",
  "STR$",
  "DEC$",
  "HEX$",
  "BIN$",
];

/** キーコードなどを表す定数 */
const CONSTANTS = ["LEFT", "RIGHT", "UP", "DOWN", "SPACE"];

/** 制御構文 */
const CONTROL_KEYWORDS = [
  "IF",
  "THEN",
  "ELSE",
  "FOR",
  "TO",
  "STEP",
  "NEXT",
  "GOTO",
  "GOSUB",
  "GSB",
  "RETURN",
  "RTN",
  "END",
  "STOP",
  "CONT",
  "RUN",
  "LRUN",
];

/** 論理演算・剰余の演算子 */
const OPERATOR_KEYWORDS = ["AND", "OR", "NOT", "MOD"];

/** 命令（`?` は PRINT、`LC` は LOCATE の省略形） */
const STATEMENTS = [
  "LET",
  "PRINT",
  "?",
  "LOCATE",
  "LC",
  "POKE",
  "SCROLL",
  "COPY",
  "WAIT",
  "OUT",
  "PWM",
  "LED",
  "BEEP",
  "PLAY",
  "TEMPO",
  "UART",
  "SRND",
  "CLT",
  "CLS",
  "CLV",
  "CLK",
  "CLP",
  "CLO",
  "CLEAR",
  "VIDEO",
  "SLEEP",
  "INPUT",
  "DRAW",
  "NEW",
  "LIST",
  "LOAD",
  "SAVE",
  "FILES",
  "RENUM",
  "BPS",
  "SWITCH",
  "OK",
  "HELP",
  "RESET",
  "KBD",
  "DAC",
  "IOT.OUT",
  "WS.LED",
];

const escapeRegExp = (value: string) =>
  value.replaceAll(/[.*+?^${}()|[\]\\]/gu, String.raw`\$&`);

/**
 * キーワードの選択パターンを作る。
 * IchigoJam BASIC は空白を省略でき（例: `IFA=1GOTO10`）、変数名は 1 文字のみのため、
 * 単語境界は使わず、インタプリタのトークナイザーと同じく長いキーワードから順に一致させる。
 */
const keywordPattern = (keywords: readonly string[]) =>
  `(?i)(?:${keywords
    .toSorted((a, b) => b.length - a.length)
    .map((keyword) => escapeRegExp(keyword))
    .join("|")})`;

/** IchigoJam BASIC の TextMate 文法（Shiki で使用） */
export const ichigoJamLanguage: LanguageRegistration = {
  name: ICHIGOJAM_LANGUAGE_ID,
  scopeName: "source.ichigojam",
  displayName: "IchigoJam BASIC",
  patterns: [
    { include: "#comment" },
    { include: "#string" },
    { include: "#line-number" },
    { include: "#label" },
    { include: "#function" },
    { include: "#constant" },
    { include: "#control" },
    { include: "#operator-keyword" },
    { include: "#statement" },
    { include: "#number" },
    { include: "#variable" },
    { include: "#operator" },
  ],
  repository: {
    comment: {
      name: "comment.line.ichigojam",
      match: "(?i)(?:REM|').*$",
    },
    string: {
      name: "string.quoted.double.ichigojam",
      begin: '"',
      end: '"|$',
    },
    "line-number": {
      name: "constant.numeric.line-number.ichigojam",
      match: String.raw`^\s*\d+`,
    },
    label: {
      name: "entity.name.label.ichigojam",
      match: String.raw`@[A-Za-z0-9]+`,
    },
    function: {
      name: "support.function.ichigojam",
      match: `${keywordPattern(FUNCTIONS)}(?=\\s*\\()`,
    },
    constant: {
      name: "constant.language.ichigojam",
      match: keywordPattern(CONSTANTS),
    },
    control: {
      name: "keyword.control.ichigojam",
      match: keywordPattern(CONTROL_KEYWORDS),
    },
    "operator-keyword": {
      name: "keyword.operator.word.ichigojam",
      match: keywordPattern(OPERATOR_KEYWORDS),
    },
    statement: {
      name: "keyword.other.statement.ichigojam",
      match: keywordPattern(STATEMENTS),
    },
    number: {
      name: "constant.numeric.ichigojam",
      // 16 進数（#FF）、2 進数（`101）、10 進数
      match: `#[0-9A-Fa-f]+|\`[01]+|\\d+`,
    },
    variable: {
      name: "variable.other.ichigojam",
      match: "[A-Za-z]",
    },
    operator: {
      name: "keyword.operator.ichigojam",
      match: String.raw`==|!=|<>|><|<=|>=|<<|>>|&&|\|\||[-+*/%=<>&|^~!]`,
    },
  },
};
