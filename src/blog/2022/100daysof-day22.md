---
title: 'Day 22: the ::backdrop pseudo-element'
date: 2022-10-25T09:38:54.969Z
image: articles/sm_100days-day22.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "You can use the `::backdrop` pseudo-element to style the backdrop of [modal dialogs](/blog/2022/100daysof-day15/) and elements which have been placed in fullscreen mode using the Fullscreen API."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/poVBoMz
layout: "layouts/100days.njk"
caniuse: "::backdrop"
reading:
  - title: "::backdrop on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop
draft: true
---
<style>
  ::backdrop {
  background-color: rgb(0 0 155 / 0.5);
}

.dialog2::backdrop {
  background: conic-gradient(red, orange, yellow, green, red);
  outline: 20px solid white;
  outline-offset: -40px;
}

dialog {
  width: min(30rem, 100%);
  aspect-ratio: 16 / 9;
}
</style>

```css
::backdrop {
  background-color: rgb(0 0 0 / 0.5);
}
```

<dialog class="dialog1">
  yo!
  
  <button class="close1">close</button>
</dialog>

<button class="showModal1">show modal</button>

You don't have to limit yourself to semi-transparent background color.

```css
::backdrop {
  background: conic-gradient(red, orange, yellow, green, red);
  outline: 20px solid white;
  outline-offset: -20px;
}
```

<dialog class="dialog2">
  yo!
  
  <button class="close2">close</button>
</dialog>

<button class="showModal2">show modal</button>

<script>
const showModal1 = document.querySelector('.showModal1')
const showModal2 = document.querySelector('.showModal2')
const close1 = document.querySelector('.close1')
const close2 = document.querySelector('.close2')
const dialog1 = document.querySelector('.dialog1')
const dialog2 = document.querySelector('.dialog2')

showModal1.addEventListener('click', e => {
  dialog1.showModal()
})

showModal2.addEventListener('click', e => {
  dialog2.showModal()
})

close1.addEventListener('click', e => {
  dialog1.close()
})

close2.addEventListener('click', e => {
  dialog2.close()
})
</script>