# Twenty Something Theme

### From Wordpress to Astro 

An Astro template loosely based on Wordpress' Twenty Twenty-Four theme. Uses [Open Props](https://open-props.style/) for styling. Includes optional [FrontMatter CMS](https://frontmatter.codes/) integration. 

[Read the Guide](https://twenty-something.netlify.app/guide)

Features:

- [x] SEO-friendly with canonical URLs and OpenGraph data
- [x] Sitemap support
- [x] RSS Feed support
- [x] Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   └── utils/
├── astro.config.ts
├── frontmatter.json
├── generateStyle.mjs
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Learn more about Astro

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

---

## ✅ Todo 

- [ ] Add page transitions
- [ ] Add OpenGraph image based on featured image
- [ ] Add basic search
- [ ] Add [Web3 form](https://web3forms.com/)