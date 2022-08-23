---
title: TIL that you can use the :scope pseudo class to select direct children of an element with .querySelectorAll().
link: https://codepen.io/pen/?editors=1001
date: 2022-08-23T17:45:34.386Z
---

```html
<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>

<p>D</p>
``` 

```js
  console.log(document.body.querySelectorAll('*'))
  // NodeList(5) [ul, li, li, li, p]
  
  console.log(document.body.querySelectorAll(':scope > *'))
  // NodeList(2) [ul, p]
``` 