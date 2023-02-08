---
title: 'Day 98: oklab() and oklch()'
date: 2023-02-08T09:38:54.969Z
image: articles/sm_100days-day98.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "`oklab()` and `oklch()` are okay versions of `lab()` and `lch()` because `lab()` and `lch()` are not okay."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/gOjJQMV
layout: "layouts/100days.njk"
reading:
  - title: "OKLCH in CSS: why we moved from RGB and HSL"
    url: https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
  - title: "A perceptual color space for image processing"
    url: https://bottosson.github.io/posts/oklab/
---

I will not pretend that I really understand this whole color on the web thing, how it works or why one color function offers many more options to developers than the other, but I did learn several things during this experiment. I understand why a color function like [`hsl()` offers better DX than `rgb()`](/blog/2023/hsl-custom-properties/). I’ve learned that [rgb(), hsl(), and hwb()](/blog/2022/100daysof-day30/) use colors from the sRGB color space, and [lab()](/blog/2022/100daysof-day23/) and [lch()](/blog/2023/100daysof-day93/) colors from the CIELAB color space. These color functions are relevant now because they support more colors and modern monitors can display them. It kinda also makes sense to me why some people say that using [lch() is more intuitive than lab()](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl#oklch-vs-oklab--lch-vs-lab).

This doesn’t sound too bad, but as soon as I dig deeper into colors, I soon reach a point where I’m out. It’s usually a graph or complicated formula that stops my enthusiasm. Why am I saying this? I don’t know, maybe self-defense, maybe to make you feel better and assure you it’s fine to not understand everything.

Anyway, now I’ve added `hsl()`, `hwb()`, `lab()`, and `lch()` to my tool belt, and along comes <s>mary</s> `oklab()` and `oklch()`. lab and lch are great, but not perfect. The main issue with lab and lch is that there's a bug with blue colors which turns blue purple. 

<img src="/images/100days-98.png" loading="lazy" alt="3 shades of blue compared in lch and oklch. oklch colors look blue while lch colors turn purple.">

`oklab()` and `oklch()` fix that.

<figure>
<img src="/images/lch-vs-oklch.avif" loading="lazy" alt="Two triangles that are constant-hue slice of LCH and OKLCH spaces with the same hue. The LCH slice, the leftmost triangular shape, is blue on one side and purple on the other. The right shape, OKLCH, keeps a constant hue, as expected.">
<figcaption>Source: <a href="https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl">evilmartians.com</a></figcaption>
</figure>





The okay versions of lab and lch come with additional improvements. You can learn more about it Chris Lilley's presentation “[Better than Lab? Gamut reduction CIE Lab & OKLab](https://www.youtube.com/watch?v=dOsp6u4bIwI)”.
