---
title: 'Day 41: custom properties and url()s'
date: 2022-11-21T09:38:54.969Z
image: articles/sm_100days-day41.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Let’s say you want to swap the background image of an element based on a certain condition, like whether it’s pressed, using custom properties."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/wvXpYyL
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Why custom properties don't work with the url() CSS function"
    url: https://www.stefanjudis.com/today-i-learned/custom-properties-dont-work-with-the-url-css-function/
  - title: "Day 1: custom properties and fallbacks"
    url: /blog/2022/100daysof-day1
  - title: "Day 28: custom properties and web components"
    url: /blog/2022/100daysof-day28
  - title: "Day 29: !important custom properties"
    url: /blog/2022/100daysof-day29
---

```css
button {
  --background-image: "/not-pressed.svg";
  background: url(var(--background-image));
}

button[aria-pressed="true"] {
  --background-image: "/pressed.svg";
}
```

This looks fine, but it doesn't work because `var(--background-image)` contains invalid characters. The reason the argument is invalid is that `url()` works both with quotes `url("image.svg")` or `url('image.svg')` and without quotes `url(image.svg)`. By passing a value without quotes you're not passing a string to a CSS function, but you're creating an [url-token](https://www.w3.org/TR/css-syntax-3/#url-token-diagram) and this token expects a certain format that requires characters like ( to be escaped.  
That's a very abbreviated explanation. For details, please read [“Why custom properties don't work with the url() CSS function”](https://www.stefanjudis.com/today-i-learned/custom-properties-dont-work-with-the-url-css-function/) by the amazing Stefan Judis.

To work around that issue, you have to move the `url()` function into the value of the custom property.

```css
button {
  --background-image: url("/not-pressed.svg");
  background: var(--background-image);
}

button[aria-pressed="true"] {
  --background-image: url("/pressed.svg");
}
```