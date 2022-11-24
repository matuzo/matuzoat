---
title: 'Day 2: logical properties'
date: 2022-09-27T09:38:54.969Z
image: articles/sm_100days-day2.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Logical properties are a new way of working with directions and dimensions, one that allows you to control layout through logical, rather than physical mappings. This is especially useful, if you’re dealing with websites that are presented in different languages and writing modes, like right-to-left."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/zYWmemQ
layout: "layouts/100days.njk"
caniuse: "margin-inline-end"
reading:
  - title: "RTL Styling 101"
    url: https://rtlstyling.com/
  - title: "Day 3: logical property shorthands"
    url: /blog/2022/100daysof-day3/
  - title: "Day 31: logical border properties"
    url: /blog/2022/100daysof-day31
  - title: "Day 44: logical floating and clearing"
    url: /blog/2022/100daysof-day44
---
## **Physical properties**

We're used to working with physical properties like `margin-right`, `top`, or `border-left`.

```css
ul {
  display: flex;
  list-style: none;
  padding: 0.5rem 0;
}

li {
  background-color: #6befef;
  margin-right: 2rem;
}
```

```html
<h3>left to right</h3>
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>

<h3>right to left</h3>
<ul dir="rtl">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

In right-to-left languages “One” should be positioned at the very right, but it's not because with physical properties every list item has its margin always on the right, no matter the reading direction.


<style>
  .physical,
  .logical {
    display: flex;
    list-style: none;
    padding: 0.5rem 0;
    margin: 0 0 2rem 0;
    max-width: 30rem;
    border: 2px solid;
  }

  .physical li {
    margin: 0 2rem 0 0;
    background-color: #6befef;
  }
</style>

<ul class="physical">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>

<ul class="physical" dir="rtl">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>


## **Logical properties**

Using logical properties, “One” is at the very right in right-to-left languages because logical properties don't work with the concept of top and bottom or left and right, but start and end, which may switch depending on the writing mode.

<style>
.logical li {
  margin: 0;
  background-color: #6befef;
  margin-inline-end: 2rem;
}
</style>

<ul class="logical">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>

<ul class="logical" dir="rtl">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>

```css
li {
  margin-inline-end: 2rem;
}
```

```html
<h3>left to right</h3>
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>

<h3>right to left</h3>
<ul dir="rtl">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```