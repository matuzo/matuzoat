---
title: >-
  How to get a random background-color (or any other value) each time I compile
  Sass.
link: 'https://codepen.io/matuzo/pen/oJyEVO?editors=1100'
date: 2019-01-22T06:33:09.006Z
no: 1
---
```css
$colors: (red, green, blue, yellow);

@debug(nth($colors, random(length($colors))));

body {
  background: nth($colors, random(length($colors)));
}
```