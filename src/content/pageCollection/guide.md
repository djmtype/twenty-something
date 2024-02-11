---
title: Guide
date: 2022-07-15
description: Instructions on how to use the Twenty Something theme
status: publish
dateUpdated: 2024-01-11
---

## Overview

For as long as memory serves, Wordpress has been the _defacto_ content management tool. Now, twenty-something years later, you may not need Wordpress. In fact, your site could be less expensive to run, and more secure without it. The purpose of this tutorial is to migrate your current Wordpress posts into markdown files.

Understand, this option isn't intended for everyone. If your current Wordpress site relies heavily on Gutenberg layouts or some other page builder, it may be best to move on. However, if your site is mainly content-driven, this might be worth checking out.

It should be obvious, this theme can be used whether you're migrating out of Wordpress or not.

> [!info] Grab the Goods
> Skip the migration process; get the theme.
>
> - [Download the Twenty-Something theme](https://github.com/djmtype/twenty-something)
> - [More information about the theme](#about-the-theme)

## Getting Started

A small number of CLI tools and plugins exist to transform Wordpress content to markdown files. However, using [**WP Gatsby Markdown Exporter**](https://wordpress.org/plugins/wp-gatsby-markdown-exporter/) makes exporting content a breeze. First and foremost, gloss over the plugin's name, especially, that _Gatsby_ part. Next, ignore the warning for not being compliant with Wordpress 6.4.x. This plugin still works today. It exports pages, posts, and other post types as markdown files.

Install and activate the **WP Gatsby Markdown Exporter** plugin in your Wordpress site like any other plugin.

Find and press the _Export to Gatsby_ link in the sidebar.

On the _Export to Gatsby_ settings screen:

1.  Make sure the _posts_ and _pages_ post types' checkboxes have been ticked.
2.  Find the _Export date format_ field. The format needs to be changed to `Y-m-d`.
3.  Under _Exclude fields_, add `id`, `footnotes`, and `post_format`.
4.  Under _Change field name_, add `permalink,slug`, and on the next line `excerpt,description`.
5.  Tick the box next to _Create post type directories_.
6.  Change any other options that might be specific to your site.
7.  Press the button, _Download zip file_, and save to your device.

After unzipping the file, `post`, `page` and `uploads` directories will be listed among any other post types that were exported.

Notice a lack of an `author` post type? Adding `author` content will be addressed further on in this tutorial.

Opening one of the `post` markdown files in your code editor should appear similar to the following:

```markdown
---
title: "Hello world!"
date: 2024-01-23
status: publish
author: john-doe
type: post
thumbnail: ../../uploads/2024/01/fpo-image.jpg
category:
  - News
tag:
  - updates
slug: /hello-world
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
---

## And Hello to You!

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

![a city landscape in the rain](../../uploads/2024/01/fpo-image.jpg)

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

For now, put these files aside. We'll revisit them after this next step.

---

## Add _Twenty-Something_ to Your Life

Although, this part is entirely optional, cloning the _Twenty-Something_ theme provides a good jumping-off point.

_Twenty-Something_ is an Astro-based theme. Content collections for posts, pages, and authors has already been pre-configured along side [Front Matter CMS](https://frontmatter.codes).

Download or clone the _Twenty-Something_ theme.  
[Link for the _Twenty-Something_ repository](https://github.com/djmtype/twenty-something)

Open the _Twenty-Something_ project folder on your device.

Transfer the exported markdown files from earlier to the corresponding `post` and `page` directories found within `src/content`.

Place any image files inside `src/assets/uploads`.

From your code editor, open the _Twenty-Something_ project.

Use your editor's global find/replace feature.

> [!tip] Using Visual Studio Code?
> Open Find/Replace with the following shortcut:  
> 
> <kbd>Shift</kbd>+<kbd>Command</kbd>+<kbd>H</kbd> (MacOS)
>
> <kbd>Shift</kbd>+<kbd>Control</kbd>+<kbd>H</kbd> (Windows)

Search: `../../uploads`  
Replace: `../../assets/uploads`

The `slug` field will also require modification. Essentially, the values for this field will need to be altered from absolute to relative paths. Once again, utilize _Replace in Files_.

Search: `slug: /`  
Replace: `slug: `

> [!note] Note
> Be sure to include a space after the colon in _slug_.

---

### Project Structure

Some prominent parts of this theme:

```
/
├── src/
│   ├── assets/
│   │   ├── uploads/
│   ├── content/
│   │   ├── pageCollection/
│   │   ├── postCollection/
│   │   ├── authorCollection/
│   ├── data/
│   │   ├── config.json
│   │   ├── navigation.json
│   │   ├── tokens.json
├── frontmatter.json
```

---

## About the Theme

### Design

Not much original thought went into the visual design itself as it was heavily based on some variation of Wordpress' 2024 theme. Per visual example – [the original archive page](https://2024.wordpress.net/index.php/category/architecture/). A Comparison to [Twenty-Something's archive page](https://twenty-something.netlify.app/category/category-two/). Purposely, the design is _not_ one-to-one.

### Style Tokens

[Open Props](https://open-props.style/) has been utilized for its design tokens. Meanwhile, a few alias tokens were "invented" for consistency.

### Web Framework

[Astro](https://astro.build) has been chosen to power this theme because "Astro powers the world's fastest websites, client-side web apps, dynamic API endpoints, and everything in-between."

### Reactivity

[AlpineJS](https://alpinejs.dev/) was the chosen preference when it came to any client-side interactions.

### Content Management

[Front Matter CMS](https://frontmatter.codes) can be added for managing content within VS Code. Configuration has been set up to incorporate pages and posts collections, along with site settings.

[Instructions: Front Matter with Twenty-Something](#management-with-front-matter)

---

## Management with Front Matter
