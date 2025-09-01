import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      topImage: image(),
      tags: z.array(z.string().min(2).max(10)).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  blog: blogCollection,
};
