---
title: 'Day 39: comma-separated functional color notations'
date: 2022-11-17T09:38:54.969Z
image: articles/sm_100days-day39.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "On day 11 I've introduced you to [space-separated functional color notations](/blog/2022/100daysof-day11/). Early color functions like `rgb()` and `hsl()` support both the old comma-separated and the new space-separated syntax."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/RwJLyxy
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 11: space-separated functional color notations"
    url: /blog/2022/100daysof-day11/
  - title: "Day 23: the lab() color function"
    url: /blog/2022/100daysof-day23/
  - title: "Day 30: the hwb() color function"
    url: /blog/2022/100daysof-day30/
---
```css
/* ✅ works */
div {
  background-color: rgb(255, 210, 210);
  color: hsl(150, 76%, 20%);
}

/* ✅ works */
div {
  background-color: rgb(255 210 210);
  color: hsl(150 76% 20%);
}
```

On the other hand, new color functions like `lab()`, `hwb()`, `lch()`, or `oklch()` only support the space-separated syntax.

```css
/* ✅ works */
div {
  background-color: hwb(0deg 82% 0%);
  color: lab(33% -31 16);
}

/*  ❌ doesn't work */
div {
  background-color: hwb(0deg, 82%, 0%);
  color: lab(33%, -31, 16);
}
```
