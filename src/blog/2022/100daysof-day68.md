---
title: 'Day 68: cascade layers and browser support'
date: 2022-12-28T09:38:54.969Z
image: articles/sm_100days-day68.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Cascade layers are one of the most interesting and useful additions to CSS recently. It will change the way we write CSS, how we use selectors, naming conventions, and probably also more things that I can’t think of right now. "
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/oNMbprg
layout: "layouts/100days.njk"
reading:
  - title: "Day 37: cascade layers"
    url: /blog/2022/100daysof-day37/
  - title: "Day 40: unlayered styles"
    url: /blog/2022/100daysof-day40/
  - title: "Day 43: grouping layers"
    url: /blog/2022/100daysof-day43/
  - title: "Day 46: ordering layers"
    url: /blog/2022/100daysof-day46/
  - title: "Day 49: layering entire style sheets"
    url: /blog/2022/100daysof-day49/
  - title: "Day 52: multiple layer lists"
    url: /blog/2022/100daysof-day52/
  - title: "Day 55: anonymous layers"
    url: /blog/2022/100daysof-day55/
  - title: "Day 58: ordering nested layers"
    url: /blog/2022/100daysof-day58/
  - title: "Day 64: the revert-layer keyword"
    url: /blog/2022/100daysof-day64/
  - title: "Day 74: using !important in cascade layers"
    url: /blog/2022/100daysof-day74
---
If you’re as excited about using cascade layers as I am, you have to consider browser support before you get started.

## Browser support

All major desktop browsers started supporting cascade layers between February and April 2022, but your users might use an older version of Safari, [IE11](https://adrianroselli.com/2022/06/internet-explorer-still-does-not-go-away-today.html), or one of the mobile browsers that doesn’t support it yet.

<figure>
  <a href="https://caniuse.com/css-cascade-layers">
    <img src="/images/caniuse_cascade-layers.jpg" alt="cascade layers on caniuse.com">
  </a>
  <figcaption>
    Browser support: Chrome, Edge since version 99, Safari iOS/macOS 15.4, Firefox 97, Opera 86, Chrome for Android/Android Browser 108, Samsung Internet 18, Firefox for Android 107, Opera Mobile 72.
  </figcaption>
</figure>

## Feature queries

When you use cascade layers in a browser that doesn’t support them, styles in your layers will be ignored entirely. Only unlayered styles will be applied. I was trying to figure out a way to serve styles only to browsers that don’t support layers in order to provide some kind of basic fallback styling for them, but I had no luck.

There is a [@supports feature in CSS](https://css-tricks.com/css-cascade-layers/#aa-query-feature-support-using-supports) that will allow us to test for support of `@layer` and other at-rules, but the feature itself has no support in any browser yet.

```css
@supports at-rule(@layer) {
  /* code applied for browsers with layer support */
}

@supports not at-rule(@layer) {
  /* fallback applied for browsers without layer support */
}
```

## Polyfill

If you want to use cascade layers today, your best option is to use this [PostCSS polyfill](https://www.npmjs.com/package/@csstools/postcss-cascade-layers). Miriam Suzanne explains how to use it and how it works in  [Cascade Layers – There's a Polyfill for That!](https://www.oddbird.net/2022/06/21/cascade-layers-polyfill/)

```bash
npm install postcss @csstools/postcss-cascade-layers --save-dev
```

```js
const postcss = require('postcss');
const postcssCascadeLayers = require('@csstools/postcss-cascade-layers');

postcss([
  postcssCascadeLayers(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```