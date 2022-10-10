---
title: 'Day 11: space-separated functional color notations'
date: 2022-10-10T09:38:54.969Z
image: articles/sm_100days-day11.jpg
teaser: "It’s time to get me up on speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/NWMwzME
layout: "layouts/100days.njk"
caniuse: "space_separated_functional_notation"
reading:
  - title: "Colors in CSS: Hello Space-Separated Functional Color Notations"
    url: https://www.bram.us/2020/04/27/colors-in-css-hello-space-separated-functional-color-notations/
  - title: "CSS Color spec"
    url: https://drafts.csswg.org/css-color/
---
Functional color notations that existed before CSS Color Module Level 4 (`rgb()`, `rgba()`, `hsl()`, `hsla()`) used to only except comma-separated lists of arguments. That changes with Module Level 4, now you can also provide space-separated arguments.

<style>

  .div {
    width: 100px;
    height: 100px;
  }

  .div1 { background-color: rgb(255 0 0);}
  .div2 { background-color: rgb(0% 100% 0%);}
  .div3 { background-color: rgb(0 0 255 / 0.5);}
  .div4 { background-color: rgb(255 0 0 / 50%);}


</style>

## rgb values

```css
div {
  background-color: rgb(255 0 0);
}
```

<div class="div div1"></div>

## Percentages

```css
div {
  background-color: rgb(0% 100% 0%);
}
```

<div class="div div2"></div>

## rgb values + alpha

```css
div {
  background-color: rgb(0 0 255 / 0.5);
}
```

<div class="div div3"></div>

## rgb values + percentage alpha

```css
div {
  background-color: rgb(255 0 0 / 50%);
}
```

<div class="div div4"></div>

## Summary

```css
body {
  /* Comma-separated arguments */
  background-color: rgb(255, 0, 0);
  background-color: rgb(0%, 100%, 0%);
  background-color: rgba(255, 0, 0, 0.5);
  background-color: rgba(0%, 0%, 100%);

  /* Space-separated arguments */
  background-color: rgb(255 0 0);
  background-color: rgb(0% 100% 0%);
  background-color: rgb(255 0 0 / 0.5);
  background-color: rgba(255 0 0 / 0.5);
  background-color: rgb(0% 0% 100%);
  background-color: rgb(0% 100% 0% / 0.5);
  background-color: rgb(100% 0 0 / 50%);
}
```