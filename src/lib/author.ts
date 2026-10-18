/** ブログの著者の情報（トップページと記事の著者情報で共通） */
export const AUTHOR = {
  name: "うっちー（Yoshiki Uchida）",
  bio: "福井県鯖江市に生まれたWebエンジニア。高校生の時に子供向けパソコンであるIchigoJamでプログラミングを初めて学ぶ。趣味はツーリングとゲーム。",
  skills: ["⭐ IchigoJam検定1級", "📚 技術書執筆"],
  book: {
    /** 狭い画面ではシリーズ名と書名で改行する */
    titleLines: ["FOR文と配列にチャレンジする", "Hana道場式プログラミング"],
    url: "https://hanadojo.official.ec/items/90694010",
  },
} as const;
