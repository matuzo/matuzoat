---
title: 'Day 66: individual transform properties'
date: 2022-12-26T09:38:54.969Z
image: articles/sm_100days-day66.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "From now on you can transform elements with the `translate`, `rotate`, and `scale` properties."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/RwBNMBW
layout: "layouts/100days.njk"
reading:
  - title: "Finer grained control over CSS transforms with individual transform properties"
    url: https://web.dev/css-individual-transform-properties/
---
Let’s say you apply several transforms to an element, and on `:hover` and `:focus` you only want to change one of them, for example, `scale`.

```html
<button>Transform</button>
```

```css
button {
  transform: translateX(20px) rotate(15deg) scale(1); 
}

button:is(:hover, :focus) {
  transform: scale(2); 
}
```

<style>
  .button1 {
    transform: translateX(20px) rotate(15deg) scale(1); 
  }

  .button1:is(:hover, :focus) {
    transform: scale(2); 
  }

  .button2 {
    transform: translateX(20px) rotate(15deg) scale(1); 
  }

  .button2:is(:hover, :focus) {
    transform: translateX(20px) rotate(15deg) scale(2); 
  }

  .button3 {
    translate: 20px 0;
    rotate: 15deg;
    scale: 1; 
  }

  .button3:is(:hover, :focus) {
    scale: 2; 
  }
</style>

<div data-sample="demo">

<button class="button1">Transform</button>

</div>

That doesn't work as expected because by setting `transform: scale(2)` you're overwriting all the previously defined transforms. To fix that, you have to repeat the other transforms.

```css
button {
  transform: translateX(20px) rotate(15deg) scale(1); 
}

button:is(:hover, :focus) {
  transform: translateX(20px) rotate(15deg) scale(2); 
}
```

<div data-sample="demo">

<button class="button2">Transform</button>

</div>

That can cause a lot of repetition in your code.

Individual transform properties fix that issue because now you can use `translate`, `rotate`, and `scale` separately.

```css
button {
  translate: 20px 0;
  rotate: 15deg;
  scale: 1; 
}

button:is(:hover, :focus) {
  scale: 2; 
}
```

<div data-sample="demo">

<button class="button3">Transform</button>

</div>