---
title: 'Day 1: custom properties and fallbacks'
date: 2022-09-26T09:38:54.969Z
image: articles/sm_100days-day1.jpg
teaser: "It’s time to get me up on speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/ZExjPJO
layout: "layouts/100days.njk"
reading:
  - title: "CSS Custom Properties Fail Without Fallback"
    url: https://matthiasott.com/notes/css-custom-properties-fail-without-fallback
---
Okay, let's get right into it:

You can pass a second value to the `var()` CSS function which acts as a fallback for when the property has not been set.

## Fallbacks

```css
body {
  background-color: var(--not-set, #000);
}

/* Result: #000 background */
```

The fallback can also be a custom property (with its own fallback).

```css
body {
  background-color: var(--not-set, var(--also-not-set, #00F));
}
/* Result: #00F background */
```

## When Fallbacks fail

If you're not working with custom properties and you set a valid value for a property followed by another declaration with an invalid value, the second declaration will be ignored.

```css
body {
  background-color: #F00;
  background-color: blahaha;
}

/* Result: #F00 background */
```

When the second value is a custom property with an invalid value, the declaration is not ignored. Either the property’s inherited value or its initial value, depending on whether the property is inherited or not, will be used instead.

```css
body {
  background-color: #F00;
  background-color: var(--not-set);
}

/* Result: transparent background */
```


