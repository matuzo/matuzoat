---
title: "button when cursor:pointer"
date: 2023-04-17T13:46:54.969Z
image: articles/sm_likely.jpg
teaser: ""
tags:
  - blog
  - posts
  - a11y
  - itsveylikely
layout: "layouts/likely.njk"
---
…if you're putting `cursor: pointer` on a `<th>` with a click event attached, you want to use a `<button>` instead.

```html
<th style="cursor: pointer">
  Name
</th>
```
More accessible alternative:

```html
<th aria-sort="ascending">
  <button>Name</button>
</th>
```

## Explanation

Only put click events on interactive elements like `<button>`. `<th>` is not an interactive element and thus not focusable.