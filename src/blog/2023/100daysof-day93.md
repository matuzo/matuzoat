---
title: 'Day 93: the lch() color function'
date: 2023-02-01T09:38:54.969Z
image: articles/sm_100days-day93.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `lch()` color function allows you to pick colors from the [CIELAB color space](https://en.wikipedia.org/wiki/CIELAB_color_space), which is device-independant and covers the entire gamut (range) of human color perception."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/abjREMX
layout: "layouts/100days.njk"
reading:
  - title: "9.3. Specifying Lab and LCH: the lab() and lch() functional notations"
    url: https://www.w3.org/TR/css-color-4/#specifying-lab-lch
  - title: "LCH Color Picker & Converter"
    url: https://lch.oklch.com/
---
Currently, the CSS colors we can define are in the sRGB color space. For the longest time, professional monitors weren’t able to display all possible colors in this range. So, using sRGB colors was absolutely sufficient, but that’s not true anymore. Nowadays, monitors can display much more colors than exist in the sRGB color space. With `lch()` we get access to these colors (currently [Safari 15+ only](https://caniuse.com/css-lch-lab)).

The function takes 3 space-separated values.

```css
div {
  background-color: lch(78% 172.33 248.2);
}
```

<img src="/images/lch_1.png" width="250" alt="bright light blue color">

## l - lightness

The first value defines the lightness. It's typically a number between 0% (representing black) and 100% (representing white). It's *typically* a number between 0% and 100% because the value can exceed 100% up to 400% representing extra-bright whites on some systems. It's the same lightness as in the `lab()` color function. 

```css
div {
  background-color: lch(0% 0 0);
}
```

<img src="/images/lch_2.png" width="250" alt="black">

## c - chroma

The second argument is the chroma (roughly representing the “amount of color”). Its a value between 0 and 230.


```css
div {
  background-color: lch(100% 180 0)
}
```

<img src="/images/lch_3.png" width="250" alt="dark green color">

## h - hue

The third argument is the hue angle. 0deg points along the positive “a” axis (toward purplish red). 90deg points along the positive “b” axis (toward mustard yellow), 180deg points along the negative “a” axis (toward greenish cyan), and 270deg points along the negative “b” axis (toward sky blue).

```css
div {
  background-color: lch(100% 180 90);
}
```

<img src="/images/lch_4.png" width="250" alt="dark green color">