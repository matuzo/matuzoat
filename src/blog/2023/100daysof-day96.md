---
title: 'Day 96: the margin-trim property'
date: 2023-02-06T09:38:54.969Z
image: articles/sm_100days-day96.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `margin-trim` property allows a container element to trim the margins of its children where they adjoin the container’s edges."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/NWBENgw
layout: "layouts/100days.njk"
reading:
  - title: "7.1. Widget Accent Colors: the accent-color property"
    url: https://w3c.github.io/csswg-drafts/css-ui/#widget-accent
  - title: "accent-color (MDN)"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color
---

Let’s say we have a parent element and 4 children, and we use `margin-block-end` to add some spacing between these elements.

```html
<ul>
 <li>A</li>
 <li>B</li>
 <li>C</li>
 <li>D</li>
</ul>
```

```css
li {
  margin-block-end: 1rem;
}
```

<style>
  [data-sample] ul {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 4px solid hotpink;
  }
  
  [data-sample] li {
    margin-block-start: 0 !important;
    margin-block-end: 2rem;
    border: 4px solid;
  }
  
</style>

<div data-sample="demo">
  <ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
  <li>D</li>
  </ul>
</div>

That’s great, but to avoid the extra space at the end of the list, we want to make sure that the last item doesn’t get any margin. To achieve that, I’ve used at least 3 different solutions in the past.

1. **Apply a margin on all elements and remove it from the last.**  
  Okay, why not.
    ```css
    li {
      margin-block-end: 1rem;
    }

    li:last-child {
      margin-block-end: 0;
    }
      ```
2. **Apply a margin on all elements but the last.**  
  Looks clever, less lines, but harder to read.
    ```css
    li:not(:last-child) {
      margin-block-end: 1rem;
    }

    ```
2. **Use the [lobotimized owl selector](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/)**  
  My favorite for the longest time.
    ```css
    ul > * + * {
      margin-block-start: 1rem;
    }
    ```

There are pros and cons to all solutions. Anyway, eventually we might not have to use any of them when we have this specific problem because `margin-trim` solves it more elegantly. We can define the property on the parent element and tell it where it should trim margins. Allowed values are `none`, `block`, `block-start`, `block-end`, `inline`, `inline-start`, and `inline-end`.

```css

ul {
  margin-trim: block-end;
}

li {
  margin-block-end: 1rem;
}
```

<div class="highlight">

**Note:** Safari Technology Preview is currently the only browser that supports `margin-trim`.

</div>