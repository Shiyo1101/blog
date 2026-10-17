import { cva } from "class-variance-authority";

/** タグ（#astro など）の見た目。リンクにもただの表示にも使う */
export const tagVariants = cva(
  "inline-block border-2 px-2.5 py-0.5 font-display text-sm transition-[background-color,box-shadow] duration-150",
  {
    variants: {
      selected: {
        false:
          "border-tag-border bg-tag text-tag-foreground [a&]:hover:border-border [a&]:hover:shadow-pixel-sm",
        true: "border-tag-foreground bg-tag-foreground text-tag",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);
