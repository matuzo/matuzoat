---
title: "click event on a"
date: 2023-04-18T09:46:54.969Z
image: articles/sm_empty-links.jpg
teaser: ""
tags:
  - blog
  - posts
  - a11y
  - itsveylikely
layout: "layouts/likely.njk"
---
…if you’re adding an event listener to an `<a>` with “#” as the value of the `href` attribute, the element you're actually looking for is `<button>`.

```html
<a href="#" onclick="doSomething()">
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

The role of `<a>` is link and the role of `<button>` is button. Users have certain expectations when they find an element. A general rule of thumb: Use a link if it takes you somewhere else. Use a button if you submit a form or run JavaScript. 