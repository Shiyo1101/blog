// プロジェクト固有の lint ルールを定義する oxlint 用 JS プラグイン
import { definePlugin, defineRule, type ESTree } from "@oxlint/plugins";

const ALLOWED_SUPER_CLASS_SUFFIX = "Error";

const isCustomError = (node: ESTree.Class): boolean =>
  node.superClass?.type === "Identifier" &&
  node.superClass.name.endsWith(ALLOWED_SUPER_CLASS_SUFFIX);

/**
 * class 構文を禁止する。
 * instanceof での判定が必要なカスタムエラー（Error を継承するクラス）のみ許可する。
 */
const noClass = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "class の使用を禁止する（Error を継承するカスタムエラーのみ許可）",
    },
    messages: {
      noClass:
        "class は使用せず、関数とオブジェクトで実装してください（Error を継承するカスタムエラーのみ許可）。",
    },
    schema: [],
  },
  create(context) {
    const report = (node: ESTree.Class): void => {
      if (isCustomError(node)) {
        return;
      }
      context.report({ node, messageId: "noClass" });
    };

    return {
      ClassDeclaration: report,
      ClassExpression: report,
    };
  },
});

export default definePlugin({
  meta: {
    name: "project",
  },
  rules: {
    "no-class": noClass,
  },
});
