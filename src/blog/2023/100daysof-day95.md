---
title: 'Day 95: the color-mix() function'
date: 2023-02-02T09:38:54.969Z
image: articles/sm_100days-day95.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `color-mix()` function takes two colors and returns the result of mixing them, in a given color space, by a specified amount."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/wvxRKXY
layout: "layouts/100days.njk"
reading:
  - title: "2. Mixing Colors: the color-mix() Function"
    url: https://www.w3.org/TR/css-color-5/#color-mix
  - title: "CSS color-mix()"
    url: https://developer.chrome.com/blog/css-color-mix/
---
To mix colors, pass the `in` keyword, followed by the color space, and 2 colors.

```css
body {
  background-color: color-mix(in srgb, blue, white);
}
```

The syntax is pretty straightforward, but the result is not so much. At least for someone like me who doesn’t understand color and color on the web very well. What surprised me specifically is that mixing colors in different color spaces can yield very different results.

```css
:root {
  --color1: blue;
  --color2: white;
}

.a { --bg: color-mix(in srgb, var(--color1), var(--color2)); }
.b { --bg: color-mix(in srgb-linear, var(--color1), var(--color2)); }
.c { --bg: color-mix(in hsl, var(--color1), var(--color2)); }
.d { --bg: color-mix(in hwb, var(--color1), var(--color2)); }
.e { --bg: color-mix(in lch, var(--color1), var(--color2)); }
.f { --bg: color-mix(in oklch, var(--color1), var(--color2)); }
.g { --bg: color-mix(in lab, var(--color1), var(--color2)); }
.h { --bg: color-mix(in oklab, var(--color1), var(--color2)); }
```

```html
<div class="a">srgb</div>
<div class="b">srgb-linear</div>
<div class="c">hsl</div>
<div class="d">hwb</div>
<div class="e">lch</div>
<div class="f">oklch</div>
<div class="g">lab</div>
<div class="h">oklab</div>
```

<img src="/images/100days-95-1.png" width="250" alt="every resulting color is different. it's either a light or dark lilac color, blueish, pinkish or even green." >

Each color will be mixed in equally. The resulting color will have 50% blue and 50% white. We can adjust that ratio.

```css
body {
  background-color: color-mix(in srgb, 30% blue, white);
  /* Same as:
    background-color: color-mix(in srgb, 30% blue, 70% white);
    background-color: color-mix(in srgb, blue 30%, white);
    background-color: color-mix(in srgb, blue, white 70%);
  */
}
```


<img src="/images/100days-95-2.png" width="250" alt="The same colors, just a little lighter." >

You can learn more about the function in Adam Argyle's fantastic article “[CSS color-mix()](https://developer.chrome.com/blog/css-color-mix/)”.

<div class="highlight">

`color-mix()` is currently only supported behind a flag in Safari, but it will be supported in Chrome starting with version 111.

</div>