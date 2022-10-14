---
title: 'Day 9: the inset shorthand property'
date: 2022-10-06T09:38:54.969Z
image: articles/sm_100days-day9.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `inset`  property is a shorthand for the `top`, `right`, `bottom`, and/or `left` properties. It implements the same multi-value syntax like `margin`."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/WNJeJdw
layout: "layouts/100days.njk"
caniuse: "inset"
---
```html
<div class="parent">
  <div class="child">
    At bottom right with 20px offset
  </div>
</div>
```

```css
.parent {
  width: 12rem;
  height: 12rem;
  position: relative;
}

.child {
  position: absolute;
  /* top: auto; right: 20px; bottom: 20px; left: auto */
  inset: auto 20px 20px auto;
  width: 50%;
  height: 50%;
}
```

<style>
.parent {
  width: 20rem;
  height: 20rem;
  position: relative;
  border: 10px solid;
}

.child {
  background: red;
  position: absolute;
  inset: auto 20px 20px auto;
  width: 50%;
  height: 50%;
}

.child2 {
  background: red;
  position: absolute;
  inset-block: auto 20px;
  inset-inline: auto 20px;
  width: 50%;
  height: 50%;
}
</style>

<div class="parent">
  <div class="child">
    At bottom right with 20px offset
  </div>
</div>

Just like [margin](/blog/2022/100daysof-day3/), `inset` does not respect the reading direction. To work around that, use the `inset-inline` and `inset-block` shorthands.

```css
.child {
  position: absolute;
  /* top: auto; bottom: 20px; in ltr */
  inset-block: auto 20px;
  /*  left: auto; right: 20px; in ltr */
  inset-inline: auto 20px;
}
```

```html
<div class="parent" dir="rtl">
  <div class="child">
    At bottom right with 20px offset
  </div>
</div>
```

<div class="parent" dir="rtl">
  <div class="child2">
    At bottom right with 20px offset
  </div>
</div>

Are these shorthands useful? I don't know. I'll cover some use cases later in the series, but I wasn't able to come up with many scenarios where `inset` makes things much easier. 