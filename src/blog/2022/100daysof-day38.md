---
title: 'Day 38: vh, svh, lvh, and dvh'
date: 2022-11-16T09:38:54.969Z
image: articles/sm_100days-day38.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Using the viewport unit `vh` in desktop browsers is usually straight-forward, `100vh` matches the height of the viewport. On mobile that's different because the viewport height changes depending on whether or not certain user interface elements are visible, `100vh` doesn't always match the height of the viewport."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/dyKNvzy
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "It's viewports all the way down | HTTP 203"
    url: https://www.youtube.com/watch?v=xl9R8aTOW_I
  - title: "6.1.2.1. The Large, Small, and Dynamic Viewport Sizes"
    url: https://www.w3.org/TR/css-values-4/#viewport-variants
  - title: "Large, Small, and Dynamic viewport units (caniuse)"
    url: https://caniuse.com/viewport-unit-variants
---


On mobile we have the small viewport and the large viewport. According to the spec, the small viewport is <q>the viewport sized assuming any UA [User Agent/Browser] interfaces [for example the address bar] that are dynamically expanded and retracted to be expanded</q>.

<img src="/images/100days-38-1.jpg" alt="a red border marking the visible area of the viewport. Below address bar and other controls." width="300">

The large viewport is <q>the viewport sized assuming any UA interfaces that are dynamically expanded and retracted to be retracted</q>.

<img src="/images/100days-38-2.png" alt="a red border marking the visible area of the viewport, which fills almost the whole screen, no UA interface elements visible." width="300" loading="lazy">

The problem with `100vh` on mobile is that it doesn’t respect whether user interface elements are expanded or not. It usually always matches the large viewport. CSS introduces new viewport units to address that issue.

You can use `svh` for the small viewport and `lvh` for the large viewport.

```css
div {
  height: 100svh;
  /* See result in the first screenshot */
}
```

```css
div {
  height: 100lvh;
  /* See result in the second screenshot */
}
```

That's great, but depending on if and how the user interacts with the page, they might sometimes see the large viewport and sometimes the small viewport. Setting the height to either unit probably isn't what you want because the height changes dynamically. Instead, you want to use the third new unit `dvh`, which dynamically either matches `svh` or `lvh`.

```css
div {
  height: 100dvh;
}
```

<img src="/images/100days-38-3.jpg" alt="comparisson of vh, lvh, svh, and dvh on a small and large viewport" width="700" loading="lazy">