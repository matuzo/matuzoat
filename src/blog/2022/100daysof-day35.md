---
title: 'Day 35: forgiving selectors'
date: 2022-11-11T09:38:54.969Z
image: articles/sm_100days-day35.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "There's a difference between listing selectors in `:where()`, `:is()`, and `:has()` and listing them in a regular selector list."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/PoaGLeZ
layout: "layouts/100days.njk"
caniuse: "hwb()"
---
Let's say you have a button with the class `.button` and you apply the following styles.

```css
.button:hover {
  background-color: hwb(100 0% 20%);
}
```

```html
<button class="button">I'm a button</hover>
```

<style>
  .button1:hover {
    background-color: hwb(100 0% 20%);
  }

  .button2:hover,
  .button2:focus,
  #btn {
    background-color: hwb(100 0% 20%);
  }

  .button3:hover,
  $btn {
    background-color: hwb(200 20% 0%);
  }

  .button4:hover,
  .button4:focus,
  .button4:touch {
  background-color: hwb(300 20% 0%);
  }

  .button5:where(:hover, :focus, $btn) {
    background-color: hwb(90 20% 20%);
  }

  .button6:where(:hover, :focus, :touch) {
    background-color: hwb(52 10% 20%);
  }
</style>

<div class="sample">
<button class="button button1">I'm a button</hover>
</div>

Nothing special, the color just changes on hover. If you add more and different selectors to this rule, it still works.

```css
.button:hover,
.button:focus,
#btn {
  background-color: hwb(100 0% 20%);
}
```

<div class="sample">
<button class="button button2">I'm a button</hover>
</div>

Here's were it gets interesting: If one of the selectors in your list of selectors is invalid, the whole rule becomes invalid and declarations apply to none of the selectors.

```css
.button:hover,
.button:focus,
$btn {
  background-color: hwb(200 20% 0%);
}
```

<div class="sample">
<button class="button button3">I'm a button</hover>
</div>

Even using a pseudo-class that doesn't exist or that isn't supported by the browser invalidates the whole rule.

```css
.button:hover,
.button:focus,
.button:touch {
  background-color: hwb(200 20% 0%);
}
```

<div class="sample">
<button class="button button4">I'm a button</hover>
</div>

So, a downside to using a selector list is that a single invalid or unsupported selector in the list of selectors invalidates the entire rule.

That's different when you're using [:has()](/blog/2022/100daysof-day6/), [:where() or :is()](/blog/2022/100daysof-day13/) because they're so-called “forgiving selectors”. They just ignore the invalid selectors and apply the rules to the others.

```css
button:where(:hover, :focus, $btn) {
  background-color: hwb(90 20% 20%);
}
```

<div class="sample">
<button class="button button5">I'm a button</hover>
</div>

```css
button:where(:hover, :focus, :touch) {
  background-color: hwb(52 10% 20%);
}
```

<div class="sample">
<button class="button button6">I'm a button</hover>
</div>

This means that another benefit of using `:is()` or `:where()`, besides less lines of code and more control over specificity, is that you can use selectors that don't work in every browser in a list of selectors without having to worry that they invalidate the whole rule.