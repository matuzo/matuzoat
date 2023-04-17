---
title: "placeholder link"
date: 2023-04-20T09:46:54.969Z
image: articles/sm_empty-links.jpg
teaser: ""
tags:
  - blog
  - posts
  - a11y
  - itsveylikely
layout: "layouts/likely.njk"
---
…if you’re adding an event listener to an `<a>` without an `href` attribute, the element you're actually looking for is `<button>`.

```html
<a onclick="doSomething()">
  Show results
</a>
```
More accessible alternative:

```html
<button onclick="doSomething()">
  Show results
</button>
```

## Explanation

If the `<a>` element has no `href` attribute, then the element represents a placeholder for where a link might otherwise have been placed. That's neither a regular hyperlink nor a button. A general rule of thumb: Use a link if it takes you somewhere else. Use a button if you submit a form or run JavaScript. 