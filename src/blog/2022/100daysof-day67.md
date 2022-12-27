---
title: 'Day 67: counting children'
date: 2022-12-27T09:38:54.969Z
image: articles/sm_100days-day67.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "There are a lot of interesting things you can do with the `:has()` pseudo-class. I’ve already covered some of them on [day 26](/blog/2022/100daysof-day26/)."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/bGjEwmr
layout: "layouts/100days.njk"
reading:
  - title: "Parents counting children in CSS"
    url: https://www.matuzo.at/blog/2022/counting-children/
  - title: "Style a parent element based on its number of children using CSS :has()"
    url: https://www.bram.us/2022/11/17/style-a-parent-element-based-on-its-number-of-children-using-css-has/
---

If you want to style an element based on the number of direct children it has, you can do that with just CSS.  
Let's say you want to style a list in a certain way when it contains at least three items. You use the `:has()` pseudo-class with the condition that it _has_ a direct child item that is a third child.

```css
ul:has(>:nth-child(3)) {
  border: 10px solid red;
}
```

<style>
  .sample1  ul:has(>:nth-child(3)) {
    border: 10px solid red;
  }
</style>

<div class="sample1" data-sample="demo: list with 2 items">
  <ul>
    <li>A</li>
    <li>B</li>
  </ul>
</div>

<div class="sample1" data-sample="demo: list with 3 items">
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
</div>

<div class="sample1" data-sample="demo: list with 4 items">
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
    <li>D</li>
  </ul>
</div>

If you want to limit the rule to only apply styles if the list contains exactly three items, you extend the condition and only select the `<ul>` if it contains a direct child item that is the third and last item.

```css
ul:has(>:nth-child(3):last-child) {
  border: 10px solid red;
}
```

<style>
  .sample2 ul:has(>:nth-child(3):last-child) {
    border: 10px solid red;
  }
</style>

<div class="sample2" data-sample="demo: list with 2 items">
  <ul>
    <li>A</li>
    <li>B</li>
  </ul>
</div>

<div class="sample2" data-sample="demo: list with 3 items">
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
</div>

<div class="sample2" data-sample="demo: list with 4 items">
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
    <li>D</li>
  </ul>
</div>