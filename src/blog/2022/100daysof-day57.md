---
title: 'Day 57: media queries: range syntax'
date: 2022-12-13T09:38:54.969Z
image: articles/sm_100days-day57.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "With [CSS Media Queries Level 4](https://www.w3.org/TR/mediaqueries-4/), it's possible to use mathematical comparison operators in media queries."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/PoarYPG
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Can I use"
    url: https://caniuse.com/css-media-range-syntax
  - title: "Media Queries Level 4: Media Query Range Contexts (Media Query Ranges)"
    url: https://www.bram.us/2021/10/26/media-queries-level-4-media-query-range-contexts/
---
Instead of `(min-width: 768px)` you can now write `(width >= 768px)`.


<p class="code-label">
<strong>Before</strong>
</p>

```css
@media(min-width: 768px) {
  body {
    background-color: aqua;
  }
}
```

<p class="code-label">
<strong>After</strong>
</p>

```css
@media(width >= 768px) {
  body {
    background-color: aqua;
  }
}
```

<p class="code-label">
<strong>Before</strong>
</p>

```css
@media(min-width: 400px) and (max-width: 800px) {
  body {
    border: 40px dotted yellow;
  }
}
```

<p class="code-label">
<strong>After</strong>
</p>

```css
@media(400px <= width <= 800px) {
  body {
    border: 40px dotted yellow;
  }
}
```