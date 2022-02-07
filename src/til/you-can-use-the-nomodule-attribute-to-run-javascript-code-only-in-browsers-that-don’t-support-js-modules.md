---
title: You can use the nomodule attribute to run JavaScript code only in
  browsers that don’t support JS modules.
link: https://codepen.io/matuzo/pen/vYGzyKJ
date: 2020-10-02T12:47:03.653Z
no: 39
---
```html
<script nomodule>
  console.log('This browser doesn’t support JS Modules.');
</script>

<script type="module">
  console.log('This browser supports JS Modules.');
</script>
```