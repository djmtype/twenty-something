import { defineCollection, reference, z } from 'astro:content';


const pageCollection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		date: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		thumbnail: image().refine((img) => img.width >= 630, {
      message: "Cover image must be at least 630 pixels wide!",
    }).optional(),
		thumbnailAlt: z.string().optional(),
		status: z.string(z.enum(["draft", "publish"]).default("draft"))
	}),
});

const postCollection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		author: reference('authorCollection'),
		description: z.string(),
		// Transform string to Date object

		date: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		thumbnail: image().refine((img) => img.width >= 630, {
      message: "Thumbnail image must be at least 630 pixels wide!",
    }).optional(),
		thumbnailAlt: z.string().optional(),
		categories: z.array(z.string().optional()).optional(),
		tags: z.array(z.string().optional()).default(["others"]),
		status: z.string(z.enum(["draft", "publish"]).default("draft"))
	}),
});


const authorCollection = defineCollection({
	type: 'content',
	schema: z.object({
	  name: z.string(),
	  portfolio: z.string().url().optional(),
		  description: z.string().optional(),
		  type: z.string().default("author")
	})
  });

export const collections = { pageCollection, postCollection, authorCollection };
