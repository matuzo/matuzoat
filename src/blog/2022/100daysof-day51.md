---
title: 'Day 51: aspect-ratio and replaced elements'
date: 2022-12-05T09:38:54.969Z
image: articles/sm_100days-day51.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Most elements have no preferred aspect ratio. On [day 42](/blog/2022/100daysof-day42/) I’ve explained how you can use the `aspect-ratio` property to define a ratio for these elements. Replaced elements like `<iframe>`, `<video>`, `<embed>`, or `<img>`, on the other hand, have an intrinsic aspect ratio. This means that you don’t have to define one using the `aspect-ratio` property and they will scale naturally."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/MWXZYYZ
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 42: aspect-ratio"
    url: /blog/2022/100daysof-day42/
---

<div data-sample="demo: natural aspect ratio of the image">
  <img src="/images/neue-donau.webp" alt="Natural ratio. The danube river in Vienna." width="400">
</div>

You can change the aspect ratio of an image by using `aspect-ratio` and defining either a `height` or `width` with a value other than `auto`.

```css
img {
  width: 400px;
  aspect-ratio: 1;
}
```

<style>
  .square {
    width: 400px;
    aspect-ratio: 1;
  }

  .autoAndRatio {
    width: 400px;
    aspect-ratio: auto 3 / 1;
    max-width: 100%;
  }

  div.autoAndRatio {
    border: 3px solid;
  }
</style>

<div data-sample="demo">
  <img src="/images/neue-donau.webp" alt="Skewed, square image. The danube river in Vienna." class="square">
</div>

The default value of the `aspect-ratio` property is `auto` (depending on the element, it’s either no preferred aspect ratio or the natural, intrinsic aspect ratio.). You can change the value to a ratio (`1`, `16/9`, `666/666`, etc.), or you can do both.

```css
.autoAndRatio {
  width: 400px;
  aspect-ratio: auto 3 / 1;
}
```

If you both specify `auto` and a ratio together, replaced elements will use their natural aspect ratio (`auto`) and all other elements the specified ratio (`16 / 9`).

```html
<img src="/images/neue-donau.webp" alt="The danube river in Vienna." class="autoAndRatio">
<div class="autoAndRatio"></div>
```

<div data-sample="demo: image natural aspect ratio and 3 / 1 for the div">
  <img src="/images/neue-donau.webp" alt="Natural ratio. The danube river in Vienna." class="autoAndRatio">
  <div class="autoAndRatio"></div>
</div>
