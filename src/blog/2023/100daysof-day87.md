---
title: 'Day 87: mask properties'
date: 2023-01-24T09:38:54.969Z
image: articles/sm_100days-day87.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "You can use `mask` properties to apply a mask to an element."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/VwBXLjE
layout: "layouts/100days.njk"
---

<style>
  .post img {
    border: none;
  }

  .mask {
    -webkit-mask-image: url(/images/htmhell_logo.svg);
    mask-image: url(/images/htmhell_logo.svg);
  }

  .mask-size {
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
  }

  .element {
    max-width: 400px;
    aspect-ratio: 1;
    background-color: red;

    -webkit-mask-image: url(/images/htmhell_logo.svg);
    mask-image: url(/images/htmhell_logo.svg);
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
  }
</style>

Let's say you have an image and a logo. You can use the logo to mask the image.

<img src="/images/fire.jpg" width="400" alt="a huge fire. multiple large palettes burning.">
<img src="/images/htmhell_logo.svg" width="400" alt="HTMHell logo">

```css
img {
  mask-image: url(/images/htmhell_logo.svg);
}
```

<img src="/images/fire.jpg" width="400" class="mask">

There are a bunch of properties you can use to adjust the styling of the mask.

<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-clip">mask-clip (MDN)</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite">mask-composite (MDN)</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image">mask-image (MDN)</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-mode">mask-mode (MDN)</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-origin">mask-origin (MDN)</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-position">mask-position (MDN)</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-repeat">mask-repeat (MDN)</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-size">mask-size (MDN)</a></li>
</ul>

```css
img {
  mask-image: url(/images/htmhell_logo.svg);
  mask-size: cover;
  mask-repeat: no-repeat;
  mask-position: center;
}
```
<img src="/images/fire.jpg" width="400" class="mask mask-size">

You can also apply a mask to an element.

<div class="element">
</div>

```css
div {
  max-width: 400px;
  aspect-ratio: 1;
  background-color: red;

  mask-image: url(/images/htmhell_logo.svg);
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}
```

<div class="highlight">
<strong>Note:</strong> You need the <code>-webkit-</code> prefix for some browsers.</div>