---
title: 'Day 88: CSS Motion Path'
date: 2023-01-25T09:38:54.969Z
image: articles/sm_100days-day88.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "CSS Motion path allows you to position any graphical object and animate it along a specified path."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/VwBXgQV
layout: "layouts/100days.njk"
reading:
  - title: "Motion Path Module Level 1"
    url: https://www.w3.org/TR/motion-1/
  - title: "Fun with CSS Motion Path"
    url: https://css-irl.info/fun-with-css-motion-path/
  - title: "Create a Responsive CSS Motion Path? Sure We Can!"
    url: https://css-tricks.com/create-a-responsive-css-motion-path-sure-we-can/
  - title: "Method Draw Vector Editor"
    url: https://editor.method.ac/
---

<style>

  .square {
    background: hsl(93deg 75% 49%);
    height: 2em;
    width: 2em;
    position: absolute;
    inset-inline-start: 0;
    inset-block-start: 0;
  }

  .sample2 .square {
    offset-path: path("m4,139c0,-1.31731 7.78207,-137 121.62162,-137c113.83955,0 85.71428,133.04808 178.37837,127.12019");
  }

  .sample3 .square {
    offset-distance: 30%;
  }

  .sample4 .square {
    offset-rotate: 13deg;
  }

  .sample5 .square {
    animation: move 2s infinite;
    animation-play-state: paused;
  }

  [aria-pressed="true"] ~ div .square {
    animation-play-state: running;
  }

  [aria-pressed="true"] {
    outline: 4px solid green !important;
  }

  @keyframes move {
    0% {
      offset-distance: 0%;
    }

    100% {
      offset-distance: 100%;
    }
  }

  .sample6 .square {
    position: static;
  }


  .sample6  .demo-wrapper {
    height: 150px;
  }

  .demo-wrapper {
    position: relative;
  }
</style>

Let's you have a path, and you want to animate an element along that path. 

<div class="highlight">
  <strong>Note:</strong> You don't need the <code>&lt;svg&gt;</code> to achieve that, but for the sake of understanding, I'm using it in this demo to visualize the path. I've placed the square on top of the svg using absolute positioning.
</div>

```html
<svg width="305" height="144">
  <path stroke="#000" fill="none" stroke-width="4" d="m4,139c0,-1.31731 7.78207,-137 121.62162,-137c113.83955,0 85.71428,133.04808 178.37837,127.12019">
</svg>
<div class="square"></div>
```

```css
.square {
  background: hsl(93deg 75% 49%);
  height: 2em;
  width: 2em;
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
}
```

<div data-sample="demo">
  <div class="demo-wrapper">
    <svg width="305" height="144" class="svg">
      <path stroke="#000" fill="none" stroke-width="4" d="m4,139c0,-1.31731 7.78207,-137 121.62162,-137c113.83955,0 85.71428,133.04808 178.37837,127.12019"/>
    </svg>
    <div class="square"></div>
  </div>
</div>

Because of the absolute positioning, the `.square` is at the top left corner of its parent element. If you want to put the `.square` on a path (**Note**: not the actual path of the svg, but its own path), you can use the `offset-path` property. Just copy the value of the `<path>`s `d` attribute and put it in a `path()` function.

```css
.square {
  offset-path: path("m4,139c0,-1.31731 7.78207,-137 121.62162,-137c113.83955,0 85.71428,133.04808 178.37837,127.12019");
}
```

<div data-sample="demo" class="sample2">
  <div class="demo-wrapper">
    <svg width="305" height="144" class="svg">
      <path stroke="#000" fill="none" stroke-width="4" d="m4,139c0,-1.31731 7.78207,-137 121.62162,-137c113.83955,0 85.71428,133.04808 178.37837,127.12019"/>
    </svg>
    <div class="square"></div>
  </div>
</div>

The `.square` is now positioned on the path and can be moved, using `offset-distance`.

```css
.square {
  offset-path: path("m4,139c0,-1.31731 7.78207,-137 121.62162,-137c113.83955,0 85.71428,133.04808 178.37837,127.12019");
  offset-distance: 30%;
}
```

<div data-sample="demo" class="sample2 sample3">
  <div class="demo-wrapper">
    <svg width="305" height="144" class="svg">
      <path stroke="#000" fill="none" stroke-width="4" d="m4,139c0,-1.31731 7.78207,-137 121.62162,-137c113.83955,0 85.71428,133.04808 178.37837,127.12019"/>
    </svg>
    <div class="square"></div>
  </div>
</div>

You can also rotate it, using `offset-rotate`.


```css
.square {
  offset-path: path("m4,139c0,-1.31731 7.78207,-137 121.62162,-137c113.83955,0 85.71428,133.04808 178.37837,127.12019");
  offset-distance: 30%;
  offset-rotate: 13deg;
}
```

<div data-sample="demo" class="sample2 sample3 sample4">
  <div class="demo-wrapper">
    <svg width="305" height="144" class="svg">
      <path stroke="#000" fill="none" stroke-width="4" d="m4,139c0,-1.31731 7.78207,-137 121.62162,-137c113.83955,0 85.71428,133.04808 178.37837,127.12019"/>
    </svg>
    <div class="square"></div>
  </div>
</div>

Of course, you can also animate these properties.

```css
.square {
  offset-path: path("m4,139c0,-1.31731 7.78207,-137 121.62162,-137c113.83955,0 85.71428,133.04808 178.37837,127.12019");
  animation: move 2s infinite;
}

@keyframes move {
  0% {
    offset-distance: 0%;
  }

  100% {
    offset-distance: 100%;
  }
}
```


<div data-sample="demo" class="sample2 sample5">
<button aria-pressed="false" class="play">Play animation</button>

  <div class="demo-wrapper">
    <svg width="305" height="144" class="svg">
      <path stroke="#000" fill="none" stroke-width="4" d="m4,139c0,-1.31731 7.78207,-137 121.62162,-137c113.83955,0 85.71428,133.04808 178.37837,127.12019"/>
    </svg>
    <div class="square"></div>
  </div>
</div>

<script>
const button = document.querySelector('.play');

button.addEventListener('click', e => {
  const playing = e.target.getAttribute('aria-pressed') !== "false"
  e.target.setAttribute('aria-pressed', !playing)
})
</script>

For the sake of completeness, the same demo without the svg.

```html
<div class="parent">
  <div class="square"></div>
</div>
```

```css
.parent {
  height: 150px;
}

.square {
  offset-path: path("m4,139c0,-1.31731 7.78207,-137 121.62162,-137c113.83955,0 85.71428,133.04808 178.37837,127.12019");
  animation: move 2s infinite;
  position: static;
}
```

<div data-sample="demo" class="sample2 sample5 sample6">
  <button aria-pressed="false" class="play2">Play animation</button>
  <div class="demo-wrapper">
    <div class="square"></div>
  </div>
</div>

<script>
const button2 = document.querySelector('.play2');

button2.addEventListener('click', e => {
  const playing = e.target.getAttribute('aria-pressed') !== "false"
  e.target.setAttribute('aria-pressed', !playing)
})
</script>