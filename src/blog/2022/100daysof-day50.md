---
title: 'Day 50: :has(:not()) vs. :not(:has())'
date: 2022-12-02T09:38:54.969Z
image: articles/sm_100days-day50.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Something I was tripping over when I began learning about `:has()` was the combination with `:not()`."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/XWYxgmo
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 6: the :has() pseudo-class"
    url: /blog/2022/100daysof-day6/
  - title: "Day 8: nesting :has()"
    url: /blog/2022/100daysof-day8/
  - title: "Day 16: the specificity of :has()"
    url: /blog/2022/100daysof-day16
  - title: "Day 26: using combinators in :has()"
    url: /blog/2022/100daysof-day26
---
Let me show you what I got wrong by using an example. Let's say we have two cards, each with a heading and some text. One of them also contains an image. 

```html
<div class="card">
  <h2>Card with image</h2>
  <img src="https://assets.codepen.io/144736/skateboard.jpg" alt="" />
  <p>text</p>
</div>

<div class="card">
  <h2>Card without image</h2>
  <p>text</p>
</div>
```

<style>
.democard.card {
  border: 4px solid;
  max-width: 20rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.democard img {
  max-width: 100%;
  order: 0;
  border: 0;
}

.democard h2 {
  order: 1;
  margin-top: 1rem;
  padding: 0 1rem;
}

.democard p {
  order: 2;
  padding: 0 1rem 1rem;
}

.democard2.card:has(:not(img)) {
  border-style: dotted;
}

.democard2.card:has(:not(img)) h2 {
  margin-top: 0;
}

.democard3.card:not(:has(img)) {
  border-style: dotted;
}

.democard3.card:not(:has(img)) h2 {
  margin-top: 0;
}

.democols {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

</style>

<div class="democols">
<div class="democard card">
  <h2>Card with image</h2>
  <img src="https://assets.codepen.io/144736/skateboard.jpg" alt="" />
  <p>text</p>
</div>

<div class="democard card">
  <h2>Card without image</h2>
  <p>text</p>
</div>
</div>

Now we want to add additional styling to cards without an image. If a card doesn't contain an image, we want to remove the margin on the heading and change the border-style.

```css
.card:has(:not(img)) {
  border-style: dotted;
}

.card:has(:not(img)) h2 {
  margin-top: 0;
}
```

<div class="democols">
<div class="democard democard2 card">
  <h2>Card with image</h2>
  <img src="https://assets.codepen.io/144736/skateboard.jpg" alt="" />
  <p>text</p>
</div>

<div class="democard democard2 card">
  <h2>Card without image</h2>
  <p>text</p>
</div>
</div>

The styles apply to both cards, no matter whether an image is present. That's because `.card:has(:not(img))` means “select a `.card` that has any element that is not an image”. This means that the selector only wouldn't apply if the card only contained images.

```html
<div class="card">
  <img src="https://assets.codepen.io/144736/skateboard.jpg" alt="" />
</div>
```

<div class="democard democard2 card">
  <img src="https://assets.codepen.io/144736/skateboard.jpg" alt="" />
</div>

If we switch `:has()` and `:not()` we're instructing the browser to do something completely different. `.card:not(:has(img))` means “select a `.card` doesn't have (not has) an image”, and that's exactly what we want in this case.

```css
.card:not(:has(img)) {
  border-style: dotted;
}

.card:not(:has(img)) h2 {
  margin-top: 0;
}
```

<div class="democols">
<div class="democard democard3 card">
  <h2>Card with image</h2>
  <img src="https://assets.codepen.io/144736/skateboard.jpg" alt="" />
  <p>text</p>
</div>

<div class="democard democard3 card">
  <h2>Card without image</h2>
  <p>text</p>
</div>
</div>
