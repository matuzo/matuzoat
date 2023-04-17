---
title: "btn class on a div"
date: 2023-04-17T09:46:54.969Z
image: articles/sm_empty-links.jpg
teaser: ""
tags:
  - blog
  - posts
  - a11y
  - itsveylikely
layout: "layouts/likely.njk"
---
…if the classname of an element contains “button” or “btn“, the element is in fact a `<button>`.

```html
<div class="edit-button">
  Edit
</div>
```
More accessible alternative:

```html
<button class="edit-button">
  Edit
</button>
```

## Explanation

A `<button>` button has several advantages over the `<div>` button:

* It conveys the correct “button” role
* It’s accessible via keyboard
* If a click event is attached, it provides _keydown_ and _keyup_ events automatically