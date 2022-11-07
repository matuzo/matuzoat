---
title: 'Day 31: logical border properties'
date: 2022-11-07T09:38:54.969Z
image: articles/sm_100days-day31.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Just like for `margin` or `padding`, there are also logical property variations for `border` properties."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/xxzZrvR
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "CSS Logical Properties and Values (MDN)"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
---
Originally there were 4 shorthand properties we could use for defining borders.

* `border` - 1, 2, or 3 values (size, style, color)
* `border-width` - 1, 2, 3, or 4 size values for the different sides
* `border-style` - 1, 2, 3, or 4 style values for the different sides
* `border-color` - 1, 2, 3, or 4 color values for the different sides

And we could do the same for each physical side (top, right, bottom, left).

* `border-left` - 1, 2, or 3 values
* `border-left-width` - A size value
* `border-left-style` - A style value
* `border-left-color` - A color value

Now there are a couple of more properties:

## border-block

* `border-block` - 1, 2, or 3 values (size, style, color)
* `border-block-width` - 1 or 2 size values (a single value for both sides or one for each)
* `border-block-style` - 1 or 2 style values
* `border-block-color` - 1 or 2 color values

<style>
  .border-block-shorthand {
    border-block: solid;
  }

  .border-block-shorthand2 {
    border-block: 20px solid aqua;
  }

  .border-block-shorthand3 {
    border-block-color: green;
    border-block-width: 10px 20px;
    border-block-style: dashed dotted;
  }

  .border-block-start {
    border-block-start: 2em solid red;
  }

  .border-block-end {
    border-block-end-color: blue;
    border-block-end-width: 1rem;
    border-block-end-style: dashed;
  }

  .border-inline-shorthand {
    border-inline: solid;
  }

  .border-inline-shorthand2 {
    border-inline: 20px solid aqua;
  }

  .border-inline-shorthand3 {
    border-inline-color: green;
    border-inline-width: 10px 20px;
    border-inline-style: dashed dotted;
  }

  .border-inline-start {
    border-inline-start: 2em solid red;
  }

  .border-inline-end {
    border-inline-end-color: blue;
    border-inline-end-width: 1rem;
    border-inline-end-style: dashed;
  }

  .div {
    padding: 1rem;
    margin-bottom: 5rem;
    background: #efefef;
  }
</style>

```css
div {
  border-block: solid;
}
```
<div class="div border-block-shorthand">
  border-block
</div>

```css
div {
  border-block: 20px solid aqua;
}
```

<div class="div border-block-shorthand2">
  border-block
</div>

```css
div {
  border-block-color: green;
  border-block-width: 10px 20px;
  border-block-style: dashed dotted;
}
```

<div class="div border-block-shorthand3">
  border-block
</div>

We can do the same for each individual side (block-start and block-end).

* `border-block-start` - 1, 2, or 3 values
* `border-block-start-width` - A size value
* `border-block-start-style` - A style value
* `border-block-start-color` - A color value

```css
div {
  border-block-start: 2em solid red;
}
```
<div class="div border-block-start">
  border-block-start
</div>

```css
div {
  border-block-end-color: blue;
  border-block-end-width: 1rem;
  border-block-end-style: dashed;
}
```
<div class="div border-block-end">
  border-block-end
</div>

## border-inline

* `border-inline` - 1, 2, or 3 values
* `border-inline-width` - 1 or 2 size values
* `border-inline-style` - 1 or 2 style values
* `border-inline-color` - 1 or 2 color values

```css
div {
  border-inline: solid;
}
```

<div class="div border-inline-shorthand">
  border-inline
</div>

```css
div {
  border-inline: 20px solid aqua;
}
```
<div class="div border-inline-shorthand2">
  border-inline
</div>

```css
div {
  border-inline-color: green;
  border-inline-width: 10px 20px;
  border-inline-style: dashed dotted;
}
```

<div class="div border-inline-shorthand3">
  border-inline
</div>

We can do the same for each individual side (inline-start and inline-end).

* `border-inline-start` - 1, 2, or 3 values
* `border-inline-start-width` - A size value
* `border-inline-start-style` - A style value
* `border-inline-start-color` - A color value

```css
div {
  border-inline-start: 2em solid red;
}
```

```html
<div>
  border-inline-start
</div>
````

<div class="div border-inline-start">
  border-inline-start
</div>

```html
<div dir="rtl">
  border-inline-start
</div>
````

<div class="div border-inline-start" dir="rtl">
  border-inline-start
</div>

```css
div {
  border-inline-end-color: blue;
  border-inline-end-width: 1rem;
  border-inline-end-style: dashed;
}
```
<div class="div border-inline-end">
  border-inline-end
</div>