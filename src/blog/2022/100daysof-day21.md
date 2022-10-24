---
title: 'Day 21: conic gradients'
date: 2022-10-24T09:38:54.969Z
image: articles/sm_100days-day21.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "You can create gradients with color transitions rotated around a center point, rather than radiating from the center, by using the `conic-gradient()` function."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/poVBoMz
layout: "layouts/100days.njk"
caniuse: "::backdrop"
reading:
  - title: "conic-gradient() on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient
---

There are many options to customize conic gradients.

<style>
  .uno {
    background-image: conic-gradient(aqua, fuchsia, salmon, aqua);  
  }

  .due {
    background-image: conic-gradient(aqua, fuchsia);  
  }

  .tre {
    background-image: conic-gradient(from 90deg, aqua, fuchsia);  
  }

  .quattro {
    background-image: conic-gradient(from 90deg at 4rem 4rem, aqua, fuchsia);
  }

  .cinque {
    background-image: conic-gradient(from 90deg at 25% 75%, aqua, fuchsia);
  }

  .sei {
    background-image: conic-gradient(from 90deg at center left, aqua, fuchsia);
  }

  .sette {
    background-image: conic-gradient(aqua 0deg, fuchsia 120deg, salmon 240deg, aqua 360deg);  
  }

  .otto {
    background-image: conic-gradient(aqua 0deg, fuchsia 80deg, salmon 130deg, aqua 360deg);
  }

  .nove {
    background-image: conic-gradient(aqua 0deg 50deg, fuchsia 80deg 100deg, salmon 130deg 140deg, aqua 360deg)
  }

  .dieci {
    background-image: conic-gradient(aqua 0deg 120deg, fuchsia 120deg 240deg, salmon 240deg 360deg);  
  }

  .div {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }
</style>

## Colors only

The simplest way to create a conic gradient is to pass a list of colors to the function.

```css
div {
  background-image: conic-gradient(aqua, fuchsia, salmon, aqua);  
}
```

<div class="div uno"></div>

## Angle

By default, the gradient starts at 0 degrees and rotates clockwise.


```css
div {
  background-image: conic-gradient(aqua, fuchsia);  
}
```

<div class="div due"></div>

You can pass an angle, preceded by the “from” keyword, to change the starting point.

```css
div {
  background-image: conic-gradient(from 90deg, aqua, fuchsia);  
}
```

<div class="div tre"></div>

## Off-centered gradient

By default, the center pointer of the gradient is at the center of the element. You can change that by passing a length, percentage, or keyword.

### Length

```css
div {
  background-image: conic-gradient(from 90deg at 4rem 4rem, aqua, fuchsia);
}
```
<div class="div quattro"></div>

### Percentage

```css
div {
  background-image: conic-gradient(from 90deg at 25% 75%, aqua, fuchsia);
}
```
<div class="div cinque"></div>

### Keywords

```css
div {
  background-image: conic-gradient(from 90deg at center left, aqua, fuchsia);
}
```

<div class="div sei"></div>

## Custom color stop positions

By default, color stops are placed halfway between the one that precedes it and the one that follows it, with color transitioning smoothly. The first is at 0deg and the last at 360deg.  
The following two gradients are equivalent.

```css
div {
  background-image: conic-gradient(aqua, fuchsia, salmon, aqua);  
  background-image: conic-gradient(aqua 0deg, fuchsia 120deg, salmon 240deg, aqua 360deg);  
}
```

<div class="div sette"></div>

You can move the transitiom midpoint for any color. 

```css
div {
  background-image: conic-gradient(aqua 0deg, fuchsia 80deg, salmon 130deg, aqua 360deg);
}
```

<div class="div otto"></div>

You can pass a second color stop value to define where the color starts and stops.

```css
div {
  background-image: conic-gradient(aqua 0deg 50deg, fuchsia 80deg 100deg, salmon 130deg 140deg, aqua 360deg)
}
```
<div class="div nove"></div>

If two or more colors are at the same location, there will be a hard line between the colors.

```css
div {
  background-image: conic-gradient(aqua 0deg 120deg, fuchsia 120deg 240deg, salmon 240deg 360deg);  
}
```

<div class="div dieci"></div>
