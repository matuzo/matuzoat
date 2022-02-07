---
title: Using the background-origin property you can position background images relative to the inner border edge (default), outer border edge, or the content edge.
link: https://codepen.io/matuzo/pen/vYLqoRM?editors=1100
date: 2020-07-31T05:07:15.643Z
no: 38
---
```css
div {
  background-image: url("https://assets.codepen.io/144736/save.png");
  background-repeat: no-repeat;
  background-position: top right;
}

.border {
  background-origin: border-box;
}

.content {
  background-origin: content-box;
}
```