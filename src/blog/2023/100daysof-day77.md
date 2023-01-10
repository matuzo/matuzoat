---
title: 'Day 77: block-size, inline-size, vi, and vb'
date: 2023-01-10T09:38:54.969Z
image: articles/sm_100days-day77.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "There are logical properties for width and height values."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/dyjNQOx
layout: "layouts/100days.njk"
---

## width and height

The logical alternative for `width` is `inline-size` and the alternative for `height` is `block-size`. Here’s an example of how using `inline-size` over `width` makes a difference.

<style>
  [data-sample] h1 {
    border: 1rem solid;
    padding: 1rem;
  }

  [data-sample] h1:not(:last-child) {
    margin-bottom: 2rem;
  }

  [data-sample] .vertical {
    writing-mode: vertical-rl;
  }

  [data-sample] {
    overflow: auto;
  }

  .sample1 h1 {
    width: 16rem;
  }

  .sample2 h1 {
    inline-size: 16rem;
  }

  .sample3 h1, .sample4 h1 {
    padding: 0.5rem;
    font-size: 1.4rem;
  }


  .sample3 h1 {
    width: 20vw;
    height: 40vh;
  }

  .sample4 h1 {
    width: 20vi;
    height: 40vb;
  }
</style>

If you use `width`, the property sets the physical width, regardless of the writing mode.

```css
h1 {
  border: 1rem solid;
  padding: 1rem;
  width: 16rem;
}

.vertical {
  writing-mode: vertical-rl;
}
```

```html
<h1>width horizontal</h1>
<h1 class="vertical">width vertical</h1>
```

<div data-sample="demo" class="sample1">
  <h1>width horizontal</h1>
  <h1 class="vertical">width vertical</h1>
</div>

If you use `inline-size`, the property sets the logical width with respect to the writing mode.

```css
h1 {
  border: 1rem solid;
  padding: 1rem;
  inline-size: 16rem;
}

.vertical {
  writing-mode: vertical-rl;
}
```

<div data-sample="demo" class="sample2">
  <h1>inline-size horizontal</h1>
  <h1 class="vertical">inline-size vertical</h1>
</div>

## vi and vb

There are also logical unit alternatives for `vw` and `vh`.

The width and height of the `<div>` is always the width and height of the viewport, regardless of the writing mode.

```css
div {
  border: 1rem solid;
  width: 20vw;
  height: 40vh;
}

.vertical {
  writing-mode: vertical-rl;
}
```

<div data-sample="demo" class="sample3">
  <h1>vw + vh</h1>
  <h1 class="vertical">vw + vh</h1>
</div>

The width and height of the `<div>` matches either the vertical or horizontal dimensions of the viewport, depending on the writing mode.

```css
div {
  border: 1rem solid;
  width: 20vi;
  height: 40vb;
}
```

<div data-sample="demo" class="sample4">
  <h1>vi + vb</h1>
  <h1 class="vertical">vi + vb</h1>
</div>

* `50vw` alternative: `50vi`
* `50vh` alternative: `50vb`
* `50dvh` alternative: `50dvb`
* `50svh` alternative: `50svb`
* `50lvh` alternative: `50lvb`