---
title: 'Day 5: the max() function'
date: 2022-09-30T09:38:54.969Z
image: articles/sm_100days-day5.jpg
teaser: "It’s time to get me up on speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/ZExNERv
layout: "layouts/100days.njk"
caniuse: "max()"
---
The `max()` function takes a comma separated list of expressions. The largest value in the list will be selected.

```css
div {
  width: max(400px, 200px, 300px);
  /* width = 400px */
}
```

This example doesn’t make much sense because the value will always be `400px`.  
`max()` shows its true power when you use relative units.

```css
div {
  width: max(300px, 50vw);
}
```

If `50vw` is lower than 300px, `width` matches `300px`. If `50vw` is larger than 300px, it matches `50vw`. This is basically a shorter version of this.

```css
div {
  min-width: 300px;
  width: 50vw;
}
```

PS: The next post is coming on Monday because weekends are for family and friends. ❤️