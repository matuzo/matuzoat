---
title: 'Day 62: the container shorthand'
date: 2022-12-20T09:38:54.969Z
image: articles/sm_100days-day62.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "On [day 56](/blog/2022/100daysof-day56/) you've learned that you have to define a `container-type` when working with size containers and on [day 59](/blog/2022/100daysof-day59/) you've learned that you can name containers using the `container-name` property."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/jOpENgy
layout: "layouts/100days.njk"
reading:
  - title: "Use the Right Container Query Syntax"
    url: https://www.oddbird.net/2022/08/18/cq-syntax/
  - title: "CSS Containment Module Level 3"
    url: https://www.w3.org/TR/css-contain-3/
  - title: "Day 56: container queries"
    url: /blog/2022/100daysof-day56/
  - title: "Day 59: naming containers"
    url: /blog/2022/100daysof-day59/
  - title: "Day 65: using the em unit in container queries"
    url: /blog/2022/100daysof-day65/
  - title: "Day 69: width in container queries"
    url: /blog/2022/100daysof-day69/
  - title: "Day 73: size container features"
    url: /blog/2023/100daysof-day73/
  - title: "Day 78: container query units"
    url: /blog/2023/100daysof-day78/
---
The `container` shorthand allows you to define both properties in a single property, `[name]` / `[type]`.

```css
section {  
  container: wrapper / inline-size;

  /*
    Same as:
    container-name: wrapper;
    container-type: inline-size;
  */
}
```

If you only define a single value (the name), the type is `normal` by default.

```css
section {  
  container: wrapper;

  /*
    Same as:
    container-name: wrapper;
    container-type: normal;
  */
}
```