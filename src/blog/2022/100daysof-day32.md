---
title: 'Day 32: the clamp() function'
date: 2022-11-08T09:38:54.969Z
image: articles/sm_100days-day32.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `clamp()` function defines a minimum value, a preferred value, and a maximum value."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/mdKrxoP
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "min(), max(), and clamp() CSS Functions"
    url: https://ishadeed.com/article/css-min-max-clamp/
  - title: "min(), max(), and clamp(): three logical CSS functions to use today"
    url: https://web.dev/min-max-clamp/
---

<style>

.div {
  border: 1em solid hwb(200 0% 0%);
  padding: 1rem;
}

.minmax {
  width: max(300px, min(90%, 700px));
}

.clamp {
  width: clamp(300px, 90%, 700px);
}

.max {
  width: max(300px, 90%);
}

.min {
  width: min(90%, 700px);
}
</style>

A quick recap of [min()](/blog/2022/100daysof-day4/) and [max()](/blog/2022/100daysof-day5/) before we talk about `clamp()`:

We can use the `min()` function to define a maximum value for a property. It's the maximum value we define because in the list of provided parameters, `min()` will always pick the smallest value. For example, `width: min(700px, 90%)` is always 700px or less, which means that the maximum width is 700px.

```css
div {
  width: min(90%, 700px);
}
```
<div class="sample">

<div class="div min">700px or less with no min-width</div>
</div>

We can use the `max()` function to define a minimum value for a property. It's the minimum value we define because in the list of provided parameters, `max()` will always pick the largest value. For example, `width: max(300px, 90%)` is always 300px or more, which means that the minimum width is 300px.

```css
div {
  width: max(300px, 90%);
}
```
<div class="sample">

<div class="div max">300px or more with no explicit max-width</div>
</div>
If we want to define a default value and both a minimum and maximum value, we could do this:

```css
div {
  width: max(300px, min(90%, 700px));
}
```
<div class="sample">

<div class="div minmax">90% with 300px min-width and 700px max-width</div>
</div>

The `max()` function picks the largest value, either `300px` or the result of the `min()` function if it's larger than `300px`. This defines the minimum width. The `min()` function picks the lowest value, either `700px` or `90%` if it's less than `700px`. This the defines the maximum width with `90%` as the default value.  
Since nesting functions is super complicated and my brain still hurts from writing this paragraph, there's a handy alternative for this, `clamp()`.  
`clamp()` takes three parameters, a minimum value, a preferred value, and a maximum value.

```css
div {
  width: clamp(300px, 90%, 700px);
}
```

<div class="sample">

<div class="div clamp">90% with 300px min-width and 700px max-width</div>
</div>

The `width` of the `<div>` is 90% with a minimum width of 300px and maximum width of 700px. It's basically a shorter way of writing:

```css
div {
  width: 90%;
  min-width: 300px;
  max-width: 700px;
}
```