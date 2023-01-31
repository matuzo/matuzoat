---
title: 'Day 92: relative color syntax'
date: 2023-01-31T09:38:54.969Z
image: articles/sm_100days-day92.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "With the relative color syntax we can modify existing colors using color functions. If an origin color is specified, each color channel can either be directly specified, or taken from the origin color and modified."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/OJwwmpw
layout: "layouts/100days.njk"
reading:
  - title: "Relative Color Syntax"
    url: https://www.w3.org/TR/css-color-5/#relative-colors
  - title: "New in CSS: relative colors"
    url: https://www.stefanjudis.com/notes/new-in-css-relative-colors/
---

For example, we can take a HEX color and add opacity using the `rgb()` color function and the `from` keyword.

<style>
  [data-sample] div {
    height: 6rem;
    width: 6rem;
  }

  .sample1 div {
    background-color: rgb(255 0 0 / 50%);
  }

  .sample2 div {
    background-color: rgb(255 0 150);
  }

  .sample3 div {
    background-color: hsl(0deg 100% 40%);
  }

  .sample4 div {
    background-color: rgb(30% 30% 30%);
  }
</style>

```css
div {
  --color: #FF0000;
}

div {
  background-color: rgb(from var(--color) r g b / 50%);
}
```

<div data-sample="demo" class="sample1">
  <div><span class="u-vh">rgb(255 0 0 / 50%)</span></div>
</div>

Or we can take the color and replace a specific channel.

```css
div {
  background-color: rgb(from var(--color) r g 150);
}
```

<div data-sample="demo" class="sample2">
  <div><span class="u-vh">rgb(255 0 0 / 50%)</span></div>
</div>

We can even use the `calc()` function.

```css
div {
  background-color: hsl(from var(--color) h s calc(l - 10%));
}
```

<div data-sample="demo" class="sample3">
  <div><span class="u-vh">hsl(0deg 100% 40%)</span></div>
</div>

We can use channel keywords in their corresponding argument, but we don't have to. We can use them in any position.

```css
div {
 background-color: rgb(from var(--color)
                    calc(r * .3 + g * .59 + b * .11)
                    calc(r * .3 + g * .59 + b * .11)
                    calc(r * .3 + g * .59 + b * .11));
}
```

<div data-sample="demo" class="sample4">
  <div><span class="u-vh">rgb(30% 30% 30%)</span></div>
</div>

How cool is that!? Is there a catch? Well, yeah, it's currently only supported in Safari behind a flag.