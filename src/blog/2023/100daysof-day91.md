---
title: 'Day 91: a previous sibling selector with :has()'
date: 2023-01-30T09:38:54.969Z
image: articles/sm_100days-day91.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "I’ve already shown much appreciation for the `:has()` pseudo-class in this series, but that we can use it as a previous sibling selector tops it all of."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/OJwwmpw
layout: "layouts/100days.njk"
reading:
  - title: "A Previous Sibling Selector"
    url: https://blog.jim-nielsen.com/2022/previous-sibling-selector/
  - title: "Day 26: using combinators in :has()"
    url: /blog/2022/100daysof-day26/
---

Since this is not an official selector, but more something like a hack, it can be hard to read and interpret. So, let’s start nice and easy.

We have three buttons. If we hover/focus one button and we want to highlight it and the next adjacent button in the DOM at the same time, we can use the adjacent sibling selector.

<style>
  [data-sample] {
    display: flex;
    gap: 3rem;
    padding: 2rem;
  }

  [data-sample] button {
    font-size: 2rem;
    outline-width: 8px;
    outline-offset: 4px;
    outline-color: hotpink;
  }

  [data-sample] button:is(:hover, :focus-visible) {
    outline-style: solid;
  }

  [data-sample] button:is(:hover, :focus-visible) + button {
    outline-style: dashed;
  }
</style>

```css
  button {
    outline-width: 8px;
    outline-offset: 4px;
    outline-color: hotpink;
  }

  button:is(:hover, :focus-visible) {
    outline-style: solid;
  }

  button:is(:hover, :focus-visible) + button {
    outline-style: dashed;
  }
```

<div data-sample="demo" class="sample1">
  <button>previous</button>
  <button>middle</button>
  <button>next</button>
</div>

There's no previous item selector, but using `:has()` we can select an item that comes before another item. I've written about next-sibling combinators and `:has()` on [day 26](/blog/2022/100daysof-day26/). Here’s an example from that post: The following code sets the block-end margin of all `<h2>` to 0 if they're followed by a `<time>` element.

```css
h2 {
  margin-block-end: 0.7em; 
}

h2:has(+ time) {
  margin-block-end: 0;
}
```

```html
<h2>Heading</h2>
<p>Teaser text</p>

<h2>Heading</h2>
<time>31.10.2022</time>
<p>Teaser text</p>
```

<style>
  h2:where(.demo) {
    line-height: 1;
    margin-block-end: 0.7em; 
  }

  h2:has(+ time) {
    margin-block-end: 0;
  }
</style>

<div data-sample="demo - h2 followed by p">
<div>
  <h2 class="demo">Heading</h2>
  <p>Teaser text</p>
</div>
</div>

<div data-sample="demo - h2 followed by time">
<div>
  <h2 class="demo">Heading</h2>
  <time>31.10.2022</time>
  <p>Teaser text</p>
</div>
</div>

If we want to use this in our button example, we have to select a `<button>` followed by a `<button>` in the `:hover` or `:focus-visible` state.

```css
  button:is(:hover, :focus-visible) {
    outline-style: solid;
  }

  button:is(:hover, :focus-visible) + button {
    outline-style: dashed;
  }

  button:has(+ button:is(:hover, :focus-visible)) {
    outline-style: dotted;
  }
```

<style>
  .sample2 button:has(+ button:is(:hover, :focus-visible)) {
    outline-style: dotted;
  }
</style>

<div data-sample="demo" class="sample2">
  <button>previous</button>
  <button>middle</button>
  <button>next</button>
</div>

If we have more buttons and we want to select the button that comes before the previous button, we can extend our selector.

```css
  button:has(+ button + button:is(:hover, :focus-visible)) {
    /* styles */
  }
```

What a beauty!

Here are a couple of other demos:

<p class="codepen" data-height="473.48046875" data-default-tab="html,result" data-slug-hash="OJwwmpw" data-user="matuzo" style="height: 473.48046875px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/matuzo/pen/OJwwmpw">
  Day 91: previous sibling selector with :has() #100DaysOfMoreOrLessModernCSS</a> by Manuel Matuzovic (<a href="https://codepen.io/matuzo">@matuzo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="yLvdwQW" data-user="pouriversal" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/pouriversal/pen/yLvdwQW">
  selecting previous item using CSS</a> by pourya (<a href="https://codepen.io/pouriversal">@pouriversal</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="qBoogaX" data-user="chriscoyier" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/qBoogaX">
  BUBBLE (previous siblings!)</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>