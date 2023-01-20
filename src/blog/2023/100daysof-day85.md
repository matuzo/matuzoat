---
title: 'Day 85: typed custom properties in container style queries'
date: 2023-01-20T09:38:54.969Z
image: articles/sm_100days-day85.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Registering [typed custom properties](/blog/2023/100daysof-day84/) can be useful in container style queries."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/LYBzRZg
layout: "layouts/100days.njk"
reading:
  - title: "Day 84: the @property at-rule"
    url: /blog/2023/100daysof-day84/
---

The following container style query matches because the computed value of both `--bg` and `--color` is “red”.

```css
html {
  --color: red;
}

.card {
  --bg: red;
}

/* Condition is true, styles applied */
@container style(--bg: var(--keyword)) {
  h1 {
    border: 10px dotted fuchsia;
  }
}
```

What's important to understand is that we're comparing two strings, not colors. If we change `--color` to `rgb(255 0 0)`, the query doesn't match anymore.

```css
html {
  --color: rgb(255 0 0);
}

.card {
  --bg: red;
}

/* Condition is false, styles not applied */
@container style(--bg: var(--color)) {
  h1 {
    border: 10px dotted fuchsia;
  }
}
```

That's where the [`@property` rule](/blog/2023/100daysof-day84/) comes into play. It allows us to add a type to a custom property and turn `--bg` into a proper color value.


```css
@property --bg {
  syntax: '<color>';
  inherits: true;
  initial-value: rgb(0 0 0);
}

html {
  --color: rgb(255 0 0);
}

.card {
  --bg: red;
}

/* Condition is true, styles applied */
@container style(--bg: var(--color)) {
  h1 {
    border: 10px dotted fuchsia;
  }
}
```

As you can see, you only have to add a type to `--bg` and not `--color`, as well. That's because `--bg` is [resolved as a color](/blog/2023/100daysof-day83/) in both the declaration in `.card` and in the query.