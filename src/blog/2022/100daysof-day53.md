---
title: 'Day 53: disabling pull-to-refresh'
date: 2022-12-07T09:38:54.969Z
image: articles/sm_100days-day47.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "On day 47, I introduced you to the [overscroll-behavior property](/blog/2022/100daysof-day47/), and I showed you how to use it to disable scroll-chaining. There’s another feature we can disable using this property."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/YzvBrgO
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 47: the overscroll-behavior property"
    url: /blog/2022/100daysof-day47/
  - title: "overscroll-behavior on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
---
In some mobile browsers, you can refresh the page by swiping down when the page is scrolled to the very top. That's called pull-to-refresh. This is a great feature, but depending on what the user’s interacting with on the page, this can be undesirable.

You can use `overscroll-behavior: none;` to disable pull-to-refresh.

```css
html, body {
  overscroll-behavior: none;
}
```

You have to put it on `<html>` and `<body>` because in Chrome it only works on the `<body>` and in Safari only on the `<html>` element (tested on Android 12 Chrome, FF, Samsung Internet and Safari 16 on iOS).

Please don't disable this feature by default, only when it's beneficial to your users.