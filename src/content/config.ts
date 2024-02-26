import { defineCollection, reference, z } from "astro:content";

const page = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      date: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
        dateUpdated: z
        .string()
        .or(z.date())
        .transform((str) => (str ? new Date(str) : undefined)).optional(),
      thumbnail: image()
        .refine((img) => img.width >= 630, {
          message: "Cover image must be at least 630 pixels wide!",
        })
        .optional(),
      thumbnailAlt: z.string().optional(),
      thumbnailSize: z.string(z.enum(["","passage", "content", "breakout", "full"])).optional(),
      thumbnailCredit: z.string().optional(),
      contentSize: z.string(z.enum(["passage", "content", "breakout", "full"])).optional(),
      status: z.string(z.enum(["draft", "publish"]).default("draft")),
    }),
});

const post = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: reference("author"),
      description: z.string(),
      customExcerpt: z.boolean().optional(),
      // Transform string to Date object
      date: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      dateUpdated: z
        .string()
        .or(z.date())
        .transform((str) => (str ? new Date(str) : undefined)).optional(),
      thumbnail: image()
        .refine((img) => img.width >= 630, {
          message: "Thumbnail image must be at least 630 pixels wide!",
        })
        .optional(),
      thumbnailAlt: z.string().optional(),
      thumbnailSize: z.string(z.enum(["", "passage", "content", "breakout", "full"])).optional(),
      thumbnailCredit: z.string().optional(),
      categories: z.array(z.string()).default(["uncategorized"]),
      tags: z.array(z.string()).default(["others"]),
      status: z.string(z.enum(["draft", "publish"]).default("draft")),
    }),
});

const author = defineCollection({
  type: "content",
  schema: ({ image }) =>
  z.object({
    name: z.string(),
    website: z.string().url().optional(),
    email: z.string().email().optional(),
    description: z.string().optional(),
    type: z.string().default("author"),
    thumbnail: image()
        .refine((img) => img.width >= 100, {
          message: "Thumbnail image must be at least 100 pixels wide!",
        })
.optional(),
	status: z.string(z.enum(["draft", "publish"]).default("draft"))
  }),
});

export const collections = { page, post, author };
