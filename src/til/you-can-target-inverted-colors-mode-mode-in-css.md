---
title: You can target Inverted Colors Mode mode in CSS
link: >-
  https://a11yproject.com/posts/operating-system-and-browser-accessibility-display-modes/
date: 2020-01-29T05:01:48.408Z
no: 30
---
```css
@media (inverted-colors: inverted) {
  img,
  video {
    filter: invert(100%);
  }
}
```