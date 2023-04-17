---
title: "label element"
date: 2023-04-17T11:46:54.969Z
image: articles/sm_likely.jpg
teaser: ""
tags:
  - blog
  - posts
  - a11y
  - itsveylikely
layout: "layouts/likely.njk"
---
…if you're putting the word “label” in the classname, you want to use a `<label>` element.

```html
<div class="form-item__label">
  Username
</div>
<input type="text">
```
More accessible alternative:

```html
<label for="username" class="form-item__label">
  Username
</label>
<input id="username" type="text" autocomplete="username">
```

## Explanation

The `<label>` element provides a form field with a visual and a semantic label.