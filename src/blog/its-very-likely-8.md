---
title: "heading + heading"
date: 2023-04-23T09:46:54.969Z
image: articles/sm_empty-links.jpg
teaser: ""
tags:
  - blog
  - posts
  - a11y
  - itsveylikely
layout: "layouts/likely.njk"
---
…if a heading follows another heading directly with no other content in between, the second heading shouldn't be a heading.

```html
<h2>Johanna‘s toy store</h2>
<h3>The best toys in town</h3>
```

More accessible alternative:

```html
<h2>Johanna‘s toy store</h2>
<p>The best toys in town</p>
```

## Explanation

Headings communicate the organization of the content on the page, and they introduce new topics or sub-topics. Just because something looks like a heading or is visually close to another heading doesn't mean it should also be a heading. There are exceptions, like when a <h2> introduces a large section of the page and a subsection immediately follows it.