---
title: 'Day 27: the font-variation-settings property'
date: 2022-11-01T10:23:54.969Z
image: articles/sm_100days-day27.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Adjustable features of a variable font are called axes. You can use the `font-variations-settings` property to change these features by specifying the four letter axis name along with a value."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/QWxLQpP
layout: "layouts/100days.njk"
caniuse: "font-variation-settings"
reading:
  - title: "font-variation-settings on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings
---
<style>
  @font-face {
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url(/images/Saira-VariableFont_wdth,wght.woff2) format('woff2');
}


.demo {
  font-family: 'Saira';
  font-size: 3rem;
}

.demo2 {
  font-variation-settings: 'wght' 736;
}

.demo3 {
  font-variation-settings: 'wdth' 36;
}

.demo4 {
    font-variation-settings: 'wght' 736, 'wdth' 36;
}

</style>

For example, the [Saira variable font](https://fonts.google.com/specimen/Saira/tester?query=saira&vfonly=true) has two axes, weight ('wght') and width ('wdth'). This is how the font looks like by default:

<p class="demo">This is just a test.</p>

You can set the weight to a value between 100 and 900.

```css
p {
  font-variation-settings: 'wght' 736;
}
```

<p class="demo demo2">This is just a test.</p>

You can set the width to a value between 50 and 125.

```css
p {
  font-variation-settings: 'wdth' 36;
}
```

<p class="demo demo3">This is just a test.</p>

Of course, you can also combine them.

```css
p {
  font-variation-settings: 'wght' 736, 'wdth' 36;
}
```

<p class="demo demo4">This is just a test.</p>

The number and the kind of axes a font supports, depends on the font. Some have just one or two axes, [others have many](https://fonts.google.com/specimen/Roboto+Flex/tester?vfonly=true&query=roboto+flex).