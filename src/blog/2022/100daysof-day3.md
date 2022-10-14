---
title: 'Day 3: logical property shorthands'
date: 2022-09-28T09:38:54.969Z
image: articles/sm_100days-day3.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "If you use a shorthand property like `margin` with all 4 values, the properties will always be applied in the direction *top* - *right* - *bottom* - *left*, no matter the reading direction."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/MWVxBNP
layout: "layouts/100days.njk"
reading:
  - title: "Logical Properties for Useful Shorthands "
    url: https://css-irl.info/logical-properties-for-useful-shorthands/?ref=sidebar
caniuse: "margin-inline"
---
```html
<button>Physical margin</button>
<button dir="rtl">Physical margin rtl</button>
```

```css
button {
  margin: 20px 40px 10px 100px;
}

/*
LTR: 20px 40px 10px 100px
RTL: 20px 40px 10px 100px
*/
```

<style>
.physical {
  margin: 20px 40px 10px 100px;
}

button {
  width: 100px;
  height: 100px;
  border: 4px solid #000;
  display: block;
  background: none;
}

.logical {
  margin-inline: 100px 40px;
  margin-block: 20px 10px;
}
</style>

<button type="button" class="physical">Physical margin</button>
<button type="button" dir="rtl" class="physical">Physical margin rtl</button>

This might be desired, but it could also happen that you want `margin` to respect the reading direction. [Logical Properties](/blog/2022/100daysof-day2/) introduce 2 new shorthand properties, `margin-inline` and `margin-block`. These properties take 1 or 2 values.

```css
.logical {
  margin-inline: 5rem; /* start and end value (= left and right) */
  margin-block: 5rem; /* start and end value (= top and bottom) */
  margin-inline: 1rem 2rem; /* start / end value (= left / right in ltr) */
  margin-block: 3rem 4rem; /* start / end value (= top / bottom in ltr) */
}
```

Unlike `margin`, `margin-inline` and `margin-block` respect the reading direction.

```html
<button>Logical margin</button>
<button dir="rtl">Logical margin rtl</button>
```

```css
button {
  margin-inline: 100px 40px; /* 100px = start/left, 40px = end/right */
  margin-block: 20px 10px; /* 20px = start/top, 10px = end/bottom */
}

/*
LTR: 20px 40px 10px 100px
RTL: 20px 100px 10px 40px
*/
```

<button type="button" class="logical">Logical margin</button>
<button type="button" dir="rtl" class="logical">Logical margin rtl</button>