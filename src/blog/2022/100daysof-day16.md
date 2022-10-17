---
title: 'Day 16: the specificity of :has()'
date: 2022-10-17T09:38:54.969Z
image: articles/sm_100days-day16.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Just like with `:is()` and `:not()`, the specificity of `:has()` is replaced by the specificity of the most specific selector in its selector list argument. Unlike `:nth-child()` or `:link`, `:has()` itself doesn't add to the specificity."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/WNJapqa
layout: "layouts/100days.njk"
caniuse: "has()"
reading:
  - title: "Calculating a selector’s specificity"
    url: https://w3c.github.io/csswg-drafts/selectors-4/#specificity-rules
---
```html
<div class="parent">
  <p class="child">yo!</p>
</div>
```

```css
/* A tag and a class */
div:has(.child) {
  background: red;
}

/* A tag: specificty too low */
div {
  background: blue;
}

/* A class: specificty too low */
.parent {
  background: green;
}

/* A tag and a class: same specificty as div:has(.child) */
div.parent {
  background: orange;
}
```

<style>
.demo div:has(.child) {
  background: red;
}

/* Specificty too low */
.demo div {
  background: blue;
}

/* Specificty too low */
.demo .parent {
  background: green;
}

/* Same specificty as div:has(.child) */
.demo div.parent {
  background: orange;
}
</style>

<div class="demo">
<div class="parent">
  <p class="child">yo!</p>
</div>
</div>