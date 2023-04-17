---
title: "It's very likely that…"
date: 2023-04-17T08:46:54.969Z
image: articles/sm_likely.jpg
teaser: "I repeatedly see certain bad practices in HTML that ironically contain clues for implementing them properly in their class names or in the way they're built. In this evergreen post, I collect them."
tags:
  - blog
  - posts
  - a11y
  - itsveylikely
layout: "layouts/likely.njk"
noindex: false
---
…if you're using `javascript:void(0)` as the value of the `href` attribute, the element you're actually looking for is `<button>`.  

```html
<a href="javascript:void(0);">
  Open modal
</a>
```
More accessible alternative:

```html
<button>
  Open modal
</button>
```

## Explanation

The role of `<a>` is `link` and the role of `<button>` is `button`. Users have certain expectations when they find an element. A general rule of thumb: Use a link if it takes you somewhere else. Use a button if you submit a form or run JavaScript. 