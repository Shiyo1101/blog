"use client";

import { CalendarDaysIcon, ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import type { CollectionEntry } from "astro:content";

import { IJCharacter } from "@/components/ui/ichigojam";
import { formatDate } from "@/lib/utils";

type BlogSelectorProps = {
  posts: CollectionEntry<"blog">[];
};

const BlogSelector = ({ posts }: BlogSelectorProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="bg-card border-4 border-card-foreground p-4 sm:p-6">
        <div className="bg-primary border-2 border-card-foreground -mx-2 -mt-2 px-3 py-1 mb-4">
          <div className="flex items-center justify-between max-md:flex-col">
            <IJCharacter
              as="h3"
              className="text-primary-foreground text-sm"
              characterCodes="SELECT THE BLOG"
            />
            <IJCharacter
              as="p"
              className="text-xs text-primary-foreground/80"
              characterCodes={`${posts.length}POSTS`}
            />
          </div>
        </div>
        <div className="space-y-2">
          {posts.map((post, index) => (
            <motion.a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block"
              onMouseEnter={() => setSelectedIndex(index)}
              onMouseLeave={() => setSelectedIndex(null)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div
                className={`
                  border-2 p-3 sm:p-4 transition-all duration-200
                  ${
                    selectedIndex === index
                      ? "bg-accent border-accent-foreground shadow-[4px_4px_0_0] shadow-accent-foreground/30"
                      : "bg-background border-card-foreground"
                  }
                `}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 flex-shrink-0">
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
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm sm:text-base mb-1 truncate">
                      {post.data.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">
                      {post.data.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <CalendarDaysIcon size={12} />
                        {formatDate(post.data.pubDate)}
                      </span>
                      {post.data.tags && post.data.tags.length > 0 && (
                        <div className="flex gap-1">
                          {post.data.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-1 py-0.5 bg-primary/20 text-primary border border-primary text-xs"
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
                        className="flex-shrink-0"
                        animate={{
                          rotate: [0, -5, 5, -5, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        <span className="inline-block px-2 py-1 bg-destructive text-destructive-foreground text-xs font-bold border-2">
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
          className="mt-4 pt-3 border-t-2 border-card-foreground text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
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
