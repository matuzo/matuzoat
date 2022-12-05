---
title: 'Day 42: aspect-ratio'
date: 2022-11-22T09:38:54.969Z
image: articles/sm_100days-day42.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Yes, I know, `aspect-ratio` is not the hottest shit, but Safari only starting supporting it in version 15 and there’s a lot I didn’t know about the property. That’s reason enough for me to write about it. :)"
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/wvXpYyL
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Native Aspect Ratio Boxes in CSS thanks to aspect-ratio"
    url: https://www.bram.us/2020/11/30/native-aspect-ratio-boxes-in-css-thanks-to-aspect-ratio/
  - title: "Day 51: aspect-ratio and replaced elements"
    url: /blog/2022/100daysof-day51
---

## Defining ratios

You can use the `aspect-ratio` property to define the preferred aspect ratio for a box by defining a preferred width and height.

The maximum width of the following element is `400px`, and due to the defined ratio of `16 / 9` the height equals `225px` (400 / 16 * 9) = 225). If the available width gets below 400, the height scales accordingly.

```css
div {
  aspect-ratio: 16 / 9; /* aspect-ratio: width / height */
  max-width: 400px;
}
```

<style>

.ratio {
  border: 3px solid;
  max-width: 400px;
}

.ratio1 {
    aspect-ratio: 16 / 9;
}

.ratio2 {
    aspect-ratio: 400 / 225;
}

.ratio3 {
    aspect-ratio: 1 / 1;
}

.ratio4 {
    aspect-ratio: 1;
}

.ratio5 {
    aspect-ratio: 4;
}

.ratio6 {
  aspect-ratio: 16 / 9;
  width: 250px;
  height: 250px;
}

.ratio7 {
  aspect-ratio: 4;
  max-width: 400px;
  overflow: auto;
}

</style>

<div class="ratio ratio1"></div>

Instead of writing `aspect-ratio: 16 / 9` we can also write `aspect-ratio: 400 / 225`.

```css
div {
  aspect-ratio: 400 / 225;
  max-width: 400px;
}
```

<div class="ratio ratio2"></div>

## Squares

If you want to create a square, you need a ratio of `1:1`, or `42:42`, or `742617000027:742617000027`;

```css
div {
  aspect-ratio: 1 / 1;
  max-width: 400px;
}
```

<div class="ratio ratio3"></div>

That's the same as writing `aspect-ratio: 1` because if you omit the second value, the value for the height is `1` by default.

```css
div {
  aspect-ratio: 1;
  max-width: 400px;
}
```

<div class="ratio ratio4"></div>

## Single value ratios

If `aspect-ratio: 1` equals `aspect-ratio: 1 / 1`, this means that `aspect-ratio: 4` equals `aspect-ratio: 4 / 1`.

```css
div {
  aspect-ratio: 4;
  max-width: 400px;
}
```

<div class="ratio ratio5"></div>

## width, height, and aspect-ratio

`aspect-ratio` has no effect if you set the value of both the `width` and `height` to something other than `auto`.

```css
div {
  aspect-ratio: 16 / 9;
  width: 250px;
  height: 250px;
}
```

<div class="ratio ratio6"></div>

## preferred, not enforced ratio

If the content of your box is larger than the preferred height, content won't be cut-off but the box grows with its content, ignoring the ratio.

```css
div {
  aspect-ratio: 4;
  max-width: 400px;
}
```

<div class="ratio ratio5">
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
    <li>D</li>
    <li>E</li>
    <li>F</li>
  </ul>
</div>

You can change the behaviour by defining a different value for the `overflow` property.

```css
div {
  aspect-ratio: 4;
  max-width: 400px;
  overflow: auto;
}
```

<div class="ratio ratio7">
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
    <li>D</li>
    <li>E</li>
    <li>F</li>
  </ul>
</div>