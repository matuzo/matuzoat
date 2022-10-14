---
title: 'Day 4: the min() function'
date: 2022-09-29T09:38:54.969Z
image: articles/sm_100days-day4.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `min()` function takes a comma separated list of expressions. The smallest value in the list will be selected."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/eYMaYry
layout: "layouts/100days.njk"
caniuse: "min()"
---
```css
div {
  width: min(400px, 200px, 300px);
  /* width = 200px */
}
```

This example doesn’t make much sense because the value will always be `200px`.  
`min()` shows its true power when you use relative units.

```css
div {
  width: min(100%, 800px);
}
```

If the available space is below 800px, it matches `100%.` If it's more than 800px, it matches `800px`. This is basically a shorter version of this.

```css
div {
  width: 100%;
  max-width: 800px;
}
```