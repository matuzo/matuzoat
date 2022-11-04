---
title: 'Day 30: the hwb() color function'
date: 2022-11-04T09:38:54.969Z
image: articles/sm_100days-day30.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Like the [lab() color function](/blog/2022/100daysof-day23/), `hwb()` is one of the more recent methods for defining colors in CSS. Just like `rgb()` and `hsl()` it uses colors from the sRGB color space. HWB, which stands for hue-whiteness-blackness, describes colors with a starting hue, then a degree of whiteness and blackness to mix into that base hue."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/mdKeGbj
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "hwb() – a color notation for humans?"
    url: https://www.stefanjudis.com/blog/hwb-a-color-notation-for-humans/
  - title: "hwb() on caniuse"
    url: https://caniuse.com/mdn-css_types_color_hwb
  - title: "A Guide To Modern CSS Colors With RGB, HSL, HWB, LAB And LCH"
    url: https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/
  - title: "hwb() on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb
  - title: "hwb() playground"
    url: https://www.stefanjudis.com/blog/hwb-a-color-notation-for-humans/#%60hwb()%60-%E2%80%93-a-color-notation-%22easier-for-humans-to-work-with%22
---
The function takes 3 space-separated values.

```css
div {
  background-color: hwb(234deg 30% 34%);
}
```

## h - hue

The first value defines the hue. It's an angle of the color circle given in `degs`, `rads`, `grads`, or `turns`. The value can also be a unitless number, which defaults to `deg`.

The color circle starts and ends with red (red=0deg=360deg), green is at 120deg and blue at 240deg.

```css
div {
  background-color: hwb(0 0% 0%);
}
```

<figure style="max-width: 710px">
<img src="/images/hwb_1.jpg" width="710" alt="red color">
<figcaption> Screenshot of Stefan Judis' <a href="https://www.stefanjudis.com/blog/hwb-a-color-notation-for-humans/#%60hwb()%60-%E2%80%93-a-color-notation-%22easier-for-humans-to-work-with%22">“hwb() playground”</a></figcaption>
</figure>

```css
div {
  background-color: hwb(206 0% 0%);
}
```

<img src="/images/hwb_2.jpg" width="710" alt="blue color">

## w – whiteness
The second parameter specifies the amount of white to mix in, as a percentage from 0% (no whiteness) to 100% (full whiteness).

```css
div {
  background-color: hwb(206 68% 0%);
}
```

<img src="/images/hwb_3.jpg" width="710" alt="light blue color">

## b - blackness
The third parameter specifies the amount of black to mix in, as a percentage from 0% (no blackness) to 100% (full blackness).

```css
div {
  background-color: hwb(206 0% 42%);
}
```

<img src="/images/hwb_4.jpg" width="710" alt="dark blue color">

## opacity

You can also add a fourth parameter for the alpha value.

```css
div {
  background-color: hwb(206 0% 42% / 0.5);
}
```