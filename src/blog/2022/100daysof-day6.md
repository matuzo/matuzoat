---
title: 'Day 6: the :has() pseudo-class'
date: 2022-10-03T09:38:54.969Z
image: articles/sm_100days-day6.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "`:has()` allows you to check whether a parent element contains specific children."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/vYRwWNV
layout: "layouts/100days.njk"
caniuse: "has()"
reading:
  - title: "Day 8: nesting :has()"
    url: /blog/2022/100daysof-day8/
  - title: "Day 16: the specificity of :has()"
    url: /blog/2022/100daysof-day16/
  - title: "Day 26: using combinators in :has()"
    url: /blog/2022/100daysof-day26
---
In the following example, each `.form-item` that contains/has a child with the `aria-invalid` attribute set to “true” displays text in red color. (currently only in [Chrome/Edge 105+ and Safari 15.4+](https://caniuse.com/css-has))

<style>
.form-item {
  --color: #000;
  color: var(--color);
}

input {
  border: 1px solid var(--color);
}

.form-item:has([aria-invalid="true"]) {
  --color: #F00;
}
</style>

<form>
  <div class="form-item">
    <label for="name">Name</label><br>
    <input type="text" id="name" required aria-invalid="true">
  </div>
  
  <div class="form-item">
    <label for="email">E-Mail</label><br>
    <input type="text" id="email">
  </div>
</form>

```html
<form>
  <div class="form-item">
    <label for="name">Name</label><br>
    <input type="text" id="name" required aria-invalid="true">
  </div>
  
  <div class="form-item">
    <label for="email">E-Mail</label><br>
    <input type="text" id="email">
  </div>
</form>
```

```css

.form-item {
  --color: #000;
  
  /* The default color is #000 */
  color: var(--color);
}

input {
  /* The default border-color is #000 */
  border: 1px solid var(--color);
}

/* If the .form-item contains an element with [aria-invalid="true"], 
the text and border color changes to #F00 */
.form-item:has([aria-invalid="true"]) {
  --color: #F00;
}
```