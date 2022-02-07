---
title: You can use the CSS Paint API to create background images in CSS.
link: https://developer.mozilla.org/en-US/docs/Web/API/PaintWorklet
date: 2019-09-25T17:47:03.448Z
no: 21
---
```css
body {
background-image: paint(checkerboard);
}
```
```html
<script>
  if ('paintWorklet' in CSS) {
    CSS.paintWorklet.addModule('checkerboard.js');
  }
</script>
```

```js
// checkerboard.js
class CheckerboardPainter {
  paint(ctx, geom, properties) {
    const colors = ['red', 'green', 'blue'];
    const size = 32;
    for(let y = 0; y < geom.height/size; y++) {
      for(let x = 0; x < geom.width/size; x++) {
        const color = colors[(x + y) % colors.length];
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(x * size, y * size, size, size);
        ctx.fill();
      }
    }
  }
}

registerPaint('checkerboard', CheckerboardPainter);
```