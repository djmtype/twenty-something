---
title: From WP to MD
date: 2022-07-15
description: Instructions on how to export Wordpress documents to Markdown files
status: publish
dateUpdated: 2024-01-11
---

## TL;TR

- Export your Wordpress content as markdown files using a plugin, [**WP Gatsby Markdown Exporter**](https://wordpress.org/plugins/wp-gatsby-markdown-exporter/). 
- Use [Astro](https://astro.build) with [*Twenty-Something*](https://github.com/djmtype/twenty-something), a pre-configured theme, to build your site.
- Optionally, add [*Front Matter CMS*](https://frontmatter.codes) to VS Code to manage your site's content.

## Overview

For as long as memory serves, Wordpress has been the _defacto_ content management tool. Now, twenty-something years later, you may not need Wordpress. In fact, your site could be less expensive to run, and more secure without it. The purpose of this tutorial is to migrate your current Wordpress content into markdown files.

Understand, this option isn't intended for everyone. Should your current Wordpress site rely heavily on Gutenberg's layouts or some other page builder, it may be best to move on. However, if your site is mainly content-driven, this approach might be worthy of consideration. 

## Getting Started

A small number of CLI tools and plugins exist to transform Wordpress content to markdown files. However, using [**WP Gatsby Markdown Exporter**](https://wordpress.org/plugins/wp-gatsby-markdown-exporter/) makes exporting content a breeze. First and foremost, gloss over the plugin's name, especially, that _Gatsby_ part. Also, ignore the warning for not being compliant with Wordpress 6.4.x. This plugin still works today. 

Install and activate the **WP Gatsby Markdown Exporter** plugin in your Wordpress site like any other.

Find and press the _Export to Gatsby_ link in the sidebar.

On the _Export to Gatsby_ settings screen:

1.  Make sure the _posts_ and _pages_ post types' checkboxes have been ticked.
2.  Find the _Export date format_ field.  
The format should be changed to:  
```markdown
Y-m-d
```
3.  Under _Exclude fields_, add:  
```markdown
id
footnotes
post_format
```
4.  Under _Change field name_, add:  
```markdown
permalink,slug
excerpt,description
```
5.  Tick the box next to _Create post type directories_.
6.  Change any other options that might be specific to your site.
7.  Press the button, _Download zip file_, and save to your device.

After unzipping the file, the following directories should be present: `post`, `page`, and `uploads`. 

Opening one of the `post` markdown files in your code editor should appear similar to the following:

```markdown
---
title: "Hello world!"
date: 2024-01-23
status: publish
author: ervin-howell
type: post
thumbnail: ../../uploads/2024/01/fpo-image.jpg
category:
  - news
tag:
  - updates
acf_field:
  - 'This is a test'
slug: /hello-world
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
---

And Hello to You!
-----------------

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

![a city landscape in the rain](../../uploads/2024/01/fpo-image.jpg)

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

## Not Handled by the Plugin

### Image Tags

Any image metadata such `alt`, `title`, and `caption` are not generated along side the `thumbnail` field. 

### Advanced Custom Fields

Although, basic fields are exported, I haven't done enough testing when it comes to more complex fields like nested fields, or any field type integrations ACF released which post-date **WP Gatsby Markdown Exporter**.

### Authors 

Although, an `author` field was clearly added to the each post, an`author` directory isn't generated. Therefore, each author's profile will need to be manually created within an `author` directory.  

How each author will be referenced to a post will depend on your library/framework of choice. Astro is my preference as it provides [a simple way to add references](https://docs.astro.build/en/guides/content-collections/#defining-collection-references). 

The `slug` of an author file should match the `author` field found inside any `post` markdown file. 

Here is an example of an `author` markdown file:  

```markdown
---
name: Ervin Howell
description: Lorem ipsum dolor sit amet consectetur adipisicing elit
slug: ervin-howell
email: ehowell@breaker.biz
website: https://breaker.biz
type: author
thumbnail: "../../assets/uploads/author-ervin-howell.jpg"
status: publish
---

Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, velit beatae. Quia delectus hic cupiditate itaque. Doloremque ipsam unde maxime incidunt, animi, ad tempore commodi alias, quibusdam dolorum veniam velit.
```

---

## Add *Twenty-Something* to Your Life

[Screenshot of theme]

While using the *Twenty-Something* theme is entirely optional, it provides a good jumping-off point. 

*Twenty-Something* is an Astro-based theme. Content Collections (aka, Post Types) for posts, pages, and authors have already been pre-configured, along side [Front Matter CMS](https://frontmatter.codes).

Download or clone the *Twenty-Something* theme.  
[Link for the *Twenty-Something* repository](https://github.com/djmtype/twenty-something)

An overview of  the *Twenty-Something* theme, focused on the more prominent directories and files: 

```
/
├── src/
│   ├── assets/
│   │   ├── uploads/
│   ├── content/
│   │   ├── page/
│   │   ├── post/
│   │   ├── author/
│   ├── data/
│   │   ├── colophon.json
│   │   ├── config.json
│   │   ├── navigation.json
│   │   ├── tokens.json
├── frontmatter.json
```

Open the *Twenty-Something* project folder on your device. 

Transfer the exported markdown files from earlier to the corresponding `post` and `page` directories found within `src/content`.

Place any media files inside `src/assets/uploads`.

From your code editor, open the *Twenty-Something* project. If using VS Code, optionally install the [*Front Matter*](https://frontmatter.codes) extension. 

Install the theme's Node dependencies using `npm i` (or favorite compiler).

Use your editor's global find/replace feature.

> [!tip] Using Visual Studio Code?
> Open *Replace in Files* with the following shortcut:  
> 
> <kbd>Shift</kbd>+<kbd>Command</kbd>+<kbd>H</kbd> (MacOS)
>
> <kbd>Shift</kbd>+<kbd>Control</kbd>+<kbd>H</kbd> (Windows)

Search: `../../uploads`  
Replace: `../../assets/uploads`

The `slug` field will also need a tweak. Essentially, the values need changing from absolute to relative paths. Once again, utilize _Replace in Files_.

Search: `slug: /`  
Replace: `slug: `

> [!note] Note
> Be sure to include a space after the colon in _slug_.

Next, turn your attention to the files stored inside the `data` directory. Modify them to your liking: 

- colophon.json
- config.json
- navigation.json
- tokens.json

> [!note] Quick Glance at Configuration
> [View the default configuration for all data files](https://twenty-something.netlify.app/configuration)

Allergic to JSON? Since the *Twenty-Something* theme includes support for the _Front Matter CMS_, each of these files can be edited within *Front Matter* under its **data** tab. 

[Screenshot of Front Matter]

---

## Next Steps

"Build, deploy, enjoy!" 

I dared to write a more elaborate guide from start to finish, but wasn't certain on the audience. If I was targeting casual Wordpress users, the setup would be more than Wordpress' infamous *5-minute install*. Therefore, I have no arguments against Wordpress other than my own bias and personal 20+ years experience with it. Based on your project's requirements; use the right tool for the job. In any case, I've given pause on writing an explicit guide because the process would take much longer compared to *that*. 

In addition, I had started writing Astro components for *Twenty-Something* with the intent of using them for `mdx` files because `md` is a bit limited beyond long-form content. Wordpress "shortcodes" are essentially components with different braces, right? Therefore, the concept wouldn't seem too far-fetched for Wordpress authors to grasp, especially when assigning them to *Front Matter* snippets. In conjunction with live preview, the author would also receive instant visual feedback. For now, that idea sits on the simmer. 

---

## More About the Theme

### Design

Not much original thought went into the visual design itself as it was heavily based on some variation of Wordpress' 2024 theme. Per visual example: [the original archive page](https://2024.wordpress.net/index.php/category/architecture/) versus [*Twenty-Something's* archive page](https://twenty-something.netlify.app/category/category-two/). 

Purposely, the design is _not_ one-to-one for many reasons. Naming a couple… Adopting the Cardo typeface, selected by the Wordpress team, was too painful to stomach. (No offense, Mr. Cardo.) Nor could I see what benefit Inter offered over the system's san-serif font when considering a loading time trade-off. Inter is still listed in front of the stack for diehard Inter'ers; just not included. 

### Style Tokens

[Open Props](https://open-props.style/) has been utilized for its thoughtful design tokens. Meanwhile, a few alias tokens were "invented" for consistency.

### Web Framework

[Astro](https://astro.build) has been chosen to power this theme because "Astro powers the world's fastest websites, client-side web apps, dynamic API endpoints, and everything in-between."

### Reactivity

[AlpineJS](https://alpinejs.dev/) was chosen to handle ~~all~~ most client-side interactions. 

### Content Management

[Front Matter CMS](https://frontmatter.codes) can be added for managing content within VS Code. Configuration has been set up to incorporate pages and posts collections, along with site settings.

### Acknowledgements

Many community-driven themes made this theme possible. To name a few: [Astros](https://astro.build/themes/details/astros/), [Astroplate](https://astro.build/themes/details/astroplate/), [Astroship](https://astro.build/themes/details/astroship/), [Astrowind](https://astro.build/themes/details/astrowind/), [Dante](https://astro.build/themes/details/dante/)
