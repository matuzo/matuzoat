---
title: 'Day 48: inset 0'
date: 2022-11-29T09:38:54.969Z
image: articles/sm_100days-day48.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "On day 9 I’ve talked about the inset shorthand properties [inset, inset-inline, and inset-block](/blog/2022/100daysof-day9/). I don’t believe that I will need those often, but `inset` can come in handy when you want one element to fill another element entirely."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/oNyPYBO
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "overscroll-behavior on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
---
If you have an outer element and an inner element and you want the inner element to fill its parent, you can use absolute positioning and set `top`, `right`, `bottom`, and `left` to `0`.

```html
<div class="outer">
  <div class="inner">
  </div>
</div>
```

<style>
  .outer {
  border: 10px solid hotpink;
  position: relative;
  width: 7rem;
  height: 7rem;
}

.inner {
  background: aqua;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.inner2 {
  position: absolute;
  inset: 0;
  background: aqua;
}
</style>

```css
.outer {
  border: 10px solid hotpink;
  position: relative;
  width: 7rem;
  height: 7rem;
}

.inner {
  background: aqua;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

<div class="outer">
  <div class="inner">
  </div>
</div>

Instead, you could also just set `inset` to `0`.

```css
.inner {
  position: absolute;
  inset: 0;
  background: aqua;
}
```

<div class="outer">
  <div class="inner2">
  </div>
</div>

Of course, this also applies to a fixed positioned element that you want to fill the viewport with.

```css
.inner {
  position: fixed;
  inset: 0;
  background: aqua;
}
```

