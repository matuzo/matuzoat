---
title: 'Day 14: the difference between :is() and :where()'
date: 2022-10-13T09:38:54.969Z
image: articles/sm_100days-day14.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "There's an important difference between `:is()` and `:where()`.  "
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/wvjmPXY
layout: "layouts/100days.njk"
caniuse: 'where(), is()'
reading:
  - title: "MDN :where()"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/:where
  - title: "MDN :is()"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/:is
  - title: "Day 13: the :where() and :is() pseudo-classes"
    url: /blog/2022/100daysof-day13/
---
Let's take the following example. We have two buttons and we use `:where()` on the first button to apply a background color and `:is()` on the second button.

<style>
  button {
    border: none;
    color: #fff;
    font: inherit;
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
  }

  button:where(.button1) {
    background-color: rebeccapurple;
  }

  button:is(.button2) {
    background-color: rebeccapurple;
  }

  .specificty button:where(.button1) {
    background-color: rebeccapurple;
  }

  .specificty button:is(.button2) {
    background-color: rebeccapurple;
  }

  .specificty button {
    background-color: salmon;
  }

  .specificty .button2 {
    background-color: green;
  }

</style>

```html
<button class="button1">where</button>
<button class="button2">is</button>
```

```css
button:where(.button1) {
  background-color: rebeccapurple;
}

button:is(.button2) {
  background-color: rebeccapurple;
}
```

<button class="button1">where</button>
<button class="button2">is</button>

Visually the buttons are identical, but the difference is the specificity of the selector.  

The button with the `:where()` pseudo-class has the same specificity as a simple tag selector (for example `button {}`) because the specificity of `:where()` is 0. The arguments in `:where()` don't add to the specificity of the selector.   

The button with the `:is()` pseudo-class has the same specificty as a combined selector (for example `button.button2 {}`) because `:is()` takes on the specificity of the most specific selector in its arguments.

```css

/* Specificity: 0 0 1 (0 ids, 0 classes, 1 tag) */
button:where(.button1) {
  background-color: rebeccapurple;
}

/* Specificity: 0 1 1 */
button:is(.button2) {
  background-color: rebeccapurple;
}

/* Specificity: 0 0 1 
  -> Same as the first button. Overwrites rebeccapurple.
  -> Lower than the second button. Doesn't overwrite rebeccapurple.
*/
button {
  background-color: salmon;
}

/* Specificity: 0 1 0
  -> Still lower than the second button. Doesn't overwrite rebeccapurple.
*/
.button2 {
  background-color: green;
}
```
<div class="specificty">
<button class="button1">where</button>
<button class="button2">is</button>
</div>

