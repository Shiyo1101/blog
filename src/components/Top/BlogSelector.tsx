"use client";

import type { CollectionEntry } from "astro:content";
import { CalendarDaysIcon, ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { IJCharacter, IJTypography } from "@/components/ui/ichigojam";
import { formatDate } from "@/lib/utils";

type BlogSelectorProps = {
  posts: CollectionEntry<"blog">[];
};

const BlogSelector = ({ posts }: BlogSelectorProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="mx-auto w-full max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="border-4 border-card-foreground bg-card p-4 sm:p-6">
        <div className="-mx-2 -mt-2 mb-4 border-2 border-card-foreground bg-primary px-3 py-1">
          <div className="flex items-center justify-between max-md:flex-col">
            <IJTypography as="h2" className="text-sm text-primary-foreground">
              SELECT THE BLOG
            </IJTypography>
            <IJTypography as="p" className="text-xs text-primary-foreground/80">
              {posts.length}POSTS
            </IJTypography>
          </div>
        </div>
        <div className="space-y-2">
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={`/blog/${post.id}`}
              className="block"
              onMouseEnter={() => setSelectedIndex(index)}
              onMouseLeave={() => setSelectedIndex(null)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div
                className={`border-2 p-3 transition-all duration-200 sm:p-4 ${
                  selectedIndex === index
                    ? "border-accent-foreground bg-accent shadow-[4px_4px_0_0] shadow-accent-foreground/30"
                    : "border-card-foreground bg-background"
                } `}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 shrink-0">
                    <motion.div
                      animate={{
                        opacity: selectedIndex === index ? 1 : 0,
                        x: selectedIndex === index ? 0 : -10,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRightIcon
                        size={16}
                        className="text-accent-foreground"
                      />
                    </motion.div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 truncate text-sm font-bold sm:text-base">
                      {post.data.title}
                    </h3>
                    <p className="mb-2 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                      {post.data.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-4">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <CalendarDaysIcon size={12} />
                        {formatDate(post.data.pubDate)}
                      </span>
                      {post.data.tags && post.data.tags.length > 0 && (
                        <div className="flex gap-1">
                          {post.data.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="border border-primary bg-primary/20 px-1 py-0.5 text-xs text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {(() => {
                    const daysSincePublished = Math.floor(
                      (Date.now() - new Date(post.data.pubDate).getTime()) /
                        (1000 * 60 * 60 * 24),
                    );
                    return daysSincePublished <= 7 ? (
                      <motion.div
                        className="shrink-0"
                        animate={{
                          rotate: [0, -5, 5, -5, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        <span className="inline-block border-2 bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground">
                          NEW!
                        </span>
                      </motion.div>
                    ) : null;
                  })()}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        <motion.div
          className="mt-4 border-t-2 border-card-foreground pt-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary/80"
          >
            <IJCharacter characterCodes="▶" />
            <span>VIEW ALL POSTS</span>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogSelector;
