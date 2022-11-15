---
title: 'Day 36: :has() and pseudo-elements'
date: 2022-11-14T09:38:54.969Z
image: articles/sm_100days-day36.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "We already know that we can select an element based on the [presence of a certain child element](/blog/2022/100daysof-day6/) (in Chrome/Edge 105+ and Safari 15.4+), but there are limitations."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/OJEWWaV
layout: "layouts/100days.njk"
caniuse: "hwb()"
---

```html
<p>
  <strong>World</strong>!
</p>
```

```css
p:has(strong) {
  background-color: aqua;
}
```

<style>
  .p:has(strong) {
    background-color: aqua;
  }

.p2::before,
.p3::before{
  content: "Hello";
}

.p3:has(:hover) {
  background-color: salmon;
}
</style>

<div class="sample">
<p class="p">
  <strong>World</strong>!
</p>
</div>

This works well with actual elements, but it doesn't work with pseudo-elements.

```css
p::before {
  content: "Hello";
}

p:has(::before) {
  background-color: salmon;
}
```

<div class="sample">
<p class="p2">
  <strong>World</strong>!
</p>
</div>

According to the spec, that's because <q>Pseudo-elements are generally excluded from :has() because many of them exist conditionally, based on the styling of their ancestors, so allowing these to be queried by :has() would introduce cycles.</q>.

For the sake of completeness, of course `:has()` works with pseudo-classes.

```css
p:has(:hover) {
  background-color: salmon;
}
```

<div class="sample">
<p class="p3">
  <strong>World</strong>!
</p>
</div>
