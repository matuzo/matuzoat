---
title: "lists"
date: 2023-04-22T09:46:54.969Z
image: articles/sm_empty-links.jpg
teaser: ""
tags:
  - blog
  - posts
  - a11y
  - itsveylikely
layout: "layouts/likely.njk"
---
…if your divs list content and have classnames like “list” or “list-item”, you want to use a proper list like `<ol>` or `<ul>` instead.

```html
<div class="list">
  <div class="list-item">HTML</div>
  <div class="list-item">CSS</div>
  <div class="list-item">JS?</div>
</div>
```
More accessible alternative:

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JS?</li>
</ul>
```

## Explanation

<p>Using lists can have many advantages for screen reader users:</p>

<ul>

<li>They can get the total number of items before they interact with the items.</li><li>They may use shortcuts to jump from list item to list item.</li><li>They may use shortcuts to jump from list to list.</li><li>The screen reader may announce the index of the current item (for example, "list item, two of four").</li>
<li>The elements convey their "list" role</li>
</ul>