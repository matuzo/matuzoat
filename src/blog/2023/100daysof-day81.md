---
title: 'Day 81: the order of individual transform properties'
date: 2023-01-13T09:38:54.969Z
image: articles/sm_100days-day80.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "[On day 66](/blog/2023/100daysof-day76/), I’ve introduced you to individual transform properties. An interesting detail about these properties is the order in which transforms are applied compared to the `transform` property."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/GRBvBde
layout: "layouts/100days.njk"
reading:
  - title: "Finer grained control over CSS transforms with individual transform properties"
    url: https://web.dev/css-individual-transform-properties/
  - title: "Order in CSS transformations – transform functions vs individual transforms"
    url: https://www.stefanjudis.com/blog/order-in-css-transformation-transform-functions-vs-individual-transforms/
---

If you use the `transform` property, transformation functions are applied in the order of appearance, from left to right.

<style>
  .button1 {
  transform: translateX(50px) scale(1.5); 
}

.button2 {
  transform: scale(1.5) translateX(50px); 
}

.button3 {
  translate: 50px 0;
  scale: 1.5; 
}

.button4 {
  scale: 1.5; 
  translate: 50px 0;
}

.button5 {
  transform: translateX(50px); 
  scale: 1.5;
}

.button6 {
  translate: 50px 0;
  transform: scale(1.5); 
}

</style>

```html
<button class="button1">Button 1</button>
<button class="button2">Button 2</button>
```

```css
.button1 {
  transform: translateX(50px) scale(1.5); 
}

.button2 {
  transform: scale(1.5) translateX(50px); 
}
```

<div data-sample="demo">
<button class="button1">Button 1</button>
<br><br>
<button class="button2">Button 2</button>
</div>

With individual transform properties, the order of appearance of the declarations doesn’t matter. The order is always the same: `translate` –> `rotate` –> `scale`.

```css
.button3 {
  translate: 50px 0;
  scale: 1.5; 
}

.button4 {
  scale: 1.5; 
  translate: 50px 0;
}
```

<div data-sample="demo">
<button class="button3">Button 3</button>
<br><br>
<button class="button4">Button 4</button>
</div>

If you mix `transform` and individual properties, individual transforms get applied first.

```css
.button5 {
  transform: translateX(50px); 
  scale: 1.5;
}

.button6 {
  transform: scale(1.5); 
  translate: 50px 0;
}
```

<div data-sample="demo">
<button class="button5">Button 5</button>
<br><br>
<button class="button6">Button 6</button>
</div>