---
title: Adding an i (or I) before the closing bracket in an attribute selector causes the value to be compared case-insensitively.
link: https://codepen.io/matuzo/pen/jOMOQOq?editors=1100
date: 2020-11-27T17:45:34.386Z
no: 42
---
```html
<button class="mybutton">Send</button> <!-- red border -->
<button class="myButton">Send</button> <!-- green border -->
```
```css
[class*="button" i] { /* matches mybutton and myButton */
  border: 10px solid green;
}

[class*="button"] { /* matches only mybutton */
  border-color: red;
}
```
