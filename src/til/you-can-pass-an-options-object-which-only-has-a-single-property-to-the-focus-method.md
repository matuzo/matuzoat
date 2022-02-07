---
title: >-
  You can pass an `options` object, which only has a single property, to the
  `focus()` method to prevent scrolling on focus.
link: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus'
date: 2019-01-24T06:34:55.613Z
no: 3
---
```js
document.querySelector('#anchor').focus(
  {
    preventScroll: true
  }
)
```