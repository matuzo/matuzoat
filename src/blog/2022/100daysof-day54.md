---
title: 'Day 54: testing for the support of a selector'
date: 2022-12-07T09:38:54.969Z
image: articles/sm_100days-day54.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Support for a CSS property isn’t the only thing you can check with `@supports()`, you can also check support for a selector."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/ExRMYjj
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "overscroll-behavior on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
---
I knew you can check whether a property is supported by the current browser and apply styles accordingly. 

<style>
  @supports (display: grid) {
  .grid {
    display: block
  }
}

@supports selector(:has(a)) {
  .has {
    display: block
  }
}
</style>

```html
<div hidden class="grid">
  Your browser supports <code>display: grid</code> 🎉
</div>
```

```css
@supports (display: grid) {
  .grid {
    display: block
  }
}
```

<div data-sample="demo">
<div hidden class="grid">
  Your browser supports <code>display: grid</code> 🎉
</div>
</div>

What I didn’t know is that you can do the same, but for a selector using the `selector()` function.

```html
<div hidden class="has">
  Your browser supports <code>:has()</code> 🎉
</div>
```

```css
@supports selector(:has(a)) {
  .has {
    display: block
  }
}
```

<div data-sample="demo">
<div hidden class="has">
  Your browser supports <code>:has()</code> 🎉
</div>
</div>

You can also reverse the query.

```css
@supports not selector(:has(a)) {
  /* You're Firefox, Opera Mini, etc. fallback */
}
```