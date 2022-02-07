---
title: The order in which transform functions in the transform shorthand
  property are defined matters.
link: https://codepen.io/pawelgrzybek/pen/GRZbjdv
date: 2020-10-02T13:01:55.290Z
no: 40
---
```css
.box1 {
  transform: translateX(200px) rotate(45deg);
}

.box2 {
  transform: rotate(45deg) translateX(200px);
}
```