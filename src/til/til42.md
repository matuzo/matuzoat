---
title: You can make a link in an iframe open in its parent window, if you set target="_parent". 
link: https://codepen.io/matuzo/pen/mdrmJOB?editors=1000
date: 2020-12-16T17:45:34.386Z
no: 43
---

```html
<!-- Parent File-->
<iframe src="https://codepen.io/matuzo/debug/YzGVXGV" frameborder="0"></iframe>

<!-- Embedded file -->
<ul>
  <li>
    <a href="https://a11yproject.com">no target</a>
  </li>  
  <li>
    <a href="https://a11yproject.com" target="_blank">target="_blank"</a>
  </li>
  <li>
    <a href="https://a11yproject.com" target="_parent">target="_parent"</a>
  </li>
</ul>
```
