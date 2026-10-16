import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      topImage: image(),
      tags: z.array(z.string().min(2).max(10)).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  blog: blogCollection,
};
