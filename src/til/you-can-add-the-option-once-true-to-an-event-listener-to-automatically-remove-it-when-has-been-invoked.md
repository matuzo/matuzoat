---
title: "You can add the option { once: true } to an event listener to
  automatically remove it when has been invoked"
link: https://codepen.io/matuzo/pen/wvMOpXp?editors=1010
date: 2020-07-24T08:42:51.983Z
no: 37
---
```js
document.querySelector('.always').addEventListener('click', () => {
  alert('always')
});

document.querySelector('.once').addEventListener('click', () => {
  alert('once')
}, {
  once: true
});
```