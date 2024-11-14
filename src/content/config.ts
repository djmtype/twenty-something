import { file } from "astro/loaders";
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
        .transform((str) => (str ? new Date(str) : undefined))
        .optional(),
      thumbnail: image()
        .refine((img) => img.width >= 630, {
          message: "Cover image must be at least 630 pixels wide!",
        })
        .optional(),
      thumbnailAlt: z.string().optional(),
      thumbnailSize: z
        .string(z.enum(["", "passage", "content", "breakout", "full"]))
        .optional(),
      thumbnailCredit: z.string().optional(),
      contentSize: z
        .string(z.enum(["passage", "content", "breakout", "full"]))
        .optional(),
      status: z.string(z.enum(["draft", "publish"]).default("draft")),
      headings: z
        .array(
          z.object({
            depth: z.number(),
            text: z.string(),
            slug: z.string(),
          }),
        )
        .optional(),
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
        .transform((str) => (str ? new Date(str) : undefined))
        .optional(),
      thumbnail: image()
        .refine((img) => img.width >= 630, {
          message: "Thumbnail image must be at least 630 pixels wide!",
        })
        .optional(),
      thumbnailAlt: z.string().optional(),
      thumbnailSize: z
        .string(z.enum(["", "passage", "content", "breakout", "full"]))
        .optional(),
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
      status: z.string(z.enum(["draft", "publish"]).default("draft")),
    }),
});

const configuration = defineCollection({
  loader: file("./src/data/configuration.json"),
  schema: () =>
    z.object({
      id: z.string(),
      site: z.object({
        title: z.string(),
        description: z.string(),
        url: z.string().url(),
        language: z.string(),
        country: z.string().length(2),
        favicon: z.string(),
        tagline: z.string(),
      }),
      metadata: z.object({
        ogTitle: z.string(),
        ogImage: z.object({
          url: z.string(),
          alt: z.string(),
          width: z.number(),
          height: z.number(),
        }),
        ogDescription: z.string(),
        ogType: z.string(),
        twitter: z.object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string(),
        }),
        robots: z.object({
          index: z.boolean(),
          follow: z.boolean(),
        }),
      }),
      logo: z.object({
        image: z.string(),
        imageDarkMode: z.string(),
        height: z.number(),
        width: z.number(),
      }),
      home: z.object({
        blogPageSize: z.number(),
      }),
      blog: z.object({
        title: z.string(),
        description: z.string(),
        pageSize: z.number(),
        excerptWordLength: z.number(),
      }),
      footer: z.object({
        description: z.string(),
        copyrightMessage: z.string(),
        copyrightYear: z.union([z.boolean(), z.number()]),
      }),
    }),
})

export const collections = { page, post, author, configuration };
