---
title: Guide
date: 2022-07-15
description: Instructions on how to use the Twenty Something theme
status: publish
dateUpdated: 2024-01-11
---

## Overview

For as long as memory serves, Wordpress was the *defacto* content management tool. Now, twenty-something years later, you may not need Wordpress. In fact, your site could be less expensive to run, and more secure without it. The purpose of this tutorial is to migrate your current Wordpress posts into markdown files. 

Understand, this option isn't intended for everyone. If your current Wordpress site relies heavily on Wordpress' Gutenberg layouts.

## Getting Started

There are a small number of CLI tools and plugins to export Wordpress to markdown files. However, using **WP Gatsby Markdown Exporter** makes exporting content a breeze. Disregard the warning for not being compliant with Wordpress 6.4.x. This plugin still works today. It exports pages, posts, or other post types as markdown files.

Install and activate the [*WP Gatsby Markdown Exporter*]((https://wordpress.org/plugins/wp-gatsby-markdown-exporter/)) plugin in your Wordpress Site.

Find and press the *Export to Gatsby* link in the sidebar.

On the **Export to Gatsby** settings screen: 

   1. Make sure the *posts* and *pages* post types' checkboxes have been ticked.  
   2. Find the *Export date format* field. The format needs to be changed to `Y-m-d`.  
   3. Under *Exclude fields*, add `id`, `footnotes`, and `post_format`.
   4. Under *Change field name*, add `permalink,slug`, and on the next line  `excerpt,description`.
   5. Tick the box next to *Create post type directories*. 
   6. Change any other options that might be specific to your site. 
   7. Press the button, *Download zip file*, and save to your device. 

After unzipping the file, you should see `post`, `page` and `uploads` directories. 

Notice a lack of an `author` post type? Adding `author` content will be addressed further on in this tutorial. 

Opening one of the `post` markdown files should appear similar to the following: 

```markdown
---
title: 'Hello world!'
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
description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
---

And Hello to You!
-----------------

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 

![a city landscape in the rain](../../uploads/2024/01/fpo-image.jpg)

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

There are a couple fields that aren't exported by the plugin. In order for images to be transformed by Astro, they need to reside in the `assets` directory. 

Use VS Code's global find/replace feature.  
In VS Code's top menu, press *Edit*, then select the *Replace in Files* item.  

Search: `../../uploads`  
Replace: `../../assets/uploads`

The `slug` field will also require modification. Essentially, the absolute path needs to be removed. Once again, utilize *Replace in Files*.

Search: `slug: /`  
Replace: `slug: `

> [!note] Note
> Be sure to include a space after the colon in *slug*.
