---
title: 'Day 23: the lab() color function'
date: 2022-10-26T09:38:54.969Z
image: articles/sm_100days-day23.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `lab()` color function allows you to pick colors from the [CIELAB color space](https://en.wikipedia.org/wiki/CIELAB_color_space), which is device-independant and covers the entire gamut (range) of human color perception."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/RwymbzW
layout: "layouts/100days.njk"
caniuse: "lab()"
reading:
  - title: "A Guide To Modern CSS Colors With RGB, HSL, HWB, LAB And LCH"
    url: https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/
  - title: "LCH colors in CSS: what, why, and how?"
    url: https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/
  - title: "10.1. CIE Lab and LCH"
    url: https://www.w3.org/TR/css-color-4/#cie-lab
  - title: "lab() on caniuse"
    url: https://caniuse.com/css-lch-lab
---
Currently, the CSS colors we can define are in the sRGB color space. For the longest time, professional monitors weren’t able to display all possible colors in this range. So, using sRGB colors was absolutely sufficient, but that’s not true anymore. Nowadays, monitors can display much more colors than exist in the sRGB color space. With `lab()` we get access to these colors (currently [Safari 15+ only](https://caniuse.com/css-lch-lab)).

The function takes 3 space-separated values.

```css
div {
  background-color: lab(78% -64 -160);
}
```

<figure style="max-width: 250px">
<img src="/images/lab_1.png" width="250" alt="bright light blue color">
<figcaption> Screenshot of Michelle Barkers <a href="https://codepen.io/smashingmag/pen/JjywKNK">“LAB color explorer”</a> on CodePen</figcaption>
</figure>

## l - lightness

The first value defines the lightness. It's typically a number between 0% (representing black) and 100% (representing white). It's *typically* a number between 0% and 100% because the value can exceed 100% up to 400% representing extra-bright whites on some systems.

```css
div {
  background-color: lab(0% 0 0);
}
```

<img src="/images/lab_2.png" width="250" alt="black">


## a-axis and b-axis

The a and b axes convey hue. The value for each axis is theoretically unbounded, but in practice doesn't exceed -160 and 160.

Negative values along the a-axis are green. Positive values are red.

```css
div {
  background-color: lab(33% -123 0);
}
```

<img src="/images/lab_3.png" width="250" alt="dark green color">

Negative values along the b-axis are blue. Positive values are yellow.

```css
div {
  background-color: lab(85% 0 114);
}
```

<img src="/images/lab_4.png" width="250" alt="dark yellow color">
