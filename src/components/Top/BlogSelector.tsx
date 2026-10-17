"use client";

import type { CollectionEntry } from "astro:content";
import { motion, useReducedMotion } from "motion/react";
import { type KeyboardEvent, useRef } from "react";

import { buttonVariants } from "@/components/ui/button";
import { RetroWindow } from "@/components/ui/retro-window";
import { formatDate } from "@/lib/utils";

/** NEW! を表示する公開後の日数 */
const NEW_POST_DAYS = 7;
const MS_PER_DAY = 1000 * 60 * 60 * 24;
/** 1 件に表示するタグの最大数 */
const MAX_TAGS = 2;
/** メニューの移動に使うキーと移動量 */
const KEY_OFFSETS: Partial<Record<string, number>> = {
  ArrowDown: 1,
  ArrowUp: -1,
};

type BlogSelectorProps = {
  posts: CollectionEntry<"blog">[];
};

const isNewPost = (pubDate: Date) =>
  Math.floor((Date.now() - new Date(pubDate).getTime()) / MS_PER_DAY) <=
  NEW_POST_DAYS;

/** ゲームのメニュー風の記事一覧。↑↓ で項目を移動し、Enter で開く */
const BlogSelector = ({ posts }: BlogSelectorProps) => {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion() === true;

  const moveFocus = (
    event: KeyboardEvent<HTMLAnchorElement>,
    current: number,
  ) => {
    const offset = KEY_OFFSETS[event.key];
    if (offset === undefined) {
      return;
    }
    event.preventDefault();
    const next = (current + offset + posts.length) % posts.length;
    linkRefs.current[next]?.focus();
  };

  return (
    <RetroWindow title="SELECT POST" className="w-full" bodyClassName="p-2">
      <ul className="space-y-1">
        {posts.map((post, index) => (
          <li key={post.id}>
            <a
              ref={(element) => {
                linkRefs.current[index] = element;
              }}
              href={`/blog/${post.id}`}
              onKeyDown={(event) => moveFocus(event, index)}
              className="group flex items-start gap-2 px-3 py-3 outline-offset-0 transition-colors duration-150 hover:bg-inset focus-visible:bg-inset"
            >
              <span
                aria-hidden="true"
                className="font-display text-success opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                ▶
              </span>
              <span className="min-w-0 flex-1 space-y-1.5">
                <span className="block font-display text-foreground group-hover:text-foreground-strong group-focus-visible:text-foreground-strong">
                  {post.data.title}
                </span>
                <span className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <time dateTime={post.data.pubDate.toISOString()}>
                    {formatDate(post.data.pubDate)}
                  </time>
                  {post.data.tags?.slice(0, MAX_TAGS).map((tag) => (
                    <span
                      key={tag}
                      className="border-2 border-tag-border bg-tag px-2 font-display text-tag-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </span>
              </span>
              {isNewPost(post.data.pubDate) && (
                <motion.span
                  className="shrink-0 border-2 border-border bg-highlight px-2 py-0.5 font-display text-sm text-foreground-strong"
                  animate={
                    prefersReducedMotion ? {} : { rotate: [0, -5, 5, -5, 0] }
                  }
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  NEW!
                </motion.span>
              )}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t-2 border-border-subtle px-3 pt-3 pb-1">
        <p className="hidden text-sm text-muted-foreground md:block">
          ↑↓ で選択 / Enter で開く
        </p>
        <a
          href="/blog"
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          VIEW ALL POSTS ▶
        </a>
      </div>
    </RetroWindow>
  );
};

export default BlogSelector;
