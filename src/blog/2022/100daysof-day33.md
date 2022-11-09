---
title: 'Day 33: Mathematical expressions in min(), max(), clamp()'
date: 2022-11-09T09:38:54.969Z
image: articles/sm_100days-day33.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "You can use full math expressions in the comparison functions `min()`, `max()`, and `clamp()`. There’s no need to nest a `calc()` function inside."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/OJERZzz
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Comparison Functions: min(), max(), and clamp()"
    url: https://w3c.github.io/csswg-drafts/css-values/#comp-func
---
Writing…

```css
div {
  border: max(20px, calc(1vw + 10px)) solid;
}
```

…is the same as writing…

```css
div {
  border: max(20px, 1vw + 10px) solid;
}
```

You can also use custom properties.

```css
.var {
  --extra: 10px;
  
  border-width: max(20px, 1vw + var(--extra));
}
```

Complex expressions are also possible.

```css
div {
  width: clamp(50px * 4 * 1.5, (100% / 2) * 2, 400px * 2);
}
```