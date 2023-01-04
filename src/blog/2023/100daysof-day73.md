---
title: 'Day 73: size container features'
date: 2023-01-04T09:38:54.969Z
image: articles/sm_100days-day73.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "In my previous posts about size container features I’ve only used the `min-width` feature, but there’s actually more you can query."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/BaPLpeG
layout: "layouts/100days.njk"
---

`container-type: inline-size` establishes size containment only on the inline axis. There is no `block-size` option because it wasn’t possible for browsers to implement, but there is a `size` option, which establishes size containment on both dimensions of the container. According to Miriam Suzanne, you should be careful using this option because I may cause side effects, but it allows you to query more than just the width/inline-size.

## orientation

You can query the orientation of the container. If the height is larger than the width, the `orientation` is `portrait`. If the width is larger than the height, it's `landscape`.

<style>
  [data-sample] {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: start;
  }

  [data-sample] .container {
    border: 8px solid aqua;
    container-type: size;
    width: 10rem;
    height: 15rem;
  }

  [data-sample] .container2 {
    width: 15rem;
    height: 10rem;
  }

  [data-sample] .child {
    aspect-ratio: 1;
    width: 5rem;
    border: 4px solid;
    color: red;
  }

  @container (orientation: portrait) {
    [data-sample] .child {
      background: currentColor;
    }
  }

  [data-sample] .container3 {
    width: 10rem;
    height: 10rem;
  }
  
  [data-sample] .container4 {
    width: 10rem;
    height: 5.625rem;
    box-sizing: content-box;
  }

  @container (aspect-ratio: 1 / 1) {
    .sample2 .child {
      background: blue;
    }
  }

  @container (aspect-ratio: 16 / 9) {
    .sample2 .child {
      background: green;
    }
  }

  @container (min-height: 14rem) {
    .sample3 .child {
      background: fuchsia;
    }
  }

  @container (min-block-size: 14rem) {
    .sample4 .child {
      background: aqua;
    }
  }

</style>

```css
.container {
  border: 8px solid aqua;
  container-type: size;

  width: 10rem;
  height: 15rem;
}

.container2 {
  width: 15rem;
  height: 10rem;
}

.child {
  aspect-ratio: 1;
  width: 5rem;
  border: 4px solid;
  color: red;
}

@container (orientation: portrait) {
  .child {
    background: currentColor;
  }
}
```

```html
<div class="container">
  <div class="child"></div>
</div>

<div class="container container2">
  <div class="child"></div>
</div>
```

<div data-sample="demo: orientation" class="sample1">
<div class="container">
<div class="child">
  
</div>
</div>
<div class="container container2">
<div class="child">
  
</div>
</div>
</div>

# aspect-ratio

```css
.container3 {
  width: 10rem;
  height: 10rem;
}

.container4 {
  width: 10rem;
  height: 5.625rem;
  box-sizing: content-box;
}

@container (aspect-ratio: 1 / 1) {
  .child {
    background: blue;
  }
}

@container (aspect-ratio: 16 / 9) {
  .child {
    background: green;
  }
}
```

<div data-sample="demo: aspect-ratio" class="sample2">
<div class="container container3">
<div class="child">
  
</div>
</div>
<div class="container container4">
<div class="child">
  
</div>
</div>
</div>

## height

You can also query the height.

```css
@container (min-height: 14rem) {
  .child {
    background: fuchsia;
  }
}
```

<div data-sample="demo: aspect-ratio" class="sample3">
<div class="container container1">
<div class="child">
  
</div>
</div>
<div class="container container2">
<div class="child">
  
</div>
</div>
</div>

## logical properties

Instead of `width` you can also use `inline-size` in your queries and instead of `height` you can use `block-size`.

```css
@container (min-block-size: 14rem) {
  .sample4 .child {
    background: aqua;
  }
}
```

<div data-sample="demo: aspect-ratio" class="sample4">
<div class="container container1">
<div class="child">
  
</div>
</div>
<div class="container container2">
<div class="child">
  
</div>
</div>
</div>