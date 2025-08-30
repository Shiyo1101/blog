"use client";

import { motion } from "motion/react";

import type { CollectionEntry } from "astro:content";

type BlogCardContentProps = {
  post: CollectionEntry<"blog">;
};

const BlogCardContent = ({ post }: BlogCardContentProps) => {
  return (
    <motion.a
      href={`/blog/${post.slug}`}
      className="flex w-full flex-col gap-4 rounded-lg border-4 border-card-foreground bg-card p-4 shadow-[8px_8px_0_0] transition-shadow hover:shadow-none"
      whileHover={{ y: -5 }}
    >
      <div className="aspect-video overflow-hidden rounded-md bg-background">
        <img
          src={post.data.topImage}
          alt={post.data.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col p-4">
        <h2 className="mb-2 text-xl font-bold">{post.data.title}</h2>
        <p className="text-foreground">{post.data.description}</p>
      </div>
    </motion.a>
  );
};

export default BlogCardContent;
