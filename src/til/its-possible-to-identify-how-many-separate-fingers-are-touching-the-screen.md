---
title: It's possible to identify how many separate fingers are touching the screen.
link: 'https://codepen.io/matuzo/debug/NQPRvN'
date: 2019-07-19T07:29:08.352Z
no: 17
---
```js
document.body.addEventListener("touchstart", function(e) {
  console.log(`${e.touches.length} fingers`)
})
```