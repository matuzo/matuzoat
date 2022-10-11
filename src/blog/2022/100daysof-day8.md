---
title: 'Day 8: nesting :has()'
date: 2022-10-05T09:38:54.969Z
image: articles/sm_100days-day8.jpg
teaser: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/NWYQxpR
layout: "layouts/100days.njk"
caniuse: "has()"
---
The `:has()` pseudo-class cannot be nested; `:has()` is not valid within `:has()`.

```html
<div>
  <p>
    <strong>I have a red and blue border in supporting browsers.</strong>
  </p>
</div>
```

```css
/* valid */
div:has(p) {
  border: 4px solid red;
}

/* valid */
p:has(strong) {
  border: 4px solid blue;
}

/* invalid */
div:has(p:has(strong)) {
  border: 4px solid green;
}
```

<style>
.div:has(p) {
  border: 4px solid red;
}

/* valid */
.div p:has(strong) {
  border: 4px solid blue;
}

/* invalid */
.div:has(p:has(strong)) {
  border: 4px solid green;
}

.div2:has(p strong) {
  border: 4px solid green;
}
</style>

<div class="div">
  <p>
    <strong>I have a red and blue border in <a href="https://caniuse.com/css-has">supporting browsers</a>.</strong>
  </p>
</div>

Using a combined selector instead of nesting `:has()` is valid.

```css
/* valid */
div:has(p strong) {
  border: 4px solid green;
}
```

<div class="div2">
  <p>
    <strong>I have a green border in <a href="https://caniuse.com/css-has">supporting browsers</a>.</strong>
  </p>
</div>